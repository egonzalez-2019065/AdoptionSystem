'use strict';
 
import Animal from './animal.model.js';
import { checkUpdateAnimal } from '../utils/validator.js'

export const registerAnimal = async (req, res) => {
    try {
        //Capturar la informacion
        let data = req.body;
        //Guardar la informacion
        let animal = new Animal(data);
        await animal.save();
        //responder al usuario 
        return res.send({ message: `Create successfully ${animal.name}`});
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error creating animal'});
    }
}
 
export const deleteAnimal = async (req, res) => {
    try {
        // Obtener el id
        let { id } = req.params;
        // Eliminar al animal 
        let deletedAnimal = await Animal.findOneAndDelete({_id: id});
        // Verificar si se elimina
        if (!deletedAnimal) return res.status(404).send({ message: 'Animal not found'})
        //Responder 
        return res.send({ message: `Animal was eliminated ${deletedAnimal.name}` });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error deleting animal', error: err });
    }
};
 
export const updateAnimal = async (req, res) => {
    try {
        // Obtener el id 
        let { id } = req.params;
        // Obtener los datos a actualizar
        let data = req.body;
        //Validar que traiga datos 
        let update = checkUpdateAnimal(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        // Actualizar (BD)
        let updatedAnimal = await Animal.findOneAndUpdate(
            {_id, id },
            data, 
            { new:true }
        )
        // Validar la actualización 
        if (!updatedAnimal) {
            return res.status(404).send({ message: 'Animal not found and not update' });
        }
        // Responder 
        return res.send({ message: 'Animal updated successfully', updatedAnimal });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating animal', error: err });
    }
};

export const getAllAnimals = async (req, res) => {
    try {
        //traer los animales
        let animals = await Animal.find();
        // mostrar
        return res.send({ animals });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error retrieving animals'});
    }
};
 
export const searchAnimal = async (req, res) => {
    try {
        let { search } = req.query;
        let animals = await Animal.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { type: { $regex: search, $options: 'i' } }
            ]
        });
        return res.send({ animals });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching for animals', error: err });
    }
};