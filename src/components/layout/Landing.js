import styled from "styled-components";
import { MainBtn } from "../ui/Buttons";

const Landing = () => {
  return (
    <Style>
      <div>
        <h2>
          Welcome to the
          <br /> Rebirth Island
        </h2>
        <MainBtn>Shop Now</MainBtn>
      </div>
    </Style>
  );
};

const Style = styled.div`
  height: 700px;
  background-image: url("images/banner2.JPG");
  background-size: cover;
  background-position: center;
  position: relative;
  div {
    position: absolute;
    top: 280px;
    right: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1000px) {
      top: 330px;
      right: 50px;
    }
  }
  h2 {
    font-family: "Matemasie", "sans-serif";

    color: #fcf0ff;
  }
`;

export default Landing;
