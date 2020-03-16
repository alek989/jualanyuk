const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express()
const secretKey = 'thisisverysecretkey'
const port = 1337;

/**************************** DB SECTION ****************************/

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'jualanyuk'
})

db.connect((err) => {
    if (err) throw err
    console.log('Database Connected!')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

/**************************** JWT SECTION ****************************/

const isAuthorized = (request, result, next) => {
    if (typeof(request.headers['auth-token']) == 'undefined') {
        return result.status(403).json({
            success: false,
            message: 'Unauthorized. Token is not provided'
        })
    }

    let token = request.headers['auth-token']

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return result.status(401).json({
                success: false,
                message: 'Unauthorized. Token is invalid'
            })
        }
    })

    next()
}

/**************************** LOGIN REGISTER SECTION ****************************/

app.post('/login/penjual', function(request, result) {
  let data = request.body
    if (data.username=='penjual@gmail.com' && data.password=='penjual') {
        let token = jwt.sign(data.username+ '|' + data.password, secretKey)

        result.json({
            succes:true,
            message:"Hayolo",
            token:token
        })
    }
})


app.listen(port, () => {
    console.log('App running on port ' + port)
})
