import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import Blog from './pages/Blog.jsx';
import About from './pages/About.jsx';

/**
 * App root
 * HashRouter used for static hosting compatibility.
 */

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
  <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
