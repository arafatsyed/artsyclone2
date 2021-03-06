App link: https://cryptic-citadel-45712.herokuapp.com/

Welcome to Artsy!

Below we have included an overview of our web app features, instructions on how to use it, and any other details you may need to know to use it.

Disclaimer1: This app was created using React. To run cd into the artsy folder, and run npm install and npm start

Our web app has 6 different pages. 

The home page is where users will start, it displays the 3 winners for last week's challenge. Below that there is a quick explanation on how our web page works. You start by competing in weekly drawing challenges, after submitting your art it gets uploaded to the explore page. This is where any user can vote for their favourite pieces of the week. The top voted pieces for each week gets featured at the top of our home page. The home page includes links to the canvas, explore, and shop page.

The profile page requires the user to first log in with their credentials. (standard user: "user", "user", admin: "admin", "admin"). For users, after logging in the profile shows your submitted art pieces along with the number of votes each piece received. These art pieces can be clicked on individually to enlarge. The profile also includes a profile picture, status, and details such as number of posts, votes, etc. On the profile page there are also 3 buttons, one to edit the profile, one that links to our canvas page, and one to log out. These buttons are only visible if you are viewing your own profile, not if you are on someone elses. For admins the profile page includes a list of all the current profiles. They can ban a by inputting the username and clicking ban. There is
also an area to change the weekly challenge.

If the user does not already have an account there is a register button at the beginning of this page. It requires the user to input a username, password, profile name, and asks them
to verify their password. After inputting all of these the user can create an account.

The explore page displays the submissions from the current week's challenge. User can vote on which ones they like best by clicking the heart icon under each photo. The photos can also be enlarged by clicking on them. Under each picture, the user who created the art is listed.

The leaderboard page displays the users with the most votes of all time. It shows their ranks, usernames, and all time vote number. The usernames can be clicked to go to their profile page. (This functionality was not completed due to time constraints)

The canvas page has a built in free hand drawing canvas for our users to create their artwork on. We include a paintbrush and eraser tool and the colour can be changed using our colour picker. There are buttons for resetting the canvas, and temporarily saving/loading your work. The save button will save your current canvas and anytime you click load the canvas will then return to that saved canvas state. When the page is exited the canvas is no longer stored. The final button is for submitting your work to the explore page as well as your profile. If you click it, it will push the image of your canvas to the explore/profile page and reset the canvas for you.

The shop page shows the top 3 winners from last week's challenge. Users can choose which art piece they would like, and on what merchandise they would like the art to be on. They can choose between a t-shirt, mug, and hoodie. Once you make a selection, a preview of your choice will be displayed along with the price and a button to make the purchase.

#How to use
Start on the home page and read through the quick intro of our website by scrolling down. You can get started by going to any of the pages linked at the top right. To log in you can go to the profile page and get started with creating your own artwork by going to the canvas page. After creating your art with the given tools, you can then upload your work to the global explore page. On the explore page you can also check out other user's art and vote for the ones you like best. To check out some of the all time most popular users go to the leaderboard page, and to purchase an item with art imprinted on top, go to the shop page to make your purchase.

#Libraries Used
React Sketch Canvas library
React Icons
React Modal
React Slick
React Router DOM

References for images used:
https://mixkit.co/free-stock-art/discover/city/
https://www.flaticon.com/authors/freepik

POST /users/login: 
user for logging in, checks if users password is correct and if username exists
{
    username: "",
    password: ""
}

GET /users/check-session:
checks to see if user's logged in and sends back the cookie information

PATCH /api/changeprofilename:
changes user's profile name
{
    newName: ""
}

PATCH /api/changebio:
changes user's bio
{
    newBio: ""
}

GET /api/init-challenge:
sets up winners of previous challenge and gets the current challenge

GET /api/getExploreElems:
gets all the posts of the current challenge

PATCH /api/update-challenge:
updates the current challenge to the admin's input and updates the winners of this challenge
{
    currChallenge: "",
    nextChallenge: ""
}

POST /api/insertphoto/manual/:userid:
helper function to help populate database with initial images, retrieves the chosen picture from cloudinary and creates a new post for the given user
URL parameters:
{
    "public_id": "",
    "public_url": "",
    "photoname": "",
    "challenge": "",
    "num_likes": ""

}

DELETE /api/remove-user:
given a username, find the user, remove the user and the user's posts and then return the new array of remaining posts
{
    usertoRemove: ""
}

GET /api/all-users:
gets all the users registered

PATCH /api/likeevent:
when a user likes a post it updates the # of likes for that post and adds the user to a list of users that have liked this post
user must be logged in to do this because it requires cookie data
{
    photo_id: ""
}

PATCH /api/dislikeevent:
when a user unllikes a post it updates the # of likes for that post and removes the user from the list of users that have liked this post
user must be logged in to do this because it requires cookie data
{
    photo_id: ""
}

POST /images:
connects to the cloudinary API, uploads the base64 image, and sets up the user post
{
    img: ""
}

POST /api/createaccount:
adds the new entry to the user database with the username and hash password, creates a user profile
{
    username: "",
    password: "",
    userprofilename: "",
    admin: ""
}

POST /api/getprofilebyid:
gets the profile of user by userid
{
    userid: ""
}

GET *:
any other URL redirects the react app

