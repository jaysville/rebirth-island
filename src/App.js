import { useState, useEffect } from "react";
import Nav from "./components/layout/Nav";
import SideNav from "./components/layout/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";

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
      <Routes>
        <Route path="/" exact element={<Home mobileview={mobileView} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
