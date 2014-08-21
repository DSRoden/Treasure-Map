/* global google:true, _:true */

(function(){
  'use strict';

  var map,
    directionsDisplay,
    directionsService = new google.maps.DirectionsService();

  $(document).ready(function(){
    directionsDisplay = new google.maps.DirectionsRenderer();
    initMap(42,-740,2);
    directionsDisplay.setMap(map);
    var positions = getPositions();
    positions.forEach(function(loc){
      addMarker(loc.lat, loc.lng, loc.name);
    });
    calcRoute(positions);
  });

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat,lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.Drop});
  }

  function calcRoute(positions){
    var start = _.min(positions, 'order'),
        end = _.max(positions, 'order'),
        waypts = _.cloneDeep(positions);

    console.log(waypts);

    _.remove(waypts, function(point){
      return point.order === start.order;
    });

    _.remove(waypts, function(point){
      return point.order === end.order;
    });

    waypts.sort(function(a,b){
      return a.order - b.order;
    });

    waypts = waypts.map(function(p){
      return {location:p.name, stopover:true};
    });

    console.log(waypts);

    var request = {
    origin: start.name,
    destination: end.name,
    waypoints: waypts,
    optimizeWaypoints: false,
    travelMode: google.maps.TravelMode.DRIVING
  };

    directionsService.route(request, function(response, status){
      if(status == google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
      }
    });
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(o){
      var loc = {};
      loc.name = $(o).attr('data-name'),
      loc.lat = parseFloat($(o).attr('data-lat')),
      loc.lng = parseFloat($(o).attr('data-lng')),
      loc.order = parseInt($(o).attr('data-order'));
      return loc;

    });
    return positions;
  }

})();
