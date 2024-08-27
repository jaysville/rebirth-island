import "./style.css";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280,
  color: "#a55fa5",

  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  textAlign: "center",
};

const AddedToCartModal = () => {
  return (
    <Box sx={style}>
      <div className="modal-title">
        <h3>Added to Cart</h3>
      </div>
      <div className="mt-3">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AddedToCartModal;
