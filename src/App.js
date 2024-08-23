import { useState, useEffect } from "react";
import Nav from "./components/layout/Nav";
import SideNav from "./components/layout/SideNav";
import Landing from "./components/layout/Landing";

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
      <Landing />
    </div>
  );
}

export default App;
