/**
 * @author : Manjeet Kumar
 * @description : defines the routes to receive and process API hits.
*/

const express = require("express");
const passport = require("passport");
//get express router
var router  = express.Router({mergeParams: true});


//CREATE new user
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/success',
    failureRedirect : '/failed'
}));


//login user
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/success',
    failureRedirect : '/failed'
}));


router.get('/forgot', (req, res)=> {
    res.render('forgot');
})


router.post('/forgot', passport.authenticate('local-forgot', {
    successRedirect : '/success',
    failureRedirect : '/failed'
}));


//test routes for verifying login/signup
router.get('/success', (req, res)=> {
    res.send('login/signup successful');
})

router.get('/failed', (req, res)=> {
    res.send('login/signup failed');
})




module.exports = router;