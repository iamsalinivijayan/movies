import * as React from 'react';
import { useState , Fragment} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import axios from 'axios';


// Custom Transition component for the Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Main Movie component definition
export default function Movie({movie_id}) {

  // State variables for managing the dialog's open/close state and storing movie details
  const [open, setOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  // Function to handle opening the dialog and fetching movie details
  const handleClickOpen = () => {
    setOpen(true);
    fetchMovieDetails();
  };

  // Function to handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to fetch movie details from the server
  const fetchMovieDetails = async () => {
    try {
      console.log('Movie Id',movie_id)
      // Fetching movie details based on the movieId parameter
      const response = await axios.get(`http://localhost:3001/customer/movies/${movie_id}`, {withCredentials: true});
      console.log("Movie fetched",response)
      if(response.status === 200){
        setMovieDetails(response.data)
      }
      
    } catch (error) {
      // Logging any errors that occur during the fetch
      console.error('Error fetching movie details:', error);
    }
  };

  // JSX rendering of the Movie component
  return (
    <Fragment>
      {/* Button to trigger opening the dialog */}
      <Button variant="outlined" onClick={handleClickOpen}>
        View details
      </Button>
      
      {/* Dialog component for displaying movie details */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* App bar for the dialog */}
        <AppBar sx={{ position: 'relative', backgroundColor: '#474F7A'}}>
          {/* Toolbar with close button, title, and another button for closing the dialog */}
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Movie Details
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Render movie details dynamically using a List */}
        <List>
          {/* Checking if movieDetails is available before rendering */}
          {movieDetails && (
            <div>
              {/* List item for displaying movie name */}
              <ListItemText primary={`Title: ${movieDetails.movie_name}`} />
              <Divider />
              {/* List item for displaying language of the movie */}
              <ListItemText primary={`Director: ${movieDetails.language}`} />
              <Divider />
              {/* List item for displaying rating */}
              <ListItemText primary={`Release Date: ${movieDetails.rating}`} />
            </div>
          )}
        </List>
      </Dialog>
    </Fragment>
  );
}
