import styled from "styled-components";

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
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
  display: inline-flex;
  justify-content: space-between;
  margin-left: 17px;
  input {
    border: none;
    outline: none;
    width: 10px;
  }

  span {
    margin: auto 10px;
    cursor: pointer;
  }
`;

export const CheckoutBtn = styled.button`
  background-color: black;
  color: aliceblue;
  border: none;
  height: 50px;
`;
