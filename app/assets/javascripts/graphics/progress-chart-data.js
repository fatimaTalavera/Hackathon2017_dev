/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */


function progress_line_init(msg){

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
    for(i = 0; i< months_quantity;i++ ){
        current_months.push(all_months[i]);
        planified_data.push(msg[0][i][1]/1000000);
        transferred_data.push(msg[0][i][2]/1000000);
        progress_data.push(msg[1][i][1]/100000);
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
            title:{
                display:true,
                text:'Línea de Progreso'
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

    $( "#instituteLevelSelectProgress" ).change(function() {
        if($( "#instituteLevelSelectProgress" ).val() == ""){
            $("#divForInstituteSelectProgress").hide();
        }else{
            loadInstituteSelectData();
        }
        $('#divForInstituteData').css("display","none");
        $('#divForProjectSelectProgress').css("display","none");
        var level =  $('#instituteLevelSelectProgress').val();
        var year  = $('#yearSelectProgress').val();
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {"nivelid" :level, "year" :year, "q" : "entity_progress"  }
        })
            .done(function( msg ) {
                months_quantity = msg[0].length;
                current_months = [];
                planified_data = [];
                transferred_data = [];
                progress_data = [];
                for(i = 0; i< months_quantity;i++ ){
                    current_months.push(all_months[i]);
                    planified_data.push(msg[0][i][1]/1000000);
                    transferred_data.push(msg[0][i][2]/1000000);
                    progress_data.push(msg[1][i][1]/100000);
                }
                config.data.datasets[0].data = planified_data;
                config.data.datasets[1].data = transferred_data;
                config.data.datasets[2].data = progress_data;
                window.myLine.update();
            });
    });

    $( "#instituteSelectProgress" ).change(function() {
        var level =  $('#instituteLevelSelectProgress').val();
        var entity = "";
        var year  = $('#yearSelectProgress').val();
        if($( "#instituteSelectProgress" ).val() == ""){
            $('#divForProjectSelectProgress').css("display","none");
            $('#divForInstituteData').hide();
        }
        else{
            $('#divForProjectSelectProgress').css("display","inline-flex");
            $('#divForInstituteData').show();
            entity = $('#instituteSelectProgress').val();
           // var e = document.getElementById("instituteSelectProgress");
           // var value = e.options[e.selectedIndex].value;
           // var text = e.options[e.selectedIndex].text;
            loadInstituteData();
        }
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {"nivelid" :level, "entidadid" :entity, "year" :year, "q" : "entity_progress"  }
        })
            .done(function( msg ) {
                months_quantity = msg[0].length;
                current_months = [];
                planified_data = [];
                transferred_data = [];
                progress_data = [];
                for(i = 0; i< months_quantity;i++ ){
                    current_months.push(all_months[i]);
                    planified_data.push(msg[0][i][1]/1000000);
                    transferred_data.push(msg[0][i][2]/1000000);
                    progress_data.push(msg[1][i][1]/100000);
                }
                config.data.datasets[0].data = planified_data;
                config.data.datasets[1].data = transferred_data;
                config.data.datasets[2].data = progress_data;
                window.myLine.update();
                loadProjectsSelect([level, entity, year]);
            });
    });
};


function loadYearsSelect(){
    uniqueYear = new Set();
    for (var i = 0; i < pgn_date.length; i++) {
        uniqueYear.add(pgn_date[i][0]);
    }
    var select = document.getElementById('yearSelectProgress');
    for (var it = uniqueYear.values(), val= null; val=it.next().value; ) {
        var option = document.createElement("option");
        option.value = val;
        option.text = "Año "+ val;
        select.appendChild(option);
    }
};


function loadProjectsSelect(data){
    var select = document.getElementById('projectSelectProgress');
    var option = document.createElement("option");
    option.value = data[0]+' '+data[1];
    option.text = 'Proyectos';
    select.appendChild(option);

};


function loadInstituteSelectData(data){
    $( "#divForInstituteSelectProgress" ).css("display","inline-flex");
    $("#instituteSelectProgress").empty();
    var nivel =   $( "#instituteLevelSelectProgress" ).val();
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"nivelid" :nivel, "q" : "institutes_from_level"  }
    })
        .done(function( msg ) {
            console.log(msg);
            $('#instituteSelectProgress').append("<option value="+""+">Seleccione una Institucion</option>");
            msg.map(function(x) {
                console.log(x);
                $('#instituteSelectProgress').append("<option value=" + x.entidadid + ">" + x.nombre + "</option>");
            });
        });
};


function loadInstituteData(data){
    $('#divForInstituteData').show();
    var e = document.getElementById("instituteSelectProgress");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;

    var nivel = $('#instituteLevelSelectProgress').val();
    var entidad = $('#instituteSelectProgress').val();
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"nivelid" :nivel, "entidadid" :entidad, "q" : "institute_data"  }
    })
        .done(function( msg ) {
            var instituteData = ['nombre', 'mision', 'vision', 'objetivo', 'politica', 'diagnostico', 'baselegal'];
            instituteData.forEach(function (element) {
                if(msg[element]){
                    var elementTitle = $("#institute\\["+element+"\\]").html();
                    var newElementTitle = elementTitle.match(/<strong>(.*)strong>/)
                    console.log(newElementTitle[0]);
                    $("#institute\\["+element+"\\]").html(newElementTitle[0]+' '+msg[element]);
                    $("#institute\\["+element+"\\]").show();
                }else{
                    $("#institute\\["+element+"\\]").hide();
                }

            });
        });
};


