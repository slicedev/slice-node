var request = require('request');

module.exports = OAuth2;

// @OAuth2
// @params: client_id, client_secret, redirect_uri, scope, grant_type, response_type, urls => { auth_url: 'auth_url', token_url: 'token_url' }
// @methods: get_auth_url, get_tokens, refresh_tokens
function OAuth2(client_id, client_secret, redirect_uri, scope, urls){
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.redirect_uri = redirect_uri;
  this.scope = scope;
  this.urls = urls;
};

OAuth2.prototype.refresh_tokens = function(refresh_token, callback){
  var options = {
    uri : this.urls.token_url,
    headers : {
      'content-type' : 'application/x-www-form-urlencoded'
    },
    form: {
      client_id : this.client_id,
      client_secret : this.client_secret,
      grant_type : 'refresh_token',
      redirect_uri : this.redirect_uri,
      refresh_token : refresh_token
    }
  };
  if (this.client_id){
    request.post( 
      options,  
      function (error, response, body){
        if(!error) {
          var res = JSON.parse(body);
          var result = {
            access_token : res.access_token,
            refresh_token : res.refresh_token,
            expires_in : Math.round(new Date.getTime() / 1000) + int(res.expires_in)
          };
          callback(tokens);
        } else {
          console.log("ERROR: node-oauth -- "+ error);
        }
      });
  };
};

OAuth2.prototype.get_auth_url = function(){
  var auth_url = this.urls.auth_url+'?';
  if (this.client_id) {
    auth_url += 'client_id='+ this.client_id;
  } if (this.redirect_uri) {
    auth_url += '&redirect_uri='+this.redirect_uri;
  } if (this.scope) {
    auth_url += '&scope='+this.scope;
  } if (this.state){
    auth_url += '&state='+this.state;
  };
  auth_url += '&response_type=code';
  return auth_url;
};

OAuth2.prototype.get_tokens = function(auth_code, callback){
  if(auth_code === null){
    return null;
  }
  var options = {
    url: this.urls.token_url,
    headers: {
      'content-type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Bearer ' + auth_code
    },
    form: {
      client_id : this.client_id,
      client_secret : this.client_secret,
      grant_type: 'authorization_code',
      redirect_uri: this.redirect_uri,
      code: auth_code
    }
  };
  if(this.client_id){
  request.post(
    options, 
    function(error, response, body){
      if(error){
        console.log("ERROR: node-oauth --" + error);
      } else {
        var res = JSON.parse(body);
        this.access_token = res.access_token;
        this.refresh_token = res.refresh_token;
        this.result = {
          access_token : this.access_token,
          refresh_token : this.refresh_token,
          expires_in : Math.round(new Date.getTime() / 1000) + int(res.expires_in)
        };
        callback(this.tokens);
      }
    });
  }
};
