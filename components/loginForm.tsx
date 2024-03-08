'use client'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {useRouter} from 'next/router'

export default  function LoginForm({updateUserAuth, redirect,}){

 
    const [errMessage, setErrMessage] = useState('')
    const [logErr,setLogErr] = useState(false)
    
    const validationSchema = Yup.object().shape({
        username:Yup.string().required('Username is required'),
        password:Yup.string().required('password is required')
    })
    //puts schema errors into var for Useform
    const formOptions = {resolver:yupResolver(validationSchema)}
    const {register, handleSubmit,reset,formState} = useForm(formOptions)
    const {errors} = formState

    const submit = async(data:any) =>{
        const formData = JSON.stringify(data)
        try{
            const req = await fetch('http://localhost:3001/api/login',{
                method:"POST",
                body:formData,
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const file = await req.json()
            if(req.status!= 200){
                setErrMessage(file.info.message)
                setLogErr(true)
                console.log(file.message)
                return
            }
            updateUserAuth(true)
            localStorage.setItem('token', file.token)
               
            localStorage.setItem('username',file.body.username)
            localStorage.setItem('id',file.body._id)
           
    }
catch(err){
    
    console.log(err)
}
}
return(
    <main>
        <form onSubmit={handleSubmit(submit)}>
          <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="" {...register('username')} />
          </div>
          <div>
          <label htmlFor="password">Password:</label>
          <input type="password" {...register('password')}/>
          </div>
          <button type='submit'>Submit</button>
        </form>
    </main>
)
}