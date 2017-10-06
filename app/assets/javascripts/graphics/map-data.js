/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */



//Definimos los colores para el mapa
//colors[0] = gris, colors[1] = verde, colors[2] = amarillo, colors[3] = rojo
var colors = ['#969696', '#57A639', '#FFFF00', '#F80000'];

/*
 * Funcion inicial para el grafico departamental,
 * se encarga de inicializar el mapa y manejar el spinner
 */
$(document).ready(function () {
    selectors_start();
    initMap();
    Window.map.on('load', Window.map.invalidateSize());
    $('#ejecucion-institucional').bind("DOMSubtreeModified", function () {
        if (Window.map != null) {
            $('#modal2-portfolio-link').removeClass('not-active');
            $('#modal2-overlay').hide();
        }
    });
});

/*
 * Esta funcion se encarga de formatear los montos
 */
function format_currency(number) {
    return 'Gs. ' + parseFloat(number).toFixed(0).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
};

//Se define el estilo del mapa
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
//Logica para la seleccion de color del mapa
function getColor(properties) {
    d = properties.data[7];
    var finalColor = colors[10];
    if (d == 0) {
        finalColor = colors[0];
    }
    else if (d >= 90) {
        finalColor = colors[1];
    } else if (d >= 70) {
        finalColor = colors[2];
    } else {
        finalColor = colors[3];
    }
    return finalColor;
}

/*
 * Esta funcion inicializa el mapa y setea sus valores
 */
function initMap() {
    var dataSet;

    Window.map = L.map("map", {minZoom: 6.7, maxZoom: 10}).setView([-23.5, -58.5], 6);
    //Window.map.dragging.disable();

    //Se reliza una llamada a la API para obtener los datos del departamento
    //Luego renderizamos el mapa y pintamos de acuerdo a su desempeno
    $.getJSON('/paraguay_2002_departamentos.geojson', function (geoJSONdata) {
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {
                "ip" : localStorage.getItem("clientIp"),
                "year": $('#yearSelectHeatMap').val(),
                "month": $('#monthSelectHeatMap').val(),
                "q": "department_heat_map"
            }
        })
            .done(function (values) {
                // values[1] = metrics of visit and downloads
                $('#map-quantity-visits').text(values[1]['cantidad_vistas']);
                $('#map-quantity-downloads').text(values[1]['cantidad_descargas']);

                // values[2] = rating
                // values[3] = goblal rating
                initRate("#map-rate", values[2]['puntaje'], values[3], updateMapRate);

                Window.currentDataMap = values[0];
                $.each(geoJSONdata.features, function (key, val) {
                    var dpto = val.properties.codigo;
                    var valByDpto = values[0][parseInt(dpto)];
                    val.properties['data'] = valByDpto;
                });

                Window.geoJSONgroup = L.geoJSON(geoJSONdata, {style: style}).addTo(Window.map);

                Window.geoJSONgroup.eachLayer(function (layer) {
                    if (layer.feature.properties.name === "Paraguay") {
                        Window.map.fitBounds(layer.getBounds());
                    }
                });

                /*
                 * Cuando seleccionamos un departamento, se cargan sus datos, de acuerdo a los datos en el mapa
                 */
                Window.geoJSONgroup.on('click', function (e) {
                    $('#dataButtonHeatMap').attr('disabled', false);
                    $('#textDepartment').hide();
                    var currentData = Window.currentDataMap[parseInt(e.layer.feature.properties.codigo)];
                    Window.dpto = e.layer.feature.properties.codigo;
                    $('#departmentName').text(e.layer.feature.properties.department);
                    $('#departmentDetail').show();
                    var instituteData = ['presupuesto_aprobado', 'presupuesto_vigente', 'monto_planificado', 'monto_ejecutado', 'monto_transferido', 'monto_abonado'];
                    var counter = 1;
                    instituteData.forEach(function (element) {
                        var elementTitle = $("#departmentDetail\\[" + element + "\\]").html();
                        var newElementTitle = elementTitle.match(/<strong>(.*)strong>/)
                        $("#departmentDetail\\[" + element + "\\]").html(newElementTitle[0] + ' ' + format_currency(currentData[counter]));
                        $("#departmentDetail\\[" + element + "\\]").show();
                        counter++;
                    });

                    // currentData[8] = rating
                    // currentData[9] = goblal rating
                    setRate("#map-rate", currentData[8], currentData[9], e.layer.feature.properties.department);

                });
                Window.map.invalidateSize();
            });
    });
}

/*
 * Funcion que se encarga de inicializar los selectores de anhos y meses con sus datos iniciales
 */
