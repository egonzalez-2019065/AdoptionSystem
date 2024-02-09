import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    name: {
        type: String, 
        requerid: true
    },
    type: { 
        type: String, 
        requerid: true
    },
    color: {
        type: String, 
        requerid: true
    },
    keeper: {
        type: Schema,
        requerid: true
    }

})

export default mongoose.model('animal', animalSchema)