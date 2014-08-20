'use strict';

var Mongo = require('mongodb');

function Treasure(o){
  this.name            = o.name;
  this.loc             = o.loc;
  this.difficulty       = parseInt(o.difficulty);
  this.order           = parseInt(o.order);
  this.hints           = makeArray(o.hints);
  this.photos          = [];
  this.tags            = o.tags.split(',').map(function(tag){return tag.trim();});
  this.isFound         = false;

}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.query = function(query, sort, cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err, t){
    cb(err, t);
  });
};

Treasure.found = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.update({_id:_id}, {$set: {isFound: true}}, cb);
};


module.exports = Treasure;

//Private Helper Function

function makeArray(o){

  var hintsKeys = Object.keys(o),
      hints = [];

  for(var i = 1; i <= hintsKeys.length; i++){
    hints.push(o[i]);
  }
  return hints;
}

