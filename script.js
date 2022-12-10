let parsed = [];
let chartdata = [];
const that = "<b><a href=\"https://gml.noaa.gov/aftp/data/trace_gases/co2/flask/surface/txt/co2_mlo_surface-flask_1_ccgg_month.txt\">this</a></b>"
$.ajax({
  url: "data.txt",
  success: function (data) {
    const lists = data.split("\n");
    let fragment = [];
    lists.forEach((element) => {
      if (element[0] !== "#") {
        fragment.push(element.split("\r")[0].split(" "));
      }
    });
    fragment.forEach((element) => {
      let i = element.length;
      while (i--) {
        if (element[i] === "") {
          element.splice(i, 1);
        }
      }
      parsed.push(element.slice(1, 4));
    });
    parsed.forEach((element) => {
      chartdata.push([Number(new Date(`${element[0]}-${element[1]}`).getTime()),Number(element[2])]);
    });

    console.log(chartdata)
    Highcharts.stockChart("container", {
        rangeSelector: {
          selected: 1,
        },
      
        title: {
          text: "Global Atmoshperic Carbon Dioxide (CO2) according to "+that,
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