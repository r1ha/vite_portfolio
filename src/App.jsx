import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Galerie from './pages/Galerie.jsx';
import Blog from './pages/Blog.jsx';

/**
 * App root
 * HashRouter used for static hosting compatibility.
 */

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
