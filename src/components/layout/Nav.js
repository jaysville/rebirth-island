import styled from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";

const Nav = ({ mobileview, opensidenav, opencartmodal, openlogoutmodal }) => {
  const totalQuantity = useSelector((state) => state.app.totalQuantity);
  const navigate = useNavigate();
  const [onCheckoutPage, setOnCheckoutPage] = useState(false);

  const location = useLocation();

  const token = useSelector((state) => state.app.token);

  const isAdmin = useSelector((state) => state.app.isAdmin);

  useEffect(() => {
    if (location.pathname === "/checkout") {
      setOnCheckoutPage(true);
    } else {
      setOnCheckoutPage(false);
    }
  }, [location]);

  const otherLinks = [
    {
      title: "Account",
      icon: <AccountIcon />,
      onClick: () => {
        navigate(!token ? "/login" : "/account");
      },
    },
    {
      title: "Logout",
      icon: <LogoutIcon />,
      onClick: () => {
        openlogoutmodal();
      },
    },
    {
      title: "Cart",
      icon: (
        <Badge
          badgeContent={onCheckoutPage ? 0 : totalQuantity}
          color="secondary"
          sx={{ fontStyle: "normal" }}
        >
          <ShoppingCartOutlinedIcon />
        </Badge>
      ),
      onClick: () => {
        opencartmodal();
      },
    },
    ,
  ];

  return (
    <Style>
      {mobileview && !onCheckoutPage && <Hamburger onClick={opensidenav} />}
      <a href="/">
        <Logo
          src={`${process.env.PUBLIC_URL}/images/Logo.png`}
          alt="logo"
          mobileview={mobileview}
          isAdmin={isAdmin}
        />
      </a>
      {!isAdmin && !mobileview && (
        <CollectionsList>
          {!onCheckoutPage &&
            collectionLinks.map(({ title, href, items }, i) => {
              return (
                <li key={i}>
                  {items ? (
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a>
                        <Space>
                          {title} <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  ) : (
                    <a href={href}> {title}</a>
                  )}
                </li>
              );
            })}
        </CollectionsList>
      )}
      {isAdmin && !mobileview && (
        <AdminContainer
          onClick={() => {
            navigate("/add-merch");
          }}
        >
          <span>Add Merch</span>
        </AdminContainer>
      )}
      {isAdmin && !mobileview && (
        <AdminContainer
          onClick={() => {
            navigate("/orders");
          }}
        >
          <span>Orders</span>
        </AdminContainer>
      )}
      <OtherLists mobileview={mobileview}>
        {otherLinks.map(({ title, icon, onClick }, i) => {
          const indicesToExclude = [0, 1];

          if ((mobileview || onCheckoutPage) && indicesToExclude.includes(i)) {
            return null;
          }
          if (!token && i === 1) {
            return null;
          }

          if (isAdmin & (i === 2 || i === 0)) {
            return null;
          }
          return (
            <li key={i} onClick={onClick}>
              <div>
                <span className="title">{title}</span>
              </div>
              <i>{icon}</i>
            </li>
          );
        })}
      </OtherLists>
    </Style>
  );
};

export default Nav;

const Style = styled.nav`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  background-color: white;
  position: fixed;
  z-index: 1000;
  width: 100%;
  top: 0;
  ul {
    display: flex;
  }
  li {
    margin: 15px;
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 100px;
  transform: scale(1.5) translateX(20px);
  cursor: pointer;
`;
const AdminContainer = styled.div`
  font-weight: 500;
  /* transform: translateY(9px); */
  display: grid;
  place-items: center;
  cursor: pointer;
`;
const CollectionsList = styled.ul`
  font-weight: 500;
  transform: translateY(9px) translateX(50px);
  svg {
    transform: scale(0.6) translateX(-18px) translateY(3px);
  }
`;

const OtherLists = styled.ul`
  svg {
    fill: rgba(0, 0, 0, 0.7);
    font-size: 22px;
    /* transform: scale(0.8); */
  }

  transform: translateX(-30px);
  li {
    display: flex;
    align-items: center;
    transform: translateY(5px);
    @media (max-width: 800px) {
      transform: translateY(15px);
    }
  }
`;

const AccountIcon = styled(PermIdentityIcon)`
  transform: translateY(3px);
`;

const Hamburger = styled(MenuIcon)`
  transform: scale(1.5) translateY(38px) translateX(10px);
  cursor: pointer;
`;

const LogoutIcon = styled(Logout)`
  transform: scale(0.9) translateY(3px) translateX(2px);
`;

export const collectionLinks = [
  {
    title: "Male",
    href: "/collections/male",
  },
  {
    title: "Female",
    href: "/collections/female",
  },
  {
    title: "Accessories",
    href: "/collections/accessories",
  },
];
