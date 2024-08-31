import { useState, useEffect } from "react";
import Nav from "./components/layout/Nav";
import SideNav from "./components/layout/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Product from "./pages/Product";
import styled from "styled-components";
import Cart from "./pages/Cart";
import CartModal from "./components/ui/CartModal";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Checkout from "./pages/Checkout";

function App() {
  const [mobileView, setMobileView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const toggleSideNav = (newState) => {
    setOpenSideNav(newState);
  };

  const toggleShowCartModal = (newState) => {
    setShowCartModal(newState);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (windowWidth <= 900) {
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
        opencartmodal={() => {
          toggleShowCartModal(true);
        }}
      />
      <SideNav
        opensidenav={openSideNav}
        closesidenav={() => {
          toggleSideNav(false);
        }}
      />
      <CartModal
        closecartmodal={() => {
          toggleShowCartModal(false);
        }}
        isopen={showCartModal}
      />
      <Container>
        <Routes>
          <Route path="/" element={<Home mobileview={mobileView} />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart mobileview={mobileView} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/checkout"
            element={<Checkout mobileview={mobileView} />}
          />
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
