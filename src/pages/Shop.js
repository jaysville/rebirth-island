import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetCollectionsQuery } from "../redux/api/merchApi";
import { ProductsContainer } from "./Home";
import Product from "../components/ui/Product";

const Shop = () => {
  const params = useParams();
  const { collection } = params;

  const {
    data: Merch,
    isLoading,
    isSuccess,
  } = useGetCollectionsQuery(collection);

  return (
    <Style>
      <h3>{collection.toUpperCase()}</h3>

      <ProductsContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess ? (
          Merch.map((merch, i) => {
            return (
              <li key={i}>
                <Product product={merch} />
              </li>
            );
          })
        ) : (
          <p>Something went wrong</p>
        )}
      </ProductsContainer>
    </Style>
  );
};

export default Shop;

const Style = styled.div`
  h3 {
    text-align: center;
    color: #a55fa5;
  }
  margin-bottom: 200px;
`;
