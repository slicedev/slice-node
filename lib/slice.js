var OAuthenticate = require('./oauthentication');
var Request = require('./requests');

function Slice(method, client_id, client_secret, redirect_uri){
  // serverSide put off until later.
  // method is string "OAuth" or "SSAuth"
  (method === 'SSAuth') ? this.auth = '' : this.auth = new OAuthenticate(client_id, client_secret, redirect_uri);
  return this.auth;
}
Slice.prototype.auth = this.auth;
Slice.prototype.request = Request;

module.exports = Slice;

