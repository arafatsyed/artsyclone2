/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
   const mongoose = require('mongoose')

   /* Connnect to our database */
   // Get the URI of the local database, or the one specified on deployment.
   const cloud = 'mongodb+srv://artsydb:1234@artsy.4sulp.mongodb.net/Artsy'
   const local = 'mongodb://localhost:27017/Artsy';
   const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://artsydb:1234@artsy.4sulp.mongodb.net/Artsy';
   
   mongoose.connect(mongoURI);
   
   module.exports = { mongoose }  // Export the active connection.