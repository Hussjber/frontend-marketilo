// import { useState } from "react";
// import axios from "axios";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
// import background from "../assets/images/RegisterBackground.png";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import InputAdornment from "@mui/material/InputAdornment";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setIsLoading(true);
//       setError(null); 
//       const res = await axios.post("http://localhost:5000/marketilo/login", {
//         email,
//         password,
//       });
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setIsLoading(false);
//       console.log(res);
//     } catch (err) {
//       setIsLoading(false);

//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("An error occurred during login.");
//       }
//     }
//   };

//   return (
//     <>
//       <div
//         className="min-h-screen py-40"
//         style={{
//           backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)",
//         }}
//       >
//         <div className="container mx-auto">
//           <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
//             <div
//               className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-contain"
//               style={{ backgroundImage: `url(${background})` }}
//             ></div>
//             <div className="w-full lg:w-1/2 py-16 px-12">
//               <h2 className="text-3xl mb-4">Login</h2>
//               <p className="mb-4">
//                 Welcome back! Please login to your account.
//               </p>
//               <form onSubmit={handleLogin}>
//                 <div className="mt-4">
//                   <TextField
//                     label="Email"
//                     variant="outlined"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="mt-4">
//                   <TextField
//                     type={showPassword ? "text" : "password"}
//                     label="Password"
//                     variant="outlined"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     fullWidth
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                           >
//                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </div>
//                 <div className="mt-5">
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     type="submit"
//                     className="w-full py-3 text-center text-white"
//                     style={{ backgroundColor: "rgb(171, 121, 45)" }}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Logging in..." : "Login"}
//                   </Button>
//                 </div>

//                 {error && (
//                   <div className="mt-3 text-red-500 text-center">
//                     <p>{error}</p>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

