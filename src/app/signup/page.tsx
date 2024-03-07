'use client'
import React, {useState} from 'react'
import '../style.scss'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'


export default function Signup(){

    const validationSchema = Yup.object().shape({
        username:Yup.string().required('username is required').min(2,'username must be at least 2 characters'),
        password:Yup.string().required("Password is required").min(6)
    })
    
    const formOptions = {resolver:yupResolver(validationSchema)}
    const {register,handleSubmit, reset, formState} = useForm(formOptions)
    const submitForm = async(data,e) => {
        const formData = JSON.stringify(data)
        try{
            const req = await fetch('http://localhost:3001/api/signup', {
                method:'post',
            body:formData,
        headers:{'Content-type':'application/json'}})
        const myJSON = await req.json()
        if(req.status !== 200){
            console.log('err')
            return
        }
        await localStorage.setItem('token',myJSON.token)
        await localStorage.setItem('username',myJSON.body.username)
        await localStorage.setItem('id',myJSON.body._id)
        }
        catch(err){
            console.log(err)
        }
    }


 
    return (
        <main>
            <form onSubmit={submitForm}>
                <div>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="user" />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="" />
                </div>
                <div>
                <label htmlFor="confirm">Confirm Password:</label>
                <input type="password" name="confirm" id="" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}  