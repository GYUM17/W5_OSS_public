import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { employeeAPI } from '../../services/api';

const Edit = ({ selectedEmployee, onEmployeeUpdated, setIsEditing }) => {
  const id = selectedEmployee.id;

  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [phone, setPhone] = useState(selectedEmployee.phone || '');
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [date, setDate] = useState(selectedEmployee.date);

  const handleUpdate = async e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      const employee = {
        firstName,
        lastName,
        email,
        phone,
        salary,
        date,
      };

      await employeeAPI.updateEmployee(id, employee);
      
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsEditing(false);
      onEmployeeUpdated(); // 부모 컴포넌트에서 데이터 다시 로드
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update employee.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="010-1234-5678"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
