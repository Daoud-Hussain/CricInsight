const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    googleLogin
} = require('../controllers/authController');


// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password/:token', resetPassword);

// Google login
router.post('/google-login', googleLogin);

// Facebook login
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:5173/login',
        session: false
    }),
    (req, res) => {
        res.redirect(`http://localhost:5173/dashboard?email=${req.user.email}`);
    }
);

module.exports = router;