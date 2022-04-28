import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import CreateUser from './components/CreateUser';
function App() {
    return ( 
        <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login/>} /> 
            <Route path="signup/:type" element={<CreateUser/>} /> 
            <Route path="/:type" element={<Home/>} /> 
        </Routes>
        </BrowserRouter>
    );
}

export default App;
