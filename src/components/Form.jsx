import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components';
import "../App.css"
import ConfettiExplosion from "react-confetti-explosion";
import Sprightful from "../Assets/sprightful.png";
import Bulb from "../Assets/bulb.png";


const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 13%;
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid grey;
  box-shadow: 0 0 25px grey;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  input {
    margin-bottom: 10px;
    padding: 7px;
    text-align: center;
    height: 20px;
    margin-top: 30px;
    width: 100%;
    font-size: 20px;
    border-radius: 4px;
  }

  img {
    margin-bottom: 10px;
  }

@media 
`

const Animation = keyframes`
  0% { box-shadow: 0 0 30px #f44336 }
  20% { box-shadow: 0 0 30px #e57373 }
  40% { box-shadow: 0 0 30px #ff7043 }
  60% { box-shadow: 0 0 30px #ff5722 }
  80% { box-shadow: 0 0 30px #ff9800 }
  100% { box-shadow: 0 0 30px #f44336 }
`;

const ButtonContainer = styled.div`
  border-radius: 10px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.08);
  animation-duration: 4s;
  animation-iteration-count: infinite;
  box-shadow: 0 0px 20px #ffffff;
  margin-top: 20px;
  padding: 20px;
  backdrop-filter: blur(30px);

  button {
    font-size: 40px;
    background-color: transparent;
    border-radius: 20px;
    color: white;
    border: none;
    padding-left: 40px;
    padding-right: 40px;

    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px); /* Button hover effect */
    }
  }
`

const ProgressContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ProgressItem = styled.div`
  padding: 10px 20px;
  display: flex;
  border-radius: 5px;
  background-color: ${(props) => (props.completed ? '#1976d2' : props.isActive ? 'rgba(255, 255, 255, 0.09)' : 'rgba(255, 255, 255, 0.2)')};
  border: ${(props) => (props.completed ? '' : props.isActive ? '#1976d2' : '')};

  /* Apply animation when isActive is true */
  ${(props) =>
    props.isActive &&
    css`
      animation-name: ${Animation};
      animation-duration: 4s;
      animation-iteration-count: infinite;
    `}
  
  /* Box shadow dynamically changes for active items */
  box-shadow: ${(props) => props.isActive ? '0 0 30px #2196f3' : '0 4px 10px rgba(0, 0, 0, 0.2)'}; 
  
  color: white;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  align-content: center;
  cursor: ${(props) => (props.isActive || props.completed ? 'pointer' : 'default')};
  opacity: ${(props) => (props.isActive || props.completed ? 1 : 0.6)};
`;

const bigExplodeProps = {
  force: 0.6,
  duration: 5000,
  particleCount: 200,
  zIndex: 50
};

const Form = () => {
  const fields = ['First Name', 'Last Name', 'Address', 'Energy Bill'];
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    energyBill: null,
  });
  const confettiRef = useRef(null);
  const [confettiSteps, setConfettiSteps] = useState(
    Array(fields.length).fill(false)
  );
  const timeoutRef = useRef(null);
  const [mobileHidden, setMobileHidden] = useState(window.innerWidth > 900);

  const handleNext = () => {
    const fieldName = fields[currentStep];
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: inputValue,
    }));

    const updatedConfettiSteps = [...confettiSteps];
    updatedConfettiSteps[currentStep] = true;
    setConfettiSteps(updatedConfettiSteps);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updatedConfettiSteps[currentStep] = false;
      setConfettiSteps([...updatedConfettiSteps]);
    }, bigExplodeProps.duration);

    setInputValue('');
    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({
        ...formData,
        energyBill: file,
      });
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the form from submitting if Enter is pressed
      handleNext(); // Trigger the next button click
    }
  };

  const handleProgressClick = (index) => {
    if (index <= currentStep) {
      setCurrentStep(index); // Allow the user to go back to a previous step
      setInputValue(formData[fields[index]] || ''); // Pre-fill the input field
    }
  };


  return (
    <>
      <FlexContainer>
        <FormContainer>
          <img
            style={{ height: "120px", width: "120px" }}
            src={Bulb}
          />
          <br />
          <ProgressContainer>
            {fields.map((field, index) => (
              <ProgressItem
                key={field}
                onClick={() => handleProgressClick(index)}
                completed={index < currentStep}
                isActive={index === currentStep}
                style={{ cursor: index < currentStep ? 'pointer' : 'default' }}
              >
                {formData[field] && field}
                <br />
                {index < currentStep ? formData[field] : field}
                {confettiSteps[index] && (
                  <ConfettiExplosion {...bigExplodeProps} />
                )}
              </ProgressItem>
            ))}
          </ProgressContainer>
          <form onKeyDown={handleKeyDown}>
            {currentStep === fields.length - 1 ? (
              <input
                style={{ color: "white" }}
                type="file"
                name="energyBill"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            ) : (
              // Only render the first field on mobile breakpoints
              currentStep === 0 && (
                <input
                  name={fields[currentStep]}
                  placeholder={`Enter your ${fields[currentStep]}`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              )
            )}
            <ButtonContainer>
              <button
                ref={confettiRef}
                type="button"
                onClick={handleNext}
                disabled={currentStep === fields.length - 1 && !formData.energyBill && !inputValue.trim()}
              >
                {currentStep === fields.length - 1 ? 'Submit' : 'Next'}
              </button>
            </ButtonContainer>
          </form>
        </FormContainer>
      </FlexContainer>
    </>
  )
}

export default Form;
