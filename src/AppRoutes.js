// AppRoutes.js
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './components/Home';
import Student from './components/Student';
import CreateStudent from './components/CreateStudent';
import EditStudent from './components/EditStudent';
import Teacher from './components/Teacher';
import CreateTeacher from './components/CreateTeacher';
import EditTeacher from './components/EditTeacher';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/student', element: <Student /> },
  { path: '/createstudent', element: <CreateStudent /> },
  { path: '/editstudent/:id', element: <EditStudent /> },
  { path: '/teacher', element: <Teacher /> },
  { path: '/createteacher', element: <CreateTeacher /> },
  { path: '/editteacher/:id', element: <EditTeacher /> },

];

function AppRoutes() {
  const routeResult = useRoutes(routes);

  return routeResult;
}

export default AppRoutes;


