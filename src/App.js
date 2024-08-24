import { useState, useEffect } from "react";
import Nav from "./components/layout/Nav";
import SideNav from "./components/layout/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Product from "./pages/Product";
import styled from "styled-components";

function App() {
  const [mobileView, setMobileView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openSideNav, setOpenSideNav] = useState(false);

  const toggleSideNav = (newState) => {
    setOpenSideNav(newState);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (windowWidth <= 800) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  ////
  return (
    <div>
      <Nav
        mobileview={mobileView}
        opensidenav={() => {
          toggleSideNav(true);
        }}
      />
      <SideNav
        opensidenav={openSideNav}
        closesidenav={() => {
          toggleSideNav(false);
        }}
      />
      <Container>
        <Routes>
          <Route path="/" element={<Home mobileview={mobileView} />} />
          <Route path="/product/:id" element={<Product />} />
          {/* <Route path="/test" element={<p>WHats wrong na </p>} /> */}
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

const Container = styled.div`
  margin-top: 120px;
`;
