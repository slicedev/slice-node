var OAuth2 = require('oauth').OAuth2;
var url = require('url');


var OAuthenticate = function(client_id, client_secret, redirect_uri){
  var client_id;
  var client_secret;
  var redirect_uri;
  var access_token;
  var refresh_token;
  var expires_in;
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.redirect_uri = redirect_uri;
  this.oauth = new OAuth2(
    this.client_id, 
    this.client_secret, 
    'https://api.slice.com',
    null,
    '/oauth/token' 
  );
}

OAuthenticate.prototype.getAuthUrl = function(){
  return this.oauth.getAuthorizeUrl({
    redirect_uri : this.redirect_uri
  });
}

OAuthenticate.prototype.authenticateWithAuthCode = function (token){
   this.oauth.getOAuthAccessToken(token, {'grant_type':'authorization_code'}, function(e, access_token, refresh_token, results){
    this.access_token = access_token;
    console.log(access_token);
    this.refresh_token = refresh_token;
    console.log(refresh_token);
    return this.access_token;
  });
}

OAuthenticate.prototype.getRefreshToken = function(){
  return this.refresh_token;
}

OAuthenticate.prototype.getAccessToken = function(){
  return this.access_token;
}

OAuthenticate.prototype.authenticateWithRefreshToken = function(){
  var oauth = new OAuth2(client_id, client_secret, 'https://api.slice.com', null, '/oauth/token', {'redirect_uri': this.redirect_uri});
  oauth.getOAuthAccessToken(refresh_token, {'grant_type':'refresh_token'}, function(e, access_token, refresh_token, results){
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    results = url.parse(results);
    this.expires_in = Math.round(new Date.getTime() / 1000) + results.expires_in;
    return this.access_token;
  });
}

OAuthenticate.prototype.isExpired = function(){
  return (this.expires_in >= (new Date.getTime()/1000)) ? false : true;
}

module.exports = OAuthenticate;
