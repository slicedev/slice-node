# slice-node
Slice's native node.js SDK

--------
[![NPM](https://nodei.co/npm/slice-node.png?downloads=true)](https://npmjs.org/package/slice-node)

Usage
===

Install the module by calling:

`npm install slice-node`

To create a new instance of the Slice object call:

` var slice = new Slice('OAuth', YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_CALLBACK_URL);`

To get the authentication URL:

` var url = slice.auth.getAuthUrl()`

Redirection must be handled manually.  It is the developer's responsibility to ensure that the user is redirected to the Slice login page. 

After the callback, you may obtain the access token for a user by calling:

`var token = slice.auth.authenticateWithAuthCode(code);`

Where `code` is the code passed via URL parameter after the callback.

Once the token is obtained, set the access token to the Request object by calling:

`slice.request.setAccessToken(token)`

Once the request object is instantiated, call the following function:

`slice.request.users('/self', null, function(error, response, body){
      console.log(body);
    }
    )`

This completes the Hello World as described on [our site](https://developer.slice.com/docs/hello)!  Congrats, you're now ready to make requests!

This SDK does not replace the use of server frameworks like [Express](http://expressjs.com).  It is meant to complement them.  

Email [api@slice.com](mailto:api@slice.com) with any questions!

