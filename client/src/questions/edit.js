import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 export default function Edit() {
 const [form, setForm] = useState({
   topic: "",
   question: "",
   type: "", 
   answer: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
  useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
      if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/record");
       return;
     }
      setForm(record);
   }
    fetchData();
    return;
 }, [params.id, navigate]);
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  async function onSubmit(e) {
   e.preventDefault();
   if(form.topic==undefined)
    form.topic=form[0].topic; 
  if(form.question==undefined)
    form.question=form[0].question; 
  if(form.type==undefined)
    form.type=form[0].type;
   const editedPerson = {
     topic: form.topic,
     question: form.question,
     type: form.type, 
     answer: null,
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/record");
 }
  // This following section will display the form that takes input from the user to update the data.
  function inputThingTopic(){
    if(form.type===""){
      return ("")
    }
    else if(form[0].type==="FRQ"){
      return(
        form[0].topic
      );
      } 
    else if(form[0].type==="Multiple Choice"){
      return(
        form[0].topic
        );
        } 
    else if(form[0].type==="True or False"){
      return(
          form[0].topic
          );
          }
  }
  function inputThingQ(){
    if(form.type===""){
      return ("")
    }
    else if(form[0].type==="FRQ"){
      return(
        form[0].question
      );
      } 
    else if(form[0].type==="Multiple Choice"){
      return(
        form[0].question
        );
        } 
    else if(form[0].type==="True or False"){
      return(
          form[0].question
          );
          }
  } 
    function inputThingRadio(x){
      if(form.type===""){
        return ("")
      }
      if(form.type=== undefined){
        if(form[0].type==="FRQ" && x == 1){
        return(
          "Checked"
        );
      } 
      else if(form[0].type==="Multiple Choice" && x == 0){
        return(
          "Checked"
        );
      } 
      else if(form[0].type==="True or False" && x == 2){
        return(
          "Checked"
        );
      } 
      }
      else {
         if(form.type==="FRQ" && x == 1){
        return(
          "Checked"
        );
      } 
      else if(form.type==="Multiple Choice" && x == 0){
        return(
          "Checked"
        );
      } 
      else if(form.type==="True or False" && x == 2){
        return(
          "Checked"
        );
      } 
      } 
    } 

  return (
   <div>
     <h3 class="red-text text-center">Update Question</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="topic">Topic: </label>
         <input
           type="text"
           className="form-control"
           id="topic"
           defaultValue={inputThingTopic()}
           onChange={(e) => updateForm({ topic: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="question">Question: </label>
         <input
           type="text"
           className="form-control"
           id="question"
           defaultValue={inputThingQ()} 
           onChange={(e) => updateForm({ question: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionMCQ"
             value="Multiple Choice"
             checked={inputThingRadio(0)}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="positionMCQ" className="form-check-label">MCQ</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionFRQ"
             value="FRQ"
             checked={inputThingRadio(1)}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="positionFRQ" className="form-check-label">FRQ</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionTrueFalse"
             value="True or False"
             checked={inputThingRadio(2)}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="positionTrueFalse" className="form-check-label">True or False</label>
       </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 ); 
}