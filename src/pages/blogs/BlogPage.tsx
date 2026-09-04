
import React from "react";
import { Link, useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate.js";

import { useAuth } from "../../context/AuthContext";

const { useState, useEffect } = React;

interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface Blog {
  _id?: string;
  title?: string;
  body?: string;
  image?: string;
  category?: string;
  createdAt?: string;
  likes?: string[];
}

export default function BlogPage() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<Blog>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");

  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [commentError, setCommentError] = useState("");

  const [darkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // -----------------------------
  // Scroll progress
  // -----------------------------

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollTop = window.scrollY;

      const progress =
        totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -----------------------------
  // Theme
  // -----------------------------

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // -----------------------------
  // Fetch post
  // -----------------------------

  useEffect(() => {
    if (!id) return;

    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://blogsite-bdkx.onrender.com/api/posts/${id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }

      const data = await res.json();

      setBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Fetch comments
  // -----------------------------

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `https://blogsite-bdkx.onrender.com/api/posts/${id}/comments`
      );

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      setComments(data);
    } catch (error) {
      console.log("Could not fetch comments:", error);
    }
  };

  // -----------------------------
  // Like / Unlike
  // -----------------------------

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like this post.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token || !blog._id) {
      return;
    }

    try {
      setLikeLoading(true);

      const response = await fetch(
        `https://blogsite-bdkx.onrender.com/api/posts/${blog._id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not like post");
      }

      const updatedPost = await response.json();

      setBlog(updatedPost);
    } catch (error) {
      console.log("Like error:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  // -----------------------------
  // Add comment
  // -----------------------------

  const handleComment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) {
      setCommentError("Please login to comment.");
      return;
    }

    if (!commentText.trim()) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token || !id) {
      return;
    }

    try {
      setCommentLoading(true);
      setCommentError("");

      const response = await fetch(
        `https://blogsite-bdkx.onrender.com/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: commentText,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.message || "Could not add comment"
        );
      }

      const newComment = await response.json();

      setComments((prev) => [newComment, ...prev]);

      setCommentText("");
    } catch (error) {
      console.log(error);

      setCommentError(
        error instanceof Error
          ? error.message
          : "Could not add comment."
      );
    } finally {
      setCommentLoading(false);
    }
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <main className="post-page">
          <div className="blog-loading">
            <span>LOADING ENTRY...</span>
          </div>
        </main>
      </div>
    );
  }

  // -----------------------------
  // Like state
  // -----------------------------

  const likes = blog.likes || [];

  const hasLiked = user
    ? likes.some((likeId) => likeId === user._id)
    : false;

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Reading progress */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      <main className="post-page">
        {/* Back */}
        <Link to="/" className="back-btn">
          ← Back to Logs
        </Link>

        {/* Category */}
        <div className="post-category">
          {blog.category || "TECHNOLOGY"}
        </div>

        {/* Title */}
        <h1 className="post-title">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="post-meta">
          <span>
            {blog.createdAt
              ? formatDate(blog.createdAt)
              : ""}
          </span>

          <span>•</span>

          <span>5 min read</span>

          <span>•</span>

          <span>
            {likes.length}{" "}
            {likes.length === 1 ? "like" : "likes"}
          </span>
        </div>

        {/* Image */}
        {blog.image && (
          <div className="post-image">
            <img
              src={blog.image}
              alt={blog.title || "Blog image"}
            />
          </div>
        )}

        {/* Article */}
        <article className="post-content">
          <div
            dangerouslySetInnerHTML={{
              __html: blog.body || "",
            }}
          />
        </article>

        {/* Interaction section */}
        <section className="post-interactions">

          {/* Like */}
          <div className="interaction-header">
            <button
              className={`like-btn ${
                hasLiked ? "liked" : ""
              }`}
              onClick={handleLike}
              disabled={likeLoading}
              type="button"
            >
              <span className="like-icon">
                {hasLiked ? "♥" : "♡"}
              </span>

              <span>
                {likeLoading
                  ? "..."
                  : hasLiked
                  ? "Liked"
                  : "Like"}
              </span>

              <span className="like-count">
                {likes.length}
              </span>
            </button>

            <span className="comment-count">
              💬 {comments.length}
            </span>
          </div>

          {/* Comments */}
          <div className="comments-section">
            <div className="comments-heading">
              <div>
                <span className="comments-label">
                  COMMUNITY
                </span>

                <h2>
                  Comments
                </h2>
              </div>

              <span className="comments-number">
                {comments.length}
              </span>
            </div>

            {/* Comment form */}
            {user ? (
              <form
                className="comment-form"
                onSubmit={handleComment}
              >
                <div className="comment-user">
                  <div className="comment-avatar">
                    {user.username
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <span>
                    {user.username}
                  </span>
                </div>

                <textarea
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                  placeholder="Leave a thought..."
                  rows={4}
                />

                {commentError && (
                  <p className="comment-error">
                    {commentError}
                  </p>
                )}

                <div className="comment-submit-row">
                  <span>
                    {commentText.length}/500
                  </span>

                  <button
                    type="submit"
                    disabled={
                      commentLoading ||
                      !commentText.trim()
                    }
                  >
                    {commentLoading
                      ? "POSTING..."
                      : "POST COMMENT →"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="login-comment-card">
                <span>🔐</span>

                <div>
                  <h3>
                    Join the conversation
                  </h3>

                  <p>
                    Login to leave a comment and
                    interact with this entry.
                  </p>
                </div>

                <Link to="/login">
                  LOGIN →
                </Link>
              </div>
            )}

            {/* Comments list */}
            <div className="comments-list">
              {comments.length === 0 ? (
                <div className="no-comments">
                  <span>∅</span>

                  <p>
                    No comments yet.
                  </p>

                  <small>
                    Be the first person to leave a
                    thought.
                  </small>
                </div>
              ) : (
                comments.map((comment) => (
                  <article
                    className="comment-card"
                    key={comment._id}
                  >
                    <div className="comment-card-top">
                      <div className="comment-author">
                        <div className="comment-avatar">
                          {comment.author?.username
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {comment.author?.username ||
                              "Anonymous"}
                          </strong>

                          <span>
                            {formatDate(
                              comment.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="comment-content">
                      {comment.content}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="post-footer">
          <div className="footer-card">
            <span>
              END OF ENTRY
            </span>

            <h3>
              Thanks for reading.
            </h3>

            <p>
              More thoughts, experiments and ideas
              are available in the archive.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

