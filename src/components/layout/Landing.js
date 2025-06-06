import styled from "styled-components";
import { MainBtn, ShopNowBtn } from "../ui/Buttons";
import { useSelector } from "react-redux";
import Banner from "../../assets/banner2.JPG";
import Welcome from "../../assets/welcome.PNG";
import Slider from "react-slick";

const Landing = () => {
  const isAdmin = useSelector((state) => state.app.isAdmin);

  return (
    <Style>
      <div>
        <img src={Welcome} alt="welcome text" />
        {!isAdmin && (
          <a href="#shop">
            <ShopNowBtn type="button">SHOP NOW</ShopNowBtn>
          </a>
        )}
      </div>
    </Style>
  );
};

const Style = styled.div`
  height: 650px;
  background-image: url(${Banner});
  background-size: cover;
  background-position: center;
  position: relative;
  div {
    position: absolute;
    top: 240px;
    left: -60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      transform: scale(0.6);
    }
    @media (max-width: 980px) {
      transform: scale(0.9);

      left: -100px;
    }
    @media (max-width: 500px) {
      transform: scale(0.6);
      top: 350px;
      left: -130px;
    }
  }
`;

export default Landing;
