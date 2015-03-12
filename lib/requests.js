var request = require('request');
var url = require('url');

var MakeRequest = function(access_token){ 
  var access_token;
  this.access_token = access_token;
 }

MakeRequest.prototype.mailboxes = function(params, callback){
 /*
   * @params:
   * @ param : if user wants to call specific mailbox e.g. : /
   * @ callback: function to pass the following parameters to:
   *    @error
   *    @response
   *    @body
   */
  return makeRequest('https://api.slice.com/api/v1/mailboxes', params, callback); 
}

MakeRequest.prototype.users = function(params, callback){
  return makeRequest('https://api.slice.com/api/v1/users', params, callback);
}

MakeRequest.prototype.orders = function(params, callback){
  return makeRequest('https://api.slice.com/api/v1/orders', params, callback);
}

MakeRequest.prototype.items = function(params, callback){
  return makeRequest('https://api.slice.com/api/v1/items', params, callback);
}

MakeRequest.prototype.shipments = function(params, callback){
  return makeRequest('https://api.slice.com/api/v1/shipments', params, callback);
}

MakeRequest.prototype.recalls = function(params, callback){
  return makeRequest('https://api.slice.com/api/v1/recalls', params, callback);
}

MakeRequest.prototype.emails = function(params, callback){
  return makeRequest('https://api.slice.com/api/v1/emails', params, callback);
}

MakeRequest.prototype.merchants = function(params, callback){
  return makeRequest('https://api.slice.com/api/v1/merchants', params, callback);
}

MakeRequest.prototype.actions = function(params, callback){
  //post request... can wait till later
}
var makeRequest = function(url, params, callback){
  var access_token = authenticate.getAccessToken();
  var refresh_token = authenticate.getRefreshToken();
  (!access_token && refresh_token) ? var access_token = authenticate.authenticateWithRefreshToken() : var access_token = authenticate.authenticateWithAuthCode();
  var params ? this.params=params : params='';
  request({
    uri : url.resolve(url, params),
    method : 'GET',
    timeout : 1000,
    followRedirect : true,
    maxRedirects : 4,
  }, function(error, response, body){
    callback(error, response, body);
  });
}

module.exports = MakeRequest;
