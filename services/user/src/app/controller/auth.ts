import User from '../schema/auth'
import { Request, Response } from 'express'

// user login
export const userLogin = async(req:Request, res:Response) : Promise<any> =>{
    try{

        const {email, password} = req.body
        console.log(req.body)
        res.status(200).json({message:'success'})

    }catch(err){
        console.log(err)
    }
}


// user login
export const userSignup = async(req:Request, res:Response) : Promise<any> =>{
    try{

        

    }catch(err){
        console.log(err)
    }
}