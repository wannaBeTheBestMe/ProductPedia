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

const MyTextInput = ({ label, ...props }) => {
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
  urls: Yup.string().url(),
});

const onSubmit = (values) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
  }, 500);
};

const AddProductUrls = () => (
  <div>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <FieldArray
            name="urls"
            render={(arrayHelpers) => (
              <div>
                {values.urls && values.urls.length > 0 ? (
                  values.urls.map((friend, index) => (
                    <div key={index}>
                      <MyTextInput
                        label=""
                        name="url"
                        type="text"
                        placeholder="https://..."
                      />
                      <div className="add-remove-buttons">
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // Insert an empty string at a position
                          className="picks-buttons"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // Remove a URL from the list
                          className="picks-buttons"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                    className="recommend-add-button picks-buttons"
                  >
                    {/* Message when user has removed all URLs from the list */}
                    Add a URL
                  </button>
                )}
                <div>
                  <button
                    type="submit"
                    className="recommend-add-button picks-buttons"
                  >
                    Recommend!
                  </button>
                </div>
              </div>
            )}
          />
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

      {/* <label htmlFor="url"></label> */}
      {/* <input */}
      {/*   type="text" */}
      {/*   id="url" */}
      {/*   className="placeholder-indent url-input" */}
      {/*   name="url" */}
      {/*   placeholder="https://..." */}
      {/* /> */}
    </section>
  );
};

export default Picks;
