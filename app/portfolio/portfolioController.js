import Portfolio from './portfolioModel';

export function show_portfolio(req, res, done) {
    var id = req.params.id || "599d1dd253189911569556d4";
    Portfolio.findById({_id: id}, (err, details) => {
        if(err) {
            return done(err)
        }
        if(!details || details.length === 0) {
            return done(err)
        } 
        else {
            res.render('spreadsheet',{ portfolio: details} )
            // res.json(details)
        }
    })
}

function holdings_list(req, res, done) {
    var id = req.params.id || "599d1dd253189911569556d4";
    Portfolio.findById({_id: id}, (err, details) => {
        var holdings = details.holdings;
        if(err) {
            return done(err)
        }
        if(!details || details.length === 0 || !details.holdings) {
            return done(err)
        } 
        else {
            res.json(holdings)
        }
    })
}

function portfolio_create_post(req, res, done) {
    var data = req.body;
    var newPortfolio = new Portfolio({
        'name': data.name,
        'currency': 'USD',
        'totalBalance': data.totalBalance,
        'holdings': data.holdings    
    })
    newPortfolio.save((err, results) => {
        if (err) 
          return done(err)
        else {
            console.log(newPortfolio.name + ' successfully saved in db')
            return done(null, results)
        }
    });      
}

export default {show_portfolio, holdings_list, portfolio_create_post}
