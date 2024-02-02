import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
export default function Answering() {
    const params = useParams();
    const navigate = useNavigate();

useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/answering/${params.id.toString()}`);
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
       //setForm(record);
    }
     fetchData();
     return;
  }, [params.id, navigate]); 
  return (
    <div>
      <h3>Answer List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Question</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{}</tbody>
      </table>
    </div>
  );
  /*
  return (
    <div>
      <h3>Answer</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="topic">Topic: </label>
          <input
            type="text"
            className="form-control"
            id="topic"
            value={form.topic}
            onChange={(e) => updateForm({ topic: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">Question: </label>
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
              value="MCQ"
              checked={form.type === "MCQ"}
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
  );*/
}