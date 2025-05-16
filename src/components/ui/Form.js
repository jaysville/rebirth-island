import styled from "styled-components";

const Form = styled.form`
  input {
    width: 100%;
    height: 40px;
    /* border: 1px solid; */
    outline: none;
    padding: 5px;
    box-sizing: border-box;
  }
  label {
    display: block;
    font-weight: 600;
    font-size: 15px;
    margin: 5px 0;
  }
  button {
    display: block;
    border-radius: 0;
    width: 100%;
    margin: 10px 0;
    cursor: pointer;
  }
`;

export default Form;
