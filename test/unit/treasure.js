/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasures-chest';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new treasure object', function(){
       var t = {name: ['silver'], loc:['new york 4','0','0'], difficulty: ['1'], order: ['3'], hints:['a', 'b', 'c'], tags: ['tag1, tag2']},
       treasure = new Treasure(t);
      console.log(t);
      expect(treasure).to.be.instanceof(Treasure);
      expect(treasure.name).to.equal('silver');
      expect(treasure.loc.name).to.equal('new york 4');
      expect(treasure.difficulty).to.equal(1);
      expect(treasure.hints).to.have.length(3);
      expect(treasure.photos).to.have.length(0);
      expect(treasure.tags).to.have.length(2);
      expect(treasure.isFound).to.be.false;
    });
  });

  describe('#save', function(){
    it('should save an object to treasures', function(done){
       var t = {name: ['silver'], loc:['new york 4', '0', '0'], difficulty: ['1'], order: ['3'], hints:['a', 'b', 'c'], tags: ['tag1, tag2']},
       treasure = new Treasure(t);
       treasure.save(function(){
        Treasure.query({},{},function(err, treasures){
          expect(treasures).to.have.length(4);
          done();
        });
      });
    });
  });

  describe('.all', function(){
    it('should get all treasures', function(done){
      Treasure.query({}, {}, function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a treasure by an id', function(done){
      Treasure.findById('000000000000000000000001', function(err, o){
        expect(o.name).to.equal('gold');
        done();
      });
    });
  });

  describe('.found', function(){
    it('should declare a treasure found', function(done){
      Treasure.found('000000000000000000000001', function(){
        Treasure.findById('000000000000000000000001', function(err, treasure){
          expect(treasure.isFound).to.be.true;
          done();
        });
      });
    });
  });

  //describe('.create', function(){
    //it('should create a new treasure', function(done){
      //Treasure.create({name: ['silver'], loc:['new york 4', '0', '0'], difficulty: ['1'], order: ['3'], hints:['a', 'b', 'c'], tags: ['tag1, tag2']})
      //;
    //});
  //});
});

