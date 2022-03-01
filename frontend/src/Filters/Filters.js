import "./Filters.css";

const Filters = () => {
  return (
    <section className="section-filters">
      <h2 className="filters-heading">FILTERS</h2>
      <p>Want to tweak our automagically-generated filters? Go ahead!</p>

      <div className="form-control">
        <label htmlFor="category"></label>
        <select name="category" id="category" className="placeholder-indent">
          <option value="category">Category</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="keywords"></label>
        <select name="keywords" id="keywords" className="placeholder-indent">
          <option value="keywords">Keywords</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="min-price"></label>
        <input
          type="text"
          id="min-price"
          className="price-input"
          name="min-price"
          placeholder="₹0"
        />
        <label htmlFor="max-price"></label>
        <input
          type="text"
          id="max-price"
          className="price-input"
          name="max-price"
          placeholder="₹99,999"
        />
      </div>

      <div className="form-control">
        <label htmlFor="location"></label>
        <select name="location" id="location" className="placeholder-indent">
          <option value="location">Location</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;
