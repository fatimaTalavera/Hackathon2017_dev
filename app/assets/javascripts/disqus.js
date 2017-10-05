
/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

 var disqus_config = function () {
    this.page.url = 'http://dev.caminandoal2030.com';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = 'caminandoal2030'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
 };

(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'http://caminandoal2030.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();

/* * * Disqus Reset Function * * */
var resetDisqus = function (newIdentifier, newUrl) {
    DISQUS.reset({
        reload: true,
        config: function () {
            this.page.identifier = 'caminandoal2030';
            this.page.url = 'http://dev.caminandoal2030.com';
        }
    });
};
//Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>