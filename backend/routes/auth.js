const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../db');

const router = Router();

const createToken = () => {
    return jwt.sign({}, 'secret', { expiresIn: '1h' });
};

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.password;

    db.getDB().db()
    .collection('users')
    .findOne({email: email})
    .then(result => {    
        return bcrypt.compare(pw, result.pass);
    }).then(data => {
        if(!data){
            throw Error();
        }
        const token = createToken();
        res.status(200).json({ message: 'Authentiation Succeeded', token: token });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Authentication failed, invalid username or password.' });
    });
});

// SIGNUP
router.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.password;
    bcrypt.hash(pw, 12)
    .then(hashedPW => {
        db.getDB().db()
        .collection('users')
        .insertOne({email: email, pass: hashedPW})
        .then(result => {
            const token = createToken();    
            res.status(201).json({ token: token, user: { email: email } });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Creating the user failed.' });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Creating the user failed.' });
    });
});

module.exports = router;
