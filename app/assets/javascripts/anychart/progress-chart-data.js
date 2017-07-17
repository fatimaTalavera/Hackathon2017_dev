/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */
function oldInstituteChanged() {
    var e = document.getElementById("institute");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;

    var nivel = value.substring(0, value.indexOf(' '));
    var entidad = value.substring(value.indexOf(' '), value.lenght);
    var year  = pgn_years[0][0];

    $.ajax({
        method: "POST",
        url: "search/progress",
        data: {"nivelid" :nivel, "entidadid" :entidad, "year" :year  }
    })
        .done(function( msg ) {
            $('#remove-this').remove();



            //self.prop('disabled', false);
            data = [
                ['ENE', msg[0][1], msg[0][2],0],
                ['FEB', msg[1][1], msg[1][2],0],
                ['MAR', msg[2][1], msg[2][2],0],
                ['ABR', msg[3][1], msg[3][2],0] ];
            progress_start(data);
        });
}


anychart.onDocumentReady(function() {
    var dataSet;
    var year  = pgn_years[0][0];
    $.ajax({
        method: "POST",
        url: "search/progress",
        data: {"year" :year}
    })
        .done(function( msg ) {
            console.log(msg);
            //self.prop('disabled', false);

            progress_start(msg);
        });


});
function progress_start(msg){
    var months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    data = [];

    // create data set on our data
    //var dataSet = anychart.data.set(getData());
    dataSet = anychart.data.set(data);
    for(i = 0; i< msg[0].length; i++){
        dataSet.append( [months[i], msg[0][i][1], msg[0][i][2],msg[1][i][1]]);
    }
    // map data for the first series, take x from the zero column and value from the first column of data set
    var seriesData_1 = dataSet.mapAs({x: [0], value: [1]});

    // map data for the second series, take x from the zero column and value from the second column of data set
    var seriesData_2 = dataSet.mapAs({x: [0], value: [2]});

    // map data for the second series, take x from the zero column and value from the second column of data set
    var seriesData_3 = dataSet.mapAs({x: [0], value: [3]});

    // create line chart
    line_chart = anychart.line();

    // adding dollar symbols to yAxis labels
    line_chart.yAxis().labels().format('{%Value} Gs.');

    // turn on chart animation
    line_chart.animation(true);

    // turn on the crosshair
    line_chart.crosshair()
        .enabled(true)
        .yLabel({'enabled': false})
        .yStroke(null)
        .xStroke('#cecece')
        .zIndex(99);

    line_chart.yAxis()
        .title('Monto en guaranies')
        .labels({'padding': [5, 5, 0, 5]});
    //line_chart.xAxis().title('Month/Day');

    // set chart title text settings
    //chart.title('The cost of ACME\'s shares\ncompared with their main competitor during month');
    //chart.title().padding([0, 0, 10, 0]);

    // create first series with mapped data
    var series_1 = line_chart.spline(seriesData_1);
    series_1.name("Planificado vigente");
    series_1.hoverMarkers()
        .enabled(true)
        .type('circle')
        .size(4);
    series_1.markers().zIndex(100);

    // create second series with mapped data
    var series_2 = line_chart.spline(seriesData_2);
    series_2.name('Transferido');
    series_2.hoverMarkers()
        .enabled(true)
        .type('circle')
        .size(4);
    series_2.markers().zIndex(100);

    // create second series with mapped data
    var series_3 = line_chart.spline(seriesData_3);
    series_3.name('Avance');
    series_3.hoverMarkers()
        .enabled(true)
        .type('circle')
        .size(4);
    series_3.markers().zIndex(100);

    // turn the legend on
    line_chart.legend()
        .enabled(true)
        .fontSize(13)
        .padding([0, 0, 20, 0]);

    // set container id for the chart
    line_chart.container('progress-chart');

    // create new select
    var triggerYearProgressSelect = document.createElement("select");
    var triggerInstituteProgressSelect = document.createElement("select");

    // set selects class and onchange function
    triggerYearProgressSelect.className = "triggerSelect";
    triggerYearProgressSelect.id = "yearSelectProgress";
    triggerYearProgressSelect.onchange = function() {
        instituteChanged();
    };
    triggerInstituteProgressSelect.className = "triggerSelect";
    triggerInstituteProgressSelect.id = "instituteSelectProgress";
    triggerInstituteProgressSelect.onchange = function() {
        instituteChanged();
    };

    //set selects options
    for (var i = 0; i < pgn_years.length; i++) {
        var option = document.createElement("option");
        option.value = pgn_years[i];
        option.text = "Año "+ pgn_years[i];
        triggerYearProgressSelect.appendChild(option);
    }

    for (var i = 0; i < inst_count; i++) {
        var option = document.createElement("option");
        option.value = inst_nivelid[i]+' '+inst_entidadid[i];
        option.text = inst_nombre[i];
        triggerInstituteProgressSelect.appendChild(option);
    }


    // append select to container
    $('#divForYearSelectProgress').append(triggerYearProgressSelect);
    $('#divForInstituteSelectProgress').append(triggerInstituteProgressSelect);

    $(".triggerSelect").select2({ width: '100%', language: "select2-es"});

    $( "#item-progress" ).click(function() {
        line_chart.draw();
    });

    function instituteChanged(e) {

        var element = document.getElementById("instituteSelectProgress");
        var value = element.options[element.selectedIndex].value;
        var text = element.options[element.selectedIndex].text;
        var nivel = value.substring(0, value.indexOf(' '));
        var entidad = value.substring(value.indexOf(' '), value.lenght);
        var year  = pgn_years[0][0];

        // append data
       // for (i = 0; i < 17; i++) {
        //    dataSet.remove(0);
        //}
        $.ajax({
            method: "POST",
            url: "search/progress",
            data: {"nivelid" :nivel, "entidadid" :entidad, "year" :year  }
        })
            .done(function( msg ) {
                length = (dataSet['b'].length);
                for (i = 0; i < length; i++) {
                    dataSet.remove(0);
                }

                // create data set on our data
                //var dataSet = anychart.data.set(getData());

                //var current_data = msg[0];
                //var current_advance = msg[1];
                for(i = 0; i< msg[0].length; i++){
                   dataSet.append( [months[i], msg[0][i][1], msg[0][i][2],msg[1][i][1]]);
                }
            });
    }
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