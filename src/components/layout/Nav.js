import styled from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

const Nav = ({ mobileview, opensidenav, opencartmodal }) => {
  const totalQuantity = useSelector((state) => state.app.totalQuantity);
  const navigate = useNavigate();

  const otherLinks = [
    {
      title: "Account",
      icon: <AccountIcon />,
      onClick: () => {
        navigate("/login");
      },
    },
    {
      title: "Cart",
      icon: (
        <Badge
          badgeContent={totalQuantity}
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
      {mobileview && <Hamburger onClick={opensidenav} />}
      <a href="/">
        <Logo
          src={`${process.env.PUBLIC_URL}/images/Logo.png`}
          alt="logo"
          mobileview={mobileview}
        />
      </a>
      {!mobileview && (
        <CollectionsList>
          {collectionLinks.map(({ title, href, items }, i) => {
            return (
              <li key={i}>
                {items ? (
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {title} <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                ) : (
                  <a>{title}</a>
                )}
              </li>
            );
          })}
        </CollectionsList>
      )}
      <OtherLists mobileview={mobileview}>
        {otherLinks.map(({ title, icon, onClick }, i) => {
          const indexToExclude = 0;

          if (mobileview && i === indexToExclude) {
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
  padding: 5px;
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
  transform: ${(props) =>
    props.mobileview
      ? "scale(1.7) translateX(5px) "
      : "scale(1.6)  translateX(20px) "};
  cursor: pointer;
`;

const CollectionsList = styled.ul`
  font-weight: 500;
  transform: translateY(9px);
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
    transform: translateY(-3px);
    @media (max-width: 800px) {
      transform: translateY(15px);
    }
    div {
      transform: translateY(2px);
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

const collectionLinks = [
  {
    title: "New Arrivals",
    href: "",
  },
  {
    title: "Men",
    href: "",
    items: [
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            All
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Clothing
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Hats
          </a>
        ),
      },
    ],
  },
  {
    title: "Women",
    href: "",
  },
  {
    title: "Collection",
    href: "",
    items: [
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            All
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Clothing
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Hats
          </a>
        ),
      },
    ],
  },
];
