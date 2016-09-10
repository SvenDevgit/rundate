var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('RunDate', function() {

   it('should say hallo world on GET', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                done();
            });
    });

    it('should list rundates on GET', function(done) {
        chai.request(app)
            .get('/rundates')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                done();
            });
    });

    it('should add a rundate on POST', function(done) {
        chai.request(app)
            .post('/rundates')
            .send({"date": "12-10-2016","route":"very nice","organizer":"Mandy Chang","distance":"15K","speed":"13 km/h","text":"For the experienced runner"})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                done();
            });
    });  

    it('should add a participant on POST', function(done) {
        chai.request(app)
            .post('/participants')
            .send({"name": "Stanislav Edberg", "remark": "Enjoy the run"})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                done();
            });
    });   

});
