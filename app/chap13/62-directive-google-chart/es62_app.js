angular.module('googleChartApp', [])
    .controller('MainCtrl', [function () {
        var self = this;
        self.pieChartData = [
            {label: 'First', value: 25},
            {label: 'Second', value: 54},
            {label: 'Third', value: 75}
        ];

        self.pieChartConfig = {
            title: 'One Two Three Chart',
            firstColumnHeader: 'Counter',
            secondColumnHeader: 'Actual Value'
        };

        //function that changes the value of one element of the data
        //to see if the pie chart updates itself automatically as a result
        self.changeData = function () {
            self.pieChartData[1].value = 25;
        }
    }]);