function selectors_start() {
    // create new select
    var triggerMonthSelect = document.createElement("select");
    var triggerYearSelect = document.createElement("select");

    // set selects class and onchange function
    triggerMonthSelect.className = "triggerSelect";
    triggerMonthSelect.id = "monthSelectHeatMap";
    triggerMonthSelect.onchange = function () {
        updateHeatMap();
        $('#departmentDetail').hide();
    };
    triggerYearSelect.className = "triggerSelect";
    triggerYearSelect.id = "yearSelectHeatMap";
    triggerYearSelect.onchange = function () {
        updateMonthSelect(triggerMonthSelect);
        updateHeatMap();
        $('#departmentDetail').hide();
    };

    //set selects options
    uniqueYear = new Set();
    for (var i = 0; i < pgn_date.length; i++) {
        uniqueYear.add(pgn_date[i][0]);
    }

    for (var it = uniqueYear.values(), val = null; val = it.next().value;) {
        var option = document.createElement("option");
        option.value = val;
        option.text = "Año " + val;
        triggerYearSelect.appendChild(option);
    }
    // add year select to container
    $('#divForYearSelect').append(triggerYearSelect);
    updateMonthSelect(triggerMonthSelect);
    // append month select to container
    $('#divForMonthSelect').append(triggerMonthSelect);

    //set select2 class
    $("#monthSelectHeatMap").select2({width: '100%', language: "select2-es"});
    $("#yearSelectHeatMap").select2({width: '100%', language: "select2-es"});
};

/*
 * Funcion que se encarga de actualizar el mapa de calor,
 * Carga el anho y mes del selector y realiza una llamada al API
 * y nos devuelde los montos
 */
function updateHeatMap(e) {
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {
            "ip" : localStorage.getItem("clientIp"),
            "year": $('#yearSelectHeatMap').val(),
            "month": $('#monthSelectHeatMap').val(),
            "q": "department_heat_map"
        },
    })
        .done(function (values) {
            // values[1] = metrics of visit and downloads
            $('#map-quantity-visits').text(values[1]['cantidad_vistas']);
            $('#map-quantity-downloads').text(values[1]['cantidad_descargas']);

            Window.currentDataMap = values[0];
            $('#map-overlay').show();
            Window.oldGeoJSONgroup = Window.geoJSONgroup;
            $.getJSON('/paraguay_2002_departamentos.geojson', function (geoJSONdata) {
                //se guarda los datos de cada departamento
                $.each(geoJSONdata.features, function (key, val) {
                    var dpto = val.properties.codigo;
                    var valByDpto = values[0][parseInt(dpto)];
                    val.properties['data'] = valByDpto;
                });
                Window.geoJSONgroup = L.geoJSON(geoJSONdata, {style: style}).addTo(Window.map);
                Window.geoJSONgroup.eachLayer(function (layer) {
                    if (layer.feature.properties.name === "Paraguay") {
                        Window.map.fitBounds(layer.getBounds());
                    }
                });
                Window.map.removeLayer(Window.oldGeoJSONgroup);
                $('#map-overlay').hide();
                Window.geoJSONgroup.on('click', function (e) {
                    var currentData = Window.currentDataMap[parseInt(e.layer.feature.properties.codigo)];
                    Window.dpto = e.layer.feature.properties.codigo;
                    $('#departmentName').text(e.layer.feature.properties.dpto_desc);
                    $('#departmentDetail').show();
                    var instituteData = ['presupuesto_aprobado', 'presupuesto_vigente', 'monto_planificado', 'monto_ejecutado', 'monto_transferido', 'monto_abonado'];
                    var counter = 1;
                    instituteData.forEach(function (element) {
                        var elementTitle = $("#departmentDetail\\[" + element + "\\]").html();
                        var newElementTitle = elementTitle.match(/<strong>(.*)strong>/)
                        $("#departmentDetail\\[" + element + "\\]").html(newElementTitle[0] + ' ' + format_currency(currentData[counter]));
                        $("#departmentDetail\\[" + element + "\\]").show();
                        counter++;
                    });

                    // currentData[8] = rating
                    // currentData[9] = goblal rating
                    setRate("#map-rate", currentData[8], currentData[9], e.layer.feature.properties.dpto_desc);
                });
            });
            Window.map.invalidateSize();
        });
}

/*
 * Funcion que actualiza el selector de meses, primero lo vacia
 * y despues lo rellena con los meses del anho actual
 */
function updateMonthSelect(triggerMonthSelect) {
    $('#monthSelectHeatMap').empty();
    var current_year = $('#yearSelectHeatMap').val();
    var months_value = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    //Create and append the options
    for (var i = 0; i < pgn_date.length; i++) {
        if (pgn_date[i][0] == current_year) {
            var option = document.createElement("option");
            option.value = pgn_date[i][1];
            option.text = months_value[pgn_date[i][1]];
            triggerMonthSelect.appendChild(option);
        }
    }

}

var updateMapRate = function (rating, viewRate) {
    var filter = Window.dpto? 'DPTO'+Window.dpto : 'PARAGUAY';
    $.ajax({
        method: "POST",
        url: "/calificacion",
        data: {
            "ip" : localStorage.getItem("clientIp"),
            "filter": filter,
            "rating": rating
        },
    })
    .done(function (values) {
        console.log('Tus puntuacion ha sido guardada');
        $(viewRate).prev().find('.calification').text(parseFloat(values[1]).toFixed(1));

        if(filter !== 'PARAGUAY'){
            var currentData = Window.currentDataMap[parseInt(Window.dpto)];
            currentData[8] = rating;
            currentData[9] = values[1];
        }
    });
};