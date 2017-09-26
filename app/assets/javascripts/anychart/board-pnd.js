/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */

$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "search/search",
        data: {"q" : "board_pnd"}
    })
    .done(function( msg ) {
        board_pnd_init(msg);
        $('#modal1-portfolio-link').removeClass('not-active');
        $('#modal1-overlay').hide();
    });

    $('.axis .strategy').bind("click",function(){
        $('.strategy').removeClass('active');
        $(this).addClass('active');
        var axis = $(this).data('axis');
        var line = $(this).data('line');
        $.ajax({
            method: "GET",
            url: "search/search",
            data: {"q" : "board_pnd_detail", "axis": axis, "line" : line}
        })
        .done(function( msg ) {
            board_pnd_detail_init(msg);
            $('#strategy-details').css('display', 'block');
        });
    });
});

function board_pnd_init (data){
    data.forEach(function(item, index){
        // #stragegy + axis + action line
        $('#strategy' + item[0] + item[1]).html(number_short_format(item[2]));
    });
};

function board_pnd_detail_init (data){
    $('#beneficiaries').html(number_short_format(data[0]));
    $('#institutions').html(number_short_format(data[1]));
    $('#money').html(number_short_format(data[2]));
    $('#money-detail').html(format_currency(data[2]));
    $('#objective').html(number_short_format(data[3]));
};

function number_short_format (number) {
    var result = number/1000000;
    if(result > 1){
        return result.toFixed(0) + ' MM';
    }
    result = number/1000;
    if(result > 1){
        return result.toFixed(0) + ' K';
    }
    return result.toFixed(0);
};




