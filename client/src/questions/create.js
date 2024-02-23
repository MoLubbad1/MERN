import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
 const [form, setForm] = useState({
   topic: "",
   question: "",
   type: "", 
   answer: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
    await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
    setForm({ topic: "", question: "", type: "", answer: null });
   navigate("/record");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3 class="red-text text-center">Create New Question</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="topic">Topic</label>
         <input
           type="text"
           className="form-control"
           id="topic"
           value={form.topic}
           onChange={(e) => updateForm({ topic: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="question">Question</label>
         <input
           type="text"
           className="form-control"
           id="question"
           value={form.question}
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
             checked={form.type === "Multiple Choice"}
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
             checked={form.type === "FRQ"}
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
             checked={form.type === "True or False"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="positionTrueFalse" className="form-check-label">True or False</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create Question"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}