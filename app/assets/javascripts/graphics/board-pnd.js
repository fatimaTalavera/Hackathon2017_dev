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
    var config = {
        type: 'line',
        data: {
            labels: ['1', '2'],
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
                setTimeout(function () {
                    $('#strategy-details').fadeIn(500);
                    board_pnd_detail_init(msg);
                }, 400);
            });
    });
}


/*
 * Carga los datos del tablero
 */
function board_pnd_detail_init(data) {
    $('#beneficiaries').html(number_short_format(data[0]));
    $('#institutions').html(number_short_format(data[1]));
    $('#money').html(number_short_format(data[2]));
    $('#money-detail').html(format_currency(data[2]));
    $('#objective').html(number_short_format(data[3]));
    $('#progress_percentage').html(data[5] + "%");
}


/*
 * Agrega los sufijos MM o K dependiendo del monto
 */
function number_short_format(number) {
    var result = number / 1000000;
    if (result > 1) {
        return result.toFixed(0) + ' MM';
    }
    result = number / 1000;
    if (result > 1) {
        return result.toFixed(0) + ' K';
    }
    return result.toFixed(0);
}




