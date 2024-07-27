import React from "react";

type SidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * The main sidebar component for the content app
 */
const Sidebar = ({ setShowSidebar }: SidebarProps) => {
  return (
    <main>
      <div className="fixed top-0 right-0 h-full w-64 bg-slate-950">
        <nav className="flex flex-col items-center justify-between h-full">
          <h1 className="text-white text-2xl font-bold">🌸 PromptPen</h1>
          <button className="" onClick={() => setShowSidebar(false)}>
            X
          </button>
        </nav>
      </div>
    </main>
  );
};

export default Sidebar;
