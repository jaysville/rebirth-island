import styled from "styled-components";

const RefundPolicy = () => {
  return (
    <Style>
      <h3>Return and refund policy </h3>
      <ul>
        <li>
          Return requests must be submitted within 3 days from delivery date.
        </li>
        <li>
          Items must be unworn, unused, unwashed and in the original condition
          received.
        </li>
        <li>
          The Clothing material must not be damaged/tampered with.(we advise you
          keep pictorial evidence to ascertain the condition you got it)
        </li>
        <li>
          The clothing material must be returned in the original clear bag
          provided, and packaged inside a protective shipping box
        </li>
        <li>
          All items purchased during a promotional period and using a discount
          code are final sale.
        </li>
      </ul>
      <h3>REFUNDS</h3>
      <p>
        Please allow up to 7-10 business days (once your return has arrived back
        to us to inspect and authenticate the items) and process your refund.
        <br /> <br />
        Refunds will be issued as store credit or to the provided payment
        method.
        <br /> <br /> We reserve the right to modify these Terms at any time.
        Changes will be effective immediately.
      </p>
    </Style>
  );
};

export default RefundPolicy;

const Style = styled.div`
  padding: 50px;
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
  h3 {
    color: #a55fa5;
    font-weight: bold;
  }
`;
