import React, { useState, useEffect } from "react";
import "./Spinner.css";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "signin" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000); // 1 second intervals
    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="spinner-container bg-opacity-45">
      <p className="text-lg sm:text-sm">
        Redirecting to you in {count} seconds
      </p>
      <div className="spinner bg-opacit"></div>
    </div>
  );
};

export default Spinner;
