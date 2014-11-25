/* Move menu to top in collapse state.
 ***********************/
sizeStatus = 'big';
breakpt = 752;

if ($(window).width() < breakpt) {
	moveMenu();
} else {
	sizeStatus = 'big';
}

$(document).ready(function() {
	moveMenu();
	// run initial to see if screen is small already
	$(window).resize(function() {
		moveMenu();
	});
	// enable mobile menu toggle button
	 $("button.menu-toggle.navbar-toggle").click(function() {
          $("#mobile-menu").toggleClass('in');
    });		
});

function moveMenu() {
	currentSize = $(window).width();
	if (currentSize < breakpt && sizeStatus == 'big') {

		$('.navbar-collapse').each(function(index) {
			$(this).addClass('menu' + index);
			$(this).parent().addClass('menu' + index + '-parent');
			$(this).detach().appendTo('#mobile-menu');
			sizeStatus = 'small';
			$(this).find('a.dropdown-toggle').attr('data-toggle', 'no-dropdown');

		});
	} else if (currentSize > breakpt && sizeStatus == 'small') {

		$('#mobile-menu .navbar-collapse').each(function(index) {
			$(this).removeClass('menu' + index);
			$(this).detach().appendTo('.menu' + index + '-parent');
			$(this).parent().removeClass('menu' + index + '-parent');
			sizeStatus = 'small';
			$(this).find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
		});

		sizeStatus = 'big';
	}

}

/* Dropdown menu edge detection
 *******************************/
$(".dropdown-menu li").has("ul").hover(function(e) {
	var elm = $('ul:first', this);

	var off = elm.offset();
	var l = off.left;

	var w = elm.width();
	var docW = $("#page").width();
	var isEntirelyVisible = (l + w <= docW);

	if (!isEntirelyVisible) {
		$(this).addClass('edge');
	} else {
		var menu = $(this);
		setTimeout(function() {
			$(menu).removeClass('edge');
		}, 1000);

	}
}, function(e) {
	// on mouse out action...

});

/********** UNM Panel  *******/
/* Add UNM Panel Container */
function addPanel() {
	jQuery("body").append('<div id="unm_panel" class="hidden-xs hidden-sm"><div class="container"></div></div>');
	jQuery("#toolbar-nav").append('<li class="unm_panel_open hidden-sm"><a href="#panel">more <span class="caret"></span></a></li>');

	jQuery('.unm_panel_open').click(function(event) {
		event.preventDefault();
		$('.unm_panel_open .caret').toggleClass("up");
		$("#unm_panel").slideToggle('slow');
	});
}

/* Loading JSON objects using JSON */
$(function($) {

	$.getJSON('//webcore.unm.edu/json.php?content=v2/unm-panel.html').done(function(data) {
		addPanel();
		$("#unm_panel .container").append(data.content);
	}).fail(function(xhr, err, exception, status) {
		console.log('Error data:', err);
		console.log(status + " " + exception);
		console.log("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
	});
});

/**********Load Lobo Alerts  *******/
/* Loading JSON objects using JSONP */
$(function($) {
	var url = '//webcore.unm.edu/v2/loboalerts.json';
	$.getJSON(url).done(function(data) {
		if (data.alert != 'none') {
			$(".navbar-unm").after('<div id="loboalert" class="alert alert-danger row"><span class="fa fa-warning col-md-1"> </span><div class="content col-md-11"></div></div>');
			$("#loboalert .content").append('<hgroup><h2>' + data.alert + '</h2><h3>' + data.date + '</h3></hgroup>');
			$("#loboalert .content").append('<p>' + data.details + ' <a href="' + data.link + '">Read More</a></p>');
		} else {
			console.log('No Active LoboAlerts');
		}
	}).fail(function(xhr, err, exception, status) {
		console.log('Error data:', err);
		console.log(status + " " + exception);
		console.log("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
	});
});

/********** Scroll to Top *******/
$(function($) {
	$("#totop").click(function() {
		$("html, body").animate({
			scrollTop : 0
		}, "slow");
		return false;
	});
	$(window).scroll(function() {
		if ($(window).scrollTop() > 200) {
			$('#totop').fadeIn();
		} else {
			$('#totop').fadeOut();
		}
	});
});
