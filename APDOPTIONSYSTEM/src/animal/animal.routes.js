import express from 'express'
import { registerAnimal, deleteAnimal, updateAnimal, getAllAnimals } from './animal.controller.js'

const api = express.Router()

api.post('/registerAnimal', registerAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.get('/getAllAnimals', getAllAnimals)
api.get('/searchAnimal', getAllAnimals)

export default api