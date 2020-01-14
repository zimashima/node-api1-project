import React from 'react'

export default function Card({ user }) {
    
    return (
        <>
        <div className="card m-3 p-3 bg-secondary text-white" style={{ maxWidth : "20rem" }}>
            <div className="card-body">
            <h3 class="card-title">{user.name}</h3>
            <p class="card-text">{user.bio}</p>
            </div>
        </div>
        </>
    )
}
