import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home/home.tsx"
import BlogPage from "./pages/blogs/BlogPage.tsx"

console.log(window.location.pathname);


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;