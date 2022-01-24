import { URLController } from './controller/URLController'
import express from 'express'
import { MongoConnection } from './database/MongoConnection'

const api = express()

api.use(express.json())

const database = new MongoConnection

const urlController = new URLController()

database.connect()

api.post("/shorten", urlController.shorten)

api.get("/:hash", urlController.redirect)

api.listen(3000, ()=>{
    console.log('Server is Running!')
})