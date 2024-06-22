import React, { useState } from 'react';
import useCustomForm from '../hooks/useCustomForm';

export default function Form1() {
  const [isAttendingWithGuest, setIsAttendingWithGuest] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validateForm = (name, value) => {
    if (name === 'Name' && !value) return 'Name is required';
    if (name === 'Email') {
      if (!value) return 'Email is required';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return 'Invalid email format';
    }
    if (name === 'Age') {
      if (!value) return 'Age is required';
      if (value <= 0) return 'Age must be greater than 0';
    }
    if (name === 'GuestName' && isAttendingWithGuest && !value) {
      return 'Guest name is required when attending with a guest';
    }
    return null;
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useCustomForm({
    Name: '',
    Email: '',
    Age: '',
    attendingWithGuest: '',
    GuestName: '',
  }, validateForm);


  const handleAttendingChange = (event) => {
    setIsAttendingWithGuest(event.target.value === 'Yes');
    handleChange(event); 
  };

  const onSubmit = (formData) => {
    setSubmittedData(formData);
    console.log('Form Submitted:', formData);
  };

  return (
    <div >
      <div className="heading">
          Form - 1
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className="Labels container">
        
        <div >
          <label htmlFor="Name" >Name:</label>
          <input
            className="inputs"
            type="text"
            id="Name"
            name="Name"
            value={values.Name}
            onChange={handleChange}
          />
          {errors.Name && <span>{errors.Name}</span>}
        </div>

        <div>
          <label htmlFor="Email">Email:</label>
          <input
            className="inputs"
            type="email"
            id="Email"
            name="Email"
            value={values.Email}
            onChange={handleChange}
          />
          {errors.Email && <span>{errors.Email}</span>}
        </div>

        <div>
          <label htmlFor="Age">Age:</label>
          <input
            className="inputs"
            type="number"
            id="Age"
            name="Age"
            value={values.Age}
            onChange={handleChange}
          />
          {errors.Age && <span>{errors.Age}</span>}
        </div>

        <div>
          <label htmlFor="attendingWithGuest">Are you attending with a guest?</label>
          <select className="inputs"
            id="attendingWithGuest"
            name="attendingWithGuest"
            value={values.attendingWithGuest}
            onChange={handleAttendingChange}
          >
            <option className="inputs" value="">Select...</option>
            <option className="inputs" value="Yes">Yes</option>
            <option className="inputs" value="No">No</option>
          </select>
          {errors.attendingWithGuest && <span>{errors.attendingWithGuest}</span>}
        </div>

        {isAttendingWithGuest && (
          <div className="Labels">
            <label htmlFor="GuestName">Guest Name:</label>
            <input className="inputs"
              type="text"
              id="GuestName"
              name="GuestName"
              value={values.GuestName}
              onChange={handleChange}
            />
            {errors.GuestName && <span>{errors.GuestName}</span>}
          </div>
        )}

        <input type="submit" value="Submit" className="submit-button"  />
      </form>

      {submittedData && (
        <div className="heading">
          <h2>Submitted Data:</h2>
          <div><strong>Name:</strong> {submittedData.Name}</div>
          <div><strong>Email:</strong> {submittedData.Email}</div>
          <div><strong>Age:</strong> {submittedData.Age}</div>
          <div><strong>Attending with Guest:</strong> {submittedData.attendingWithGuest}</div>
          {submittedData.attendingWithGuest === 'Yes' && (
            <div><strong>Guest Name:</strong> {submittedData.GuestName}</div>
          )}
        </div>
      )}
    </div>
  );
}
