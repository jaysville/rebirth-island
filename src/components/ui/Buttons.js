import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

export const MainBtn = styled.button`
  width: 110px;
  border-radius: 10px;
  height: 50px;
  background-color: #a55fa5;
  color: aliceblue;
  border: none;
`;

export const ShopNowBtn = styled.button`
  width: 150px;
  height: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius: 20px;
  color: aliceblue;
  border: none;
  background: #7f00ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #e100ff,
    #7f00ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #e100ff,
    #7f00ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export const QuantityControl = styled.div`
  width: 120px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 20px;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
  display: inline-flex;
  justify-content: space-between;
  margin-left: 23px;
  div {
    margin: 0 10px;
    cursor: pointer;
  }
`;

export const AltBtn = styled.button`
  background-color: black;
  color: aliceblue;
  border: none;
  height: 50px;
`;

export const GoBack = () => {
  const navigate = useNavigate();

  const GoBackBtn = styled(ArrowBack)`
    position: absolute;
    left: 70px;
    color: #a55fa5;
    @media (max-width: 780px) {
      left: 50px;
    }
  `;
  return (
    <GoBackBtn
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(-1);
      }}
    />
  );
};
