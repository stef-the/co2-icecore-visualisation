$.ajax({
  url: "data.txt",
  success: function (data) {
    const lists = data.split("\n");
    let fragment = [];
    let parsed = [];
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
      parsed.push(element)
    });
    console.log(parsed);
  },
});

Highcharts.getJSON("data.json", function (data) {
  // Create the chart
  Highcharts.stockChart("container", {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: "Global Atmoshperic Carbon Dioxide (CO2)",
    },

    series: [
      {
        name: "CO2",
        data: data,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  });
});
