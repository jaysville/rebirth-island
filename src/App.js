import { useState, useEffect } from "react";
import Nav from "./components/layout/Nav";
import SideNav from "./components/layout/SideNav";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Product from "./pages/Product";
import styled from "styled-components";
import Cart from "./pages/Cart";
import CartModal from "./components/ui/CartModal";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Checkout from "./pages/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { Modal, notification } from "antd";
import { logout } from "./redux/store.js/slices/appSlice";
import AddMerch from "./pages/admin/AddMerch";
import EditMerch from "./pages/admin/EditMerch";
import AboutUs from "./pages/About-Us";
import RefundPolicy from "./pages/Refund-Policy";
import Contact from "./pages/Contact";
import TOC from "./pages/TOC";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import Shop from "./pages/Shop";
import { GoBack } from "./components/ui/Buttons";
import Account from "./pages/Account";
import ResetPassword from "./pages/Reset-Password";

function App() {
  const [mobileView, setMobileView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const sessionExpirationTime = useSelector(
    (state) => state.app.sessionExpiresAt
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionExpirationTime) {
      const interval = setInterval(() => {
        const currentDate = Date.now();

        if (currentDate > sessionExpirationTime) {
          notification.error({
            message: "Your session has expired. Please log in again",
            duration: 3,
            placement: "bottomRight",
          });
          dispatch(logout());
          clearInterval(interval);
        }
      }, 1000); // Check every second

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [sessionExpirationTime, dispatch]);

  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const handleOk = () => {
    setShowLogoutModal(false);
    dispatch(logout());
  };

  const handleCancel = () => {
    setShowLogoutModal(false);
  };

  const token = useSelector((state) => state.app.token);
  const isAdmin = useSelector((state) => state.app.isAdmin);
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
        openlogoutmodal={() => {
          setShowLogoutModal(true);
        }}
      />
      <SideNav
        opensidenav={openSideNav}
        closesidenav={() => {
          toggleSideNav(false);
        }}
        openlogoutmodal={() => {
          setShowLogoutModal(true);
        }}
      />
      <Modal
        title="Confirm Logout"
        open={showLogoutModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Are you sure you want to Logout?
      </Modal>
      <CartModal
        closecartmodal={() => {
          toggleShowCartModal(false);
        }}
        isopen={showCartModal}
      />
      <Container>
        {currentPath !== "/" && currentPath !== "/checkout" && <GoBack />}
        <Routes>
          <Route path="/" element={<Home mobileview={mobileView} />} />
          <Route
            path="/orders"
            element={isAdmin ? <Orders /> : <Navigate to="/" />}
          />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route
            path="/add-merch"
            element={
              isAdmin ? (
                <AddMerch mobileview={mobileView} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/edit-merch/:id"
            element={
              isAdmin ? (
                <EditMerch mobileview={mobileView} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {!isAdmin && token && <Route path="/account" element={<Account />} />}
          <Route path="/merch/:id" element={<Product />} />
          <Route path="/collections/:collection" element={<Shop />} />
          <Route
            path="/cart"
            element={
              !isAdmin ? <Cart mobileview={mobileView} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/checkout"
            element={
              !isAdmin ? (
                <Checkout mobileview={mobileView} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-use-and-conduct" element={<TOC />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

const Container = styled.div`
  margin-top: 100px;
  position: relative;
`;
