import React, { useState, useEffect } from "react";
import "./Spinner.css";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div className="spinner-container">
        <h2>Redirecting to you in {count} seconds</h2>
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Spinner;
