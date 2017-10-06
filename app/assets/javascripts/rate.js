/*
 #
 #autores
 #Fatima Talavera fa.talavera95@gmail.com
 #Jerson Paniagua diazpany@gmail.com
 #
 */
// nominal value by  rate
var nominalValue = ['Nada satisfecho', 'Poco satisfecho', 'Satisfecho', 'Muy satisfecho', 'Sumamente satisfecho'];
$(document).ready(function() {
    initRate("#map-rate", 3.6);
    initRate("#progress-rate", 3.6);
});

// Init default rate
var initRate = function (identificator, initRating, changeCallback) {
    $(identificator).rateYo({
        rating: initRating,
        starWidth: "25px",
        fullStar: true,
        onInit: function (rating, rateYoInstance) {
            $(this).prev().find('.calification').text(rating.toFixed(1));
            $(this).next().find('.nominal-value').text(nominalValue[rating.toFixed(0) - 1]);
        },
        onSet: function (rating, rateYoInstance) {
            $(this).next().find('.nominal-value').text(nominalValue[rating.toFixed(0) - 1]);
            if(typeof changeCallback !== 'undefined') changeCallback(rating, this);
        },
        onChange: function (rating, rateYoInstance) {
            $(this).next().find('.nominal-value').text(nominalValue[rating.toFixed(0) - 1]);
        }
    });
};
