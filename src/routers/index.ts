import express from 'express';
import getUsersDB from '../database/usersDB';
import constants from '../constants';

const router = express.Router();
const usersDB = getUsersDB();

router.get('/', (_req, res) => {
    res.status(200);
    return res.send('🚀 running 🔥');
});

router.post('/signup', (req, res) => {
    const { username = '', password = '' } = req.body;
    if (username && password) {
        if (usersDB.get(username)) {
            res.status(409);
            return res.send({ message: constants.USER_ALREADY_EXISTS });
            ;
        } 
            usersDB.set(username, password);
            const token = username + password;
            usersDB.push('currentLoggedIn', token);
            res.status(201);
            return res.send({ message: constants.ACCOUNT_CREATED_SUCCESSFULLY, token });
            ;
        
    }
    res.status(401);
    return res.send({ message: constants.INVALID_CREDENTIALS });
});

router.post('/login', (req, res) => {
    const { username = '', password = '' } = req.body;
    if (username && password) {
        if (usersDB.get(username) === password) {
            const token = username + password;
            usersDB.push('currentLoggedIn', token);
            res.status(200);
            return res.send({ message: constants.LOGGED_IN_SUCCESSFULLY, token });
            ;
        }
    }
    res.status(401);
    return res.send({ message: constants.INVALID_CREDENTIALS });
});

router.post('/logout', (req, res) => {
    const { token } = req.body;
    if (token) {
        if (usersDB.has('currentLoggedIn', token)) {
            usersDB.pull('currentLoggedIn', token);
            res.status(200);
            return res.send({ message: constants.LOGGED_OUT_SUCCESSFULLY });
            ;
        }
    }
    res.status(401);
    return res.send({ message: constants.INVALID_CREDENTIALS });
});

router.delete('/delete-account', (req, res) => {
    const { username = '', password = '', token = '' } = req.body;
    if (username && password && token) {
        if (usersDB.get(username) === password && usersDB.get('currentLoggedIn').includes(token)) {
            usersDB.pull('currentLoggedIn', token);
            usersDB.delete(username);
            res.status(200);
            return res.send({ message:  constants.ACCOUNT_DELETED_SUCCESSFULLY });
        ;
        }
    }
    res.status(401);
    return res.send({ message: constants.INVALID_CREDENTIALS });
});

export default router;