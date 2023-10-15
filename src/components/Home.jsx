// About.jsx
import React from 'react';

import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { STUDENTS_API_URL } from "../constants";
import "../custome.css";

const containerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '2x',
  border: '0px solid #ccc',
  width: '500px', // Set the width for the Row
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



function Home() {



  const [students, setStudents] = useState();

  const getStudents = async () => {
    try {
      const resp = await axios.get(STUDENTS_API_URL);
      setStudents(resp.data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getStudents();
  }, []);


const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/student');
  };

  const handleTeacherClick = () => {
    navigate('/teacher');
  };

  return (
    <div className="page">
      <h1 style={headingStyle}>Home</h1>
      <p></p>


     <Container fluid style={containerStyle}>
      <Row style={rowStyle}>
   
        <Col style={colStyle}>
       {/*   <a href="/student" style={linkStyle}>About</a>*/}
          <button onClick={handleButtonClick} style={linkStyle}> Students</button>
        </Col>
        <Col style={colStyle}>
            <button onClick={handleTeacherClick} style={linkStyle}> Teachers</button>
        </Col>
      </Row>

</Container>

    </div>
  );
}

export default Home;
