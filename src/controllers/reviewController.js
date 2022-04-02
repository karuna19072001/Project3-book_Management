const reviewModel = require("../models/reviewModel.js")
const bookModel = require("../models/bookModel")
const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const createReview = async function (req, res) {
    try {
        let data = req.body
        let bookId1 = req.params.bookId
        const {

            bookId,
            reviewedBy,
            review,
            rating,
            reviewedAt,
            isDeleted
        } = data


        if (!(bookId == bookId1)) {
            return res.status(400).send({ status: false, msg: "bookId is not matches" })
        }
        const verifyId = await reviewModel.find({ bookId: bookId, bookId1: bookId })

        if (!isValid(bookId1)) {
            return res.status(400).send({ status: false, msg: "Give bookId in params" })
        }

        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "book id require" })
        }
    
        if (!isValid(reviewedBy)) {
            return res.status(400).send({ status: false, msg: "reviewedBy require" })
        }
        
        if (!isValid(rating)) {
            return res.status(400).send({ status: false, msg: "rating require" })
        }

        if (!isValid(reviewedAt)) {
            return res.status(400).send({ status: false, msg: "reviewedAt require" })
        }

        let savedData = await reviewModel.create(data)
        res.status(201).send({ status: true, msg: "succesfully run", data: savedData })
    }
    catch (err) {
        console.log("This is the error.", err.message)
        res.status(500).send({ msg: "error", error: err.message })
    }


}


const UpdateReview = async function (req, res) {

    try {
        let update = {}
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        let body = req.body
        if (!(isValid(bookId) && isValidObjectId(bookId))) {
            return res.status(400).send({ status: false, msg: "bookId is not valid" })
        }

        if (!(isValid(reviewId) && isValidObjectId(reviewId))) {
            return res.status(400).send({ status: false, msg: "reviewId is not valid" })
        }

        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
            return res.status(400).send({ status: false, msg: "book not exist can't update it's review !!!!" })
        }

        let revieww = await reviewModel.findOne({ _id: reviewId, isDeleted: false })

        if (!revieww) {
            return res.status(400).send({ status: false, msg: "review not exist can't update it !!" })
        }

        if (!isValidRequestBody(body)) {
            return res.status(400).send({ status: false, message: ' Review update body is empty' })

        }

        let { reviewedBy, rating, review } = body
        if (reviewedBy) {
            if (!isValid(reviewedBy)) {
                return res.status(400).send({ status: false, message: 'reviewedBy is not valid value ' })
            }
            update["reviewedBy"] = reviewedBy         //reviewedBy key generate ho jayegi on the array form
        }
        if (review) {
            if (!isValid(review)) {
                return res.status(400).send({ status: false, message: 'review is not valid value ' })
            }
            update["review"] = review             //review ==key=value   o/p=[]
        }
        if (rating) {
            if (!([1, 2, 3, 4, 5].includes(Number(rating)))) {
                return res.status(400).send({ status: false, msg: "Rating should be from 1,2,3,4,5 this values" })

            }
            update["rating"] = rating
        }

        let updatedReview = await reviewModel.findOneAndUpdate({ _id: req.params.reviewId, isDeleted: false }, update, { new: true })

        return res.status(200).send({ status: false, msg: "review update is successfull...", updatedReview })


    } catch (err) {

        console.log(err)
        res.status(500).send({ status: false, error: err.message })
    }
}





const deleteReview = async function (req, res) {

    try {

        let bookId = req.params.bookId
        if (!(isValid(bookId) && isValidObjectId(bookId))) {
            return res.status(400).send({ status: false, msg: "bookId is not valid" })
        }

        let reviewId = req.params.reviewId
        if (!(isValid(reviewId) && isValidObjectId(reviewId))) {
            return res.status(400).send({ status: false, msg: "reviewId is not valid" })
        }

        const bookIdExsit = await bookModel.findOne({ bookId: bookId }, { isDeleted: false })
        if (bookIdExsit) {
            if (!((isValid) && (isValidObjectId))) {
                return res.status(400).send({ status: false, msg: "bookId not exsit" })

            }
        }
        const reviewIdExsit = await reviewModel.findOne({ _id: reviewId, bookId: bookId }, { isDeleted: false })
        if (bookIdExsit) {
            if (!((isValid) && (isValidObjectId))) {
                return res.status(400).send({ status: false, msg: "reviewId not exsit" })

            }
        }

        if (reviewIdExsit.isDeleted !== true) {
            let saveData = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId }, { $set: { isDeleted: true }, new: true })

            return res.status(200).send({ status: true, data: saveData })

        } else {
            return res.status(400).send({ status: false, msg: "already deleted" })
        }
    }

    catch (err) {

        console.log(err)
        res.status(500).send({ status: false, error: err.message })
    }

}


module.exports.createReview = createReview
module.exports.UpdateReview = UpdateReview
module.exports.deleteReview = deleteReview