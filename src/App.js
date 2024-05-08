import logo from './logo.svg';
import './App.css';
import CustomLayout from './components/layout';
import Sample from './components/sample';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Employee from './pages/Employee';

function App() {
  return (

    
    <Router basename='/appraisal'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        
        <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/>
        <Route path='employee' element={<CustomLayout><Employee/></CustomLayout>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
