// implement your API here
const express = require('express')
const cors = require('cors')
const server = express();

const Users = require('./data/db.js')

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.send({
        message: "Congratulations on getting the server up and running!" 
    });
})

//GET USERS
server.get("/api/users", (req, res) => {
    Users.find()
      .then(users =>{
        res.status(200).json(users)
      })
      .catch( err => {
        res.status(500).json({
          errorMessage: "The users information could not be retrieved."
        })
      })
})

//GET A USER FROM ID

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id
  Users.findById(id)
    .then(user => {
      if (user === undefined){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      } else {
        res.status(200).json(user)
      }
    })
    .catch( err => {
      res.status(500).json({
        message: "Hola"
      })
    })
    
})


//POST A USER

server.post('/api/users', (req, res) => {
    if ((req.body.name !== undefined) || (req.body.bio !== undefined)){
      Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "There was an error while saving the user to the database",
        });
      });
    } else {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
  });

//DELETE A USER

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    Users.findById(id)
      .then( user => {
        if ( user  === undefined ){
          res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
          Users.remove(id)
            .then( num => res.status(200).json({ message: `DELETE ID:${id} SUCCESS` }))
        }
      })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database",
      });
    })
      
});

//PUT A USER
server.put('/api/users/:id', (req,res)=>{
  const id = req.params.id;
  Users.findById(id)
    .then( user => {
      if ( user  === undefined ){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      } else {
        
        if ((req.body.name === undefined) || (req.body.bio === undefined)){
          res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
          
        } else {
          
          Users.update(id, req.body)
          .then(updateStatus => {
            res.status(200).json(updateStatus);
          })
          .catch(error => {
            res.status(500).json({
              errorMessage: "The user information could not be modified.",
            });
          });

        }

      }
    })
})


const port = 8000;
server.listen(port, ()=> console.log(`\n **SERVER RUNNING ON PORT: ${port} \n`))