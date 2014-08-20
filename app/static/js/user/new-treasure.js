/* global google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('#addHint').click(addHint);
    $('form').submit(addTreasure);
  });

  function addHint(){
    var $input = "<input type='text', name='hints' class='form-control'/>";
    $('#hints').append($input);
  }

  function send(){
    alert('alert');
  }

  function addTreasure(e){
    var lat = $('#lat').val();
    if(!lat){
      var name = $('#loc').val();
      geocode(name);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      var name = results[0].formatted_address,
          lat = results[0].geometry.location.lat(),
          lng = results[0].geometry.location.lng();

     $('#loc').val(name);
     $('#lat').val(lat);
     $('#lng').val(lng);
     $('form').submit();

   });
  }

})();
