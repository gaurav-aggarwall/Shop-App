import React from 'react';

import Button from '../Button/Button';

import './Modal.css';

const modal = props => (
    <div className={`modal ${props.open ? 'open' : ''}`}>
        <header className="modal__header">
            <h1>{props.title}</h1>
        </header>
        <section className="modal__content">
            {props.children}
        </section>
        <section className="modal__actions">
            <Button type="button" onClick={props.onClose}>Okay</Button>
        </section>
    </div>
);

export default modal;