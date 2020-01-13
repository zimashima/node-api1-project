import React, { useState } from 'react'
import axios from 'axios'

export default function Form(props) {

    const [ values, setValues ] = useState({
        "name": "",
        "bio" : ""
    })

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.values })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users', values)
            .then(axios.get('http://localhost:8000/api/users'))
                    .then(res => props.setUsers(res.data))
                    .catch(err => console.log(err))
            .catch(err => console.log(err))
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label>Name</label>
                <input name="name" onChange={handleChange} className="form-control" value={values.name}/>
                <label>Bio</label>
                <input name="bio" onChange={handleChange} className="form-control" value={values.bio}/>
                <button type="submit" class="btn btn-secondary btn-lg btn-block">Add</button>
            </div>
        </form>
        </>
    )
}
