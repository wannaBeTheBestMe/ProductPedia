import React from "react";
import "./Picks.css";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

const Picks = () => {
  return (
    <section className="section-your-picks">
      <h2 className="your-picks-heading">YOUR PICKS</h2>
      <p>
        Thought of some products you might want to buy? Paste their URLs below!
      </p>

      <label htmlFor="test"></label>
      <input
        type="text"
        id="test"
        className="url-input"
        name="test"
        placeholder="https://..."
      />
    </section>
  );
};

export default Picks;
