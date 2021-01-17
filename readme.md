# Assignment 2 - Web API.

Name: Yuxuan Wang

## Features.


...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + Feature 1 - More than 3 new API routes, including a parameterised URL 
 + Feature 2 - Mongo integration
 + Feature 3 - React integration
 + Feature 4 - Basic Authentication and protected routes
 + Feature 5 - Good use of express middleware, for example: error handling
 + Feature 6 - Custom validation using Mongoose
 + Feature 7 - API documentation - Swagger


## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

```bat
git install swagger-ui express
git install swagger-jsdocs

```

## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=5b230487c12ad8014a0c4d46073a454c
mongoDB=mongodb+srv://yuxuangwang:yuxuanwang@cluster0.6b6sg.mongodb.net/yuxuanwang?retryWrites=true&w=majority
SEED_DB=true
SECRET=ilikecake
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A | N/A
| /api/movies/{movieid} | Get a Movie by id| Update the movie by id| N/A | Delete the movie by id
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/genres | Gets a list of genres | N/A | N/A | N/A
| /api/Now_playing | Gets a list of nowplaying movies | N/A | N/A | N/A
| /api/Now_playing/{Now_playingid} | Get the nowplaying movie by id | Update the nowplaying movie by id | N/A | Delete the nowplaying movie by id
| /api/Peoples | Gets a list of famous peoples | N/A | N/A | N/A
| /api/Peoples/{peopleid} | Get the specific people by id | N/A | N/A | N/A
| /api/Top_rated | Gets a list of top_rated movies | N/A | N/A | N/A
| /api/Top_rated/{Top_ratedid} | Get the top_rated movie by id | Update the top_rated movie by id | N/A | Delete the top_rated movie by id
| /api/Upcoming | Gets a list of upcoming movies | N/A | N/A | N/A
| /api/Upcoming/{Upcomingid} | Get the upcoming movie by id | Update the upcoming movie by id | ... | Delete the upcoming movie by id
| /api/users | get all users | Register or authenticate a user | N/A | N/A
| /api/users/{userid} | N/A | N/A | Update a user | N/A
| /api/users/{userName}/favourites | Get user favourite movie list | post a movie to favourite list | N/A | N/A
| /api/users/{userName}/watchlist | Get user movie watchlist | post a movie to watchlist | N/A | N/A
| ... | ... | ... | ... | ...



If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).


## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.

```bat
import passport from 'passport';
import passportJWT from 'passport-jwt';
import UserModel from './api/users/userModel';
import dotenv from 'dotenv';


dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;
const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
    const user = await UserModel.findByUserName(payload);
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
passport.use(strategy);

export default passport;



 const user = await User.findByUserName(req.body.username).catch(next);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                // if user is found and password is right create a token
                const token = jwt.sign(user.username, process.env.SECRET);
                // return the information including token as JSON
                res.status(200).json({
                    success: true,
                    token: 'BEARER ' + token,
                });
            } else {
                res.status(401).json({
                    code: 401,
                    msg: 'Authentication failed. Wrong password.'
                });
            }
        });
```

Protected routes:
+ Get /api/movies/{movieid}
+ Get /api/movies/{movieid}/reviews
+ Delete /api/movies/{movieid}
+ Get /api/Now_playing/{Now_playingid}
+ Get /api/Top_rated/{Top_ratedid}
+ Get /api/Upcoming/{Upcomingid}
+ Post /api/users/:username/favourites
+ Post /api/users/:username/watchlist

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then(res => res.json())
    .then(json => {return json.results;});
};

export const getUpcomingMovies = () => {
  return fetch(
    '/api/Upcoming', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getTop_ratedMovies = () => {
  return fetch(
    '/api/Top_rated', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getNow_playingMovies = () => {
  return fetch(
    '/api/Now_playing', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getPeoples = () => {
  return fetch(
    '/api/Peoples', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};
~~~

React App repo: https://github.com/yxwang0013/wad2-moviesApp

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

Custom password verification. The password set during user registration must have letters and numbers and more than five digits, otherwise registration fails

```bat
if (req.query.action === 'register') {
        const psd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        if (psd.test(req.body.password)) {
            await User.create(req.body).catch(next);
            res.status(201).json({
                code: 201,
                msg: 'Successful created new user.',
            });
        } else {
            res.status(401).json({
                code: 401,
                msg: 'Password is illegal.',

            });
        }
```

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  

I build the swagger document in Heroku and implement the swagger with the swagger in this assignment

![][swagger1]
![][swagger2]

# Assignment 2 - Agile Software Practice.

Name: Yuxuan Wang

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Get /api/movies/:id/reviews - return one speciific move reviews
+ Delete /api/movies/:id - delete one movie by finding it use its id  
+ Get /api/Now_playing/ - returns an array of nowplaying movie objects.
+ Get /api/Now_playing/:id - returns detailed information on a nowplaying movie by id.
+ Get /api/Top_rated/ - returns an array of top_rated movie objects.
+ Get /api/Upcoming/ - returns an array of upcoming movie objects.
+ Get /api/Upcoming/:id - returns detailed information on the upcoming movie by id.
+ Get /api/users - get all users
+ Post /api/users - add a new user
+ Put /api/users/:id -  update the user's information
+ Post /api/users/:username/favourites - add the user's favoutite movies into the favourites
+ Post /api/users/:username/watchlist - add the user's movies into the watchlist

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Post /api/movies - test when the new movie has no title, invalid release date, empty genre list. Test adding a movie without prior authentication. See tests/functional/api/movies/index.js 
+ Get /api/movies - test when the token is invalid-unauthorized and token is valid.- See tests/functional/api/movies/index.js
+ Get /api/movies/:id - test when the user enter a invalid movies id(not in the database). See tests/functional/api/movies/index.js
+ Put /api/users/:id - test when the password in the request body is invalid. See tests/functional/api/users/index.js

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://movies-api-stage.herokuapp.com/ - Staging deployment
+ https://movies-apimaster1.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][masterapp]

[If an alternative platform to Heroku was used then show the relevant page from that platform's UI.]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.


[stagingapp]: ./img/stagingapp.png
[masterapp]: ./img/masterapp.png
[swagger1]: ./img/swagger1.png
[swagger2]: ./img/swagger2.png