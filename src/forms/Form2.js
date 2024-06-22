import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import useValidation from '../hooks/useValidation';

export default function Form2() {
  const [position, setPosition] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Validation rules
  const validationRules = {
    fullName: (value) => (!value ? 'Full Name is required' : ''),
    email: (value) => {
      if (!value) return 'Email is required';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailPattern.test(value) ? 'Invalid email format' : '';
    },
    phoneNumber: (value) => (!value ? 'Phone Number is required' : ''),
    relevantExperience: (value) => {
      if (['Developer', 'Designer'].includes(position) && (!value || value <= 0)) {
        return 'Relevant Experience must be a number greater than 0';
      }
      return '';
    },
    portfolioUrl: (value) => {
      if (position === 'Designer' && !value) return 'Portfolio URL is required';
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      return position === 'Designer' && !urlPattern.test(value) ? 'Invalid URL format' : '';
    },
    managementExperience: (value) => (position === 'Manager' && !value ? 'Management Experience is required' : ''),
    additionalSkills: (value) => (value.length === 0 ? 'At least one skill must be selected' : ''),
    preferredInterviewTime: (value) => (!value ? 'Preferred Interview Time is required' : ''),
  };

  const { validate, validateAll, errors } = useValidation(validationRules);

  // Using useInput hook for each field
  const fullNameInput = useInput('', (value) => validate('fullName', value));
  const emailInput = useInput('', (value) => validate('email', value));
  const phoneNumberInput = useInput('', (value) => validate('phoneNumber', value));
  const relevantExperienceInput = useInput('', (value) => validate('relevantExperience', value));
  const portfolioUrlInput = useInput('', (value) => validate('portfolioUrl', value));
  const managementExperienceInput = useInput('', (value) => validate('managementExperience', value));
  const preferredInterviewTimeInput = useInput('', (value) => validate('preferredInterviewTime', value));

  const [additionalSkills, setAdditionalSkills] = useState([]);
  const handleSkillChange = (event) => {
    const value = event.target.value;
    setAdditionalSkills((prevSkills) =>
      prevSkills.includes(value) ? prevSkills.filter((skill) => skill !== value) : [...prevSkills, value]
    );
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {
      fullName: fullNameInput.value,
      email: emailInput.value,
      phoneNumber: phoneNumberInput.value,
      position,
      relevantExperience: relevantExperienceInput.value,
      portfolioUrl: portfolioUrlInput.value,
      managementExperience: managementExperienceInput.value,
      additionalSkills,
      preferredInterviewTime: preferredInterviewTimeInput.value,
    };

    const validationErrors = validateAll(formData);

    if (Object.values(validationErrors).some((error) => error)) {
      console.log('Form has errors:', validationErrors);
      return;
    }

    setSubmittedData(formData);
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      <div className="heading">
          Form - 2
        </div>
      <form onSubmit={onSubmit} className="Labels container">
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input className="inputs"
            type="text"
            id="fullName"
            value={fullNameInput.value}
            onChange={fullNameInput.handleChange}
          />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input className="inputs"
            type="email"
            id="email"
            value={emailInput.value}
            onChange={emailInput.handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input className="inputs"
            type="number"
            id="phoneNumber"
            value={phoneNumberInput.value}
            onChange={phoneNumberInput.handleChange}
          />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </div>

        <div>
          <label htmlFor="position">Applying for Position:</label>
          <select className="inputs"
            id="position"
            value={position}
            onChange={handlePositionChange}
          >
            <option className="inputs" value="">Select...</option>
            <option  className="inputs" value="Developer">Developer</option>
            <option  className="inputs" value="Designer">Designer</option>
            <option className="inputs" value="Manager">Manager</option>
          </select>
        </div>

        {['Developer', 'Designer'].includes(position) && (
          <div>
            <label htmlFor="relevantExperience">Relevant Experience (years):</label>
            <input
              type="number"
              id="relevantExperience"
              value={relevantExperienceInput.value}
              onChange={relevantExperienceInput.handleChange}
            />
            {errors.relevantExperience && <span>{errors.relevantExperience}</span>}
          </div>
        )}

        {position === 'Designer' && (
          <div>
            <label htmlFor="portfolioUrl">Portfolio URL:</label>
            <input
              type="text"
              id="portfolioUrl"
              value={portfolioUrlInput.value}
              onChange={portfolioUrlInput.handleChange}
            />
            {errors.portfolioUrl && <span>{errors.portfolioUrl}</span>}
          </div>
        )}

        {position === 'Manager' && (
          <div>
            <label htmlFor="managementExperience">Management Experience:</label>
            <textarea
              id="managementExperience"
              value={managementExperienceInput.value}
              onChange={managementExperienceInput.handleChange}
            ></textarea>
            {errors.managementExperience && <span>{errors.managementExperience}</span>}
          </div>
        )}

        <div>
          <label>Additional Skills:</label>
          <div>
            <input
              type="checkbox"
              value="JavaScript"
              onChange={handleSkillChange}
            />
            <label>JavaScript</label>
          </div>
          <div>
            <input 
              type="checkbox"
              value="CSS"
              onChange={handleSkillChange}
            />
            <label>CSS</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Python"
              onChange={handleSkillChange}
            />
            <label>Python</label>
          </div>
          {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
        </div>

        <div>
          <label htmlFor="preferredInterviewTime">Preferred Interview Time:</label>
          <input className="inputs"
            type="datetime-local"
            id="preferredInterviewTime"
            value={preferredInterviewTimeInput.value}
            onChange={preferredInterviewTimeInput.handleChange}
          />
          {errors.preferredInterviewTime && <span>{errors.preferredInterviewTime}</span>}
        </div>

        <input type="submit" value="Submit" className="submit-button" />
      </form>

      {submittedData && (
        <div className="heading">
          <h2>Submitted Data:</h2>
          <div><strong>Full Name:</strong> {submittedData.fullName}</div>
          <div><strong>Email:</strong> {submittedData.email}</div>
          <div><strong>Phone Number:</strong> {submittedData.phoneNumber}</div>
          <div><strong>Position:</strong> {submittedData.position}</div>
          {['Developer', 'Designer'].includes(submittedData.position) && (
            <div><strong>Relevant Experience:</strong> {submittedData.relevantExperience}</div>
          )}
          {submittedData.position === 'Designer' && (
            <div><strong>Portfolio URL:</strong> {submittedData.portfolioUrl}</div>
          )}
          {submittedData.position === 'Manager' && (
            <div><strong>Management Experience:</strong> {submittedData.managementExperience}</div>
          )}
          <div><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</div>
          <div><strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}</div>
        </div>
      )}
    </div>
  );
}
