import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const TextSlider = () => {
  return (
    <Container>
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        style={{ display: "inline-block" }}
      >
        <span style={{ paddingRight: "50%" }}>
          Holiday Sales '24 . Discount on all merch. Valid till Tuesday, 24th
          December, 2024.
        </span>
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  position: fixed;
  top: 0;
  width: 100%;
  font-size: 18px;
  color: aliceblue;
  background-color: #aa1b1b;
  font-weight: bold;
  z-index: 5000;
`;

export default TextSlider;
