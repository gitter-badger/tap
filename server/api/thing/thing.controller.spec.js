'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Thing = require('./thing.model');

describe('Thing Endpoints', function () {

  beforeEach(function (done) {
    Thing.remove().exec(done);
  });

  after(function (done) {
    Thing.remove().exec(done);
  });

  describe('GET /api/things', function () {
    beforeEach(function (done) {
      Thing.create({name: 'some thing', info: 'some thing'}, done);
    });

    it('responds the list of things', function (done) {
      request(app)
        .get('/api/things')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          res.body.should.have.length(1);
          res.body[0].should.have.properties(['name', 'info']);
          done();
        });
    });
  });

  describe('POST /api/things', function () {
    it('responds the saved thing', function (done) {
      request(app)
        .post('/api/things')
        .send({name: 'New Thing', info: 'test'})
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.name.should.be.equal('New Thing');
          done();
        });
    });
  });

  describe('PUT /api/things/1', function () {
    var id;
    beforeEach(function (done) {
      Thing.create({name: 'Awesome Thing', info: 'test'}, function (err, thing) {
        id = thing._id;
        done(err, thing);
      });
    });

    it('responds the updated thing', function (done) {
      request(app)
        .put('/api/things/'+ id)
        .send({name: 'Updated name'})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.name.should.be.equal('Updated name');
          done();
        });
    });
  });

  describe('DELETE /api/things/:id', function () {
    var id;
    beforeEach(function (done) {
      Thing.create({name: 'Awesome Thing', info: 'test'}, function (err, thing) {
        id = thing._id;
        done(err, thing);
      });
    });

    it('responds 204 status', function (done) {
      request(app)
        .delete('/api/things/' + id)
        .expect(204)
        .end(done);
    });
  });
});
