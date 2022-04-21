const { Router } = require("express")
const { getAllBooks, getABook, deleteABook, putABook, postABook } = require('../controllers/tasks.controller')
const pool = require('../db')


const router = Router();

router.get('/libros', getAllBooks)

router.get('/libros/:id_libro', getABook)


router.post('/libros', postABook)

router.delete('/libros/:id_libro', deleteABook)

router.put('/libros/:id_libro', putABook)

module.exports = router;