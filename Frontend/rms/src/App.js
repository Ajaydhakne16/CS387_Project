import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateCustomer from './components/CreateCustomer';
import Login from './components/Login';
import Home from './components/Home';
function App() {
    return ( 
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} /> 
            <Route path="login" element={<Login/>} /> 
            <Route path="signup" element={<CreateCustomer/>} /> 
        </Routes>
        </BrowserRouter>
    );
}

export default App;
