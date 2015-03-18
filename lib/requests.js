var request = require('request');
var url = require('url');
var authenticate = require('./oauthentication');

var Request = function(auth){ 
  this.auth = auth;
 }

Request.prototype.mailboxes = function(specific_url, params, callback){
 /*
   * @params:
   * @ param : if user wants to call specific mailbox e.g. : /
   * @ callback: function to pass the following parameters to:
   *    @error
   *    @response
   *    @body
   */
  makeRequest('https://api.slice.com/api/v1/mailboxes', specific_url, params, callback); 
}

Request.prototype.users = function(specific_url, params, callback){
  makeRequest('https://api.slice.com/api/v1/users', specific_url, params, callback);
}

Request.prototype.orders = function(specific_url, params, callback){
  makeRequest('https://api.slice.com/api/v1/orders', specific_url, params, callback);
}

Request.prototype.items = function(specific_url, params, callback){
  makeRequest('https://api.slice.com/api/v1/items', specific_url, params, callback);
}

Request.prototype.shipments = function(specific_url, params, callback){
  makeRequest('https://api.slice.com/api/v1/shipments', specific_url, params, callback);
}

Request.prototype.recalls = function(specific_url, params, callback){
  makeRequest('https://api.slice.com/api/v1/recalls', specific_url, params, callback);
}

Request.prototype.emails = function(specific_url, params, callback){
  makeRequest('https://api.slice.com/api/v1/emails', specific_url, params, callback);
}

Request.prototype.merchants = function(specific_url, params, callback){
  makeRequest('https://api.slice.com/api/v1/merchants', specific_url, params, callback);
}

Request.prototype.actions = function(specific_url, params, callback){
  //post request... can wait till later
}
var makeRequest = function(url, specific_url, params, callback){
  var access_token = this.auth.getAccessToken();
  var refresh_token = this.auth.getRefreshToken();
  (!access_token && refresh_token) ? access_token = this.auth.authenticateWithRefreshToken() : access_token = this.auth.authenticateWithAuthCode();
  (params = '') ? params='' : this.param_url = compileRequest(params);
  (specific_url = '') ? specific_url = '' : this.specific_url = specific_url;
  request({
    uri : url+this.specific_url+this.params,
    method : 'GET',
    timeout : 1000,
    followRedirect : true,
    maxRedirects : 4,
  }, function(error, response, body){
    callback(error, response, body);
  });
}

var compileRequest(params){
  var param_url = '?'
  for(var key in params){
    param_url += key + '=' + params[key] + '&';
  }
  return param_url.substring(0, param_url.length-1);
}

module.exports = Request;
