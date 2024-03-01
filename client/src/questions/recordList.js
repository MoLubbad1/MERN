import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Record = (props) => (
 <tr>
   <td>{props.record.topic}</td>
   <td>{props.record.question}</td>
   <td>{props.record.type}</td> 
   <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
   <td>
     <button className="btn btn-link"><Link className="btn btn-link" to={`/edit/${props.record._id}`}><i class="fas fa-solid fa-pen" title="Edit"></i></Link></button>|
     <button className="btn btn-link text-danger"
       onClick={() => {
         props.deleteRecord(props.record._id); 
         // eslint-disable-next-line no-restricted-globals
         location.reload();
       }}
     >
        <i class="fas fa-solid fa-trash" title="Delete"></i>
     </button>
   </td>
 </tr>
);
export default function RecordList() {
 const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const records = await response.json();
     setRecords(records);
   }
    getRecords();
    return;
 }, [records.length]);
  // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
    const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords); 
   document.location.reload();
 }
  // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
  // This following section will display the table with the records of individuals.
 return ( 
   <div>
     <h3 class="red-text text-center">Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Topic</th>
           <th>Question</th>
           <th>Type</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div> 
 );
}