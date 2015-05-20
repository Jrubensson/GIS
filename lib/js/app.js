var formIsFilled = false;

$('.add-toggle').click(function() {
	$('.overlay-bg').fadeToggle();
	$('.add-toggle img').toggleClass('rotated');
	return false;
});

$('.add-pin-form').click(function() {
	return false;
});

$('.overlay-bg').click(function() {
	$(this).fadeOut();
	$('.add-toggle img').removeClass('rotated');
});


/* När användaren klickar och "submittar" form'en så gömmer vi rutan och ber dom klicka på kartan vart dom vill ha sin pin */

$('.submit-pin-form').click(function() {
	var desc = $('.pin-description').val();
	var name = $('.pin-name').val();
	if(desc != "" && name != "") {
		$('.overlay-bg').fadeOut();
		$('.add-toggle img').removeClass('rotated');
		formIsFilled = true;

		//Vi visar också hjälpen
		$('.show-help').fadeIn();
		$('.help-overlay').fadeIn();
	}
	else {
		alert("Fyll i namn och beskrivning!");
	}


});

$(document).delegate('#map', 'click', function(event) {
	if(formIsFilled) {
		dropPin();
		$('.final-save-button').fadeIn();
	}
});


$('.final-save-button').click(function() {
	$.post('/api/api.php/main/newlocation', $('#pin-form').serialize()).
		done(function(data, textStatus, xhr) {
		
		alert("Din pin är nu tillagd!");

		//Döljer all hjälp
		$('.show-help').fadeOut();
		$('.help-overlay').fadeOut();
		
		//Gör en reset på vårt formulär
		$('#pin-form').trigger('reset');
		formIsFilled = false;

		//Reload the google map
		redrawMap();
	});
});