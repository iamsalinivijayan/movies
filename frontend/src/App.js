// Importing necessary dependencies and components from react-router-dom
import { Route, Routes } from 'react-router-dom';

// Importing specific components for routing
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';

// Importing the stylesheet for the App component
import './App.css';

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

        {/* Route for the Home component */}
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

// Exporting the App component
export default App;
