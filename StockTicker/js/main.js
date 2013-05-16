/// <reference path="../Scripts/jquery-2.0.0-vsdoc.js" />
/// <reference path="../Scripts/knockout-2.2.1.js" />
/// <reference path="data.js" />
/// <reference path="../Scripts/rx.js" />
/// <reference path="../Scripts/rx.aggregates.js" />
/// <reference path="../Scripts/rx.jquery.js" />
/// <reference path="../Scripts/rx.time.js" />


$(document).ready(function () {
    var numStocks = 4;
    var comp1 = new GetStockTicks(numStocks);
    var changes = new Array(numStocks);

    //Setup the VM
    function MyViewModel() {
        var self = this;
        self.stocks = ko.observableArray(comp1)
        self.changes = ko.observableArray(changes);
    }

    //must apply this before we grab the table rows 
    ko.applyBindings(new MyViewModel());

    //Row 0 is the header ignore this
    var rows = $('#stockTable tr');
    $.each(comp1, function (index) {

        this.Change.subscribe(function (value) {
            //add 1  to the index to offset the header row
            //children[2] addresses the change column
            
            var thisRow = rows[index + 1];
            var thisCol = thisRow.children[2];

            //Check the content of this array item and 
            //determine what to color it
            if (thisCol.textContent >= 0) {
                thisCol.bgColor = "green";
            }
            else {
                thisCol.bgColor = "red";
            }

        });
    });


});

