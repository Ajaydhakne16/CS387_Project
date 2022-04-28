import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import Item from './components/Item';
import Item_id from './components/Item_id';
function App() {
    return ( 
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} /> 
            <Route path="/items" element={<Item/>}/>
            <Route path="/items/:id" element={<Item_id/>}/>
            <Route path="signup/:type" element={<CreateUser/>} /> 
            <Route path="profile/:type" element={<Home/>} /> 
        </Routes>
        </BrowserRouter>
    );
}

export default App;
