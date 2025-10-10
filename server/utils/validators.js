import {object , string } from "yup"

export const registerSchema = object({
    email:string().email("email invalid format").required(),
    name:string().min(6 ,"name must be more than 6 character"),
    password:string().min(6,"password must be more than 6 character"),
});
export const loginSchema = object({
    email:string().email("email invalid format").required(),
    password:string().min(6,"password must be more than 6 character"),
});

export const validate = (schema)=> async(req,res,next) =>{
    try {
        await schema.validate(req.body , {abortEarly:false});
        next()
    } catch (error) {
        const errText = error.errors.join(",");
        const errObj = new Error(errText);
        next(errObj);
        console.log(errText);
    }
};