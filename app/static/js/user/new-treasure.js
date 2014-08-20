/* global google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('#addHint').click(addHint);
  });

  function addHint(){
    var $input = "<input type='text', name='hints' class='form-control'/>";
    $('#hints').append($input);
  }

})();
