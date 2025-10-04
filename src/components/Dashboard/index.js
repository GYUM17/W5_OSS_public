import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { employeeAPI } from '../../services/api';

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeAPI.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load employees data.',
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = id => {
    const [employee] = employees.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.value) {
        try {
          const [employee] = employees.filter(employee => employee.id === id);
          await employeeAPI.deleteEmployee(id);
          
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          // 데이터 다시 로드
          await loadEmployees();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete employee.',
            showConfirmButton: true,
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading employees...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          onEmployeeAdded={loadEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          selectedEmployee={selectedEmployee}
          onEmployeeUpdated={loadEmployees}
          setIsEditing={setIsEditing}
        />
      )}
      <footer>
        <p>&copy; 2024 Employee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
