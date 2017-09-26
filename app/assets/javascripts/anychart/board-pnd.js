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
});

function board_pnd_init (data){
    data.forEach(function(item, index){
        // #stragegy + axis + action line
        $('#strategy' + item[0] + item[1]).html(number_short_format(item[2]));
    });
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




