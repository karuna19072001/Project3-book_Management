const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const BookController = require("../controllers/bookController")
const ReviewController =require("../controllers/reviewController")
const authenticate1 = require('../middleware/auth')

router.post("/register" , UserController.createUserData)

router.post("/login", UserController.loginUser)
 
router.post("/books",authenticate1.authenticate, BookController.createBook)
router.get("/books", authenticate1.authenticate, BookController.getBook)
router.get("/books/:bookId",authenticate1.authenticate, BookController.getBookById)
router.put("/PUT/books/:bookId",authenticate1.authorization, BookController.updateBooks)
router.delete("/books/:bookId", authenticate1.authenticate,authenticate1.authorization,BookController.deleteById)
 
router.post("/books/:bookId/review", ReviewController.createReview)
//router.post("/books/:bookId/review", ReviewController.createReview)



module.exports = router;