// About.jsx
import React from 'react';

import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TEACHERS_API_URL,TEACHER_DELETE_API_URL } from "../constants";
import { Link } from 'react-router-dom';
import { Table } from "reactstrap";
import ReactPaginate from 'react-paginate';

import '../custome.css'
import '../TeacherList.css'


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

const AddStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
   width: '150px', // Set the width for the Row
   marginLeft: '900px',
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
const [teachers, setTeachers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredTeachers.length / recordsPerPage);
  const offset = pageNumber * recordsPerPage;


  const handleAddClick = () => {
    navigate('/createteacher');
  };


 
  const [confirmDelete, setConfirmDelete] = useState(null);


  const handleDelete = (teacherId) => {
    setConfirmDelete(teacherId);
  };



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




  const handleButtonClick = () => {
    navigate('/student');
  };


  const handleTeacherClick = () => {
    navigate('/teacher');
  };






 const confirmDeletion = () => {

    const apiUrl = `${TEACHER_DELETE_API_URL}/`; // Use the correct URL for the teacher you want to retrieve

    if (confirmDelete) {
      axios.delete(`${apiUrl}${confirmDelete}/`)
        .then(() => {
         getTeachers(); // Refresh the teacher list
        })
        .catch(error => {
          console.error(error);
        });
      setConfirmDelete(null);
    }
  };


  const handlePageClick = (data) => {
    setPageNumber(data.selected);
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(parseInt(e.target.value, 10));
    setPageNumber(0); // Reset to the first page
  };


  return (
    <div className="page">
     <h1 style={headingStyle}>Teachers</h1>
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

      <Container style={{ marginTop: "20px" }}>


      <Row>

        <Col>
          {confirmDelete && (
       <div className="confirmation-message">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this teacher?</p>
            <button onClick={confirmDeletion}>Yes</button>
            <button onClick={() => setConfirmDelete(null)}>No</button>
          </div>
        </div>
      )}

        </Col>
      </Row>


      <Row>
        <Col>
          <button onClick={handleAddClick} style={AddStyle}> Add Teacher</button>

        </Col>
      </Row>

      <Row>
        <Col>
           <div>
        <label>Show:
          <select onChange={handleRecordsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

        </Col>
      </Row>
      

      <Row>
        <Col>
           <Table dark>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      
       {filteredTeachers.slice(offset, offset + recordsPerPage).map(teacher => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td align="center"> 
              <button><Link to={`/editteacher/${teacher.id}`}>Edit</Link></button>
              <button onClick={() => handleDelete(teacher.id)}>Delete</button>
              </td>
            </tr>

             ))}

          
        
      </tbody>
    </Table>

     <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />

        </Col>
      </Row>




    </Container>


    </div>
  );

}

export default Teacher;
