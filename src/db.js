const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    password:'0728',
    host:'localhost',
    port: 5432,
    database: 'reto'
})

module.exports = pool