import React from "react";
import { Link } from "react-router-dom";
const { useState, useEffect } = React;
import type { Blog } from "../../interfaces/Blog";
import Header from "./components/Header.tsx";
interface BlogProps {
  blog: Blog;
}

function Greeting() {
  const name = "Samuel";
  return <h1>Welcome, {name}</h1>;
}

function BlogCard({ blog }: BlogProps) {
  const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className="card">
      <div className="img">
        <img src={blog.image} alt="blog 1" />
      </div>
      <div className="content">
        <div className="heading">
          <div className="date">{formatDate(blog.createdAt)}</div>|
          <div className="title">_{blog.category}</div>
        </div>

        <div className="text">
          <h3 className="head">{blog.title}</h3>
          <div className="subtext">
            <div
              dangerouslySetInnerHTML={{ __html: truncateText(blog.body, 100) }}
            />
          </div>
        </div>
      </div>
      <Link to={`/blog/${blog._id}`}>
        <button>Read Log</button>{" "}
      </Link>
    </div>
  );
}

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("https://blogsite-bdkx.onrender.com/api/posts");
      const data = await res.json();
      setBlogs(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="blogs">
      {blogs.map((blog: Blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}

function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="herosec">
        <div className="herograd">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <section className="hero pt-[60px] pb-[50px] flex flex-col sm:text-center">
            <div className="w-fit rounded-full border-[3px] border-[var(--border)] px-[18px] py-[10px] font-black text-[0.8rem] text-[var(--text)] shadow-[4px_4px_0_var(--border)]">
  PERSONAL TECH • DIGITAL THOUGHTS • INNOVATION
</div>
            <h1 className="mt-[30px] tracking-[0.9] font-black text-[var(--text)] text-5xl sm:text-7xl sm:text-center">
              Running ideas <br />
              through the internet.
            </h1>
            <p>
              A personal corner of the web for documenting projects,
              experiments, thoughts, technology and random midnight ideas.
            </p>
            <div className="hero-actions">
              <button className="primary">Read Logs</button>
              <button className="secondary">View Projects</button>
            </div>
          </section>
        </div>
      </div>

      <div className="body">
        <Blogs />
      </div>
    </div>
  );
}

export default Home;
