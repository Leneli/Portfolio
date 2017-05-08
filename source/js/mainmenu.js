//Main menu
//jQuery
$(function() {
	$('#toggle').on('click', function () {
		$(this).toggleClass('hamburger_on');
		$('#main-menu').toggleClass('main-menu_target');
	});
});
