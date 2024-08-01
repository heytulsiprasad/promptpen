/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { LOGO_PROMPT_PEN } from "@src/app";
import React, { useState } from "react";
import { Sidebar as SidebarIcon, Zap, Home } from "react-feather";
import Artboard from "../pages/Artboard";
import Presets from "../pages/Presets";

export type ArtStyleType = {
  style: string;
  prompt: string;
};

type SidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const ALL_PAGES = ["Artboard", "Presets"];

/**
 * The main sidebar component for the content app
 */
const Sidebar = ({ setShowSidebar }: SidebarProps) => {
  const [currentPage, setCurrentPage] = useState(ALL_PAGES[0]);

  // Save to preset
  const handleSaveToPreset = () => {
    // TODO: Create a page system
    // Navigate to presets page with props
    // Save to new sync storage
    // Show presets tab to the user (use zap icon on top right corner)
  };

  console.log({ currentPage });

  // Function to render the current page
  const renderPage = () => {
    switch (currentPage) {
      case ALL_PAGES[0]:
        return <Artboard />;
      case ALL_PAGES[1]:
        return <Presets />;
      default:
        return <Presets />;
    }
  };

  const renderIcon = () => {
    switch (currentPage) {
      case ALL_PAGES[0]:
        return <Zap className="text-orange-600" size={24} />;
      case ALL_PAGES[1]:
        return <Home className="text-orange-600" size={24} />;
      default:
        return <Zap className="text-orange-600" size={24} />;
    }
  };

  const switchPages = () => {
    const currentIndex = ALL_PAGES.indexOf(currentPage);
    const nextPage = currentIndex === 0 ? 1 : 0;
    setCurrentPage(ALL_PAGES[nextPage]);
  };

  return (
    <main className="h-screen p-4 bg-slate-950">
      <div className="scrollable-container">
        {/* Navbar */}
        <nav className="flex flex-row items-center justify-between">
          <h1 className="text-white text-2xl font-bold">
            PromptPen {LOGO_PROMPT_PEN}
          </h1>
          <div className="flex gap-x-2">
            <button onClick={switchPages}>{renderIcon()}</button>
            <button onClick={() => setShowSidebar(false)}>
              <SidebarIcon className="text-orange-600" size={24} />
            </button>
          </div>
        </nav>

        {renderPage()}
      </div>
    </main>
  );
};

export default Sidebar;
