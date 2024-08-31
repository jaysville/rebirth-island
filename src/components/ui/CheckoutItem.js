import { Badge } from "@mui/material";
import styled from "styled-components";

const CheckoutItem = ({ item }) => {
  return (
    <Style>
      <div>
        <Badge
          badgeContent={item.quantity}
          color="secondary"
          sx={{ fontStyle: "normal" }}
        >
          <img src={item.images[0]} alt="product" />
        </Badge>
      </div>
      <div className="details">
        <span>{item.name}</span>
        <span className="size">{item.size !== "N/A" && item.size}</span>
      </div>
      <div className="price">
        <span>${item.price}</span>
      </div>
    </Style>
  );
};

export default CheckoutItem;

const Style = styled.div`
  display: flex;
  margin-bottom: 30px;

  div.details {
    span {
      display: block;
      margin-left: 20px;
      margin-bottom: 5px;
    }
  }

  span.size {
    color: grey;
  }

  div.price {
    margin-left: auto;
  }
  img {
    width: 70px;
    border-radius: 10px;
  }
`;
