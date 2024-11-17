import Background from "./components/Background";
import "./App.css";
import './index.css';
import Form from "./components/Form";
import { styled } from "styled-components";

const FormContainer = styled.div`
  position: relative; /* Ensure z-index works correctly */
  z-index: 10;
`;

const BackgroundContainer = styled.div`
  position: relative; /* Ensure z-index works correctly */
  z-index: 1;
`;

export default function App() {
  return (
    <>
      <FormContainer>
        <Form />
      </FormContainer>
      <BackgroundContainer>
        <Background />
      </BackgroundContainer>
    </>
  );
};
