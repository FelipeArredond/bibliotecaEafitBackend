const { Router } = require("express")
const { getAllBooks, getABook, deleteABook, putABook, postABook, postAStudent, getStudents, postLendBook, getStudent, getPrestamo, updatePrestamo } = require('../controllers/tasks.controller')
const pool = require('../db')


const router = Router();

router.get('/libros', getAllBooks)

router.get('/libros/:titulolibro', getABook)

router.post('/libros', postABook)

router.delete('/libros/:id_libro', deleteABook)

router.put('/libros/:id_libro', putABook)

router.post('/estudiante', postAStudent)//Juanjo Registro

router.get('/estudiante',getStudents)

router.get('/estudiante/:ci', getStudent)

router.post('/prestamo',postLendBook)

router.get('/prestamo', getPrestamo)

router.put('/prestamo/:id_prestamo', updatePrestamo)

module.exports = router;