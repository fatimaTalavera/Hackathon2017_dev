// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-1.11.3.min.js
//= require jquery.dataTables.min.js
//= require dataTables.bootstrap.min.js
//= require jquery.rateyo.min.js
//= require Chart.bundle
//= require bootbox.min
//= require turbolinks
//= require_tree .
//= require Chart.bundle
//= require jquery.validate.min
//= require messages_es
//= require leaflet-src
//= require disqus


$(document).ready(function(){
    // Tooltip envent
    $('[data-toggle="tooltip"]').tooltip();

    var isModal = false;
    $(window.location.hash).modal('show');

    $('a[data-toggle="modal"]').click(function(){
        window.location.hash = $(this).attr('href');
        isModal = true;
        if ($(this).hasClass('portfolio-link')) reloadDisqus(this);
        setTimeout(function(){
            Window.map.invalidateSize();
        }, 200);
        setTimeout(function(){
            Window.map.invalidateSize();
        }, 1000);
        setTimeout(function(){
            Window.map.invalidateSize();
        }, 5000);
    });

    $('button[data-dismiss="modal"]').click(function(){
        var original = window.location.href.substr(0, window.location.href.indexOf('#'));
        history.replaceState({}, document.title, original);
        isModal = false;
    });

    $('.close-modal').click(function(){
        var original = window.location.href.substr(0, window.location.href.indexOf('#'));
        history.replaceState({}, document.title, original);
        isModal = false;
    });

    $(window).on('popstate', function() {
        if(isModal){
            var original = window.location.href.substr(0, window.location.href.indexOf('#'));
            history.replaceState({}, document.title, original);
            isModal = false;
            location.reload();
        }
    });

    function reloadDisqus(thisModal){
        $('#disqus_thread').remove();
        var href = window.location.href;
        var hash = window.location.hash;
        $(hash).find('.container').append('<div id="disqus_thread"></div>');
        resetDisqus(hash, href.replace('#', '#!') );
    };

    $('.download-png').click(function(){
        alert('hola');
        var id = $(this).data("download-id");
        html2canvas(document.body, {
            onrendered: function (canvas) {
                Canvas2Image.saveAsPNG(canvas);
            }
        });
    });

    
});