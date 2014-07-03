/* Move menu to top in collapse state.
***********************/
sizeStatus = 'big';
breakpt = 752;

if ($(window).width() < breakpt) {
    moveMenu();
}
else {
    sizeStatus = 'big';
}

$( document ).ready(function() {
    $(window).resize(function() {moveMenu(); });        
});


   function moveMenu() {
            currentSize = $(window).width(); 
            if (currentSize < breakpt && sizeStatus == 'big') {

                $('.navbar-collapse').each(function(index) {
                    $(this).addClass('menu'+index);  
                    $(this).parent().addClass('menu'+index+'-parent');                
                    $(this).detach().appendTo('#mobile-menu');
                    sizeStatus = 'small';
                    $(this).find('a.dropdown-toggle').attr('data-toggle', 'no-dropdown');
                    
                });
            }
            else if (currentSize > breakpt && sizeStatus == 'small') {
                                 
                $('#mobile-menu .navbar-collapse').each(function(index) {
                    $(this).removeClass('menu'+index);                 
                    $(this).detach().appendTo('.menu'+index+'-parent');
                    $(this).parent().removeClass('menu'+index+'-parent'); 
                    sizeStatus = 'small';
                    $(this).find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
                });
                 
                 
                 sizeStatus = 'big';
                }
            
        }
    	                                                
/* Add UNM Panel
***********************/
jQuery("body").append('<div id="unm_panel"><div class="container"></div></div>');
jQuery("#toolbar-nav").append('<li class="unm_panel_open hidden-sm"><a href="#panel">more <span class="caret"></span></a></li>');
    
jQuery('.unm_panel_open').click(function(event) {
    event.preventDefault();
    $( '.unm_panel_open .caret' ).toggleClass( "up" );
    $( "#unm_panel" ).slideToggle('slow');       
}); 
 
/* Panel JSON Test
**********************/

/* Loading JSON objects using JSONP */
(function($) {
    
    var url = 'http://wcmsdev.unm.edu/json/json.php';
    $.ajax({
       type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        jsonpCallback: "JsonCallBack",
       
        error: function( xhr,err,exception, status) {
            console.log( 'Sample of error data:', err );
            console.log(status +" "+exception);
            console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status+"\nresponseText: "+xhr.responseText);
    }    
    });
})(jQuery);

function JsonCallBack(data){
    //It's really here
    $("#unm_panel .container").append(data.panel);
}

