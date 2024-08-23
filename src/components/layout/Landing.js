import styled from "styled-components";
import { MainBtn } from "../ui/Buttons";

const Landing = () => {
  return (
    <Style>
      <div>
        <p>Welcome to the Rebirth Island</p>
        <MainBtn>Shop Now</MainBtn>
      </div>
    </Style>
  );
};

const Style = styled.div`
  height: 600px;
  background-image: url("images/banner2.JPG");
  background-size: cover;
  background-position: center;
  position: relative;
  div {
    position: absolute;
    top: 300px;
    left: 100px;
  }
`;

export default Landing;
