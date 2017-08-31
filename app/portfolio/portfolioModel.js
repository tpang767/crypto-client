import mongoose from 'mongoose';

var Schema = mongoose.Schema;
var PortfolioSchema = new Schema({
    name: {
        type: String
    },
    currency: {
        type: String,
        default: 'USD'
    },
    totalBalance: {
        type: Number,
        default: 0
    },
    holdings: [
        {
            ticker: {
                type: String,
                default: "No Tickers Yet"
            },
            name: {
                type: String,
                default: "No Name Yet"
            },
            amount: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0
            },
            balance: {
                type: Number,
                default: 0
            }
        }
    ]
});

export default mongoose.model('Portfolio', PortfolioSchema);

