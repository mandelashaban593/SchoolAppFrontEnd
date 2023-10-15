// About.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import { STUDENTS_API_URL,STUDENT_UPDATE_API_URL,TEACHERS_API_URL  } from "../constants";
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

const buttonStyle = {
  marginTop: '20px',
}

function EditStudent() {

 const { id } = useParams();
const navigate = useNavigate();
  const [formData, setFormData] = useState({});

const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  
  



  useEffect(() => {


  const apiUrl = `${STUDENTS_API_URL}/${id}`; // Use the correct URL for the teacher you want to retrieve

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

// Fetch the list of teachers from the Django API
    axios.get(TEACHERS_API_URL)
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error(error);
      });



  }, [id]);

const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = `${STUDENT_UPDATE_API_URL}/${id}`; // Use the correct URL for the teacher you want to retrieve
    console.log(apiUrl)

    axios.put(apiUrl, formData)
    .then(response => {
      // Handle the updated data
      console.log(response.data);
    console.log('Student updated successfully');
    navigate('/student');

    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });


  };

  return (
    <div>
      <h1 style={headingStyle}>Edit Record</h1>
  
  


<form onSubmit={handleSubmit} style={containerStyle} className="form-container">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Surname:
        <input
          type="text"
          name="name"
          value={formData.surname}
          onChange={handleChange}
        />
      </label>
         <div>
        Teacher:
         <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} style={buttonStyle}>
        <option value="">Select a Teacher</option>
        {teachers.map(teacher => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
       
      </div>

      <div>
      {/* Add other form fields for other properties */}
      
      <button type="submit"  style={buttonStyle}>Update Student</button>
      </div>
    </form>



    </div>
  );
}

export default EditStudent;

