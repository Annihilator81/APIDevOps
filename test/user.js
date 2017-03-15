var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000/");

var test_user = {
    username : "unit_testing_user",
    password : "password",
    email : "test@test.com"
};

describe("User (and friendship) unit test", function() {

    it("should reject /friendship without token", function(done) {
        server
        .get("friendship")
        .expect(401)
        .end(function(err, res) {
            res.status.should.equal(401);
            done();
        });
    });

    it("should reject /user without token", function(done) {
        server
        .get("user/")
        .expect(401)
        .end(function(err, res) {
            res.status.should.equal(401);
            done();
        });
    });

    it("should signup a new user", function(done) {
        server
        .post("auth/signup")
        .send(test_user)
        .expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            test_user = JSON.parse(res.text).user;
            test_user.token = JSON.parse(res.text).token;
            done();
        });
    });

    it("should get all users", function(done) {
        server
        .get("users/")
        .set('tmtc-token', test_user.token)
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });

    it("should get all friendships", function(done) {
        server
        .get("friendships/")
        .set('tmtc-token', test_user.token)
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });

    it("should delete an user", function(done) {
        server
        .del('users/' + test_user.id)
        .set('tmtc-token', test_user.token)
        .expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });

     it("should fail removing a non existing user", function(done) {
        server
        .del('users/9999')
        .set('tmtc-token', test_user.token)
        .end(function(err, res) {
            res.status.should.not.equal(200);
            done();
        });
    });

});