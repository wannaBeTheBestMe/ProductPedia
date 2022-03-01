import "./Nav.css";

function Nav() {
  return (
    <nav className="navigation">
      <div className="flex-container">
        <div className="nav-left-side">
          <div className="logo">
            <span className="logo-first-half">PRODUCT</span>
            <span className="logo-second-half">PEDIA</span>
          </div>
          <ul className="nav-items-parent">
            <li>
              <a href="#dummy">Home</a>
            </li>
            <li>
              <a href="#dummy">About</a>
            </li>
            <li>
              <a href="#dummy">GitHub</a>
            </li>
          </ul>
        </div>

        <button
          className="comparison-tool-button"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          COMPARISON TOOL
        </button>
      </div>
    </nav>
  );
}

export default Nav;
