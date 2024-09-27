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

  return (
    <ArrowBack
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(-1);
      }}
    />
  );
};
