import { useState } from "react";
import ToggleSidebar from "./components/ToggleSidebar";
import Sidebar from "./components/Sidebar";

/**
 * Entry point for the entire content app
 */
const App = () => {
  // State to open the sidebar view
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="">
      {showSidebar ? (
        <Sidebar setShowSidebar={setShowSidebar} />
      ) : (
        <ToggleSidebar setShowSidebar={setShowSidebar} />
      )}
    </div>
  );
};

export default App;
