import {useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useContext} from "react";
import UserContext from "../Context/userContext.js"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()

  const checkAuth = async () => {
    const response = await axios.get("http://localhost:3001/checkauth", { withCredentials: true });
    console.log("check auth", response);

    if (response.status === 200) {
      setUser({ email: response.data.email});
    }
    console.log("context from navbar",user)
  };
  useEffect(() => {
    checkAuth();
  },[]);

  const logOut = async () => {
    const response = await axios.get("http://localhost:3001/logout", { withCredentials: true });
    console.log("logout response", response)
    if (response.status === 200) {
      navigate('/login')
    }
  };
 
  return (
    <AppBar sx={{ position: 'relative', backgroundColor: '#3D0C11'}}>
    <Toolbar> 
    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
      {user?.email}
    </Typography>    
    <IconButton
    color="inherit"
    onClick={logOut}
    aria-label="close"
    sx={{ ml:2 , }}   
    >
      {user && (
          <LogoutIcon/>
        )}
    </IconButton>
    </Toolbar>
    </AppBar>
  );
};
export default Navbar;
