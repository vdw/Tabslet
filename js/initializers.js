// Run javascript after DOM is initialized
$(document).ready(function() {

	$('.tabs_default').tabslet();

	$('.tabs_hover').tabslet({
		mouseevent: 'hover',
		attribute: 'href',
		animation: false
	});

	$('.tabs_animate').tabslet({
		mouseevent: 'click',
		attribute: 'href',
		animation: true
	});

});