# Expense Tracker
The application can be viewed [here](https://khara-expense-tracker.herokuapp.com/). The primary purpose of this project was to use my knowledge of the different technologies in the MERN stack and bring them all together into a single application.
Hence, this web app is brocken down into two parts, client and server. The client is built using [React](https://reactjs.org/) ([w/ Redux](https://redux.js.org/)) 
and the server is built using [NodeJS](https://nodejs.org/en/) ([w/ express](https://expressjs.com/)). 
At the rudimentary level, this web app helps users keep track of their expenses. But the goal of this project is to learn and apply different web technologies instead of competing with other expense trackers (like Expensify). Let us discuss all the technologies I have used for the different features of the application.

## Features
- Client Side Rendering - [React](https://reactjs.org/) ([w/ Redux](https://redux.js.org/))
- Authorization - [JWT](https://jwt.io/)
- Authentication - [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- Database Querying and Hosting - [MonogDB](https://www.mongodb.com/) ([w/ Mongoose](https://mongoosejs.com/)) 
- Styling - [SCSS](https://sass-lang.com/)
- Custom API - [NodeJS](https://nodejs.org/en/)
- Cloud Deployment - [Heroku](https://www.heroku.com/)

## IMPORTANT
This repository is the production build. Hence, it is not recommended to try and run this application from source. This repository is missing some esssential components
required for the application to run. For example environment variables such as JWT_TOKEN and MONGODB_URL. These env variables are stored on a local dev.env file and for
obvious reasons, this file has not been comitted to this public github repo. 
