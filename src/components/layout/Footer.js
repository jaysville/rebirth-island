import styled from "styled-components";

const Footer = () => {
  return (
    <Style>
      <h5>Explore</h5>
      <ul>
        <li> About</li>
        <li>Contact</li>
        <li>FAQs</li>
        <li>Terms of Service</li>
      </ul>
    </Style>
  );
};
export default Footer;

const Style = styled.footer`
  background-color: #251d25;
  margin-top: 30px;
  color: aliceblue;
  padding: 10px 50px;
  li {
    padding: 3px;
  }
`;
