import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../StudentCreatePopupForm.css'; // Import the CSS file for styling
import { STUDENTS_API_URL, TEACHERS_API_URL } from "../constants";
import { useNavigate } from 'react-router-dom';


const CreateStudentPopupForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState('');

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

    const studentData = {
      name,
      surname,
      teacher: teacherId,
    };
    



    // Send a POST request to save the student data
    axios.post(STUDENTS_API_URL, studentData)
      .then(response => {
        console.log('Student added:', response.data);
        setName('');
        setSurname('');
        setTeacherId('');
        //navigate('/student');
        onClose(); // Close the pop-up form
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" name="surname" value={surname} onChange={e => setSurname(e.target.value)} />
          </div>
           <div>
            <label htmlFor="surname">Teacher:</label>
    

            <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
              <option value="">Select a Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
              </select>

          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudentPopupForm;



