// About.jsx
import React from 'react';


import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TEACHERS_API_URL } from "../constants";

import { Table } from "reactstrap";

import ConfirmRemovalModal from "./ConfirmRemovalModal";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../custome.css'

const containerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '2x',
  border: '0px solid #ccc',
  width: '500px', // Set the width for the Row
  marginLeft: '500px', // Set the width for the Row
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

const navigate = useNavigate();
 const initialData = { id: 0, name: ""};
  const [formData, setFormData] = useState(initialData);




  const [teachers, setTeachers] = useState();

  const getTeachers = async () => {
    try {
      const resp = await axios.get(TEACHERS_API_URL);
      setTeachers(resp.data);
     

    } catch (err) {
      console.log(err);
    }
  };

  
  useEffect(() => {
    getTeachers();
  }, []);



  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(TEACHERS_API_URL, formData);
      if ((resp.statusText = "OK")) {
        setFormData(initialData);
        handleTeacherClick();
        

      }
    } catch (err) {
      console.log(err);
    }
  };

  

  const handleTeacherClick = () => {
    navigate('/teacher');
  };



  return (
    <div className="page">
     <h1 style={headingStyle}>Create Teacher</h1>
      <p></p>

    <Form onSubmit={handleAddTeacher} style={containerStyle}>
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          type="text"
          name="name"
          required
          onChange={handleChange}
          value={formData.name}
        />
      </FormGroup>
  
      <Button>Send</Button>
    </Form>


    </div>
  );
}

export default Teacher;
