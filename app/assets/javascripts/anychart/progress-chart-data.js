/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */
function instituteChanged() {
    var e = document.getElementById("institute");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;

    var nivel = value.substring(0, value.indexOf(' '));
    var entidad =value.substring(value.indexOf(' '), value.lenght);

    $.ajax({
        method: "POST",
        url: "search/progress",
        data: {"nivelid" :nivel, "entidadid" :entidad  }
    })
        .done(function( msg ) {
            $('#remove-this').remove();



            //self.prop('disabled', false);
            data = [
                ['ENE', msg[0][1], msg[0][2],0],
                ['FEB', msg[1][1], msg[1][2],0],
                ['MAR', msg[2][1], msg[2][2],0],
                ['ABR', msg[3][1], msg[3][2],0] ];
            chargeSelect(data);
        });
}


anychart.onDocumentReady(function() {
    var dataSet;
    $.ajax({
        method: "POST",
        url: "search/progress",
        data: {}
    })
        .done(function( msg ) {
            console.log(msg);
            //self.prop('disabled', false);
            data = [
                ['ENE', msg[0][0][1], msg[0][0][2],msg[1][0][1]],
                ['FEB', msg[0][1][1], msg[0][1][2],msg[1][0][1]],
                ['MAR', msg[0][2][1], msg[0][2][2],msg[1][0][1]],
                ['ABR', msg[0][3][1], msg[0][3][2],msg[1][0][1]] ];
            chargeSelect(data);
        });




});
function chargeSelect(data){
    // create data set on our data
    //var dataSet = anychart.data.set(getData());
    dataSet = anychart.data.set(data);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var seriesData_1 = dataSet.mapAs({x: [0], value: [1]});

    // map data for the second series, take x from the zero column and value from the second column of data set
    var seriesData_2 = dataSet.mapAs({x: [0], value: [2]});

    // map data for the second series, take x from the zero column and value from the second column of data set
    var seriesData_3 = dataSet.mapAs({x: [0], value: [3]});

    // create line chart
    chart = anychart.line();

    // adding dollar symbols to yAxis labels
    chart.yAxis().labels().format('{%Value} Gs.');

    // turn on chart animation
    chart.animation(true);

    // turn on the crosshair
    chart.crosshair()
        .enabled(true)
        .yLabel({'enabled': false})
        .yStroke(null)
        .xStroke('#cecece')
        .zIndex(99);

    chart.yAxis()
        .title('Monto en guaranies')
        .labels({'padding': [5, 5, 0, 5]});
    //chart.xAxis().title('Month/Day');

    // set chart title text settings
    //chart.title('The cost of ACME\'s shares\ncompared with their main competitor during month');
    //chart.title().padding([0, 0, 10, 0]);

    // create first series with mapped data
    var series_1 = chart.spline(seriesData_1);
    series_1.name("Planificado vigente");
    series_1.hoverMarkers()
        .enabled(true)
        .type('circle')
        .size(4);
    series_1.markers().zIndex(100);

    // create second series with mapped data
    var series_2 = chart.spline(seriesData_2);
    series_2.name('Transferido');
    series_2.hoverMarkers()
        .enabled(true)
        .type('circle')
        .size(4);
    series_2.markers().zIndex(100);

    // create second series with mapped data
    var series_3 = chart.spline(seriesData_3);
    series_3.name('Avance');
    series_3.hoverMarkers()
        .enabled(true)
        .type('circle')
        .size(4);
    series_3.markers().zIndex(100);

    // turn the legend on
    chart.legend()
        .enabled(true)
        .fontSize(13)
        .padding([0, 0, 20, 0]);

    // set container id for the chart
    chart.container('progress-chart');

    $( "#item-progress" ).click(function() {
        chart.draw();
    });
}
function getData() {
    return [
        ['ENE', 10, 30, 15],
        ['FEB', 12, 32, 23],
        ['MAR', 11, 35, 12],
        ['ABR', 15, 40, 6],
        ['MAY', 20, 42, 89],
        ['JUN', 22, 35, 78],
        ['JUL', 0, 0, 0],
        ['AGO', 0, 0, 0],
        ['SEP', 0, 0, 0],
        ['OCT', 0, 0, 0],
        ['NOV', 0, 0, 0],
        ['DIC', 0, 0, 0],
    ]
}