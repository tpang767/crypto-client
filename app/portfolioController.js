import Portfolio from './portfolio/portfolioModel';

var controller = {};

controller.getPortfolioById = async (_id) => {
  var id = _id || "599d1dd253189911569556d4"
  return await Portfolio.findById({ _id: id })
};

controller.savePortfolio = async (newPortfolio) => {
  return await newPortfolio.save(err, results);
};

controller.getOverview = async (req, res, done) => {
  try {
    var portfolio = await controller.getPortfolioById()
    res.status(200).json(portfolio)
  }
  catch (err) {
    return done(err)
  }
};

controller.getHoldings = async (req, res, done) => {
  try {
    var portfolio = await controller.getPortfolioById()
    res.status(200).send(JSON.stringify(portfolio.holdings))
  } catch (err) {
    return done(err)
  }
};

controller.postData = async (req, res, done) => {
  try {
    var data = req.body;
    var newPortfolio = new Portfolio({
      'name': data.name,
      'currency': 'USD',
      'totalBalance': data.totalBalance,
      'holdings': data.holdings
    })
    var savePortfolio = await controller.savePortfolio(newPortfolio)
    res.status(200).send(JSON.stringify(results))
  } catch (err) {
    return done(err)
  };

controller.renderView = (req, res, view, data) => {
    if (!data && typeof data == 'undefined') {
      data = {};
    }
    res.render(view, data)
  };

};

export default controller














