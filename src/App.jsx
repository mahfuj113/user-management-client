import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
const [users, setUsers] = useState([])
useEffect(() => {
  fetch('http://localhost:5000/users')
  .then(res => res.json())
  .then(data => setUsers(data))
},[])

const nameRef = useRef()
console.log(nameRef.current.value);

const handleAddUser = e => {
  e.preventDefault()
  const name = e.target.name.value
  const email = e.target.email.value
  const user = {name, email}
  console.log(user);

  fetch('http://localhost:5000/users',{
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const newUser = [...users,data]
    setUsers(newUser)
  })
}
  return (
    <>
      <h1>User Management</h1>
      <h3>See users {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="User Added" />
      </form>
      {
        users.map(user => <li key={user.id}>{user.id} : {user.name}: {user.email}</li>)
      }
    </>
  )
}

export default App
