function setMarkers(map, locations) {
	var infoWindow = null;

	$(locations).each(function(index, place) {

		var contentString = '<div class="info-card">' +
			'<h3><strong>' + place.name + '</strong></h3>' +
			'<p class="author">Inlagd av <strong>' + place.author + '</strong></p>' +
			'<p class="description">' + place.description + '</p>' +
			'<a href="#" class="tour">Ge mig en vägbeskrivning</a>' +
			'' +
			'</div>';


	    var latlng = new google.maps.LatLng(place.lat, place.lng);
	    var marker = new google.maps.Marker({
	        position: latlng,
	        map: map,
	        title: place.name,
	        zIndex: 1,
	        html: contentString
	    });

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(this.html);
			infowindow.open(map, this);
		    map.setZoom(13);
		    map.setCenter(marker.getPosition());
		});

	 });
};

var marker = null, dropPin, map, redrawMap;

/* Google Map */
function initialize() {

	//Create the infoWindow-object, that show info about the location
    infowindow = new google.maps.InfoWindow({
      content: "Laddar..."
    });

    //Options for the map
	var mapOptions = {
	  center: { lat: 61.35930, lng: 15.9735648 }, //Lat = x, lng = y
	  zoom: 12,
	  disableDefaultUI: false,
	  scrollwheel: false,
	};

	//Create the map
	map = new google.maps.Map(document.getElementById('map'), mapOptions);


	dropPin = function() {
		google.maps.event.addListener(map, 'click', function(event) {

		    var lat = event.latLng.lat();
		    var lng = event.latLng.lng();
		    // populate yor box/field with lat, lng
		    $('.input-lng').val(lng);
		    $('.input-lat').val(lat);
		    
		    //Create a new marker
		    if(marker) { marker.setMap(null); }

		    
		    marker = new google.maps.Marker({ position: event.latLng, map: map, draggable: true, animation: google.maps.Animation.DROP, title: 'Ditt event!'});
		});
	};

	//Get the map data
	$.getJSON('/api/api.php/main/getlocations', function(data) {
			/*optional stuff to do after success */
			setMarkers(map, data);
	});
}

redrawMap = function() {
	initialize();
}

//Load the whole Map
google.maps.event.addDomListener(window, 'load', initialize);
