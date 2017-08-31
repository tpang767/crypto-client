// import Portfolio from './portfolio/portfolioModel';
import portfolioController from './portfolioController';
export function setRoutes(app, passport) {
    
//HOME PAGE
  app.get('/', (req,res) => {
      res.render('index', {title: "Home Page"})
  });

//LOGIN
  app.get('/login', (req, res) => {
      res.render('login', {title: "Login Page"} );
  });
  app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/portfolio',
        failureRedirect : '/login',
        failureFlash : true
  }));

  //LOGOUT
  app.get('/logout', (req, res) => {
      res.logout();
      res.redirect('/');
  });

  //SIGNUP
  app.get('/signup',(req,res) => {
      res.render('signup', {})
  });
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/login',
      failureRedirect : '/signup',
      failureFlash : true
  }));

  //USER
  // app.get('/user', (req, res) => {
    //list user details
  // })
  
  // app.post(`/user/${field}`, )

//PORTFOLIO
  app.get('/portfolio', isLoggedIn, portfolioController.getOverview)
  app.get('/portfolio/holdings', isLoggedIn, portfolioController.getHoldings)

  app.post('/portfolio', isLoggedIn, portfolioController.postData)
  // app.post('/portfolio/holdings')
  // app.delete('/portfolio')
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
