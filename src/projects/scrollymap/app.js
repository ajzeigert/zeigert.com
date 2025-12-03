mapboxgl.accessToken = 'pk.eyJ1IjoiYWp6ZWlnZXJ0IiwiYSI6IldLdVhKN1UifQ.43CCALwNLBzVybtPFvcaJQ';

// This is all pretty shamelessly copied from the GL JS docs site:
// https://www.mapbox.com/mapbox-gl-js/example/3d-extrusion-floorplan/

$.ajax({
	url: 'stores.geojson',
	dataType: 'json',
	success: function(data){
		console.log(data);
		var bbox = turf.bbox(data);

		var map = new mapboxgl.Map({
		    container: 'map',
		    style: 'mapbox://styles/mapbox/dark-v9',
		    center: [-121.278969, 44.10901],
		    zoom: 14,
		    pitch: 40,
		    bearing: 20
		});

		data.features.forEach(function(feature, index, array){
			// console.log("feature", feature)
			var card = $("<div id='" + feature.properties.StoreNumber + "' data-id='" + feature.properties.StoreNumber + "' class='panel panel-default'></div>");
			card.append("<div class='panel-heading'>"+ feature.properties.StoreName +"</div>");
			var body = $("<div class='panel-body'></div>")
			body.append($("<p>"+ feature.properties.City + "</p>"))
			body.append($("<p>"+ feature.properties.State + "</p>"))
			body.append($("<p>"+ feature.properties.StreetAddress + "</p>"))
			body.append($("<p>"+ feature.properties.Manager + "</p>"))
			card.append(body)
			$("#cardOverlay").append(card);
			card.waypoint({
				handler: function(direction) {
					// console.log(direction);
					// console.log(this.element.id + ' hit');
					$('.panel').removeClass('active');
					$(this.element).addClass('active');
					console.log(feature)
					map.flyTo({
						center: feature.geometry.coordinates,
						zoom: 9,
						speed: 0.6, // make the flying slow
				        curve: 1, // change the speed at which it zooms out
					});
				},
				context: '#cardOverlay',
				offset: 50
			});
		});


		map.on('style.load', function() {

			map.fitBounds(bbox);

		    map.addSource("stores", {
		        'type': 'geojson',
		        'data': data
		    });

			map.addLayer({
				"id": "points",
		        "type": "symbol",
				"layout": {
		            "icon-image": "star-15",
		            "text-field": "{StoreName}",
		            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
		            "text-offset": [0, -0.7],
		            "text-anchor": "bottom",
					"text-optional": true,
		        },
				"paint": {
					"icon-color": '#ED1C24',
					"text-color": '#fff',
				},
				"source": "stores"
			})

			map.addControl(new mapboxgl.NavigationControl({position: 'top-left'}));

		});
	},
	error: function(error, string, exception){
		console.log(error);
	}
});
