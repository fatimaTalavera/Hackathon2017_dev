/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */

/*
 * Funcion inicial del grafico de progreso, setea la cantidad de vistas/descargas y maneja el spinner
 */
function progress_line_init(msg) {

    // msg[4] = rating
    // msg[5] = goblal rating
    initRate("#progress-rate", msg[4]['puntaje'], msg[5], updateMapProgess);

    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    var months_quantity = msg[0].length;
    var all_months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var current_months = [];
    var planified_data = [];
    var transferred_data = [];
    var progress_data = [];
    for (i = 0; i < months_quantity; i++) {
        current_months.push(all_months[i]);
        planified_data.push(msg[0][i][1] / 1000000);
        transferred_data.push(msg[0][i][2] / 1000000);
        progress_data.push(msg[1][i][1] / 100000);
    }
    var config = {
        type: 'line',
        data: {
            labels: current_months,
            datasets: [{
                label: "Planificado Vigente",
                fill: false,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: planified_data,
            }, {
                label: "Transferido",
                fill: false,
                backgroundColor: window.chartColors.green,
                borderColor: window.chartColors.green,
                borderDash: [5, 5],
                data: transferred_data,
            }, {
                label: "Avance",
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: progress_data,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Línea de Progreso'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Mes'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Monto (Millones)Gs.'
                    }
                }]
            }
        }
    };
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);

    /*
     * Funcion que se ejecuta cuando cambia el selector de Niveles de Institutos
     * Hace una llamada a la API y obtiene los datos de acuerdo a
     * un anho, nivel, tambien se encarga de ocultar los selectores
     * que no se deben ver
     */
    $("#instituteLevelSelectProgress").change(function () {
        $("#projectSelectProgress").empty();
        if ($("#instituteLevelSelectProgress").val() == "") {
            $("#divForInstituteSelectProgress").hide();
        } else {
            loadInstituteSelectData();
        }
        $('#divForProjectSelectProgress').css("display", "none");
        $('#divForInstituteData').css("display", "none");
        $('#progressText').show();
        $('#dataButtonProgress').attr('disabled', true);
        $('#divForProjectSelectProgress').css("display", "none");
        var level = $('#instituteLevelSelectProgress').val();
        var year = $('#yearSelectProgress').val();
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {"ip" : localStorage.getItem("clientIp"), "nivelid": level, "year": year, "q": "entity_progress"}
        })
            .done(function (msg) {
                $('#progress-quantity-visits').text(msg[2]['cantidad_vistas']);
                $('#progress-quantity-downloads').text(msg[3]['cantidad_descargas']);
                months_quantity = msg[0].length;
                current_months = [];
                planified_data = [];
                transferred_data = [];
                progress_data = [];
                for (i = 0; i < months_quantity; i++) {
                    current_months.push(all_months[i]);
                    planified_data.push(msg[0][i][1] / 1000000);
                    transferred_data.push(msg[0][i][2] / 1000000);
                    progress_data.push(msg[1][i][1] / 100000);
                }
                config.data.datasets[0].data = planified_data;
                config.data.datasets[1].data = transferred_data;
                config.data.datasets[2].data = progress_data;
                window.myLine.update();
            });
    });

    /*
     * Funcion que se ejecuta cuando cambia el selector de Institutos
     * Hace una llamada a la API y obtiene los datos de acuerdo a
     * un anho, nivel, entidad, tambien se encarga de ocultar los selectores
     * que no se deben ver
     */
    $("#instituteSelectProgress").change(function () {
        var level = $('#instituteLevelSelectProgress').val();
        var entity = "";
        var id;
        var year = $('#yearSelectProgress').val();
        if ($("#instituteSelectProgress").val() == "") {
            $('#divForProjectSelectProgress').css("display", "none");
            $('#divForInstituteData').hide();
            $('#dataButtonProgress').attr('disabled', true);
            $('#progressText').hide();
        }
        else {
            $('#dataButtonProgress').attr('disabled', false);
            $('#progressText').hide();
            $('#divForProjectSelectProgress').css("display", "inline-flex");
            $('#divForInstituteData').show();
            var entidadid = $('#instituteSelectProgress').val();
            entity = entidadid.substring(0, entidadid.indexOf('#')); //obtengo la entidad
            id = entidadid.substring(entidadid.indexOf('#') + 1, entidadid.length); //obtengo la entidad
            // var e = document.getElementById("instituteSelectProgress");
            // var value = e.options[e.selectedIndex].value;
            // var text = e.options[e.selectedIndex].text;
            loadInstituteData();
        }
        //loadProjectsSelect([level, entity, year]);
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {"ip" : localStorage.getItem("clientIp"), "nivelid": level, "entidadid": entity, "year": year, "q": "entity_progress"}
        })
            .done(function (msg) {
                $('#progress-quantity-visits').text(msg[2]['cantidad_vistas']);
                $('#progress-quantity-downloads').text(msg[3]['cantidad_descargas']);

                // msg[4] = rating
                // msg[5] = goblal rating
                setRate("#progress-rate", msg[4]['puntaje'], msg[5],  msg[4]['filtro'] !== 'PARAGUAY' ?  Window.institudName : 'PARAGUAY');

                months_quantity = msg[0].length;
                current_months = [];
                planified_data = [];
                transferred_data = [];
                progress_data = [];
                for (i = 0; i < months_quantity; i++) {
                    current_months.push(all_months[i]);
                    planified_data.push(msg[0][i][1] / 1000000);
                    transferred_data.push(msg[0][i][2] / 1000000);
                    progress_data.push(msg[1][i][1] / 100000);
                }
                config.data.datasets[0].data = planified_data;
                config.data.datasets[1].data = transferred_data;
                config.data.datasets[2].data = progress_data;
                window.myLine.update();
                //if($( "#instituteSelectProgress" ).val() == ""){
                //    $('#divForProjectSelectProgress').css("display","none");
                //     $('#divForInstituteData').hide();
                // }else{
                loadProjectsSelect([level, entity, year]);
                //  }

            });
    });

    /*
     * Funcion que se ejecuta cuando cambia el selector de proyecto
     * Hace una llamada a la API y obtiene los datos de acuerdo a
     * Un anho, nivel, entidad, programa
     */
    $("#projectSelectProgress").change(function () {
        var level = $('#instituteLevelSelectProgress').val();
        var entity = $('#instituteSelectProgress').val();
        entity = entity.substring(0, entity.indexOf('#')); //obtengo la entidad
        var id;
        var year = $('#yearSelectProgress').val();
        var program = $('#projectSelectProgress').val();
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {"ip" : localStorage.getItem("clientIp"), "nivelid": level, "entidadid": entity, "year": year, "q": "entity_progress", "program": program}
        })
            .done(function (msg) {
                $('#progress-quantity-visits').text(msg[2]['cantidad_vistas']);
                $('#progress-quantity-downloads').text(msg[3]['cantidad_descargas']);
                months_quantity = msg[0].length;
                current_months = [];
                planified_data = [];
                transferred_data = [];
                progress_data = [];
                for (i = 0; i < months_quantity; i++) {
                    current_months.push(all_months[i]);
                    planified_data.push(msg[0][i][1] / 1000000);
                    transferred_data.push(msg[0][i][2] / 1000000);
                    progress_data.push(msg[1][i][1] / 100000);
                }
                config.data.datasets[0].data = planified_data;
                config.data.datasets[1].data = transferred_data;
                config.data.datasets[2].data = progress_data;
                window.myLine.update();
            });
    });
};

