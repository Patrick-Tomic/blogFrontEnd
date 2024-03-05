async function go(){
    const user = await fetch('http://localhost:3001/api/user',{mode:'cors'})
    const data = await user.json()
    console.log(data)
}
go()