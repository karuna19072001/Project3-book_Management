const jwt = require("jsonwebtoken");

const bookModel = require("../models/bookModel")

const authenticate = async (req ,res , next) =>{

    try {
    
        let token = req.headers["x-auth-token"]
        if(!token){
            return res.status(400).send( { status : false , msg : "token Must Be Present , You Have To Login First" } )
        }
    
        let decodeToken = jwt.verify(token,"Group4")
        if(!decodeToken){
            return res.status(401).send( { status : false , msg : "Invalid Token" } )
        }
    
        let data = req.body
    
        if(Object.keys(data).length !== 0){
    
            if(data.userId!== decodeToken.userId){
                return res.status(403).send( { status : false , msg :"you are Not Authorized !" } )
            }
    
        }else{
    
        //     let userId = req.body.userId
        //     let isValidUser = await userModel.findById(userId)
        //     if(!isValidUser){
        //         return res.status(403).send({status : false , msg : "you do not Have access to This data !"})
    
        //     }
            
        }
        
      
      next()
    
    } catch (error) { 
        return res.status(500).send( { Error : error.message } )
    }
    }
    let authorization = async (req, res, next) => {

        try {
    
            let token = req.headers["x-auth-token"]
            if(!token){
            return res.status(400).send( { status : false , msg : "token Must Be Present" } )
            }
    
            let decodeToken = jwt.verify(token,"Group4")
            if(!decodeToken){
            return res.status(401).send( { status : false , msg : "Invalid Token" } )
            }
    
            let bookId = req.params.bookId
            
            let book= await bookModel.findById(bookId)
            if(!book){
                return res.status(404).send( { status : false , msg : "Book Not Found , Please Check Book Id"  } )
            }
         
            let ownerOfBook = book.userId
         console.log(ownerOfBook)
     
    //let userId =
    //console.log(userId)
            if(decodeToken.userId != ownerOfBook){
                return res.status(403).send( { status : false , msg : "User logged is not allowed to modify the requested users data" } )
            }
            
            next()
    
        } catch (error) {
            res.send(error.message)
        }
    
    };

module.exports.authenticate = authenticate
module.exports.authorization = authorization