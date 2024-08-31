import styled from "styled-components";
import Form from "../../components/ui/Form";
import { AltBtn, MainBtn } from "../../components/ui/Buttons";

const Register = () => {
  return (
    <Style>
      <h3>Register</h3>
      <Form>
        <div>
          <label>Full Name</label>
          <input />
        </div>

        <div>
          <label>Email</label>
          <input type="email" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" />
        </div>

        <MainBtn type="submit">Register</MainBtn>
      </Form>
    </Style>
  );
};

const Style = styled.div`
  margin: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  form {
    width: 400px;
    @media (max-width: 460px) {
      width: 100%;
    }
  }
  h3 {
    text-align: center;
  }

  div {
    margin-bottom: 20px;
  }
`;

export default Register;
