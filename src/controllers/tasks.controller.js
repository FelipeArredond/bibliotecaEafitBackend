const pool = require('../db')

const getAllBooks = async (req,res) => {
    try {
        const allBooks = await pool.query('SELECT * FROM libro')
        console.log(allBooks)
        return res.json(allBooks.rows)
    } catch (error) {
        console.log(error.message)
    }
}

const getABook = async (req,res) => {
    const {id_libro} = req.params
    try {
        const book = await pool.query('SELECT * FROM libro WHERE id_libro = $1::smallint', [id_libro])

        if(book.rows.length === 0) return res.status(404).json({
            message: 'Book not Found'
        })
        console.log(book)
        return res.json(book.rows[0])
    } catch (error) {
        console.log(error.message)
    }
}

const postABook = async (req,res) => {
    const { id_libro, titulo, editorial, area } = req.body
    
    try {
        const insertBook = await pool.query('INSERT INTO libro (id_libro, titulo, editorial, area) VALUES($1, $2, $3, $4) RETURNING *', [
            id_libro, 
            titulo,
            editorial,
            area
        ]);
    
        console.log(insertBook)
    
        res.send('añadiendo un libro')
    } catch (error) {
        console.log(error.message)
    }
}

const deleteABook = async (req,res) => {
    const {id_libro} = req.params
    try {
        const book = await pool.query('DELETE FROM libro WHERE id_libro = $1::smallint', [id_libro])

        if(book.rowsCount === 0) return res.status(404).json({
            message: 'Book not Found'
        })
        console.log(book)
        return res.sendStatus(204)
    } catch (error) {
        console.log(error.message)
    }
}

const putABook = async (req,res) => {
    const {id_libro} = req.params
    const { titulo, editorial, area} = req.body
    try {
        const updateBook = await pool.query('UPDATE libro SET titulo = $1 , editorial WHERE id_libro = $1::smallint', [id_libro])

        if(updateBook.rowsCount.length === 0) return res.status(404).json({
            message: 'Book not Found'
        })
        console.log(updateBook)
        return res.sendStatus(204);
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getAllBooks: getAllBooks,
    postABook: postABook,
    getABook: getABook,
    deleteABook: deleteABook,
    putABook: putABook
}