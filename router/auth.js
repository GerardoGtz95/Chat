/**
 * path: /api/auth
 */
const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/users', createUser);

router.post('/', [
    check('name', 'Email is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.get('/renew', renewToken);

module.exports = router;