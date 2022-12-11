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
            name: "MLO CO2",
            id: "mlo_co2",
            data: chartdata,
            tooltip: {
              valueDecimals: 2,
            },
          },
          {
            type : 'flags',
            data : [{
                x : 1478217600,      // Point where the flag appears
                title : 'Paris Agreement', // Title of flag displayed on the chart 
                text : 'Paris Agreement Enforced'   // Text displayed when the flag are highlighted.
            },
            {
                x : 1588291200,      // Point where the flag appears
                title : 'Covid Lockdown', // Title of flag displayed on the chart 
                text : 'Covid Lockdowns Enforced'   // Text displayed when the flag are highlighted.
            }],
            onSeries : 'mlo_co2',  // Id of which series it should be placed on. If not defined 
                            // the flag series will be put on the X axis
            shape : 'flag'  // Defines the shape of the flags.
        }
        ],
      });
  },
});