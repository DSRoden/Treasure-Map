'use strict';

var Treasure     = require('../models/treasure.js'),
    linkBuilder  = require('../helpers/link-builder'),
    mp           = require('multiparty');

exports.index = function(req, res){
  Treasure.query(req.query, function(err, treasures){
    console.log(treasures);
    res.render('treasures/index', {treasures:treasures, linkBuilder:linkBuilder, query:req.query});
  });
};

exports.init = function(req, res){
  Treasure.count(function(err, order){
    order++;
    res.render('treasures/init', {order:order});
  });
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

exports.show = function(req, res) {
  Treasure.findById(req.params.id, function(treasure){
    res.render('treasures/show', {treasure:treasure});
  });
};

exports.found = function(req, res){
  Treasure.found(req.params.id, function(){
    res.redirect('/treasures');
  });
};

