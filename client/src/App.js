import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./navbar";
import RecordList from "./questions/recordList";
import Edit from "./questions/edit";
import Create from "./questions/create"; 
import Home from "./home/home"; 
import List from "./answers/list"; 
import Answering from "./answers/answering"; 
 const App = () => {
 return (
   <div>
     <Navbar />
     <Routes> 
     <Route path="/" element={<Home />} />
       <Route exact path="/record" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} /> 
       <Route path="/list" element={<List />} /> 
       <Route path="/answering" element={<Answering />} />
     </Routes>
   </div>
 );
};
 export default App;