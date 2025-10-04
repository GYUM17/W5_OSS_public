import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { employeeAPI } from '../../services/api';

const Add = ({ onEmployeeAdded, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = async e => {
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
      const newEmployee = {
        firstName,
        lastName,
        email,
        phone,
        salary,
        date,
      };

      await employeeAPI.createEmployee(newEmployee);
      
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${firstName} ${lastName}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsAdding(false);
      onEmployeeAdded(); // 부모 컴포넌트에서 데이터 다시 로드
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add employee.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
