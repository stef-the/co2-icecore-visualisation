const datasets = {
  general: "merged_ice_core_yearly.csv",
  precise: "spline_merged_ice_core_yearly.csv",
};

$.ajax({
  url: "./data/" + datasets.precise,
  success: function (data) {
    const data_iteration_1 = data.split('"');

    // Remove commented sections from dataset
    let i = data_iteration_1.length;
    while (i--) (i + 1) % 2 === 0 && data_iteration_1.splice(i, 1);

    // Remove newlines left behind by commented sections
    let data_iteration_2 = [];
    data_iteration_1.forEach((element) => {
      if (element !== "" && element !== "\n") {
        data_iteration_2.push(element);
      }
    });

    // Split remaining string in data_iteration_2
    // into a list (data_iteration_3)
    const data_iteration_3 = data_iteration_2[0].split("\n");

    // Convert data_iteration_3 (a long string)
    // into data_iteration_4, a list of lists
    let data_iteration_4 = [];
    let data_iterator = [];
    data_iteration_3.forEach((element) => {
      element.split(",").forEach((part) => {
        if (part !== "") {
          data_iterator.push(part);
        }
      });
      data_iteration_4.push(data_iterator);
      data_iterator = [];
    });

    // convert decimal year in each list within
    // data_iteration_4 to a Date element
    let data_iteration_5 = [];
    data_iteration_4.forEach((element) => {
      var totalDays = eval(element[0]) * 365;
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays - years * 365) / 30);
      const days = Math.floor(totalDays - years * 365 - months * 30);
      const result = new Date(`${years}-${months}-${days}`)
      result.setUTCFullYear(years)
      result.setUTCMonth(months)
      data_iteration_5.push([Number(result), Number(element[1])])
    });

    let data_iteration_6 = data_iteration_5;
    data_iteration_6.shift();
    data_iteration_6.pop();

    console.log(data_iteration_6)


    Highcharts.stockChart("container1", {
      rangeSelector: {
        selected: 1,
      },

      title: {
        text: " Atmospheric Carbon Dioxide (CO2) ",
      },
      subtitle: {
        text: "according to " + that,
      },
      series: [
        {
          name: "MLO CO2",
          id: "mlo_co2",
          data: data_iteration_6,
          tooltip: {
            valueDecimals: 2,
          },
        },
        {
          type: "flags",
          data: [
            {
              x: 1478217600000, // 1478217600000 or 2016-11-04 20:00:00 or Fri, 04 Nov 2016 00:00:00 +0000 Point where the flag appears
              title: "Paris Agreement", // Title of flag displayed on the chart
              text: "Paris Agreement Enforced", // Text displayed when the flag are highlighted.
            },
            {
              x: 1588291200000, // Fri, 01 May 2020 00:00:00 +0000 Point where the flag appears
              title: "Covid Lockdown", // Title of flag displayed on the chart
              text: "Covid Lockdowns Enforced", // Text displayed when the flag are highlighted.
            },
          ],
          onSeries: "mlo_co2", // Id of which series it should be placed on. If not defined
          // the flag series will be put on the X axis
          shape: "flag", // Defines the shape of the flags.
        },
      ],
    });
  },
});
