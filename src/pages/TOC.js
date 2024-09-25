import styled from "styled-components";

const TOC = () => {
  return (
    <Style>
      <h3>Terms of Use & User Conduct</h3>
      <ol>
        <li>
          <b>Age Restriction</b> - You must be at least 18 years old to use our
          Site.
        </li>
        <li>
          <b>Intellectual Property</b> - All content, designs, and trademarks on
          our Site are owned by Rebirth Island. You may not reproduce,
          distribute, or display any content without our prior written consent.
        </li>
        <li>
          <b> Ordering and Payment</b> - You must provide accurate and complete
          payment information.
        </li>
        <li>
          <b> Payment and transactions</b> - We complete transactions via
          PAYSTACK.
          <br />
          All sales are final, Returns and exchanges are subject to our Return
          Policy.
        </li>
        <li>
          <b> Product Information</b> - We strive to provide accurate product
          descriptions, but we reserve the right to correct errors.
        </li>
        <li>
          <b>Shipping</b> - We will ship products within 3 days after completing
          order. Delivery times and costs are estimates.
        </li>
        <li>
          <b> Warranty</b> - Our products are warranted to be free from defects
          for [timeframe].
        </li>
      </ol>
      <h3>You agree not to:</h3>
      <ul>
        <li> Use our Site for unlawful or harmful purposes.</li>
        <li>Interfere with or disrupt our Site's operation.</li>
        <li> Upload or transmit malicious software.</li>
        <li>Use automated scripts or bots.</li>
      </ul>

      <small>
        We reserve the right to modify these Terms at any time. Changes will be
        effective immediately.
      </small>
    </Style>
  );
};

export default TOC;

const Style = styled.div`
  padding: 50px;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    padding: 50px 20px;
  }
  h3 {
    color: #a55fa5;
    font-weight: bold;
  }
  ol,
  ul {
    padding-inline-start: 1em;
  }
  ul {
    list-style-type: square;
  }
  li {
    padding: 5px 3px 5px 0;
  }
`;
