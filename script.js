let parsed = [];
let chartdata = [];
const that = "<b><a href=\"https://gml.noaa.gov/aftp/data/trace_gases/co2/flask/surface/txt/co2_mlo_surface-flask_1_ccgg_month.txt\">NOAA Mauna Loa Observatory</a></b>"
// Fetch chart data from 'data.txt', format it and draw chart
// Done in jQuery async using ajax
$.ajax({
  url: "data.txt",
  success: function (data) {
    // Split rows
    const lists = data.split("\n");
    let fragment = [];

    // Remove commented rows
    lists.forEach((element) => {
      if (element[0] !== "#") {
        fragment.push(element.split("\r")[0].split(" "));
      }
    });

    // Split columns
    fragment.forEach((element) => {
      let i = element.length;
      while (i--) {
        if (element[i] === "") {
          element.splice(i, 1);
        }
      }
      parsed.push(element.slice(1, 4));
    });

    // Convert date to Unix Timestamp and add data point
    parsed.forEach((element) => {
      chartdata.push([Number(new Date(`${element[0]}-${element[1]}`).getTime()), Number(element[2])]);
    });

    // Draw chart
    Highcharts.stockChart("container", {
        rangeSelector: {
          selected: 1,
        },
      
        title: {
          text: " Atmospheric Carbon Dioxide (CO2) "
        },
        subtitle: {
            text: "according to "+that,
          },
        series: [
          {
            name: "CO2",
            data: chartdata,
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      });
  },
});