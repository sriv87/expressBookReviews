const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,10));
});

public_users.get('/books', function (req, res) {
    axios.get('https://github.com/sriv87/expressBookReviews/blob/83059787fa0641769b5382272e6ac1a760fb1f96/final_project/router')
        .then(response => {
            res.send(JSON.stringify(books, null, 4));
            console.log("Promise for Task 10 resolved");
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching books:', error);
            res.status(500).send('Error fetching books');
        });
});

public_users.get('/task_10', function(req,res){
    const get_books = new Promise((resolve,reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
    })
    get_books.then(() => console.log("Promise for Task 10 resolved"));


});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });

 public_users.get('/:isbn_task_11', function(req,res){
    const isbn = req.params.isbn_task_11;
    const get_books = new Promise((resolve,reject) => {
        resolve(res.send(books[isbn]));
    })
    get_books.then(() => console.log("Promise for Task 11 resolved"));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const books_keys = Object.keys(books);
  const author = req.params.author;
  for (let i=0;i<books_keys.length;i++){
    if(books[books_keys[i]].author===author){
        res.send(books[books_keys[i]]);
    }
  }
});

public_users.get('/authors/:author_task_12',function (req, res) {
    const books_keys = Object.keys(books);
    const author = req.params.author_task_12;
    console.log(author);
    const get_books = new Promise((resolve,reject) => {
        for (let i=0;i<books_keys.length;i++){
            if(books[books_keys[i]].author===author){
                resolve(res.send(books[books_keys[i]]));
            }
          }
    });
    get_books.then(() => console.log("Promise for Task 12 resolved"));
  });

//Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const books_keys = Object.keys(books);
    const title = req.params.title;
    for (let i=0;i<books_keys.length;i++){
        if(books[books_keys[i]].title===title){
           res.send(books[books_keys[i]]);
        }
      }
});

public_users.get('/titles/:title_task_13',function (req, res) {
    const books_keys = Object.keys(books);
    const title = req.params.title_task_13;
    
    const get_books = new Promise((resolve,reject) => {
        for (let i=0;i<books_keys.length;i++){
            if(books[books_keys[i]].title===title){
                console.log(title)
                resolve(res.send(books[books_keys[i]]));
            }
          }
    });
    get_books.then(() => console.log("Promise for Task 13 resolved"));
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  res.send(books[isbn].reviews)
  
});

module.exports.general = public_users;
