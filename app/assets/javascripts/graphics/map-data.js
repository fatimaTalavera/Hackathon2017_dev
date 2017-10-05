/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */



function format_currency (number) {
    return 'Gs. ' + parseFloat(number).toFixed(0).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
};
var colors = ['#969696','#57A639', '#FFFF00', '#F80000'];
$( document ).ready(function() {
    selectors_start();
    initMap();
    $('#ejecucion-institucional').bind("DOMSubtreeModified",function(){
        if(Window.map != null){
            $('#modal2-portfolio-link').removeClass('not-active');
            $('#modal2-overlay').hide();
            var timeout = 500;
            setTimeout(function(){
                Window.map.invalidateSize();
            }, timeout);
            for (i = 0; i<20; i+=2){
                setTimeout(function(){
                    Window.map.invalidateSize();
                }, timeout + timeout*i);
            }
        }
    });
});



function format_currency (number) {
    return 'Gs. ' + parseFloat(number).toFixed(0).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
};

function style(feature) {
    return {
        fillColor: getColor(feature.properties),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
};

function getColor(properties) {
    d = properties.data[7];
    var finalColor = colors[10];
    if(d == 0){
        finalColor = colors[0];
    }
    else if(d>= 90 ){
        finalColor = colors[1];
    }else if(d>=70){
        finalColor = colors[2];
    }else{
        console.log(colors[3]);
        finalColor = colors[3];
    }
   // console.log(properties);
    return finalColor;
}

function initMap() {
        //entity chart
        var dataSet;

        Window.map = L.map("map", {minZoom: 6.7, maxZoom: 6.7, doubleClickZoom: false}).setView([-23.5, -58.5], 6);
        Window.map.dragging.disable();

        $.getJSON('/paraguay_2002_departamentos.geojson', function (geoJSONdata) {
            $.ajax({
                method: "GET",
                url: "search/search",
                data: {"year" : $('#yearSelectHeatMap').val(), "month" :$('#monthSelectHeatMap').val(), "q" : "department_heat_map"}
            })
                .done(function( values ) {
                    $('#map-quantity-visits').text(values[1]['cantidad_vistas']);
                    $('#map-quantity-downloads').text(values[1]['cantidad_descargas']);
                    Window.currentDataMap = values[0];
                    // console.log("max " + max + "-min: " + min);
                    //console.log(values);
                    $.each( geoJSONdata.features, function( key, val ) {
                        var dpto = val.properties.codigo;
                        var valByDpto = values[0][parseInt(dpto)];
                        val.properties['data'] = valByDpto;
                        console.log('revisar');
                        console.log(valByDpto);
                        console.log('revisar');
                        //var currentValue = valByDpto[4]*100/valByDpto[2];
                        //val.properties['value'] = currentValue;
                    });

                    Window.geoJSONgroup = L.geoJSON(geoJSONdata, {style: style}).addTo(Window.map);

                    Window.geoJSONgroup.eachLayer(function (layer) {
                        if (layer.feature.properties.name === "Paraguay") {
                            Window.map.fitBounds(layer.getBounds());
                        }
                    });
                    Window.geoJSONgroup.on('click', function(e) {
                        var currentData = Window.currentDataMap[parseInt(e.layer.feature.properties.codigo)];
                        $('#departmentName').text(e.layer.feature.properties.department);
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
            $('#map-quantity-visits').text(values[1]['cantidad_vistas']);
            $('#map-quantity-downloads').text(values[1]['cantidad_descargas']);
            Window.currentDataMap = values[0];
            $('#map-overlay').show();
            Window.oldGeoJSONgroup = Window.geoJSONgroup;
            $.getJSON('/paraguay_2002_departamentos.geojson', function (geoJSONdata) {

                        $.each( geoJSONdata.features, function( key, val ) {
                            var dpto = val.properties.codigo;
                            var valByDpto = values[0][parseInt(dpto)];
                            val.properties['data'] = valByDpto;
                            console.log(values);

                            //(ejecutado/vigente)*100
                            //var currentValue = valByDpto[4]*100/valByDpto[2];
                            //val.properties['value'] = currentValue;
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
                            var currentData = Window.currentDataMap[parseInt(e.layer.feature.properties.codigo)];
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