const pool = require('../db')

const getAllBooks = async (req,res) => {
    try {
        const allBooks = await pool.query('SELECT libro.titulo as titulolibro , libro.id_libro AS idlibro, autor.nombre AS nombreautor, editorial.nombre_editorial AS editoriallibro, area.nombre_area  AS arealibro FROM libro as libro , autor as autor, editoriales as editorial , area as area, libaut as libaut WHERE libro.id_libro = libaut.id_libro and libaut.id_autor = autor.id_autor and libro.editorial = editorial.id_editorial and libro.area = area.id_area ORDER BY libro.id_libro')
        console.log(allBooks)
        return res.json(allBooks.rows)
    } catch (error) {
        console.log(error.message)
    }
}

const getABook = async (req,res) => {
    const {titulolibro} = req.params
    try {
        const book = await pool.query('SELECT libro.titulo as titulolibro , libro.id_libro AS idlibro, editorial.nombre_editorial AS editoriallibro, area.nombre_area  AS arealibro FROM libro as libro , autor as autor, editoriales as editorial , area as area, libaut as libaut WHERE libro.id_libro = libaut.id_libro and libaut.id_autor = autor.id_autor and libro.editorial = editorial.id_editorial and libro.area = area.id_area and libro.titulo = $1 ORDER BY libro.id_libro', [titulolibro])

        if(book.rows.length === 0) return res.status(404).json({
            message: 'Book not Found'
        })
        const example = [res.json(book.rows[0])]
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
        const deleteFromLibaut = pool.query('DELETE from libaut WHERE id_libro = $1::smallint', [id_libro])
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


//REGISTRAR ESTUDIANTE
const postAStudent = async (req,res) => {
    const { id_lector, nombre, edad, carrera, direccion, ci } = req.body
    
    try {
        const insertStudent = await pool.query('INSERT INTO estudiante (id_lector, nombre, edad, carrera, direccion, ci) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [
            id_lector, 
            nombre,
            edad,
            carrera,
            direccion,
            ci
        ]);
        console.log(insertStudent)
        res.send('añadiendo la informacion del estudiante')
    } catch (error) {
        console.log(error.message)
    }
}

//Mostrar prestamos
const getPrestamo = async (req,res) => {
    try {
        const listOFPrestamos = await pool.query('SELECT prestamo.id_prestamo, libro.titulo, estudiante.nombre, prestamo.fecha_prestamo, prestamo.fecha_devolucion, prestamo.devuelto, prestamo.multa FROM libro AS libro, prestamo AS prestamo, estudiante AS estudiante WHERE libro.id_libro = prestamo.id_libro AND prestamo.id_lector = estudiante.id_lector');
        console.log(listOFPrestamos);
        return res.json(listOFPrestamos.rows);
    }
    catch(error){
        console.log(error.message)
    }
}

//Actualizar prestamo
const updatePrestamo = async (req, res) => {
    try {
        const { id_prestamo } = req.params
        const { devuelto, multa } = req.body

        const result = await pool.query('UPDATE prestamo SET devuelto = $1, multa = $2 WHERE id_prestamo = $3', [devuelto, multa, id_prestamo])
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No encontrado'
            })
        }
        console.log(result)
        res.json(result.rows[0])

    } catch (error) {
        console.log(error.message)
    }
}



const getStudents = async (req,res) => {
    try {
        const listOFStudents = await pool.query('SELECT * FROM estudiante');
        console.log(listOFStudents);
        return res.json(listOFStudents.rows);
    }
    catch(error){
        console.log(error.message)
    }
}

const getStudent = async (req,res) => {
    const {ci} = req.params
    try {
        const student = await pool.query('SELECT * FROM estudiante WHERE ci = $1',[ci]);
        console.log(student);
        return res.json(student.rows);
    }
    catch(error){
        console.log(error.message)
    }
}

const postLendBook = async (req,res) => {
    const {id_prestamo,id_libro, id_lector} = req.body
    try {
        const lendQuery = await pool.query('INSERT INTO prestamo (id_prestamo, id_lector,id_libro, fecha_prestamo, fecha_devolucion, devuelto, multa) VALUES ($1,$2,$3, now(), null, null, 0) RETURNING *',[
            id_prestamo,
            id_libro,
            id_lector
        ]);
        console.log(lendQuery);
        res.send('Publicando prestamo');
    }
    catch(error) {
        console.log(error.message)
    }
}

module.exports = {
    getAllBooks: getAllBooks,
    postABook: postABook,
    getABook: getABook,
    deleteABook: deleteABook,
    putABook: putABook,
    postAStudent: postAStudent,
    getStudents: getStudents,
    getStudent:getStudent,
    postLendBook: postLendBook,
    getPrestamo: getPrestamo,
    updatePrestamo : updatePrestamo
}