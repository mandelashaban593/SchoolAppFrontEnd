const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const STUDENTS_API_URL = `${API_URL}/api/students`;
const STUDENT_UPDATE_API_URL = `${API_URL}/api/studentUpdate`;
const STUDENT_DELETE_API_URL = `${API_URL}/api/studentDelete`;


const TEACHERS_API_URL = `${API_URL}/api/teachers`;
const TEACHER_UPDATE_API_URL = `${API_URL}/api/teacherUpdate`;
const TEACHER_DELETE_API_URL = `${API_URL}/api/teacherDelete`;

export { API_URL, STUDENTS_API_URL,STUDENT_UPDATE_API_URL,STUDENT_DELETE_API_URL, TEACHERS_API_URL,TEACHER_UPDATE_API_URL,TEACHER_DELETE_API_URL };

