/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */

/*
 * Funcion inicial del tablero, setea la cantidad de vistas/descargas y maneja el spinner
 */
$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"q": "board_pnd"}
    })
        .done(function (values) {
            $('#board-quantity-visits').text(values[1]['cantidad_vistas']);
            $('#board-quantity-downloads').text(values[1]['cantidad_descargas']);
            board_pnd_init(values[0]);
            $('#modal1-portfolio-link').removeClass('not-active');
            $('#modal1-overlay').hide();
        });
});

/*
 * Carga el tablero, setea los colores, maneja los eventos al hacer clic sobre el tablero
 */
function board_pnd_init(data) {
    data.forEach(function (item, index) {
        // #stragegy + axis + action line
        $('#strategy' + item[0] + item[1]).html(number_short_format(item[2]));
    });

    var all_months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var current_months = [];
    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    var progress_data = [];
    for (i = 0; i < 4; i++) {
        current_months.push(all_months[i]);
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
                data: [1, 2],
            }, {
                label: "Transferido",
                fill: false,
                backgroundColor: window.chartColors.green,
                borderColor: window.chartColors.green,
                borderDash: [5, 5],
                data: [1, 2],
            }, {
                label: "Avance",
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: [1, 2],
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
                        labelString: 'Total'
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
    var ctx = document.getElementById("pnd-canvas").getContext("2d");
    window.pndLine = new Chart(ctx, config);


    /*
     * Se linkea cada tablero con una funcion que realiza una llamada a la API y retorna los valores
     * de los montos y porcentajes necesarios en el tablero
     */
    $('.axis .strategy').bind("click", function () {
        $('.strategy').removeClass('active');
        $(this).addClass('active');
        var axis = $(this).data('axis');
        var line = $(this).data('line');
        $('#strategy-details').fadeOut(500, function () {
            // TODO
            $('#strategy-details').detach().appendTo('#details-axis' + axis);
        });
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {"q": "board_pnd_detail", "axis": axis, "line": line}
        })
            .done(function (msg) {
                var data = msg[4];
                setTimeout(function () {
                    $('#strategy-details').fadeIn(500);
                    board_pnd_detail_init(msg);
                }, 400);
                months_quantity = data[0].length;
                current_months = [];
                planified_data = [];
                transferred_data = [];
                progress_data = [];
                for (i = 0; i < months_quantity; i++) {
                    current_months.push(all_months[i]);
                    planified_data.push(data[i][1] / 1000000);
                    transferred_data.push(data[i][2] / 1000000);
                    progress_data.push(data[i][3] / 100000);
                }
                config.data.datasets[0].data = planified_data;
                config.data.datasets[1].data = transferred_data;
                config.data.datasets[2].data = progress_data;
                window.pndLine.update();
            });
    });
}


/*
 * Carga los datos del tablero
 */
function board_pnd_detail_init(data) {
    console.log(data);
    $('#beneficiaries').html(number_short_format(data[0]));
    $('#institutions').html(number_short_format(data[1]));
    $('#money').html(number_short_format(data[2]));
    $('#money-detail').html(format_currency(data[2]));
    $('#objective').html(number_short_format(data[3]));
    $('#progress_percentage').html(data[5] + "%");
    if(data[5]>90){
        $('#progress_percentage').css('color', 'green');
    }else if(data[5]>80){
        $('#progress_percentage').css('color', 'orange');
    }else {
        $('#progress_percentage').css('color', 'red');
    }
}


/*
 * Agrega los sufijos MM o K dependiendo del monto
 */
function number_short_format(number) {
    var result = number / 1000000000000000;
    if (result > 1) {
        return result.toFixed(0) + ' MB';
    }
    result = number / 1000000000000;
    if (result > 1) {
        return result.toFixed(0) + ' B';
    }
    result = number / 1000000000;
    if (result > 1) {
        return result.toFixed(0) + ' MM';
    }
    result = number / 1000000;
    if (result > 1) {
        return result.toFixed(0) + ' M';
    }
    result = number / 1000;
    if (result > 1) {
        return result.toFixed(0) + ' K';
    }
    return result.toFixed(0);
}




