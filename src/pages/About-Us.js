import { Grid } from "@mui/material";
import styled from "styled-components";

const AboutUs = () => {
  return (
    <Style>
      <h2>About Us</h2>
      <h3>Welcome to Rebirth Island</h3>
      <p>
        At Rebirth Island, we're passionate about creating clothing that
        inspires confidence and self-expression. Our story began with a simple
        idea: to craft simple, high-quality, stylish apparel that makes you feel
        good.
      </p>
      <Grid container>
        <Grid size={{ md: 5, xs: 12 }} order={{ xs: 1, md: 2 }}>
          <h3>Our Mission</h3>
          <div className="text-container">
            To design and produce clothing that:
            <ul>
              <li>Celebrates individuality</li>
              <li>Embraces sustainability</li>
              <li>Fosters community</li>
            </ul>
          </div>
        </Grid>
        <Grid
          size={{ md: 5, xs: 12 }}
          order={{ xs: 1, md: 2 }}
          className="img-container"
        >
          <img src="/images/MV4.JPG" alt="poster" />
        </Grid>
      </Grid>

      <h3>Our Story</h3>
      <p>
        Rebirth Island was founded in 2022 by Oyegbola Mayowa, a design
        enthusiast with a vision to challenge the status quo and break into the
        wearable art industry. Our journey began in Lagos, Nigeria. Where we
        started designing and producing small batches of clothing for friends
        and family.
        <br />
        <br /> As word spread, our community grew, and so did our passion for
        creating meaningful, wearable art. Today, we're growing proud to be a
        part of's the nation’s vibrant fashion scene.
      </p>
      <h3>Our Values</h3>
      <p>
        <ul>
          <li>
            {" "}
            <b>Quality:</b> We're committed to crafting clothing that lasts.
          </li>
          <li>
            {" "}
            <b>Authenticity:</b> We stay true to our vision and values.
          </li>
          <li>
            <b>Sustainability:</b> We strive to reduce our environmental
            footprint.
          </li>
        </ul>
      </p>
    </Style>
  );
};

export default AboutUs;

const Style = styled.div`
  padding: 50px;
  font-size: 14px;
  @media (max-width: 900px) {
    padding: 50px 20px;
  }
  ul {
    padding-inline-start: 1em;
    list-style-type: square;
    li {
      padding: 3px;
    }
  }
  .img-container {
    display: grid;
    place-items: center;
  }
  img {
    width: 255px;
    height: 319px;
  }
  h3 {
    color: #a55fa5;
    font-weight: bold;
  }
  b {
    font-weight: 500;
  }
  h2 {
    text-align: center;
  }
  p {
    font-size: 14px;
  }
`;
