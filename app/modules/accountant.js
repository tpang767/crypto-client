'use strict';

import axios from 'axios';
import Portfolio from './portfolio'
import {Spreadsheet} from './spreadsheet'

export class Accountant {

    constructor(baseURL) {
        this.baseURL = baseURL || 'https://min-api.cryptocompare.com/data/price?';
        this.currency = Portfolio.currency;
    };
    get(url) {
        return this.request(url)
    };
    request(config) {
        var options = {
            method:'get',
            baseURL: 'https://min-api.cryptocompare.com/data/price?',
              params: {
                fsym: config['fsym'],
                tsyms: config.tsyms || 'USD'
            },
            responseType: 'json'
        }
        return axios(options)
    };
    getCoinAmount(portfolio) {
        var holdings = portfolio || Portfolio.holdings
        var result = {}
        for(var coin in holdings) {
            result[coin] = holdings[coin].amount
        }
        return result 
    };
    getCoinPrices(portfolio) {
        var holdings = portfolio || Portfolio.holdings
        var result = {}
        for(var coin in holdings) {
            result[coin] = holdings[coin].price
        }
        return result         
    };

    getCoinList(portfolio){
        var holdings = portfolio || Portfolio.holdings
        var result = []
        for(var coin in holdings) {
            result.push(coin)
        }
        return result        
    };
    getNumCoins() {
        return Portfolio.holdings.length
    };
    getMarketPrices(options) {
        var coinList = this.getCoinList()
        var requestPromises = this.createRequestList(coinList)

        axios.all(requestPromises).then((response)=>{
            var priceData =[]
            
            response.forEach((result)=>{
                let coinPrice = result.data['USD']
                let coinName = result.config['params']['fsym'];

                this.updatePrice(coinName, coinPrice)
            })
            return new Promise ((resolve) =>{
                this.updateBalances(this.updateTotalBalance);
                resolve();
            })
            
        })
    };
    updatePrice(coin, newPrice){
        var holdings = Portfolio.holdings;
        holdings[coin]['price'] = newPrice
    };
    // updatePortfolio(data) {
    //     var holdings = Portfolio.holdings
    //     let coin = data.coin;
    //     if(data['field'] === 'prices') {
    //         holdings[coin].price = data.price
    //     }
    //     return true
    // };
    updateBalances(cb) {
        var holdings = Portfolio.holdings;
        Object.keys(holdings).forEach(function(coin) {
            let amount = holdings[coin].amount;
            let price = holdings[coin].price;
            let balance = holdings[coin].balance;
            Portfolio.holdings[coin].balance = (amount * price)
        })
        cb()
    };
    updateTotalBalance(){
        var holdings = Portfolio.holdings;
        var sumTotal = 0;
        Object.keys(holdings).forEach(function(coin) {
            let balance = holdings[coin].balance;
            sumTotal += balance
        })
        Portfolio.totalBalance = sumTotal
        // console.log(Portfolio)        
    }

    eachCoin(callback) {
        var holdings = Portfolio.holdings;
        Object.keys(holdings).forEach(function(coin){
            callback.call(coin)
        })
    };
    createRequestList(coinList){
        var promiseArr = [];
        coinList.forEach((coin)=>{
            let config = {
                'fsym': '',
                'tsyms': 'USD'                
            }
            config['fsym'] = coin
            let tempFunc = ()=>{
                return this.request(config)
            }
            promiseArr.push(tempFunc())
        })
        return promiseArr;
    };
    printSpreadSheet(){
        var spreadsheet = new Spreadsheet(Portfolio);
        spreadsheet.inputData();
    };
};



