import styled from "styled-components";
import Landing from "../components/layout/Landing";
import { PRODUCTS } from "../data";
import Product from "../components/ui/Product";
import { MainBtn } from "../components/ui/Buttons";

const Home = ({ mobileview }) => {
  return (
    <Style>
      <Landing />
      <h3>BestSellers</h3>
      <ProductsContainer>
        {PRODUCTS.map((product, i) => {
          return (
            <li key={i}>
              <Product product={product} mobileview={mobileview} />
            </li>
          );
        })}
      </ProductsContainer>
      <MainBtn type="button">View All</MainBtn>
    </Style>
  );
};

const Style = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-align: center;
  }
  button {
    align-self: center;
    margin-top: 20px;
  }
`;

const ProductsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Home;
