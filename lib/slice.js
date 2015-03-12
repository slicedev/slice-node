var OAuthenticate = require('./oauthentication');
var SSAuthenticate = require('./ssauthenticate');
var MakeRequest = require('./requests');

function Slice(method, client_id, client_secret, redirect_uri){
  // serverSide put off until later.
  // method is string "OAuth" or "SSAuth"
  (method === 'SSAuth') ? var auth = new SSAuthenticate(client_id, client_secret, redirect_uri) : var auth = new OAuthenticate(client_id, client_secret, redirect_uri);
  return auth;
}
Slice.OAuthenticate = OAuthenticate;
Slice.SSAuthenticate = SSAuthenticate;
Slice.MakeRequest = MakeRequest;

module.exports = Slice;

