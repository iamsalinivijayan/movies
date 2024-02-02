// Importing Material-UI components for creating a card
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Review from './Review'; // element for movie reviews
import Movie from './Movie'; // element for movie details
import Bookings from './Bookings'; // For handling movie bookings

// Functional component to render a card for a movie
const MovieCard = ({ movie_id, movie_name, image, category, language, rating }) => {
  // JSX rendering of the MovieCard component
  return (
    <Card style={{ margin: '10px', minWidth: '200px' }}>
      {/* Displaying the movie image as a card media */}
      <CardMedia component="img" alt={movie_name} height="140" image={image} />
      <CardContent>
        {/* Displaying movie details using Typography components */}
        <Typography variant="h6">{movie_name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Category: {category}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Language: {language}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Rating: {rating}
        </Typography>
        
        {/* Additional custom components for movie details, bookings, and reviews */}
        <Movie movie_id={movie_id}/> {/* Movie informations in a more detailed way */}
        <Bookings /> {/* Handles movie bookings */}
        <Review /> {/* Renders reviews for the movie */}
      </CardContent>
    </Card>
  );
};

// Exporting the MovieCard component for use in other parts of the application
export default MovieCard;
