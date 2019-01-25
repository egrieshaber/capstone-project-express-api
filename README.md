Field Recording Log - Api

FRL repositories:
FRL - Client: https://github.com/egrieshaber/capstone-project-client
FRL - Api: https://github.com/egrieshaber/capstone-project-express-api


FRL deployed sites:
FRL - Client: https://egrieshaber.github.io/capstone-project-client/
FRL - Api: https://git.heroku.com/warm-plateau-38122.git

What is Field Recording Log?
  Field Recording Log, is a place where users are able to upload their own audio links and share them in a live feed with titles and notes explaining what they want about their recordings.  This provides a meaningful way to share audio recordings and to potentially colaborate with others.

How FRL works.
  Client
    When the user logs in, FRL is able to fetch the entire log database, sorting it by most to least recent.  These logs include those made by the current user and also all other users.  By toggling with a button on the top of the screen, the use is able able to see only their own logs, and also a form in which they are able to create new logs, and update their own audio files to an AWS s3 data storage bucket.

    All log data is processed through handlebars before entering the feed.  The user is able to CRUD their own database using RESTful AJAX routes.

  API
    The FRL Api is built using Express with Mongoose data validation.  It recieves AJAX requests from the client and communicates with the MongoDB database to return responses.

    The Api requires that all users must sign up with a username, email and password.  All logs belong to a user who is also able to update and delete logs that belong to them.  User authenticaton also allows for uploading of files to AWS s3 data storage bucket.

Technologies Used:

Client
  HTML / CSS
  JavaScript
  jQuery
  Ajax
  Handlebars.js
  SASS
  Bootstrap
  Toastr

API
  JavaScript
  Express
  MongoDB
  Mongoose
  Node.js
  AWS

Wireframe: https://projects.invisionapp.com/freehand/document/aKsqDnX3G

ERD: https://projects.invisionapp.com/freehand/document/smziNAdWB

User Stories:
  As a user I want to be able to post a log
  As a user I want to be able to see all my logs
  As a user I want to be able to update and delete my logs
  As a user I want to be able to see other users' logs
  As a user I want to be able to upload audio files to s3
  As a user I want to be able to listen to other users' audio files
  As a user I want to be able to download other users' audio files


Planning
  The first day of my planning process I outlined by basic objectives and workflow in order to meet a Minimum Viable Product.  This process also included drafting a wireframe, ERD, and user stories.

  I spent the first few days building and testing the API for user and logs, and also tested them in the terminal via curl-scripts.  Next, I spent time connecting the front end with continued testing.  After this I established an AWS s3 data storage bucket in order to upload audio files.  Currently I have yet to attach this option to the user logs, and it has become my next immediate goal for this project.

Problem Solving
  I often referred to previous projects and turned to Stack Overflow when I came across difficulties, using error driven development to find my way towards the appropriate resources and solutions.  see also: console logs!

Unfinished work
  My next, immediate goal is to automatically insert html audio players into each user log, in order for users to be able to sample each other's recordings and download as well.
