import "./Nav.css";

function Nav() {
  return (
    <nav className="navigation">
      <div className="flex-container">
        <div className="nav-left-side">
          <h1 className="logo">
            PRODUCT
            <span className="logo-second-half">PEDIA</span>
          </h1>
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
