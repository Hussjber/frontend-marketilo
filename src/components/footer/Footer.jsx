import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../nav/nav.css";

function Footer() {
  return (
    <footer className="py-3 " style={{ backgroundColor: "rgb(45, 45, 45)" }}>
      <Box
        className="container mx-auto text-white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box onClick={() => navigate("/")} className="logo-text">
          <h3>Marketilo.</h3>
        </Box>
        <div>Copyright© Marketilo Shope 2024. All rights reserved.</div>
        <div className="text-right">
          <IconButton to="(url:facebook.com)">
            <FacebookIcon style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <InstagramIcon style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <TwitterIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </Box>
    </footer>
  );
}

export default Footer;
