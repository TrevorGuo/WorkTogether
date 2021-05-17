const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const {
  getAllScreams,
  postOneScream
} = require('./handlers/screams');

const {
  signup,
  login,
  uploadImage,
  addUserDetails
} = require('./handlers/users');

//screams routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);

//users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails);
