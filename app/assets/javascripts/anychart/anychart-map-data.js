/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */

anychart.onDocumentReady(function() {
    map = anychart.map();
    var data = {};
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"year" : pgn_years[0][0], "month" :pgn_months[0][0], "q" : "department_heat_map"}
    })
        .done(function( msg ) {
            //self.prop('disabled', false);
            map_start(map,msg);
            $('#modal2-portfolio-link').removeClass('not-active');
            $('#modal2-overlay').hide();
        });
    $( "#item-map" ).click(function() {
        //initiate map drawing
        map.draw();
    });
});

function format_currency (number) {
    return 'Gs. ' + parseFloat(number).toFixed(0).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
};


function map_start (map,data) {
    // create map
    // create data set
    // value = pagado
    var dataSet = anychart.data.set([
        {'id': 'PY.AS', 'value': data[0][6]*data[0][2]/100, 'data': data[0]},
        {'id': 'PY.AG', 'value': data[1][6]*data[1][2]/100, 'data': data[1]},
        {'id': 'PY.BQ', 'value': data[2][6]*data[2][2]/100, 'data': data[2]},
        {'id': 'PY.CN', 'value': data[3][6]*data[3][2]/100, 'data': data[3]},
        {'id': 'PY.CR', 'value': data[4][6]*data[4][2]/100, 'data': data[4]},
        {'id': 'PY.PH', 'value': data[5][6]*data[5][2]/100, 'data': data[5]},
        {'id': 'PY.SP', 'value': data[6][6]*data[6][2]/100, 'data': data[6]},
        {'id': 'PY.CE', 'value': data[7][6]*data[7][2]/100, 'data': data[7]},
        {'id': 'PY.GU', 'value': data[8][6]*data[8][2]/100, 'data': data[8]},
        {'id': 'PY.MI', 'value': data[9][6]*data[9][2]/100, 'data': data[9]},
        {'id': 'PY.NE', 'value': data[10][6]*data[10][2]/100,'data': data[10]},
        {'id': 'PY.PG', 'value': data[11][6]*data[11][2]/100,'data': data[11]},
        {'id': 'PY.AM', 'value': data[12][6]*data[12][2]/100,'data': data[12]},
        {'id': 'PY.AA', 'value': data[13][6]*data[13][2]/100,'data': data[13]},
        {'id': 'PY.CG', 'value': data[14][6]*data[14][2]/100,'data': data[14]},
        {'id': 'PY.CZ', 'value': data[15][6]*data[15][2]/100,'data': data[15]},
        {'id': 'PY.CY', 'value': data[16][6]*data[16][2]/100,'data': data[16]},
        {'id': 'PY.IT', 'value': data[17][6]*data[17][2]/100,'data': data[17]},
    ]);

    // create choropleth series
    series = map.choropleth(dataSet);

    //enable the tooltips and format them at once
    series.tooltip().format(function(e){
        return "Presupuesto aprobado: " + format_currency(e.getData('data')[1]) +"\n"+
            "Presupuesto vigente: " + format_currency(e.getData('data')[2]) +"\n"+
            "Monto planificado: " + format_currency(e.getData('data')[3]) +"\n"+
            "Monto ejecutado: " + format_currency(e.getData('data')[4]) +"\n"+
            "Monto transferido: " + format_currency(e.getData('data')[5]) +"\n"+
            "Monto abonado: " + format_currency(e.getData('data')[6]);
    });

    // set map color settings
    series.colorScale(anychart.scales.linearColor('#c6eeef', '#1a9da3'));
    series.hoverFill('#addd8e');

    // disable series labels
    series.labels(false);

    // set geo data, you can find this map in our geo maps collection
    // https://cdn.anychart.com/#maps-collection
    chart = anychart.maps['paraguay'];
    map.geoData(chart);



    // create new select
    var triggerMonthSelect = document.createElement("select");
    var triggerYearSelect = document.createElement("select");


    // set selects class and onchange function
    triggerMonthSelect.className = "triggerSelect";
    triggerMonthSelect.id = "monthSelectHeatMap";
    triggerMonthSelect.onchange = function() {
        updateHeatMap();
    };
    triggerYearSelect.className = "triggerSelect";
    triggerYearSelect.id = "yearSelectHeatMap";
    triggerYearSelect.onchange = function() {
        updateHeatMap();
    };

    //set selects options
    for (var i = 0; i < pgn_years.length; i++) {
        var option = document.createElement("option");
        option.value = pgn_years[i];
        option.text = "Año "+ pgn_years;
        triggerYearSelect.appendChild(option);
    }
    var months_value = ['','Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    //Create and append the options
    for (var i = 0; i < pgn_months.length; i++) {
        var option = document.createElement("option");
        option.value = pgn_months[i][0];
        option.text = months_value[pgn_months[i][0]];
        triggerMonthSelect.appendChild(option);
    }


    // append select to container
    $('#divForYearSelect').append(triggerYearSelect);
    $('#divForMonthSelect').append(triggerMonthSelect);

    $("#monthSelectHeatMap").select2({ width: '100%', language: "select2-es"});
    $("#yearSelectHeatMap").select2({ width: '100%', language: "select2-es"});

    //set map container id (div)
    map.container('heat-map');
    // function, if listener triggers


    function updateHeatMap(e) {
        // append data
        for (i = 0; i < 17; i++) {
            dataSet.remove(0);
        }
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {"month" : triggerMonthSelect.value, "year" : triggerYearSelect.value, "q" : "department_heat_map" }
        })
            .done(function( data ) {
                dataSet.append(
                    {'id': 'PY.AS', 'value': data[0][6]*data[0][2]/100, 'data': data[0]},
                    {'id': 'PY.AG', 'value': data[1][6]*data[1][2]/100, 'data': data[1]},
                    {'id': 'PY.BQ', 'value': data[2][6]*data[2][2]/100, 'data': data[2]},
                    {'id': 'PY.CN', 'value': data[3][6]*data[3][2]/100, 'data': data[3]},
                    {'id': 'PY.CR', 'value': data[4][6]*data[4][2]/100, 'data': data[4]},
                    {'id': 'PY.PH', 'value': data[5][6]*data[5][2]/100, 'data': data[5]},
                    {'id': 'PY.SP', 'value': data[6][6]*data[6][2]/100, 'data': data[6]},
                    {'id': 'PY.CE', 'value': data[7][6]*data[7][2]/100, 'data': data[7]},
                    {'id': 'PY.GU', 'value': data[8][6]*data[8][2]/100, 'data': data[8]},
                    {'id': 'PY.MI', 'value': data[9][6]*data[9][2]/100, 'data': data[9]},
                    {'id': 'PY.NE', 'value': data[10][6]*data[10][2]/100,'data': data[10]},
                    {'id': 'PY.PG', 'value': data[11][6]*data[11][2]/100,'data': data[11]},
                    {'id': 'PY.AM', 'value': data[12][6]*data[12][2]/100,'data': data[12]},
                    {'id': 'PY.AA', 'value': data[13][6]*data[13][2]/100,'data': data[13]},
                    {'id': 'PY.CG', 'value': data[14][6]*data[14][2]/100,'data': data[14]},
                    {'id': 'PY.CZ', 'value': data[15][6]*data[15][2]/100,'data': data[15]},
                    {'id': 'PY.CY', 'value': data[16][6]*data[16][2]/100,'data': data[16]},
                    {'id': 'PY.IT', 'value': data[17][6]*data[17][2]/100,'data': data[17]}
                );
            });
    }

    series.listen(

        // listener type
        anychart.enums.EventType.POINT_CLICK,

        // function, if listener triggers
        function(e) {
            alert('departamento=' + e['pointIndex']
                + '; anho=' + $('#yearSelectHeatMap').val()
                + '; mes=' + $('#monthSelectHeatMap').val()
                + 'tenemos que ver qué infor podemos meter acá y actualizar en otra columna');
        }
    );

};