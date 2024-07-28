import React from "react";
import clsx from "clsx";
import { LOGO_PROMPT_PEN } from "@src/app";

type ToggleSidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * The sidebar toggle button
 */
const ToggleSidebar = ({ setShowSidebar }: ToggleSidebarProps) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center",
        "rounded-full w-12 aspect-square shadow-md bg-slate-950",
        "outline-none border-none",
      )}
      onClick={() => setShowSidebar(true)}
    >
      <i>{LOGO_PROMPT_PEN}</i>
    </button>
  );
};

export default ToggleSidebar;
