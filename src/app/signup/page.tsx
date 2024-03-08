'use client'
import React, {useState} from 'react'
import '../style.scss'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'


export default function Signup(){

    const [errMessage, setErrMessage] = useState('')
    
    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .required('Username is required')
        .min(2),
        password: Yup.string()
        .required('Password is required')
        .min(6),
        confirmPassword:Yup.string().required('Confirm password is required')
        .oneOf([Yup.ref('password')],'Passwords do not match')
    })

    const formOptions = {resolver:yupResolver(validationSchema)}

    const {register, handleSubmit, reset, formState} = useForm(formOptions)
    const {errors} = formState
     
    const submitForm = async(data,e) => {
        const formData = JSON.stringify(data)
        try{
            
            const req = await fetch('http://localhost:3001/api/signup',{
                 
                method:'POST',
                body:formData,
                headers:{
                    'Content-Type':'application/json'
                },
            })
                const file = await req.json()
          if(req.status !== 200){
                setErrMessage(file.errors[0])
                console.log(file.message)
                return
            }    
            reset()
            console.log(file.message)
            return
        }catch(err){
            console.log(onmessage)
            console.log(err)
        }
    }
 
    return (
        <main>
            <form onSubmit={handleSubmit(submitForm)}>
                <div>
                <label htmlFor="username">Username:</label>
                <input type="text" /* name="username" */ id="user" {...register('username')}/>
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input type="password" /* name="password" */ id="" {...register('password')}/>
                </div>
                <div>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" /* name="confirmPassword" */ id="" {...register('confirmPassword')}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}  