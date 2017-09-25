/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */

anychart.onDocumentReady(function() {
    selectors_start();
});

function format_currency (number) {
    return 'Gs. ' + parseFloat(number).toFixed(0).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
};


function selectors_start () {
    // create new select
    var triggerMonthSelect = document.createElement("select");
    var triggerYearSelect = document.createElement("select");

    // set selects class and onchange function
    triggerMonthSelect.className = "triggerSelect";
    triggerMonthSelect.id = "monthSelectHeatMap";
    triggerMonthSelect.onchange = function() {
        updateHeatMap();
        $('#departmentDetail').hide();
    };
    triggerYearSelect.className = "triggerSelect";
    triggerYearSelect.id = "yearSelectHeatMap";
    triggerYearSelect.onchange = function() {
        updateMonthSelect(triggerMonthSelect);
        updateHeatMap();
        $('#departmentDetail').hide();
    };

    //set selects options
    //console.log(pgn_date);
    uniqueYear = new Set();
    for (var i = 0; i < pgn_date.length; i++) {
        uniqueYear.add(pgn_date[i][0]);
    }
    console.log(uniqueYear);

    for (var it = uniqueYear.values(), val= null; val=it.next().value; ) {
        var option = document.createElement("option");
        option.value = val;
        option.text = "Año "+ val;
        triggerYearSelect.appendChild(option);
    }
    // add year select to container
    $('#divForYearSelect').append(triggerYearSelect);
    updateMonthSelect(triggerMonthSelect);
    // append month select to container
    $('#divForMonthSelect').append(triggerMonthSelect);

    //set select2 class
    $("#monthSelectHeatMap").select2({ width: '100%', language: "select2-es"});
    $("#yearSelectHeatMap").select2({ width: '100%', language: "select2-es"});
};

function updateHeatMap(e) {
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"year" : $('#yearSelectHeatMap').val(), "month" : $('#monthSelectHeatMap').val(), "q" : "department_heat_map" },

    })
        .done(function( values ) {
            Window.currentDataMap = values;
            $('#map-overlay').show();
            Window.oldGeoJSONgroup = Window.geoJSONgroup;
            $.getJSON('/paraguay.json', function (geoJSONdata) {

                        $.each( geoJSONdata.features, function( key, val ) {
                            var dpto = val.properties.dpto;
                            var valByDpto = values[parseInt(dpto)];
                            val.properties['data'] = valByDpto;
                            //(ejecutado/vigente)*100
                            var currentValue = valByDpto[4]*100/valByDpto[2];
                            val.properties['value'] = currentValue;
                        });
                        Window.geoJSONgroup = L.geoJSON(geoJSONdata, {style: style}).addTo(Window.map);
                        Window.geoJSONgroup.eachLayer(function (layer) {
                            if (layer.feature.properties.name === "Paraguay") {
                                Window.map.fitBounds(layer.getBounds());
                            }
                        });
                        Window.map.removeLayer(Window.oldGeoJSONgroup);
                        $('#map-overlay').hide();
                        Window.geoJSONgroup.on('click', function(e) {
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
function updateMonthSelect(triggerMonthSelect) {
    $('#monthSelectHeatMap').empty();
    var current_year = $('#yearSelectHeatMap').val();
    var months_value = ['','Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    //Create and append the options
    for (var i = 0; i < pgn_date.length; i++) {
        if(pgn_date[i][0] == current_year){
            var option = document.createElement("option");
            option.value = pgn_date[i][1];
            option.text = months_value[pgn_date[i][1]];
            triggerMonthSelect.appendChild(option);
        }
    }

}