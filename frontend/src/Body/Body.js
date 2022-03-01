import "./Body.css";
import Picks from "../Picks/Picks.js";
import Filters from "../Filters/Filters.js";
import Recommendations from "../Recommendations/Recommendations.js";

const Body = () => {
  return (
    <div className="grid-container">
      <Picks />
      <Recommendations/>
      <Filters />
    </div>
  );
};

export default Body;
