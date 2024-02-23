import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
export default function Answering() {
  const [form, setForm] = useState({ 
    topic: "",
    question: "", 
    type: "",
    answer: "",
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
        navigate("/list");
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
    const editedAnswer = { 
      topic: form[0].topic, 
      question: form[0].question, 
      type: form[0].type,
      answer: form.answer,
    };
     // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/answering/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedAnswer),
      headers: {
        'Content-Type': 'application/json'
      },
    });
     navigate("/list");
  }
  function inputThing(){
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
   // This following section will display the form that takes input from the user to update the data.
  
   if(form.type===""){
    return ("")
  }
  else if(form[0].type==="FRQ"){
    return (
      <div>
        <h3 class="red-text text-center">Answer Question</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="answer">Question: </label>
            <input 
                  type="text"
                  className="form-control"
                  id="Question"
                  readonly="true"
                  value={inputThing()}
                />  
            <label htmlFor="answer">Answer: </label>
            <input
                  type="text"
                  className="form-control"
                  id="answer"
                  defaultvalue=""
                  onChange={(e) => updateForm({ answer: e.target.value })}
                /> 
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
    else if(form[0].type==="True or False"){
      return (
        <div>
          <h3 class="red-text text-center">Answer Question</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
            <label htmlFor="answer">Question: </label>
            <input 
                  type="text"
                  className="form-control"
                  id="Question"
                  readonly="true"
                  value={inputThing()}
                />  
              <label htmlFor="answer">Answer: </label> 
                 <br></br>
              <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionTrue"
             value="True"
             checked={form.answer === "True"}
             onChange={(e) => updateForm({ answer: e.target.value })}
           />  
           <label htmlFor="positionTrue" className="form-check-label">True</label>
           <br></br>
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionFalse"
             value="False"
             checked={form.answer === "False"}
             onChange={(e) => updateForm({ answer: e.target.value })}
           />  
           <label htmlFor="positionFalse" className="form-check-label">False</label>
           <br></br>
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
      else if(form[0].type==="Multiple Choice"){
        return (
          <div>
            <h3 class="red-text text-center">Answer Question</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group">
              <label htmlFor="answer">Question: </label>
            <input 
                  type="text"
                  className="form-control"
                  id="Question"
                  readonly="true"
                  value={inputThing()}
                />  
                <label htmlFor="answer">Answer: </label> 
                <br></br>
                <input
               className="form-check-input"
               type="radio"
               name="positionOptions"
               id="positionTrue"
               value="A"
               checked={form.answer === "A"}
               onChange={(e) => updateForm({ answer: e.target.value })}
             />  
             <label htmlFor="positionTrue" className="form-check-label">A</label>
             <br></br>
             <input
               className="form-check-input"
               type="radio"
               name="positionOptions"
               id="positionFalse"
               value="B"
               checked={form.answer === "B"}
               onChange={(e) => updateForm({ answer: e.target.value })}
             /> 
             <label htmlFor="positionFalse" className="form-check-label">B</label> 
             <br></br>
             <input
               className="form-check-input"
               type="radio"
               name="positionOptions"
               id="positionTrue"
               value="C"
               checked={form.answer === "C"}
               onChange={(e) => updateForm({ answer: e.target.value })}
             />  
             <label htmlFor="positionTrue" className="form-check-label">C</label>
             <br></br>
             <input
               className="form-check-input"
               type="radio"
               name="positionOptions"
               id="positionFalse"
               value="D"
               checked={form.answer === "D"}
               onChange={(e) => updateForm({ answer: e.target.value })}
             /> 
             <label htmlFor="positionFalse" className="form-check-label">D</label>
             <br></br>
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
 }