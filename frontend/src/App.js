// Importing necessary dependencies and components from react-router-dom
import { Route, Routes } from 'react-router-dom';

// Importing specific components for routing
import Signup from './Components/Signup';
import Login from './Components/Login';

// Importing the stylesheet for the App component
import './App.css';
// importing component dashboard from components
import Dashboard from './Components/Dashboard';
// importing element Movie from elements
import Movie from './Elements/Movie'

// importing Layout
import Layout from './Layout/Layout';


// Main App component definition
function App() {
  // JSX rendering of the App component
  return (
    <div className="App">
      {/* React Router 'Routes' component to define routes */}
      <Routes>
        {/* Route for the Signup component */}
        <Route index element={<Signup />} />

        {/* Route for the Login component */}
        <Route path='/login' element={<Login />} />
        <Route element= {<Layout/>}>
        {/* Route for the Home component */}
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Route for movie element */}
        <Route path="/customer/movies/:movieId" element={<Movie/>} />
        {/* <Route path='/booking' element = {<Booking/>}/> */}
        </Route>
        
      </Routes>
    </div>
  );
}

// Exporting the App component
export default App;
