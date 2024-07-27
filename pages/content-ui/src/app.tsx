import { useState } from "react";
import ToggleSidebar from "./components/ToggleSidebar";
import Sidebar from "./components/Sidebar";

export const LOGO_PROMPT_PEN = "✍️";

/**
 * Entry point for the entire content app
 */
const App = () => {
  // State to open the sidebar view
  const [showSidebar, setShowSidebar] = useState(true);

  // Function to put the final prompt in the prompt box
  const writePromptToContent = (prompt: string) => {
    const promptBox = document.getElementById("prompt-textarea");

    console.log({ prompt, promptBox });

    if (promptBox) {
      promptBox.textContent += prompt;
    }
  };

  return (
    <div className="">
      {showSidebar ? (
        <Sidebar
          setShowSidebar={setShowSidebar}
          writePromptToContent={writePromptToContent}
        />
      ) : (
        <ToggleSidebar setShowSidebar={setShowSidebar} />
      )}
    </div>
  );
};

export default App;
