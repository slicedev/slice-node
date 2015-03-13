# slice-node
Slice's native node.js SDK

--------

##Usage

Install the module by calling:

`npm install slice-node`

To create a new instance of the Slice object call:

` var slice = new Slice('OAuth', YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_CALLBACK_URL);`

To get the authentication URL:

` var url = slice.getAuthUrl()`

Redirection must be handled manually.  It is the developer's responsibility to ensure that the user is redirected to the Slice login page. 

After the callback, you may obtain the access token for a user by calling:

`var token = slice.authenticateWithAuthCode(code);`

Where `code` is the code passed via URL parameter after the callback.

Once the token is obtained, instantiate the Request object by calling:

`var request = new Slice.MakeRequest(token)`

Once the request object is instantiated, call the following function:

`request.users('/self', function(error, response, body){
      console.log(body);
    }
    )`

This completes the Hello World as described on [our site](https://developer.slice.com/docs/hello)!  Congrats, you're now ready to make requests!

This SDK does not replace the use of server frameworks like [Express](http://expressjs.com).  It is meant to complement them.  

Email [api@slice.com](mailto:api@slice.com) with any questions!


