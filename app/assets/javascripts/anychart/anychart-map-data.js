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
        .done(function( msg ) {
            Window.currentDataMap = msg;

        });
}