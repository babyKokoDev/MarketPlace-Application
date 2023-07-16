import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useSelector} from 'react-redux'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";



function App() {
    const { loading }  = useSelector((state) => state.loaders)
  return (
    <div>
      { loading && <Spinner /> }
        <BrowserRouter>
         <Routes>
          <Route path='/' element = {<ProtectedPage><Home/></ProtectedPage>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>
         </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
