const { Router } = require("express")
const { getAllBooks, getABook, deleteABook, putABook, postABook, postAStudent, getStudents, postLendBook } = require('../controllers/tasks.controller')
const pool = require('../db')


const router = Router();

router.get('/libros', getAllBooks)

router.get('/libros/:titulolibro', getABook)

router.post('/libros', postABook)

router.delete('/libros/:id_libro', deleteABook)

router.put('/libros/:id_libro', putABook)

router.post('/estudiante', postAStudent)

router.get('/estudiante',getStudents)

router.post('/prestamo',postLendBook)

module.exports = router;