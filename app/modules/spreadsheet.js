import Table from 'cli-table';

export class Spreadsheet{

    constructor(_portfolio) {
        this._portfolio = _portfolio
        // this.header =  ['Coin', 'Amount', 'Price', 'Balance'];
        // this.colWidths = [100,150]
        this.table = new Table({
            head: ['Coin', 'Amount', 'Price', 'Balance'],
            colWidths: [10,20,20,20],
            style: {
                head: ['blue'],
                border: ['grey']
            }
        })
    }
    inputData() {
        var holdings = this._portfolio.holdings
        var coinNames = Object.keys(holdings)
        var numCoins = coinNames.length
        for(var coin in holdings) {
            let amount = holdings[coin].amount;
            let price = holdings[coin].price;
            let balance = holdings[coin].balance;
            this.table.push([coin,amount,price,balance])
        }
        var totalBalance = this._portfolio.totalBalance
        this.table.push(['Total','','',totalBalance])
        this.print();
    }
    print() {
        console.log(this.table.toString());
    }
}



