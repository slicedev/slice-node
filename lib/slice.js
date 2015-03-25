var OAuthenticate = require('./oauthentication');
var Request = require('./requests');

var Slice = function(method, client_id, client_secret, redirect_uri){
  // serverSide put off until later.
  // method is string "OAuth" or "SSAuth"
  this.auth = new OAuthenticate(client_id, client_secret, redirect_uri);
};
Slice.prototype.auth = this.auth;
Slice.prototype.request = Request;

module.exports = Slice;

