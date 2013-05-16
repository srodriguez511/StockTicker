/// <reference path="../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../Scripts/rx.jquery.js" />
/// <reference path="../Scripts/rx.js" />
/// <reference path="../Scripts/rx.aggregates.js" />
/// <reference path="../Scripts/rx.jquery.js" />
/// <reference path="../Scripts/rx.time.js" />


function GetStockTicks(numTicks) {
    //Create fake stock prices
    function generateStockPrice() {
        return Math.random().toFixed(3);
    }

    //Create fake stock tickers
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < 3; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
   
    //Generate random stock prices forever
    var obs = Rx.Observable.generateWithRelativeTime(
	    0, 				// Initial State
	    function (x) {  // Condition
	        return true;
	    },
	    function (x) {	// Iterate.. Don't really care about this
	        return x + 1;
	    },
	    function (x) {	// Result Selector - Generate a new stock price
	        return generateStockPrice();
	    },
        function (x) {
            return 1000; /*ms*/
        });

    //Generate a random initial stock tick
    function GenerateStockTick() {
        function StockTick(Tick, Price) {
            this.Tick = ko.observable(Tick);
            this.Price = ko.observable(Price);
            this.Change = ko.observable(0);
        };
        
        //Create a new stock with an initial price
        var stock = new StockTick(makeid(), generateStockPrice());

        //Subscribe to the stock generator
        obs.subscribe(function (n) {
            var temp = (n - stock.Price()).toFixed(3);
            stock.Price(n);
            stock.Change(temp);
        });

        return stock;
    };

    //Array of stocks
    var stocks = new Array();
    for (var i = 0; i < numTicks; i++) {
        stocks[i] = GenerateStockTick();
    }

    return stocks;
};







