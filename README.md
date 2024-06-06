# Passport Local

## 1. Passport
Passport is a middleware that you can incorporate into your Express application’s request/response cycle. It’s added to the pipeline before the routes that require authentication. Passport authenticates the user’s request and attaches the user object to the request, allowing subsequent middleware and route handlers to access user information.

## 2. Authentication Strategies
Passport supports multiple authentication strategies, each corresponding to a different method of authentication, such as username/password, OAuth, JWT (JSON Web Tokens), and more. Each strategy is encapsulated in a separate module, making it easy to add or switch authentication methods without changing your application’s core logic.

## 3. Serialization and Deserialization
Passport provides methods for serializing and deserializing user objects. Serialization involves transforming the user object into a format that can be stored in a session or a token, and deserialization is the process of retrieving the user object from the session or token.
In `serializeUser()` we can determine which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as `req.session.passport.user = {}`

To sum it up, `passport.serializeUser()` saves the user inside the session which was earlier created by express-session middleware.

Passport uses serializeUser function to persist user data (after successful authentication) into session. The function deserializeUser is used to retrieve user data from session and perform some condition-based operation.

## 4. Authentication Flow
Passport simplifies the authentication process into a series of straightforward steps. Typically, a user’s authentication request is handled by a route or controller. Passport middleware processes the authentication strategy and, if successful, attaches the authenticated user to the request. If authentication fails, Passport handles the failure gracefully.

## 5. Session Management
Passport can work with session-based authentication, which involves storing user data in a session on the server after successful authentication. This allows the user to remain authenticated across subsequent requests until the session expires or is explicitly terminated

[For Setup Passport](https://medium.com/@mohan.velegacherla/how-to-setup-passport-authentication-in-node-js-with-example-using-express-js-bf44a51e8ca0)
