import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'


function App() {
  return (
    <div>
        <BrowserRouter>
         <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>
         </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
