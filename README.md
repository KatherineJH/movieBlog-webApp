# My Movie Blog: Movie Blog Web Application
## Introduction
#### My Movie Blog is web application that is deveopled with MERN stack. By using this app, you can check movie details, leave comments, fork movied in the liked list, like/dislike movies and post a movie blog. <br> There are famous movie websites but they just have a blog page for them, not for users. So, you can write your movie diary with photo on this site. Now you can leave your memories about movie, your feelings and so on.

#### * Deployed website URL <br> https://secret-waters-71685.herokuapp.com/

## Instruction
#### 0. Check you aleady installed react js and node js. And MongoDB cluster also must be prepared to connect with server. 

#### 1. Download the zip of code, unzip folder and ompen the folder with a text editor like Visual Studio Code or Atom. I used VSC.

#### 2. Command line in terminal, <br> $ npm install

#### 3. and then move the directory to client, <br> $ cd client <br> command line, <br> $ npm install <br> then go back to the previous directory, <br> $ cd ..

#### 4. Create a file develop.js in server/configuration folder. place your mongoDB details in (your Name), (your Password) and (your clustername). <br> 👇👇👇👇👇 <br> module.exports = { mongoURI : 'mongodb+srv://(your Name):(your Password)@(your clustername).noejq.mongodb.net/?retryWrites=true&w=majority' }

#### 5. Command line, <br> $ run npm dev <br> React and back-end server both will be connected.