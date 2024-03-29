'use strict'

import { hash, compare } from 'bcrypt'



export const encrypt = async(password) => {
    try{
        return hash(password, 10) 
    }catch(err){
        console.error(err)
        return err
    }
}

// Validar la contraseña 
export const checkPassword = async (password, hash) => {
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err);
        return err
    }
}

//Validar actualización 
export const checkUpdate = (data, userId) => { 
    if(userId){
        if(
            Object.entries(data).length === 0 || 
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        ) {
            return false 
        }
        return true
    }else{
       return false 
    }
}
// ------------------------------------- ANIMALS ------------------ 


// Validar actualizacion 
export const checkUpdateAnimal = (data, idAnimal) => {
    if(idAnimal){
        if(
            Object.entries(data).length === 0 ||
            data.type || 
            data.type == '' ||
            data.keeper || 
            data.keeper == ''
        ) {
            return false 
        }
        return true
    }else{
        return false 
    }
}