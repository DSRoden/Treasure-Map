'use strict';

var Treasure = require('../models/treasure.js'),
    mp = require('multiparty');

exports.index = function(req, res){
  res.render('treasures/index');
};

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.create = function(req,res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(fields, files, function(){
      console.log(fields);
      console.log(files);
      res.redirect('/treasures/');
    });
 });
};
