const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const BookController = require("../controllers/bookController")
const ReviewController =require("../controllers/reviewController")
const authenticate1 = require('../middleware/auth')

router.post("/register" , UserController.createUserData)

router.post("/login", UserController.loginUser)
 
router.post("/books", BookController.createBook)
router.get("/books",  BookController.getBook)
router.get("/books/:bookId",authenticate1.authenticate, BookController.getBookById)
router.put("/books/:bookId", BookController.updateBooks)
router.delete("/books/:bookId", authenticate1.authenticate,BookController.deleteById)
 
router.post("/books/:bookId/review", ReviewController.createReview)
router.put("/books/:bookId/review/:reviewId", ReviewController.UpdateReview)
router.delete("/books/:bookId/review/:reviewId", ReviewController.deleteReview )



module.exports = router;