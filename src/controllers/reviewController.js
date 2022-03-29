const reviewModel = require("../models/reviewModel.js")
const bookModel = require("../models/bookModel")


const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true

}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const createReview = async function (req, res){
let data = req.body
const {
   
bookId,
reviewedBy,
review,
rating,
reviewedAt,
isDeleted

} = data


//let Id = req.params.bookId


let savedData = await reviewModel.create(data)
res.status(201).send({status :true, msg:"succesfully run", data: savedData })






}
module.exports.createReview= createReview