import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PageNotFound from './components/Pagenotfound';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Router>
  );
}

export default App;
