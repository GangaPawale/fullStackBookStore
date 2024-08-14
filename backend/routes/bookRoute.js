import express from 'express'
import {Book} from '../models/bookModel.js'
const router=express.Router();



router.post('/',async(req,res)=>{
    try{

        if(
            ! req.body.title ||
            ! req.body.author ||
            ! req.body.publishYear
        ){
            console.log("to save book title,author,and publish all required")
        }
        else{
            const newBook={
                title:req.body.title,
                author:req.body.author,
                publishYear :req.body.publishYear
            }

            const book=await Book.create(newBook)
            console.log("book saved")
            return res.status(200).json(book)
        }


    }catch(error){
        console.log(error)
        res.status(500).send("there something problem in save book")
    }
})


// router.get("/",async(req,res)=>{

//     try{

//         const books=await Book.find({});
//         return res.status(200).send(books);
        
//     }catch(error){
//         console.log(error)
//         console.log("there is error in showing all books ")
//     }

// })
router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      console.log("Books retrieved:", books); // Add this line for debugging
      return res.status(200).json(books);
    } catch (error) {
      console.error("Error in showing all books:", error);
      return res.status(500).json({ message: "Error retrieving books", error: error.message });
    }
  });

router.get("/:id",async (req,res)=>{
    ///here there is no use of useParams so do not use it directly
    
    try{
        const { id } =req.params;
        const books=await Book.findById(id);
        
        return res.status(200).json(books)
        //I had forget to give await here it gives the problem of circular reference ,
        // return res.status(200).send(JSON.stringify(books))


    }catch(error){
        console.log(error)
        console.log("eroor in showing specific book")
    }
})

router.put("/:id",async (req,res)=>{
    try{

        const {id}=req.params;

        const book=await Book.findByIdAndUpdate(id,req.body);
        if(!book)return res.status(300).send("book not found")
        return res.status(200).json(book)



    }catch(error){
        console.log(error)
    }
})
router.delete("/:id",async (req,res)=>{
    try{
        const {id}=req.params;
        const book=await Book.findByIdAndDelete(id);
        if(!book)return res.status(300).send("not found book");
        return res.status(200).json(book);

    }catch(error){
        console.log(error);
    }

})

export default router;