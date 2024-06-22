import React, { useState, useEffect } from 'react';
import useInput from '../hooks/useInput';
import useValidation from '../hooks/useValidation';
import useFetch from '../hooks/useFetch';

export default function Form3() {
  const [surveyTopic, setSurveyTopic] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [additionalErrors, setAdditionalErrors] = useState({});

  const { data: fetchedQuestions, loading, error } = useFetch(
    surveyTopic ? `https://form-backend-aq0h.onrender.com/questions/${surveyTopic}` : null
  );

  useEffect(() => {
    if (fetchedQuestions) {
      setAdditionalQuestions(fetchedQuestions);
    }
  }, [fetchedQuestions]);

  const validationRules = {
    fullName: (value) => (!value ? 'Full Name is required' : ''),
    email: (value) => {
      if (!value) return 'Email is required';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailPattern.test(value) ? 'Invalid email format' : '';
    },
    surveyTopic: (value) => (!value ? 'Survey Topic is required' : ''),
    feedback: (value) => (!value ? 'Feedback is required' : value.length < 10 ? 'Feedback must be at least 10 characters' : ''),
  };

  const { validate, validateAll, errors } = useValidation(validationRules);

  const fullNameInput = useInput('', (value) => validate('fullName', value));
  const emailInput = useInput('', (value) => validate('email', value));
  const feedbackInput = useInput('', (value) => validate('feedback', value));

  const handleSurveyTopicChange = (event) => {
    setSurveyTopic(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {
      fullName: fullNameInput.value,
      email: emailInput.value,
      surveyTopic,
      feedback: feedbackInput.value,
      additionalResponses: additionalQuestions.map((question) => ({
        id: question.id,
        question: question.question,
        answer: question.answer || '',
      })),
    };

    const validationErrors = validateAll(formData);
    let hasAdditionalErrors = false;
    const newAdditionalErrors = {};

    additionalQuestions.forEach((question) => {
      const response = formData.additionalResponses.find((q) => q.id === question.id);
      if (!response.answer) {
        newAdditionalErrors[`additionalQuestion-${question.id}`] = `Required`;
        hasAdditionalErrors = true;
      }
    });

    setAdditionalErrors(newAdditionalErrors);

    if (Object.values(validationErrors).some((error) => error) || hasAdditionalErrors) {
      console.log('Form has errors:', { ...validationErrors, ...newAdditionalErrors });
      return;
    }

    setSubmittedData(formData);
    console.log('Form Submitted:', formData);
  };

  const handleAdditionalQuestionChange = (id, answer) => {
    setAdditionalQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, answer } : question
      )
    );

    // Clear error message for the changed question
    setAdditionalErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`additionalQuestion-${id}`];
      return newErrors;
    });
  };

  return (
    <div>
      <div className="heading">
          Form - 3
        </div>
      <form onSubmit={onSubmit} className="Labels container">
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            className="inputs"
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
          <label htmlFor="surveyTopic">Survey Topic:</label>
          <select className="inputs"
            id="surveyTopic"
            value={surveyTopic}
            onChange={handleSurveyTopicChange}
          >
            <option value="" className="inputs">Select...</option>
            <option value="Technology" className="inputs">Technology</option>
            <option value="Health" className="inputs">Health</option>
            <option value="Education" className="inputs">Education</option>
          </select>
          {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
        </div>

        {surveyTopic && !loading && additionalQuestions.length > 0 && (
          <div>
            <h3>{surveyTopic} Questions:</h3>
            {additionalQuestions.map((question) => (
              <div key={question.id}>
                <label htmlFor={`question-${question.id}`}>{question.question}</label>
                {question.options && question.options.length > 0 ? (
                  <select className="inputs"
                    id={`question-${question.id}`}
                    onChange={(e) => handleAdditionalQuestionChange(question.id, e.target.value)}
                  >
                    <option value="" className="inputs">Select...</option>
                    {question.options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input className="inputs"
                    type="text"
                    id={`question-${question.id}`}
                    onChange={(e) => handleAdditionalQuestionChange(question.id, e.target.value)}
                  />
                )}
                {additionalErrors[`additionalQuestion-${question.id}`] && (
                  <span style={{ color: 'red' }}>{additionalErrors[`additionalQuestion-${question.id}`]}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {error && <div className="error">Error fetching questions: {error}</div>}

        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea className="inputs "
            id="feedback"
            value={feedbackInput.value}
            onChange={feedbackInput.handleChange}
          ></textarea>
          {errors.feedback && <span>{errors.feedback}</span>}
        </div>

        <input type="submit" value="Submit" className="submit-button"/>
      </form>

      {submittedData && (
        <div className="heading">
          <h2>Submitted Data:</h2>
          <div><strong>Full Name:</strong> {submittedData.fullName}</div>
          <div><strong>Email:</strong> {submittedData.email}</div>
          <div><strong>Survey Topic:</strong> {submittedData.surveyTopic}</div>
          {submittedData.additionalResponses && (
            <>
              <h3>{surveyTopic} Questions Responses:</h3>
              {submittedData.additionalResponses.map((response) => (
                <div key={response.id}>
                  <strong>{response.question}</strong>
                  <p>{response.answer}</p>
                </div>
              ))}
            </>
          )}
          <div><strong>Feedback:</strong> {submittedData.feedback}</div>
        </div>
      )}
    </div>
  );
}
