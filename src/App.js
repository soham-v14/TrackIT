
import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./pages/signup";
import Dashboard from './pages/Dashboard';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast} from 'react-toastify';

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
