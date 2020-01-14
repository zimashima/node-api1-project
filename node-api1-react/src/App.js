import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import CardList from './components/CardList';
import Form from './components/Form';


function App() {

  const [ users, setUsers ] = useState([])

  useEffect(()=> {
    axios.get(`http://localhost:8000/api/users`)
      .then(res => {
        setUsers(res.data)
      })
}, [users])

  return (
    <div className="container-md m-5 mx-auto">

      <h1 className="text-primary">This is the cutest List Ever!</h1>
      <Form setUsers={setUsers} users={users}/>
      <CardList users={users}/>
    </div>
  );
}

export default App;
