import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { STUDENTS_API_URL, TEACHERS_API_URL } from "../constants";
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '2x',
  border: '0px solid #ccc',
  width: '500px', // Set the width for the Row
  marginLeft: '500px', // Set the width for the Row
};


const headingStyle = {
fontSize: '24px',
  color: 'blue',
  fontWeight: 'bold',
  marginBottom: '10px',
  marginLeft: '600px',
  marginTop: '50px',
};



const StudentForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of teachers from the Django API
    axios.get(TEACHERS_API_URL)
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new student using the provided data
    const studentData = {
      name,
      surname,
      teacher: teacherId,
    };

    axios.post(STUDENTS_API_URL, studentData)
      .then(response => {
        console.log('Student added:', response.data);
        // Clear the form fields
        setName('');
        setSurname('');
        setTeacherId('');
        navigate('/student');

      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div >
      <h2  style={headingStyle}>Add Student</h2>
      <form onSubmit={handleSubmit} className="form-container" style={containerStyle}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Surname:</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div>
          <label>Teacher:</label>
          <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
            <option value="">Select a Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
