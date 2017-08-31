import express from 'express';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from'webpack-hot-middleware'
import config from '../webpack.config.dev.js';
import session from 'express-session'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import configDB from './config/database';
import {setPassport} from './config/passport';
import {setRoutes} from './routes';
import morgan from 'morgan';
import methodOverride from 'method-override';

//middleware
var app = express(),
    port = process.env.PORT || 3000,
    compiler = webpack(config),
    middleware = webpackMiddleware(compiler,{noInfo: true, publicPath: config.output.publicPath})

setPassport(passport)    
//CONFIGURATIONS
mongoose.Promise = global.Promise;  
mongoose.connect(configDB.url, {useMongoClient: true });
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
}); 
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});

//WEBPACK MODULE BUNDLING SETUO
app.use(webpackHotMiddleware(compiler));
app.use(middleware);

//EXPRESSS APP SETUP
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

//VIEW ENGINE
app.set('views', path.join(__dirname,'./views'));
app.set('view engine', 'pug');

//PASSPORT SETUP
app.use(session({secret: 'pancakesflattenintowaffles',resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//ROUTES
setRoutes(app, passport)

//START APP
app.listen(port, function() {
    console.log(chalk.green("Running Application on port: " + port));
})

// export default app;
//catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


