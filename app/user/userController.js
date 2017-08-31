// import express from 'express';
// import path from 'path';
// import open from 'open';
// import passport from 'passport';
// import {Strategy as LocalStrategy} from 'passport-local';
// import bcrypt from 'bcrypt';
// import Account from './accountModel';

// var userRouter = express.Router()

// var router = function() {
//     const rootViews = {root: path.join(__dirname,'/')}
    
    
//     userRouter.get('/', (req,res)=>{
//         res.sendFile('signup.html', rootViews)
//     })
//     userRouter.post('/register', registerUser)
    
//     function registerUser(req,res) {
//         var user = new User({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.pwd,
//             admin: false,
//             created_at: Date.now(),
//             updated_at: Date.now()              
//         })
//         user.save(function(err, result){
//             if(err) {
//                 console.log(err)
//                 return err
//             } else {
//                 console.log('successfully saved in db')
//                 res.redirect('/user');
//             }
//         })
//     };


//     // userRouter.get('/login',function(req, res) {
//     //     res.sendFile('login.html', rootViews)
//     // });
//     // userRouter.post('/account/login',function(req, res) {
//     //     req.login(req.body, function() {
//     //         res.redirect('/account/user')
//     //     })
//     // });

//     // userRouter.get('/account', function(req,res) {
//     //     res.json(req.user)
//     // })
//     // userRouter.get('/signup',function(req, res) {
//     //     res.sendFile('signup.html', rootViews)
//     // });
//     // userRouter.get('/signup',function(req, res) {
//     //     res.sendFile('signup.html', rootViews)
//     // });

//     return userRouter;
// }

// export default router;