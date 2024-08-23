import styled from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Nav = ({ mobileview, opensidenav }) => {
  return (
    <Style>
      {mobileview && <Hamburger onClick={opensidenav} />}
      <Logo src="images/Logo.png" alt="logo" mobileview={mobileview} />
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
        {otherLinks.map(({ title, icon, href }, i) => {
          const indexToExclude = 0;

          if (mobileview && i === indexToExclude) {
            return null;
          }
          return (
            <li key={i}>
              {title}
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
  padding: 5px;
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
    transform: translateY(5px) scale(0.8);
  }
`;

const Hamburger = styled(MenuIcon)`
  transform: scale(1.3) translateY(35px);
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

const otherLinks = [
  {
    title: "Account",
    icon: <PermIdentityIcon />,
  },
  {
    title: "Cart",
    icon: <ShoppingCartOutlinedIcon />,
  },
  ,
];
