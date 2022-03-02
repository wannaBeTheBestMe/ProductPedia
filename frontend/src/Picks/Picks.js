import React from "react";
import "./Picks.css";
import {
  Formik,
  Field,
  FieldArray,
  Form,
  ErrorMessage,
  useField,
} from "formik";
import * as Yup from "yup";

const UrlInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="placeholder-indent url-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const initialValues = {
  urls: [""],
};

const validationSchema = Yup.object({
  // urls: Yup.string().url(),
  urls: Yup.array().of(Yup.string().url()),
});

async function onSubmit(values) {
  console.log(values);
  const response = await fetch(
    `http://localhost:8000/info?1=${encodeURIComponent(values["urls"][0])}`
  );
  const info = await response.json();
  console.log(info.data);
};

const AddProductUrls = () => (
  <div>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isSubmitting }) => (
        <Form>
          <FieldArray name="urls">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { urls } = values;

              return (
                <div>
                  {urls.map((url, index) => (
                    <div key={index}>
                      <label htmlFor={`urls[${index}]`}></label>
                      <Field
                        name={`urls[${index}]`}
                        type="text"
                        placeholder="https://..."
                        className="placeholder-indent url-input"
                      />
                      <ErrorMessage name={`urls[${index}]`} />

                      <div className="add-remove-buttons">
                        <button
                          type="button"
                          className="picks-buttons"
                          onClick={() => push(index)}
                        >
                          +
                        </button>
                        {index > 0 && (
                          <button
                            type="button"
                            className="picks-buttons"
                            onClick={() => remove("")}
                          >
                            -
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
          <button type="submit" className="recommend-add-button picks-buttons">
            Recommend!
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const Picks = () => {
  return (
    <section className="section-your-picks">
      <h2 className="your-picks-heading">YOUR PICKS</h2>
      <p>
        Thought of some products you might want to buy? Paste their URLs below!
      </p>
      <AddProductUrls />
    </section>
  );
};

export default Picks;