/*
 * Funcion que carga el selector de anhos en el grafico de progreso
 * los datos fueron obtenidos al iniciar la aplicacion
 * Orden descendente
 */
function loadYearsSelect() {
    uniqueYear = new Set();
    for (var i = 0; i < pgn_date.length; i++) {
        uniqueYear.add(pgn_date[i][0]);
    }
    var select = document.getElementById('yearSelectProgress');
    for (var it = uniqueYear.values(), val = null; val = it.next().value;) {
        var option = document.createElement("option");
        option.value = val;
        option.text = "Año " + val;
        select.appendChild(option);
    }
};

/*
 * Funcion que carga el selector de proyectos en el grafico de progreso
 */
function loadProjectsSelect(data) {
    //ajax projects_from_institute

    $("#projectSelectProgress").empty();
    var select = document.getElementById('projectSelectProgress');
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"nivelid": data[0], "entidadid": data[1], "year": data[2], "q": "projects_from_institute"}
    })
        .done(function (msg) {
            var option = document.createElement("option");
            option.value = "";
            option.text = 'Todos los programas'
            select.appendChild(option);
            for (var i = 0; i < msg.length; i++) {
                option = document.createElement("option");
                option.value = msg[i][0];
                option.text = msg[i][0];
                select.appendChild(option);

            }
        });
};

/*
 * Funcion que carga las instituciones en un selector,
 * Hace una llamada a la API, teniendo en cuenta el nivel seleccionado
 */
function loadInstituteSelectData(data) {
    $("#divForInstituteSelectProgress").css("display", "inline-flex");
    $("#instituteSelectProgress").empty();
    var nivel = $("#instituteLevelSelectProgress").val();
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"nivelid": nivel, "q": "institutes_from_level"}
    })
        .done(function (msg) {
            $('#instituteSelectProgress').append("<option value=" + "" + ">Todas las Institucion</option>");
            msg.map(function (x) {

                $('#instituteSelectProgress').append("<option value=" + x.entidadid + "#" + x.id + ">" + x.nombre + "</option>");
            });
        });
};

/*
 * Funcion que carga los datos de la Institucion seleccionada,
 * Hace una llamada a la API y obtiene los datos
 */
function loadInstituteData(data) {
    $('#divForInstituteData').show();
    var e = document.getElementById("instituteSelectProgress");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;

    var nivel = $('#instituteLevelSelectProgress').val();
    var entidadid = $('#instituteSelectProgress').val();
    var entidad = entidadid.substring(0, entidadid.indexOf('#')); //obtengo la entidad
    var id = entidadid.substring(entidadid.indexOf('#') + 1, entidadid.length); //obtengo la entidad
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"nivelid": nivel, "entidadid": entidad, "q": "institute_data"}
    })
        .done(function (msg) {
            var instituteData = ['nombre', 'mision', 'vision', 'objetivo', 'politica', 'diagnostico', 'baselegal'];
            instituteData.forEach(function (element) {
                if (msg[element]) {
                    var elementTitle = $("#institute\\[" + element + "\\]").html();
                    var newElementTitle = elementTitle.match(/<strong>(.*)strong>/)
                    console.log(newElementTitle[0]);
                    $("#institute\\[" + element + "\\]").html(newElementTitle[0] + ' ' + msg[element]);
                    $("#institute\\[" + element + "\\]").show();
                } else {
                    $("#institute\\[" + element + "\\]").hide();
                }

            });

            Window.institudName = msg['nombre'];
        });
};

var updateMapProgess = function (rating, viewRate) {
    var level = $('#instituteLevelSelectProgress').val();
    var entity = $('#instituteSelectProgress').val();
    entity = entity.substring(0, entity.indexOf('#')); //obtengo la entidad

    var filter = entity != undefined? 'INS' + level + '#' + entity : 'PARAGUAY';

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
    });
};

