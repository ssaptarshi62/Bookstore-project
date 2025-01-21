const Book = require("./book.model");

const postABook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({ message: "Book posted successfully", book: newBook })
    } catch (error) {
        console.error("Error in creating book", error);
        res.status(500).send({ message: "Failed to create a book" })
    }
}

// get all books

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 })
        res.status(200).send(books)

    } catch (error) {
        console.error("Error while fetching book", error);
        res.status(500).send({ message: "Failed to fetch books" })

    }
}

// get a single book

const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id)
        if(!book){
          return  res.status(404).send({message:"book is not found"})
        }
        res.status(200).send(book)

    } catch (error) {
        console.error("Error in fetching book", error);
        res.status(500).send({ message: "Failed to fetch  a book" })

    }
}

// update a book data

const updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedBook){
           return res.status(404).send({message:"book not found"})
        }
        res.status(200).send({
            message : "Book is updated successfully",
            updatedBook
        })

    } catch (error) {
        console.error("Error while updating a book", error);
        res.status(500).send({ message: "Failed to update a book" })

    }
}

const deleteABook = async (req,res) =>{
    try{
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook){
           return res.status(404).send({message:"book not found"})
        }
        res.status(200).send({
            message : "Book is deleted successfully",
            deletedBook
        })

    }catch (error){
        console.error("Error while deleting a book",error);
        res.status(500).send({message : "Failed to delete a book"})
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteABook
}