/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */

anychart.onDocumentReady(function() {
    var data = {};
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"year" : pgn_years[0][0], "month" :pgn_months[0][0], "q" : "department_heat_map"}
    })
        .done(function( msg ) {
            //self.prop('disabled', false);
            map_start(msg);
            Window.currentDataMap = msg;

        });

});

function format_currency (number) {
    return 'Gs. ' + parseFloat(number).toFixed(0).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
};


function map_start (data) {

    // create new select
    var triggerMonthSelect = document.createElement("select");
    var triggerYearSelect = document.createElement("select");


    // set selects class and onchange function
    triggerMonthSelect.className = "triggerSelect";
    triggerMonthSelect.id = "monthSelectHeatMap";
    triggerMonthSelect.onchange = function() {
        updateHeatMap();
        $('#departmentDetail').hide();
       // console.log(Window.map);
    };
    triggerYearSelect.className = "triggerSelect";
    triggerYearSelect.id = "yearSelectHeatMap";
    triggerYearSelect.onchange = function() {
        updateHeatMap();
        $('#departmentDetail').hide();
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
};
function updateHeatMap(e) {

    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"year" : $('#yearSelectHeatMap').val(), "month" : $('#monthSelectHeatMap').val(), "q" : "department_heat_map" }
    })
        .done(function( values ) {
            Window.currentDataMap = values;

            Window.oldGeoJSONgroup = Window.geoJSONgroup;
            setTimeout("Window.map.removeLayer(Window.oldGeoJSONgroup)", 4000);



            $.getJSON('/paraguay.json', function (geoJSONdata) {

                        //console.log('valuies');
                        //console.log(geoJSONdata.features);
                        var min = values[1][5]*100/values[1][2];
                        var max = min;

                        $.each( geoJSONdata.features, function( key, val ) {
                            var dpto = val.properties.dpto;
                            var valByDpto = values[parseInt(dpto)];
                            var currentValue = valByDpto[5]*100/valByDpto[2];
                            if(currentValue < min){
                                min = currentValue;
                            }
                            if(currentValue > max){
                                max = currentValue;
                            }
                        });
                        // console.log("max " + max + "-min: " + min);
                        $.each( geoJSONdata.features, function( key, val ) {
                            //  console.log('here');
                            //   console.log(val);
                            //   console.log(values);
                            var dpto = val.properties.dpto;
                            var valByDpto = values[parseInt(dpto)];
                            val.properties['data'] = valByDpto;
                            var currentValue = valByDpto[5]*100/valByDpto[2];
                            val.properties['value'] = currentValue;
                            val.properties['min'] = min;
                            val.properties['max'] = max;
                        });

                        Window.geoJSONgroup = L.geoJSON(geoJSONdata, {style: style}).addTo(Window.map);

                        Window.geoJSONgroup.eachLayer(function (layer) {
                            if (layer.feature.properties.name === "Paraguay") {
                                Window.map.fitBounds(layer.getBounds());
                            }
                        });
                        Window.geoJSONgroup.on('click', function(e) {
                            console.log('check');
                            console.log(Window.map);
                            console.log(Window.currentDataMap);
                            var currentData = Window.currentDataMap[parseInt(e.layer.feature.properties.dpto)];
                            $('#departmentName').text(e.layer.feature.properties.dpto_desc);
                            $('#departmentDetail').show();
                            var instituteData = ['presupuesto_aprobado', 'presupuesto_vigente', 'monto_planificado', 'monto_ejecutado', 'monto_transferido', 'monto_abonado'];
                            var counter = 1;
                            instituteData.forEach(function (element) {
                                var elementTitle = $("#departmentDetail\\["+element+"\\]").html();
                                var newElementTitle = elementTitle.match(/<strong>(.*)strong>/)
                                //console.log(newElementTitle[0]);
                                $("#departmentDetail\\["+element+"\\]").html(newElementTitle[0]+' '+format_currency(currentData[counter]));
                                $("#departmentDetail\\["+element+"\\]").show();
                                counter++;
                            });

                        });
                    });


        });
}