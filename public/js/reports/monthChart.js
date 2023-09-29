/* global Chart:false */

$(function () {
   'use strict'

   var ticksStyle = {
      fontColor: '#f000000', // '#495057',
      fontStyle: 'bold'
   }

   var mode = 'index'
   var intersect = true


   //kurso all
   $.post("/api/bycourse",{
      "type": "m"
   }, function (data) {
      //console.log(data[0])
      var kurso = data[0];
      var cnt = data[1];


      let sum = 0;
      for (let i = 0; i < cnt.length; i++) {
         sum += cnt[i];
      }
      var hcnt = $('#pcnt')
      hcnt.empty().text(sum);
      //$('#pcnt1').empty().text(sum)
      //$('#pcnt1a').empty().text(sum)


      var $visitorsChart = $('#visitors-chart')
      // eslint-disable-next-line no-unused-vars
      var visitorsChart = new Chart($visitorsChart, {
         data: {
            labels: kurso,
            //labels: ['JAN', 'FEB', 'MCH', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
                  type: 'line',
                  //data: [10, 120, 170, 167, 180, 177, 160],
                  data: cnt,
                  backgroundColor: 'transparent',
                  borderColor: '#007bff',
                  pointBorderColor: '#007bff',
                  pointBackgroundColor: '#007bff',
                  fill: false
                  // pointHoverBackgroundColor: '#007bff',
                  // pointHoverBorderColor    : '#007bff'
               },
               /*
                                {
                                   type: 'line',
                                   data: [60, 80, 70, 67, 80, 77, 100],
                                   backgroundColor: 'tansparent',
                                   borderColor: '#ced4da',
                                   pointBorderColor: '#ced4da',
                                   pointBackgroundColor: '#ced4da',
                                   fill: false
                                   // pointHoverBackgroundColor: '#ced4da',
                                   // pointHoverBorderColor    : '#ced4da'
                                }
                                */
            ]
         },
         options: {
            maintainAspectRatio: false,
            tooltips: {
               mode: mode,
               intersect: intersect
            },
            hover: {
               mode: mode,
               intersect: intersect
            },
            legend: {
               display: false
            },
            scales: {
               yAxes: [{
                  // display: false,
                  gridLines: {
                     display: true,
                     lineWidth: '4px',
                     color: 'rgba(0, 0, 0, .2)',
                     zeroLineColor: 'transparent'
                  },
                  ticks: $.extend({
                     beginAtZero: true,
                     suggestedMax: 10
                  }, ticksStyle)
               }],
               xAxes: [{
                  display: true,
                  gridLines: {
                     display: false
                  },
                  ticks: ticksStyle
               }]
            }
         }
      })


   })


   // General Circulation
   $.post("/api/bySection", {
      type: "m",
      section: ""
   }, function (data) {
      //console.log(data)

      var kurso = data[0];
      var cnt = data[1];


      let sum = 0;
      for (let i = 0; i < cnt.length; i++) {
         sum += cnt[i];
      }
      //var hcnt  = $('#pcnt')
      //hcnt.empty().text(sum);
      //$('#pcnt1').empty().text(sum)
      $('#pcnt1a').empty().text(sum)


      var $salesChart = $('#sales-chart1')
      // eslint-disable-next-line no-unused-vars
      var salesChart = new Chart($salesChart, {
         type: 'bar',
         data: {
            labels: kurso,
            //labels: ['JAN','FEB','MCH','APR','MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
                  backgroundColor: '#007bff',
                  borderColor: '#007bff',
                  data: cnt //[100, 2000, 3000, 2500, 2700, 2500, 3000]
               },
               /*
                                 {
                                    backgroundColor: '#ced4da',
                                    borderColor: '#ced4da',
                                    data: [70, 1700, 2700, 2000, 1800, 1500, 2000]
                                 }
                                 */
            ]
         },
         options: {
            maintainAspectRatio: false,
            tooltips: {
               mode: mode,
               intersect: intersect
            },
            hover: {
               mode: mode,
               intersect: intersect
            },
            legend: {
               display: false
            },
            scales: {
               yAxes: [{
                  // display: false,
                  gridLines: {
                     display: true,
                     lineWidth: '5px',
                     color: 'rgba(0, 0, 0, .2)',
                     zeroLineColor: 'transparent'
                  },
                  ticks: $.extend({
                     beginAtZero: true,

                     // Include a dollar sign in the ticks
                     callback: function (value) {
                        if (value >= 1000) {
                           value /= 1000
                           value += 'k'
                        }

                        //return '$' + value
                        return value
                     }
                  }, ticksStyle)
               }],
               xAxes: [{
                  display: true,
                  gridLines: {
                     display: false
                  },
                  ticks: ticksStyle
               }]
            }
         }
      })


   })

   //Learning commons
   $.post("/api/bySection", {
      type: "m",
      section: ""
   }, function (data) {
      //console.log(data)

      var kurso = data[0];
      var cnt = data[1];


      let sum = 0;
      for (let i = 0; i < cnt.length; i++) {
         sum += cnt[i];
      }
      //var hcnt  = $('#pcnt')
      //hcnt.empty().text(sum);
      $('#pcnt1').empty().text(sum)
      //$('#pcnt1a').empty().text(sum)


      var $salesChart = $('#sales-chart')
      // eslint-disable-next-line no-unused-vars
      var salesChart = new Chart($salesChart, {
         type: 'bar',
         data: {
            labels: kurso,
            //labels: ['JAN','FEB','MCH','APR','MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
                  backgroundColor: '#007bff',
                  borderColor: '#007bff',
                  data: cnt //[100, 2000, 3000, 2500, 2700, 2500, 3000]
               },
               /*
                                 {
                                    backgroundColor: '#ced4da',
                                    borderColor: '#ced4da',
                                    data: [70, 1700, 2700, 2000, 1800, 1500, 2000]
                                 }
                                 */
            ]
         },
         options: {
            maintainAspectRatio: false,
            tooltips: {
               mode: mode,
               intersect: intersect
            },
            hover: {
               mode: mode,
               intersect: intersect
            },
            legend: {
               display: false
            },
            scales: {
               yAxes: [{
                  // display: false,
                  gridLines: {
                     display: true,
                     lineWidth: '5px',
                     color: 'rgba(0, 0, 0, .2)',
                     zeroLineColor: 'transparent'
                  },
                  ticks: $.extend({
                     beginAtZero: true,

                     // Include a dollar sign in the ticks
                     callback: function (value) {
                        if (value >= 1000) {
                           value /= 1000
                           value += 'k'
                        }

                        //return '$' + value
                        return value
                     }
                  }, ticksStyle)
               }],
               xAxes: [{
                  display: true,
                  gridLines: {
                     display: false
                  },
                  ticks: ticksStyle
               }]
            }
         }
      })


   })

   //Gender all 

   $.post("/api/byGenderAll", {
      section: "",
      type: "m"
   }, function (data) {
      //console.log(data[0])

      var labels = data[0].map(item => item.gender);
      var cnt = data[0].map(item => item.cnt);

      // Get context with jQuery - using jQuery's .get() method.
      var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
      var donutData0 = {
         labels: labels, //['Male','Female'],
         datasets: [{
            data: cnt, //[900, 500],
            backgroundColor: ['#38e2eb', '#ed4ae0', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
         }]
      }
      var donutOptions = {
         maintainAspectRatio: false,
         responsive: true,
      }
      //Create pie or douhnut chart
      // You can switch between pie and douhnut using the method below.
      new Chart(donutChartCanvas, {
         type: 'doughnut',
         data: donutData0,
         options: donutOptions
      })

   })



   //User Class

   $.post("/api/byUsertype", {
      section: ""
   }, function (data) {
      //console.log(data[0])

      var labels = data[0].map(item => item.uclass);
      var cnt = data[0].map(item => item.cnt);

     // console.log(labels)
     // console.log(cnt)


      var donutData = {
         labels: labels,
         datasets: [{
            //data: [900,500,400,600,300,100],
            data: cnt, //[40, 60],
            backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
         }]
      }


     //-------------
      //- PIE CHART -
      //-------------
      // Get context with jQuery - using jQuery's .get() method.
      var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
      var pieData = donutData;
      var pieOptions = {
         maintainAspectRatio: false,
         responsive: true,
      }
      //Create pie or douhnut chart
      // You can switch between pie and douhnut using the method below.
      new Chart(pieChartCanvas, {
         type: 'pie',
         data: pieData,
         options: pieOptions
      })
      

   })


   //gender by course 

   $.post("/api/genderbyCourse",  function(data){
      //console.log(data[0])

      const degreeCourses = data[0].map(item => item.Degree_Course);
      const maleCounts = data[0].map(item => item.male_cnt);
      const femaleCounts = data[0].map(item => item.female_cnt);

      const sum = maleCounts .reduce((acc, currentValue) => acc + currentValue, 0);
      const sumf = femaleCounts .reduce((acc, currentValue) => acc + currentValue, 0);
      console.log([sum, sumf])

      var areaChartData = {
         labels: degreeCourses,// ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'Auguts', 'September', 'October', 'November', 'December'],
         datasets: [{
               label: 'Male ['+ sum +']',
               backgroundColor: 'rgba(60,141,188,0.9)',
               borderColor: 'rgba(60,141,188,0.8)',
               pointRadius: false,
               pointColor: '#3b8bba',
               pointStrokeColor: 'rgba(60,141,188,1)',
               pointHighlightFill: '#fff',
               pointHighlightStroke: 'rgba(60,141,188,1)',
               data: maleCounts, //[28, 48, 40, 19, 86, 27, 90]
            },
            {
               label: 'Female ['+ sumf +']',
               backgroundColor: 'rgba(210, 214, 222, 1)',
               borderColor: 'rgba(210, 214, 222, 1)',
               pointRadius: false,
               pointColor: 'rgba(210, 214, 222, 1)',
               pointStrokeColor: '#c1c7d1',
               pointHighlightFill: '#fff',
               pointHighlightStroke: 'rgba(220,220,220,1)',
               data: femaleCounts,// [65, 59, 80, 81, 56, 55, 40]
            },
         ]
      }

      //-------------
      //- BAR CHART -
      //-------------
      var barChartCanvas = $('#barChart').get(0).getContext('2d')
      var barChartData = $.extend(true, {}, areaChartData)
      var temp0 = areaChartData.datasets[0]
      var temp1 = areaChartData.datasets[1]
      barChartData.datasets[0] = temp1
      barChartData.datasets[1] = temp0

      var barChartOptions = {
         responsive              : true,
         maintainAspectRatio     : false,
         datasetFill             : false
      }

      new Chart(barChartCanvas, {
         type: 'bar',
         data: barChartData,
         options: barChartOptions
      })
   })



   $.post("/api/genderbySection",{
      section: ''
   },  function(data){
      //console.log(data[0])

      const degreeCourses = data[0].map(item => item.Degree_Course);
      const maleCounts = data[0].map(item => item.male_cnt);
      const femaleCounts = data[0].map(item => item.female_cnt);

      const sum = maleCounts .reduce((acc, currentValue) => acc + currentValue, 0);
      const sumf = femaleCounts .reduce((acc, currentValue) => acc + currentValue, 0);
      var ssum = sum + sumf;

      var areaChartData = {
         labels: degreeCourses,// ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'Auguts', 'September', 'October', 'November', 'December'],
         datasets: [{
               label: 'Male ['+ sum +']   Total of ' + ssum,
               backgroundColor: 'rgba(60,141,188,0.9)',
               borderColor: 'rgba(60,141,188,0.8)',
               pointRadius: false,
               pointColor: '#3b8bba',
               pointStrokeColor: 'rgba(60,141,188,1)',
               pointHighlightFill: '#fff',
               pointHighlightStroke: 'rgba(60,141,188,1)',
               data: maleCounts, //[28, 48, 40, 19, 86, 27, 90]
            },
            {
               label: 'Female ['+ sumf +']',
               backgroundColor: 'rgba(210, 214, 222, 1)',
               borderColor: 'rgba(210, 214, 222, 1)',
               pointRadius: false,
               pointColor: 'rgba(210, 214, 222, 1)',
               pointStrokeColor: '#c1c7d1',
               pointHighlightFill: '#fff',
               pointHighlightStroke: 'rgba(220,220,220,1)',
               data: femaleCounts,// [65, 59, 80, 81, 56, 55, 40]
            },
         ]
      }

      //-------------
      //- BAR CHART -
      //-------------
      var barChartCanvas = $('#barChart1').get(0).getContext('2d')
      var barChartData = $.extend(true, {}, areaChartData)
      var temp0 = areaChartData.datasets[0]
      var temp1 = areaChartData.datasets[1]
      barChartData.datasets[0] = temp1
      barChartData.datasets[1] = temp0

      var barChartOptions = {
         responsive              : true,
         maintainAspectRatio     : false,
         datasetFill             : false
      }

      new Chart(barChartCanvas, {
         type: 'bar',
         data: barChartData,
         options: barChartOptions
      })
   })

   $.post("/api/genderbySection",{
      section: ''
   },  function(data){
     // console.log(data[0])

      const degreeCourses = data[0].map(item => item.Degree_Course);
      const maleCounts = data[0].map(item => item.male_cnt);
      const femaleCounts = data[0].map(item => item.female_cnt);

      const sum = maleCounts .reduce((acc, currentValue) => acc + currentValue, 0);
      const sumf = femaleCounts .reduce((acc, currentValue) => acc + currentValue, 0);
      var ssum = sum + sumf;
      //console.log([sum, sumf])

      var areaChartData = {
         labels: degreeCourses,// ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'Auguts', 'September', 'October', 'November', 'December'],
         datasets: [{
               label: 'Male ['+ sum +']        Total of ' + ssum,
               backgroundColor: 'rgba(60,141,188,0.9)',
               borderColor: 'rgba(60,141,188,0.8)',
               pointRadius: false,
               pointColor: '#3b8bba',
               pointStrokeColor: 'rgba(60,141,188,1)',
               pointHighlightFill: '#fff',
               pointHighlightStroke: 'rgba(60,141,188,1)',
               data: maleCounts, //[28, 48, 40, 19, 86, 27, 90]
            },
            {
               label: 'Female ['+ sumf +']',
               backgroundColor: 'rgba(210, 214, 222, 1)',
               borderColor: 'rgba(210, 214, 222, 1)',
               pointRadius: false,
               pointColor: 'rgba(210, 214, 222, 1)',
               pointStrokeColor: '#c1c7d1',
               pointHighlightFill: '#fff',
               pointHighlightStroke: 'rgba(220,220,220,1)',
               data: femaleCounts,// [65, 59, 80, 81, 56, 55, 40]
            },
         ]
      }

      //-------------
      //- BAR CHART -
      //-------------
      var barChartCanvas = $('#barChart2').get(0).getContext('2d')
      var barChartData = $.extend(true, {}, areaChartData)
      var temp0 = areaChartData.datasets[0]
      var temp1 = areaChartData.datasets[1]
      barChartData.datasets[0] = temp1
      barChartData.datasets[1] = temp0

      var barChartOptions = {
         responsive              : true,
         maintainAspectRatio     : false,
         datasetFill             : false
      }

      new Chart(barChartCanvas, {
         type: 'bar',
         data: barChartData,
         options: barChartOptions
      })
   })



   


})