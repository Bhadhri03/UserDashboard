import Login from "./components/Login/Login";
import {Routes, Route} from 'react-router-dom';
import Signup from "./components/Signup/Signup";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path='/' element = {<Layout/>} >
          <Route path='/' element = {<Login/>} ></Route>
          <Route path="/signup" element = {<Signup/>} ></Route>
          <Route path="*" element={<Login/>} ></Route>
        </Route>
      </Routes>
      </div>
  );
}

export default App;
