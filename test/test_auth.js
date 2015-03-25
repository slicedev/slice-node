process.env.NODE_ENV = 'test';
var OAuthenticate = require('../lib/oauthentication');
var Request = require('../lib/requests');
var express = require('express');
var Browser = require('zombie');
var TestCreds = require('./test_creds');
api = express();
var assert = require('assert');

describe('authentication library', function(){
  before(function(){
    api.get('/callback', function(req, res){
      console.log('here!');
      browser.dump();
      this.code = url.parse(this).code;
      console.log(this.code);
      res.write(200);
    });
    server = api.listen(3000, function(){
      var host = server.address().address;
      var port = server.address().port;
      this.url = 'http://127.0.0.1:'+port;
      console.log(this.url);
    });
    browser = new Browser(this.url);
    this.testcreds = new TestCreds();
  });
  it('should create a new OAuthenticate object', function(done){
    this.oauth = new OAuthenticate(this.testcreds.clientId(), this.testcreds.clientSecret(), this.testcreds.redirectUri());
    assert.notEqual(this.oauth, null);
    done();
  });
    //this.browser.visit(this.oauth.getAuthUrl(), done());
  it('should return null when authenticating if failure', function(){
   this.oauth.authenticateWithAuthCode(null); 
  });
  it('should return null if refresh_token is unset', function(done){
   assert.ifError(this.oauth.getRefreshToken());
   done();
  });
  it('should return null if access_token is unset', function(done){
    assert.ifError(this.oauth.getAccessToken());
    done();
  });
  it('should return null if expires_in is unset', function(done){
    assert.ifError(this.oauth.getExpireTime());
    done();
  });
  it('should return an AuthUrl', function(done){
    this.oauth_url = this.oauth.getAuthUrl();
    done();
  });
  it('AuthUrl should be visitable', function(done){
      this.timeout(0);
      browser.visit(this.oauth_url, function(){
      done();      
    });
  });
  it('should return success', function(done){
      browser.wait().then(function(){
      browser.assert.success();
      done();
      });
  });
  it('should return access_token when authenticating if success', function(done){
    /*browser.clickLink('Google', function(){
     browser.assert.success();
   });
   browser.fill('Email', this.testcreds.username());
   browser.fill('Passwd', this.testcreds.password());
   browser.pressButton('signIn', function(){
    browser.assert.success();     
   });
  */
   this.timeout(0);
   console.log('starting browser');
   browser.
     fill('input[placeholder="Slice Username or Email"]', this.testcreds.username).
     fill('input[placeholder="Slice Password"]', this.testcreds.password);
     //evaluate("$('#button')[0].click()");
     //pressButton('LOG IN').then(function(){
    //  browser.assert.success();
   //});
     /*browser.wait(browser.fire(target, 'click'), function(){
       browser.resources.dump();
       console.log(this.code);
       this.token = this.oauth.authenticateWithAuthCode(this.code);
       done();
     });*/
    browsedoc = browser.body;
    browsedoc.getElementsByTagName('button')[0].click();
    browser.resources.dump();
    this.token = this.oauth.authenticateWithAuthCode(this.code);
    done();
        // blah blah blah
  });
  it('should update refresh_token, access_token, and expires_in when authenticating with refresh_token', function(done){
    assert.notEqual(this.getAccessToken(), null);
    assert.notEqual(this.getRefreshToken(), null);
    assert.notEqual(this.getExpireTime(), null);
    done(); 
  });

  after(function(done){
    browser.destroy();
    done();
  });
  });

  describe('requests library', function(){
    before(function(){
      var req = new Request(this.token);
    });

    it('should be able to make a request for users', function(done){
      req.users('GET', '/self', null, function(req, res, err){
        assert.notEqual(res, null); //lazy test
        done();
      });
    });
  });

