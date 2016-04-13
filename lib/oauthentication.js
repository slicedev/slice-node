var url = require('url');
var oauth2 = require('./oauth');

var OAuthenticate = function(client_id, client_secret, redirect_uri){
  var access_token;
  var refresh_token;
  var expires_in;
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.redirect_uri = redirect_uri;
  this.urls = {
    auth_url:'https://api.slice.com/oauth/authorize',
    token_url:'https://api.slice.com/oauth/token'
  };
  this.oauth = new oauth2(
    this.client_id, 
    this.client_secret,
    this.redirect_uri,
    null,
    this.urls
  );
};

OAuthenticate.prototype.getAuthUrl = function(){
  return this.oauth.get_auth_url();
};

OAuthenticate.prototype.authenticateWithAuthCode = function (token){
   this.token = token || null;
   if(this.token === null){
     return null;
   }
   var obj = this;
   this.oauth.get_tokens(token, function(tokens){
    if(tokens === null){
      console.log('slice-node: auth token exchange failed');
      return null;
    }
      obj.access_token = tokens.access_token;
      obj.refresh_token = tokens.refresh_token;
      obj.expires_in = tokens.expires_in;
    });
};

OAuthenticate.prototype.authenticateWithRefreshToken = function(token){
  var obj = this; 
  this.oauth.refresh_tokens(token, function(tokens){
    if(tokens === null){
      console.log('slice-node: token refresh failed');
      return null;
    }
    obj.access_token = tokens.access_token;
    obj.refresh_token = tokens.refresh_token;
    obj.expires_in = tokens.expires_in;   
  }); 
};

OAuthenticate.prototype.isExpired = function(){
  return ((this.expires_in >= (new Date.getTime()/1000)) ? false : true);
};

module.exports = OAuthenticate;
