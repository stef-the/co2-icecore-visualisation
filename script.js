Highcharts.getJSON('data.json', function (data) {
    // Create the chart
    Highcharts.stockChart('container', {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Global Atmoshperic Carbon Dioxide (CO2)'
        },

        series: [{
            name: 'CO2',
            data: data,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});
