/**
 * Created by deepak
 */

var request = require('supertest');
var app = require('../../app');
// Creating agent so that we can persist session data
var agent = request.agent(app);

describe('Comment', function(){
    var signup_data = { email : 'temp1@temp.com', password: "temptemp"};
    var cookie = undefined;

    it('should add a new user', function(done){
        request(app)
            .post('/api/v1/user/signup')
            .send(signup_data)
            .expect(201)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    });

    it('should login', function(done){
        agent
            .post('/api/v1/user/login')
            .send(signup_data)
            .expect(204)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
    });

    it('should post a comment', function(done){
        agent
            .post('/api/v1/comment/')
            .send({comment:"comment"})
            .expect(201)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
    });

    it('should get comments', function(done){
        agent
            .get('/api/v1/comment/')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
    });

});
