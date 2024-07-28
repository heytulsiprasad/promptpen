/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { LOGO_PROMPT_PEN } from "@src/app";
import React, { useState } from "react";
import { Sidebar as SidebarIcon } from "react-feather";
import Accordion from "./Accordion";
import {
  ARTISTIC_DATA,
  LENSES_AND_PERSPECTIVES_DATA,
  LIGHTING_AND_COLOR_EFFECTS_DATA,
  TEXTURE_AND_SURFACE_EFFECTS_DATA,
  ASPECT_RATIO_AND_FRAMING_DATA,
  MISCELLANEOUS_EFFECTS_DATA,
} from "../data/styles";

export type ArtStyleType = {
  style: string;
  prompt: string;
};

type SidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * The main sidebar component for the content app
 */
const Sidebar = ({ setShowSidebar }: SidebarProps) => {
  const [artisticStyles, setArtisticStyles] = useState<ArtStyleType[]>([]);
  const [lensesAndPerspectives, setLensesAndPerspectives] = useState<
    ArtStyleType[]
  >([]);
  const [lightingAndColorEffects, setLightingAndColorEffects] = useState<
    ArtStyleType[]
  >([]);
  const [textureAndSurfaceEffects, setTextureAndSurfaceEffects] = useState<
    ArtStyleType[]
  >([]);
  const [aspectRatioAndFraming, setAspectRatioAndFraming] = useState<
    ArtStyleType[]
  >([]);
  const [miscellaneousEffects, setMiscellaneousEffects] = useState<
    ArtStyleType[]
  >([]);

  // State to show the copied message
  const [copied, setCopied] = useState(false);

  console.log({
    artisticStyles,
    lensesAndPerspectives,
    lightingAndColorEffects,
    textureAndSurfaceEffects,
    aspectRatioAndFraming,
    miscellaneousEffects,
  });

  // Function to generate the prompt
  const handleSubmit = () => {
    const prompt = [
      ...artisticStyles,
      ...lensesAndPerspectives,
      ...lightingAndColorEffects,
      ...textureAndSurfaceEffects,
      ...aspectRatioAndFraming,
      ...miscellaneousEffects,
    ]
      .map((item) => `${item.style} style (${item.prompt})`)
      .join(", ");

    // Copy to clipboard
    navigator.clipboard.writeText(prompt);

    // Show the copied message
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="h-screen p-4 bg-slate-950">
      <div className="scrollable-container">
        {/* Navbar */}
        <nav className="flex flex-row items-center justify-between">
          <h1 className="text-white text-2xl font-bold">
            PromptPen {LOGO_PROMPT_PEN}
          </h1>
          <button onClick={() => setShowSidebar(false)}>
            <SidebarIcon className="text-orange-600" size={24} />
          </button>
        </nav>

        {/* Sidebar content */}
        <section className="mt-4">
          {/* Collapsible section starts */}
          <Accordion
            id={0}
            title="Artistic Styles"
            data={artisticStyles}
            setData={setArtisticStyles}
            src={ARTISTIC_DATA}
          />
          <Accordion
            id={1}
            title="Lenses and Perspectives"
            data={lensesAndPerspectives}
            setData={setLensesAndPerspectives}
            src={LENSES_AND_PERSPECTIVES_DATA}
          />
          <Accordion
            id={2}
            title="Lighting and Color Effects"
            data={lightingAndColorEffects}
            setData={setLightingAndColorEffects}
            src={LIGHTING_AND_COLOR_EFFECTS_DATA}
          />
          <Accordion
            id={3}
            title="Texture and Surface Effects"
            data={textureAndSurfaceEffects}
            setData={setTextureAndSurfaceEffects}
            src={TEXTURE_AND_SURFACE_EFFECTS_DATA}
          />
          <Accordion
            id={4}
            title="Aspect Ratio and Framing"
            data={aspectRatioAndFraming}
            setData={setAspectRatioAndFraming}
            src={ASPECT_RATIO_AND_FRAMING_DATA}
          />
          <Accordion
            id={5}
            title="Miscellaneous Effects"
            data={miscellaneousEffects}
            setData={setMiscellaneousEffects}
            src={MISCELLANEOUS_EFFECTS_DATA}
          />
        </section>

        {/* Submit buttons */}
        <div className="mt-4 mb-8">
          <button
            className="btn btn-primary w-full border-indigo-600"
            onClick={handleSubmit}
          >
            {copied ? "Copied 🪄" : "Copy to Clipboard ⚡️"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
