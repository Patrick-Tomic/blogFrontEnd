'use client'
import {useState, useEffect} from 'react'
import LoginForm from '../../components/loginForm'

export default function Home() {
 /*  const user:any = async() => {
    try{
      const response = await fetch('http://localhost:3001/api/user', {mode:'no-cors'})
      const data= await response.json()
      return data.username 
    }catch(err){
      return err
    }
  } */
  const [userAuth, setUserAuth] = useState(() => {
    if(typeof window !== 'undefined'){
      const user:any = localStorage.getItem('userAuth')
      const init = JSON.parse(user)
      return init || false
    }
  })
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (isMounted) {
        localStorage.setItem('useAuth', JSON.stringify(userAuth))
      }
    })()
   
  }, [userAuth])

  const updateUserAuth = (boolean:any) => {
    setUserAuth(boolean)
  }

  /* const light = <p>{user()}</p> */
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {/*  <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        heyyyyy
        {light}
     </div> */}
     <LoginForm redirect={true} updateUserAuth={updateUserAuth} ></LoginForm> 
    </main>
  );
}
