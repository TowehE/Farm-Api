const express = require('express');

const requestTime = (req, res, next) =>{
    req.dateTime= Date()

    console.log (`This Api was called on ${req.dateTime}`)

    next()
}

module.exports =requestTime

