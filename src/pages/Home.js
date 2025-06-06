import styled from "styled-components";
import Landing from "../components/layout/Landing";
import Product from "../components/ui/Product";
import { MainBtn } from "../components/ui/Buttons";
import Grid from "@mui/material/Grid";
import { useGetMerchQuery } from "../redux/api/merchApi";
import { Spin } from "antd";
import VideoPlayer from "../components/ui/VideoPlayer";

const Home = ({ mobileview }) => {
  const { data: Merch, isLoading, isSuccess } = useGetMerchQuery();

  return (
    <Style>
      <Landing />
      {/* <Grid container>
        <Grid size={{ md: 5, xs: 12 }} order={{ xs: 1, md: 2 }}>
          <VideoPlayer src="/videos/reborn.mp4" poster="/images/MV4.JPG" />
        </Grid>
        <Grid size={{ md: 7, xs: 12 }} order={{ xs: 1, md: 2 }}>
          <Item className="text-container">
            <Tag>Welcome To</Tag>
            <h1>Rebirth Island</h1>
            <p>
              Welcome to Rebirth Island – Redefining Style, One Collection at a
              Time Step into a world of premium fashion with our exclusive
              collections. Whether it's the Hot Summer Collection or the Rebirth
              Reborn Series, every piece is crafted for timeless elegance and
              effortless comfort.
            </p>
          </Item>
        </Grid>
      </Grid> */}
      <section id="shop">
        <h3>BestSellers</h3>
        <ProductsContainer>
          {isLoading ? (
            <Loader>
              Fetching Products <br />
              <br />
              <Spin />
            </Loader>
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
const Item = styled.div`
  text-align: center;
  margin-top: 20px;
  h1 {
    font-weight: bold;
    margin: 0;
  }
  h2 {
    text-align: center;
  }
  .h1 {
    text-align: start;
  }
  .image {
    width: 100%;
    height: auto;
    border-radius: 30px;
    padding-left: 10px;
  }

  &.text-container {
    display: flex;
    text-align: start;
    flex-direction: column;
    justify-content: center;
    padding: 10px;

    p {
      margin: 10px 0;
    }
    button {
      margin: 10px 0;
    }
  }
`;

const Loader = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
`;

export const Tag = styled.span`
  background-color: #f1f1f1;
  color: ${({ theme }) => theme.secondary};
  border-radius: 20px;
  padding: 5px;
  width: 100px;
  display: grid;
  place-items: center;
  transform: scale(0.9);

  font-size: 14px;
  i {
    transform: translateX(-8px);
    font-style: normal;
  }
`;

export const ProductsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Home;
