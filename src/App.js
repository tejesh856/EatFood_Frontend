import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
/*import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';*/
import { Cartprovider } from './components/Contextreducer';
import Myorder from './screens/Myorder';
function App() {
  return (
    <Cartprovider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myorder' element={<Myorder />} />
          </Routes>
        </div>
      </Router>
    </Cartprovider>

  )
};

export default App;
