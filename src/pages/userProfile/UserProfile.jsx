import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../../contexts/AuthContext";
import { countries } from "countries-list";
import { MuiTelInput } from "mui-tel-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { getToken } = useAuth();

  // Individual state variables for each profile field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          "https://marketilo.onrender.com/marketilo/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
        if (data.address) {
          setStreet(data.address?.street || "");
          setCity(data.address?.city || "");
          setState(data.address?.state || "");
          setZip(data.address?.zip || "");
          setState(data.address.state || "");
          setCountry(data.address?.country || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [getToken]);

  // Change handlers for each field
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  // Form submission handler (placeholder for now)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const token = getToken();
    const profileData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      street: street,
      city: city,
      zip: zip,
      country: country,
    };
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !street ||
      !city ||
      !zip ||
      !country
    ) {
      toast.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://marketilo.onrender.com/marketilo/profile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const countryOptions = Object.entries(countries).map(([code, country]) => (
    <MenuItem key={code} value={code}>
      {country.name}
    </MenuItem>
  ));

  return (
    <div className="container mx-auto p-12 page">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          required
          label="First Name"
          variant="outlined"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          fullWidth
          className="my-2"
        />
        <TextField
          required
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          fullWidth
          className="my-2"
        />
        <TextField
          required
          label="Email"
          variant="outlined"
          name="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          className="my-2"
        />
        <TextField
          required
          label="Street"
          variant="outlined"
          name="street"
          value={street}
          onChange={handleStreetChange}
          fullWidth
          className="my-2"
        />

        <FormControl fullWidth className="my-2">
          <MuiTelInput
            required
            defaultCountry="US"
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            fullWidth
            className="my-2"
          />
        </FormControl>
        <div className="flex gap-4">
          <TextField
            required
            label="City"
            variant="outlined"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            className="flex-grow"
          />
          <TextField
            required
            label="Zip Code"
            variant="outlined"
            name="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            fullWidth
            className="flex-grow"
          />
        </div>
        <FormControl fullWidth className="my-2">
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            required
            labelId="country-select-label"
            id="country-select"
            value={country}
            label="Country"
            onChange={handleCountryChange}
          >
            {countryOptions}
          </Select>
        </FormControl>
        <div className="flex justify-center">
          <LoadingButton
            required
            onClick={handleSubmit} // use your submit handler
            endIcon={<i className="fas fa-save"></i>}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-400 rounded shadow w-3/5"
            style={{ backgroundColor: "rgb(45,45,45)", color: "#000" }}
          >
            Save
          </LoadingButton>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default UserProfile;
