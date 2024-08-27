import { Drawer } from "@mui/material";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Menu } from "antd";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useSelector } from "react-redux";

const SideNav = ({ opensidenav, closesidenav }) => {
  const totalQuantity = useSelector((state) => state.app.totalQuantity);

  return (
    <Drawer open={opensidenav} onClose={closesidenav}>
      <Container>
        <Close onClick={closesidenav} />
        <a href="/cart">
          <CartLink>
            <span>Cart ({totalQuantity} Item(s))</span>{" "}
            <ShoppingCartOutlinedIcon />
          </CartLink>
        </a>
        <Menu
          onClick={() => {
            console.log("hi");
          }}
          mode="inline"
          items={items}
        />
        <AuthLink>
          <PersonOutlineOutlinedIcon />
          <span>Login/Create Account</span>
        </AuthLink>
      </Container>
    </Drawer>
  );
};

export default SideNav;

const Container = styled.div`
  padding: 20px;
  width: 350px;
  li {
    margin: 10px 0;
    border-radius: 0;
  }
`;

const Close = styled(CloseOutlined)`
  cursor: pointer;
`;

const CartLink = styled.div`
  border: 1px solid grey;
  padding: 10px 30px;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  margin: 50px 0;
  svg {
    transform: scale(0.8);
  }
  span {
    transform: translateY(3px);
  }
`;

const AuthLink = styled.div`
  border-bottom: 1px solid grey;
  padding: 10px 0;
  padding-left: 20px;
  svg {
    transform: scale(0.8) translateY(8px);
  }
`;

const items = [
  { type: "divider" },
  {
    key: "1",
    label: "New Arrivals",
  },
  { type: "divider" },
  {
    key: "2",

    label: "Men",
    children: [
      {
        key: "all",
        label: "All",
      },
      {
        key: "clothing",
        label: "Clothings",
      },
      {
        key: "hats",
        label: "Hats",
      },
    ],
  },
  { type: "divider" },
  {
    key: "3",

    label: "Women",
    children: [
      {
        key: "w1",
        label: "All",
      },
      {
        key: "w2",
        label: "Clothings",
      },
      {
        key: "w3",
        label: "Hats",
      },
    ],
  },
  { type: "divider" },
];
