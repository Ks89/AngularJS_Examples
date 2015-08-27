angular.module('googleChartApp')
    .directive('pieChart', ['googleChartLoaderPromise',
        function (googleChartLoaderPromise) {

            var convertToPieChartDataTableFormat =
                function (firstColumnName, secondColumnName, data) {
                    var pieChartArray = [[firstColumnName, secondColumnName]];
                    for (var i = 0; i < data.length; i++) {
                        pieChartArray.push([data[i].label, data[i].value]);
                    }
                    return google.visualization.arrayToDataTable(
                        pieChartArray);
                };

            return {
                restrict: 'A',
                //we define a directive with an isolated scope that defines
                //the attributes that need to be passed to it
                scope: {
                    chartData: '=',
                    chartConfig: '='
                },
                link: function ($scope, $element) {
                    //we use the promise returned from the service and do our
                    //work in the success handler inside the then of the promise.
                    //This ensures that we don't try calling a chart api unless
                    //and until the charts api has successfully
                    //finished loading as per our service.
                    googleChartLoaderPromise.then(function () {
                        var chart = new google.visualization.PieChart(
                            $element[0]);

                        //we then add a watch on the chartData field on the scope
                        //and give it a function to call as the second arg, and the boolean true
                        //as third arg.
                        //this tells angularjs to do what we call a deep watch on $scope.chartData, and
                        //whenever it changes, call the function.
                        $scope.$watch('chartData', function (newVal, oldVal) {
                            var config = $scope.chartConfig;
                            if (newVal) {
                                chart.draw(
                                    convertToPieChartDataTableFormat(
                                        config.firstColumnHeader,
                                        config.secondColumnHeader,
                                        newVal),
                                    {title: $scope.chartConfig.title});
                            }
                        }, true);
                    });
                }
            };
        }]);