'use strict'

const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: "jualanyuk"
})

db.connect((err) => {
    if (err) throw err
    console.log('Database connected')
})

const createTablePenjual = () => {
    let sql = `
        create table penjual (
            id int unsigned auto_increment primary key,
            username varchar(191) not null,
            password varchar(50) not null,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp null on update current_timestamp
        )
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        console.log('Table books has been created!')
    })
}

const createPembeliTable = () => {
    let sql = `
        create table pembeli (
            id int unsigned auto_increment primary key,
            username varchar(100) not null,
            password varchar(255) not null,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp null on update current_timestamp
        )
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        console.log('Table users has been created!')
    })
}

const createBarangTable = () => {
    let sql = `
        create table barang (
            id int unsigned auto_increment primary key,
            nama varchar(255) null,
            jumlah int null,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp null on update current_timestamp
        )
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        console.log('Table user_book has been created!')
    })
}
const createTransaksiTable = () => {
    let sql = `
        create table transaksi (
            id int unsigned auto_increment primary key,
            penjual_id int not null,
            pembeli_id int not null,
            barang_id  int not null,
            created_at timestamp default current_timestamp
        )
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        console.log('Table user_book has been created!')
    })
}

createTablePenjual()
createPembeliTable()
createBarangTable()
createTransaksiTable()
