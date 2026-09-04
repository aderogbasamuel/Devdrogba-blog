import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home/home.tsx"
import BlogPage from "./pages/blogs/BlogPage.tsx"
import Login from "./pages/Login";

import Register from "./pages/Register";
console.log(window.location.pathname);


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;