import React, { useState } from 'react'
import axios from 'axios'

export default function Form(props) {

    const [ values, setValues ] = useState({
        "name": "",
        "bio" : ""
    })

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
        console.log(values)
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users', values)
            .then(axios.get('http://localhost:8000/api/users'))
                .then(res => props.setUsers(props.users))
                .catch(err => console.log(err))
            .catch(err => console.log(err))
        setValues({ "name" : "", "bio": ""})
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="form-group mx-auto" style={{maxWidth: "500px"}}>
                <label>Name</label>
                <input name="name" onChange={handleChange} className="form-control" value={values.name}/>
                <label>Bio</label>
                <input name="bio" onChange={handleChange} className="form-control" value={values.bio}/>
                <button type="submit" className="btn btn-secondary btn-lg btn-block m-3">Add</button>
            </div>
        </form>
        </>
    )
}
