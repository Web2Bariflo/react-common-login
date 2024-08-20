import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './components/Login_Regester/LoginPage';
import Signup from './components/Login_Regester/Signup';
import PageNotFound from './components/Pagenotfound';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

