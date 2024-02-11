import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Review({movieId, userId}) {
  console.log('Movie', movieId)
  console.log('User', userId)

  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    review: ''
  })

  const [movieReview, setMovieReview] = useState([])

  const handleReview = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const addReview = async(e) => {
    e.preventDefault()
    console.log('UserId from review', userId)
    console.log('MovieId from review', movieId)
    const review = await axios.post(`http://localhost:3001/customer/movies/review`, {
      review: data.review ,
      user_id: userId,
      movie_id: movieId
    }, {withCredentials: true})
    setMovieReview(review.data)
    alert(review.data.review)

    console.log("Review", review.data)
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className='btn-review' variant="outlined" onClick={handleClickOpen}>
        Reviews
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#3D0C11'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className='review-container'>
        <form className='form-container' onSubmit={addReview}>
            <label><h1>Review</h1></label>
            <input className='add-review-input' type='text' placeholder='Type here' name='review' onChange={handleReview}/>
            <button className='add-review-btn'> Add Review</button>
        </form>
        </div>
      </Dialog>
    </React.Fragment>
  );
}