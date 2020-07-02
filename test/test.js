
process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();


chai.use(chaiHttp);


describe('/', function() {
  it('should list catagory of product anh some event on / GET', function(done){
    chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
});