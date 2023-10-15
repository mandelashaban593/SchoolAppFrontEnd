// About.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import { TEACHERS_API_URL,TEACHER_UPDATE_API_URL  } from "../constants";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../custome.css'

import { Button, Form, FormGroup, Input, Label } from "reactstrap";


const containerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '2x',
  border: '0px solid #ccc',
  width: '500px', // Set the width for the Row
  marginLeft: '400px', // Set the width for the Row
};

const rowStyle = {
  marginBottom: '10px', // Small space between rows
    width: '500px', // Set the width for the Row
};

const colStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  marginRight: '5px', // Small space between columns

};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
   width: '150px', // Set the width for the Row
};

const headingStyle = {
fontSize: '24px',
  color: 'blue',
  fontWeight: 'bold',
  marginBottom: '10px',
  marginLeft: '600px',
  marginTop: '50px',
};



function Teacher() {

 const { id } = useParams();
const navigate = useNavigate();
  const [formData, setFormData] = useState({});




const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {


  const apiUrl = `${TEACHERS_API_URL}/${id}`; // Use the correct URL for the teacher you want to retrieve

  axios.get(apiUrl)
    .then(response => {
      // Handle the response data
      console.log(response.data);
       setFormData(response.data);
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });





  }, [id]);

const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = `${TEACHER_UPDATE_API_URL}/${id}`; // Use the correct URL for the teacher you want to retrieve
    console.log(apiUrl)

    axios.put(apiUrl, formData)
    .then(response => {
      // Handle the updated data
      console.log(response.data);
    console.log('Teacher updated successfully');
    navigate('/teacher');

    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });


  };

  return (
    <div>
      <h1 style={headingStyle}>Edit Record</h1>
  
  


<form onSubmit={handleSubmit} style={containerStyle}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      {/* Add other form fields for other properties */}
      <br/> <br/>
      <button type="submit">Update Teacher</button>
    </form>



    </div>
  );
}

export default Teacher;
