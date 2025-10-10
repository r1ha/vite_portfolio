import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import Blog from './pages/Blog.jsx';
import CurriculumVitae from './components/CurriculumVitae.jsx';
import Article from './pages/Article.jsx';

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
  <Route path="/article/:id" element={<Article />} />
        <Route path="/test" element={<CurriculumVitae />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
