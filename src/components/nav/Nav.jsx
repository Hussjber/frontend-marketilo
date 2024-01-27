import { useContext, useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Badge,
  Popover,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { ShoppingBagOutlined, PersonOutline } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import "./nav.css";
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";
import { useLocation } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const [searchValue, setSearchValue] = useState("");
  const { isLoggedIn, logout, userRole } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        performSearch();
      } else {
        setSearchResults([]); // Clear results if search input is empty
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const performSearch = async () => {
    try {
      const response = await axios.get(
        `https://marketilo.onrender.com/product/search/${searchValue}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchResults([]); // Clear search results when product is clicked
  };

  const handleIconClick = (event) => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      if (isLoggedIn) {
        setAnchorEl(event.currentTarget);
      }
      return;
    }

    // Navigate to register if not logged in
    if (!isLoggedIn) {
      navigate("/register");
    } else {
      setAnchorEl(event.currentTarget); // Open the popover if logged in
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleAddProducts = () => {
    navigate("/add-products");
    handleClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/register");
  };

  const popoverStyle = {
    mt: 0.3, // Adds a small top margin for the popover
    "& .MuiPaper-root": {
      // Styles the paper component inside the popover
      minWidth: "200px", // Minimum width of the popover
      borderRadius: "10px", // Rounded corners
      overflow: "hidden", // Hides overflow to respect border radius
    },
  };
  const buttonStyle = {
    my: 0.5,
    justifyContent: "flex-start",
  };

  return (
    <Box className="container mx-auto flex "
    style={{ backgroundColor: "rgb(45, 45, 45)" }}>
      <Box className="container mx-auto flex items-center justify-between h-full">
        <Box onClick={() => navigate("/")} className="logo-text">
          <h3>Marketilo</h3>
        </Box>
        <div className="relative">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center bg-white rounded-md"
            style={{
              width: "750px",
              borderRadius: "19px/50%",
              border: "transparent",
            }}
          >
            <input
              id="search"
              placeholder="Search for item..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="p-3 font-roboto text-gray-800 h-10 px-15 w-full rounded-[19px/50%] focus:outline-none focus:ring-0 focus:border-black"
            />
            <button type="submit" className="p-1">
              <SearchIcon style={{ color: "rgb(45, 45, 45)" }} />
            </button>
          </form>
          {searchResults.length > 0 && (
            <div
              style={{ color: "black", zIndex: 100 }}
              className="absolute top-full left-0 w-full bg-white shadow-md mt-1 max-h-60 overflow-y-auto"
            >
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProductClick(result._id)}
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-12 h-12 object-cover mr-2"
                  />
                  <span className="flex-1">{result.name}</span>
                  <span className="font-semibold">₪{result.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Box className="flex gap-1 items-center">
          <Badge color="secondary">
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={handleIconClick}
            >
              <PersonOutline style={{ fontSize: "1.80rem" }} />
            </IconButton>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex relative max-w-[50px]"
            >
              <ShoppingBagOutlined style={{ fontSize: "1.80rem" }} />
              <div className="bg-red-400 absolute -right-0 -bottom-0 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {itemAmount}
              </div>
            </IconButton>
          </Badge>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={popoverStyle}
          >
            <Box p={2}>
              <Button onClick={handleProfile} fullWidth sx={buttonStyle}>
                Profile
              </Button>
              {userRole === "admin" && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Button
                    onClick={handleAddProducts}
                    fullWidth
                    sx={buttonStyle}
                  >
                    Add Products
                  </Button>
                </>
              )}
              <Divider sx={{ my: 1 }} />
              <Button onClick={handleLogout} fullWidth sx={buttonStyle}>
                Logout
              </Button>
            </Box>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
}

export default Nav;
