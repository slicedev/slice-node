var request = require('request');
var url = require('url');
var authenticate = require('./oauthentication');

var Request = function(auth){ 
  this.auth = auth;
 }

Request.prototype.mailboxes = function(params, callback){
 /*
   * @params:
   * @ param : if user wants to call specific mailbox e.g. : /
   * @ callback: function to pass the following parameters to:
   *    @error
   *    @response
   *    @body
   */
  makeRequest('https://api.slice.com/api/v1/mailboxes', params, callback); 
}

Request.prototype.users = function(params, callback){
  makeRequest('https://api.slice.com/api/v1/users', params, callback);
}

Request.prototype.orders = function(params, callback){
  makeRequest('https://api.slice.com/api/v1/orders', params, callback);
}

Request.prototype.items = function(params, callback){
  makeRequest('https://api.slice.com/api/v1/items', params, callback);
}

Request.prototype.shipments = function(params, callback){
  makeRequest('https://api.slice.com/api/v1/shipments', params, callback);
}

Request.prototype.recalls = function(params, callback){
  makeRequest('https://api.slice.com/api/v1/recalls', params, callback);
}

Request.prototype.emails = function(params, callback){
  makeRequest('https://api.slice.com/api/v1/emails', params, callback);
}

Request.prototype.merchants = function(params, callback){
  makeRequest('https://api.slice.com/api/v1/merchants', params, callback);
}

Request.prototype.actions = function(params, callback){
  //post request... can wait till later
}
var makeRequest = function(url, params, callback){
  var access_token = this.auth.getAccessToken();
  var refresh_token = this.auth.getRefreshToken();
  (!access_token && refresh_token) ? access_token = this.auth.authenticateWithRefreshToken() : access_token = this.auth.authenticateWithAuthCode();
  (params = '') ? params='' : this.params = params;
  request({
    uri : url+this.params,
    method : 'GET',
    timeout : 1000,
    followRedirect : true,
    maxRedirects : 4,
  }, function(error, response, body){
    callback(error, response, body);
  });
}

module.exports = Request;
