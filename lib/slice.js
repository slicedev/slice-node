var OAuthenticate = require('./oauthentication');
var Request = require('./requests');

var Slice = function(method, client_id, client_secret, redirect_uri){
  // serverSide put off until later.
  // method is string "OAuth" or "SSAuth"
  this.auth = new OAuthenticate(client_id, client_secret, redirect_uri);
  this.request = new Request(this);
};
Slice.prototype.auth = this.auth;
Slice.prototype.request = this.request;

module.exports = Slice;
module.exports.auth = this.auth;
module.exports.request = this.request;

