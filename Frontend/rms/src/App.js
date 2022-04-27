import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateCustomer from './components/CreateCustomer';


function App() {
    return ( 
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<CreateCustomer/>} /> 
        </Routes>
        </BrowserRouter>
    );
}

export default App;
