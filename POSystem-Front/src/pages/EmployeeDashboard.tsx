import React from 'react';
import TitleBar from "../components/TitleBar";
import Employee from '../components/employee/employee';

const EmployeeDashboard: React.FC = () => {
  return (
    <div>
      <TitleBar role="Employee"/>
      
      <Employee />
      {/* Add more content or components here */}
    </div>
  );
};

export default EmployeeDashboard;
