const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3005;
const mongoURI = process.env.MONGO;

mongoose.connect(mongoURI);

//middleware
app.use(express.json());
app.use(cors());

// this is schema
const xyz = mongoose.model('student', { 
  name: String, 
  age: {type : Number, required : true }
}); 



// const hello = new xyz({ name: 'Amit', age : 34 });
//     hello.save()
//     .then(() => console.log('student added'));


// home page
app.get("/",(req,res)=>{
  res.send("Welcome to express students")

})
// about page
app.get("/about",(req,res)=>{
  res.send("About Us Page")

})

app.get("/contact",(req,res)=>{
  res.send("Contact Us")
})

// get all students list
app.get("/students",(req,res)=>{
    
    xyz.find()
          .then(data => res.send(data))
          .catch(err => console.error(err));
          
})
// find a student
app.get('/students/:id', (req,res) => {
  console.log("The id is : ", req.params.id);
  xyz.findById(req.params.id)
      .then(data => res.send(data));
})




// create student
app.post("/students", async (req,res) =>{
  try{
  console.log("The Data is: ", req.body);
  const ss = new xyz(req.body)
  const data = await ss.save()
        res.send(data);
  } catch(err) {
    res.send("error", err.message)
  }
})

// dynamic routing
app.get('/hello/:id',(req,res)=>{
  res.send(`The usersid is : ${req.params.id}`)
})

// update student
app.put('/students/:id', (req, res) => {
  xyz.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).send("Student not found");
      }
      res.send(data);
    })
    .catch(err => {
      console.error("Error in PUT /students/:id", err); // <-- debug output
      res.status(500).send("Server error: " + err.message);
    });
});

// delete student
app.delete("/students/:id", (req,res) =>{
      xyz.findByIdAndDelete(req.params.id)
              .then(() => res.send("Deleted Succesfully"))
})

app.listen(PORT, () => {
  console.log(`Learning Express on ${PORT}`)
})