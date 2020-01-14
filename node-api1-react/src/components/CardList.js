import React from 'react'
import Card from './Card'


export default function CardList({ users }) {

    return (
        <div>
            
            <div className="d-flex p-3 m-3 justify-content-around flex-wrap">
            {
                users.map((user, index) =>
                    <Card key={index} user={user}/>
                )
            }
            </div> 
        </div>
    )
}
