var request = require('request');
var url = require('url');
var authenticate = require('./oauthentication');

var Request = function(obj){
  this.obj = obj;
};

Request.prototype.mailboxes = function(method, specific_url, params, callback){
 /*
   * @params:
   * @ param : if user wants to call specific mailbox e.g. : /
   * @ callback: function to pass the following parameters to:
   *    @error
   *    @response
   *    @body
   */
  makeRequest(this, method, 'https://api.slice.com/api/v1/mailboxes', specific_url, params, callback); 
};

Request.prototype.users = function(method, specific_url, params, callback){
  makeRequest(this, method, 'https://api.slice.com/api/v1/users', specific_url, params, callback);
};

Request.prototype.orders = function(method, specific_url, params, callback){
  makeRequest(this, method, 'https://api.slice.com/api/v1/orders', specific_url, params, callback);
};

Request.prototype.items = function(method, specific_url, params, callback){
  makeRequest(this, method, 'https://api.slice.com/api/v1/items', specific_url, params, callback);
};

Request.prototype.shipments = function(method, specific_url, params, callback){
  makeRequest(this, method, 'https://api.slice.com/api/v1/shipments', specific_url, params, callback);
};

Request.prototype.recalls = function(method, specific_url, params, callback){
  makeRequest(this, method, 'https://api.slice.com/api/v1/recalls', specific_url, params, callback);
};

Request.prototype.emails = function(method, specific_url, params, callback){
  makeRequest(this, method, 'https://api.slice.com/api/v1/emails', specific_url, params, callback);
};

Request.prototype.merchants = function(method, specific_url, params, callback){
  makeRequest(this, method, 'https://api.slice.com/api/v1/merchants', specific_url, params, callback);
};

Request.prototype.actions = function(method, specific_url, params, callback){
  makeRequest(this, method, 'https://api.slice.com/api/v1/actions/update', specific_url, params, callback);
};

Request.prototype.setAccessToken = function(access_token){
  this.access_token = access_token;
}
var makeRequest = function(obj, method, url, specific_url, params, callback){
  this.params = params || '';
  this.param_url = compileRequest(this.params);
  this.method = method || 'GET'; // defaults to 'GET'
  this.specific_url = specific_url || '';
  request({
    uri : url+this.specific_url+this.params,
    headers : {
      'Authorization' : 'Bearer ' + obj.access_token
    },
    method : this.method,
    timeout : 1000,
    followRedirect : true,
    maxRedirects : 4,
  }, function(error, response, body){
      if(error){
        throw error;
      }
    callback(error, response, body);
  });
};

var compileRequest = function(params){
  var param_url = '?';
  for(var key in params){
    param_url += key + '=' + params[key] + '&';
  }
  return param_url.substring(0, param_url.length-1);
};

module.exports = Request;
module.exports.users = Request.users;
module.exports.mailboxes = Request.mailboxes;
module.exports.orders = Request.orders;
module.exports.items = Request.items;
module.exports.shipments = Request.shipments;
module.exports.recalls = Request.recalls;
module.exports.emails = Request.emails;
module.exports.merchants = Request.merchants;
module.exports.actions = Request.actions;

