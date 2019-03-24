const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = Router();

const createToken = () => {
    return jwt.sign({}, 'secret', { expiresIn: '1h' });
};

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.password;
    const token = createToken();
    if(email.pass == pw)  //Check Password is correct or not
        res.status(200).json({ token: token, user: { email: 'dummy@dummy.com' } });
    res.status(401).json({ message: 'Authentication failed, invalid username or password.' });
});

router.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.password;
    bcrypt.hash(pw, 12)
    .then(hashedPW => {
        console.log(hashedPW);
        const token = createToken();
        res.status(201).json({ token: token, user: { email: 'dummy@dummy.com' } });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Creating the user failed.' });
    });
});

module.exports = router;
