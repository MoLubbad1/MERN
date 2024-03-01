const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("employees");
      const result = await db_connect.collection("records").find({}).toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
    try {
      const db_connect = await dbo.getDb();
      let myquery = { _id: new ObjectId(req.params.id)};
      const result = await db_connect.collection("records").find(myquery).toArray();
        res.json(result);
      
    } catch (err) {
      throw err;
    } 
  });
  
// This section will help you get a single record by id
recordRoutes.route("/answering/:id").post(async function (req, response) {
  try{
let db_connect = await dbo.getDb(); 
//Do I have to add answer to myquery to be able to save all inputs?
let myquery = { _id: new ObjectId(req.params.id)};
let newvalues = {
 $set: { 
   topic: req.body.topic,
   question: req.body.question,
   type: req.body.type,
   answer: req.body.answer,
 },
}; 
//Is the update one function the one changing all to null?
let result = await db_connect.collection("records").updateOne(myquery, newvalues);
response.send(result).status(200);
}catch(e){
  throw e;
}
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   topic: req.body.topic,
   question: req.body.question,
   type: req.body.type,
   answer: null,
 };
 
 let result = await db_connect.collection("records").insertOne(myobj);
 response.send(result).status(200);
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, response) {
    try{
 let db_connect = await dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id)};
 let newvalues = {
   $set: {
     topic: req.body.topic,
     question: req.body.question,
     type: req.body.type, 
     answer: null,
   },
 };
 let result = await db_connect.collection("records").updateOne(myquery, newvalues);
 response.send(result).status(200);
}catch(e){
    throw e;
}
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, response) => {
 try{
    let db_connect = await dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id)};
    let result = await db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if(e) throw e; 
        response.send(result).status(200); 
    });
    }catch(e){ 
    throw e;
 } 
   console.log("1 document deleted");
  
 });
 
module.exports = recordRoutes;