import styled from "styled-components";
import { MainBtn } from "../ui/Buttons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const isAdmin = useSelector((state) => state.app.isAdmin);
  const navigate = useNavigate();
  return (
    <Style>
      <div>
        <h2>
          Welcome to the
          <br /> Rebirth Island
        </h2>
        {!isAdmin && (
          <a href="#shop">
            <MainBtn type="button">Shop Now</MainBtn>
          </a>
        )}
      </div>
    </Style>
  );
};

const Style = styled.div`
  height: 650px;
  background-image: url("images/banner2.JPG");
  background-size: cover;
  background-position: center;
  position: relative;
  div {
    position: absolute;
    top: 150px;
    left: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1000px) {
      top: 220px;
      left: 50px;
      h2 {
        font-size: 30px;
      }
    }
  }
  h2 {
    font-family: "Dancing Script", cursive, "Sans Serif";
    color: #fcf0ff;
    font-size: 50px;
    @media (max-width: 600px) {
      color: #d994d7;
    }
  }
`;

export default Landing;
