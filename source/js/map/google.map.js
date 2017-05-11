//Google map
google.maps.event.addDomListener(window, "load", init);

function init() {
    let mapOptions = {
        center: new google.maps.LatLng(48.821161, 44.621635),
        zoom: 14,
        gestureHandling: "none",
        fullscreenControl: true,
        zoomControl: true,
        disableDoubleClickZoom: true,
        mapTypeControl: true,
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR },
        scaleControl: true,
        scrollwheel: false,
        streetViewControl: false,
        draggable: true,
        clickableIcons: false,
        fullscreenControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
        zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP },
        streetViewControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
        mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#99b16a" }, { "visibility": "on" }] }]
    }

    let mapElement = document.getElementById("map");
    
    mapElement.style.height = window.innerHeight + document.querySelector(".footer").offsetHeight + "px";
    mapElement.style.marginBottom = "-" + document.querySelector(".footer").offsetHeight + "px";

    let map = new google.maps.Map(mapElement, mapOptions);
    let icon = {
        url: "assets/img/icons-png/map_marker.svg",
        scaledSize: new google.maps.Size(42, 56),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 56)
    };
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(48.822576118823534, 44.6399678251953),
        map: map,
        title: "Елена Куклина - разработка современных сайтов",
        icon: icon
    });
};
