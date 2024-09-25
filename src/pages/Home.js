import styled from "styled-components";
import Landing from "../components/layout/Landing";
import Product from "../components/ui/Product";
import { MainBtn } from "../components/ui/Buttons";
import { useGetMerchQuery } from "../redux/api/merchApi";
import { Spin } from "antd";

const Home = ({ mobileview }) => {
  const { data: Merch, isLoading, isSuccess } = useGetMerchQuery();

  return (
    <Style>
      <Landing />
      <section id="shop">
        <h3>BestSellers</h3>
        <ProductsContainer>
          {isLoading ? (
            <Spin />
          ) : isSuccess ? (
            Merch.map((merch, i) => {
              return (
                <li key={i}>
                  <Product product={merch} mobileview={mobileview} />
                </li>
              );
            })
          ) : (
            <p>Something went wrong</p>
          )}
        </ProductsContainer>
      </section>
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
  #shop {
    margin-top: 50px;
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
