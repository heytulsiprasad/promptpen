import { useState } from "react";
import {
  ARTISTIC_DATA,
  ASPECT_RATIO_AND_FRAMING_DATA,
  LENSES_AND_PERSPECTIVES_DATA,
  LIGHTING_AND_COLOR_EFFECTS_DATA,
  MISCELLANEOUS_EFFECTS_DATA,
  TEXTURE_AND_SURFACE_EFFECTS_DATA,
} from "@src/data/styles";
import Accordion from "../components/Accordion";
import {
  ArtCategory,
  INITIAL_ART_CONFIG,
  useArtboard,
} from "@src/context/ArtboardContext";
import { generatePrompt } from "@src/utils/prompts";

/**
 * The main artboard component for the content app
 * where we can design prompts
 */
const Artboard = () => {
  const {
    artConfig,
    setArtConfig,
    customText,
    setCustomText,
    position,
    setPosition,
    customPosition,
    setCustomPosition,
  } = useArtboard();

  // State to show the copied message
  const [copied, setCopied] = useState(false);

  // Function to generate the prompt
  const handleSubmit = () => {
    const prompt = generatePrompt(
      artConfig,
      customText,
      position,
      customPosition,
    );

    // Copy to clipboard
    navigator.clipboard.writeText(prompt);

    // Show the copied message
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to clear all the filters
  const handleClearFilters = () => {
    setArtConfig(INITIAL_ART_CONFIG);
    setCustomText("");
    setPosition("");
    setCustomPosition("");
  };

  return (
    <div>
      {/* Sidebar content */}
      <section className="mt-4">
        <h2 className="text-white text-lg font-bold">
          Choose your styles and effects
        </h2>

        {/* Collapsible section starts */}
        <Accordion
          id={0}
          title="Artistic Styles"
          config={ArtCategory.ARTISTIC}
          src={ARTISTIC_DATA}
        />
        <Accordion
          id={1}
          title="Lenses and Perspectives"
          config={ArtCategory.LENSES_AND_PERSPECTIVES}
          src={LENSES_AND_PERSPECTIVES_DATA}
        />
        <Accordion
          id={2}
          title="Lighting and Color Effects"
          config={ArtCategory.LIGHTING_AND_COLOR_EFFECTS}
          src={LIGHTING_AND_COLOR_EFFECTS_DATA}
        />
        <Accordion
          id={3}
          title="Texture and Surface Effects"
          config={ArtCategory.TEXTURE_AND_SURFACE_EFFECTS}
          src={TEXTURE_AND_SURFACE_EFFECTS_DATA}
        />
        <Accordion
          id={4}
          title="Aspect Ratio and Framing"
          config={ArtCategory.ASPECT_RATIO_AND_FRAMING}
          src={ASPECT_RATIO_AND_FRAMING_DATA}
        />
        <Accordion
          id={5}
          title="Miscellaneous Effects"
          config={ArtCategory.MISCELLANEOUS_EFFECTS}
          src={MISCELLANEOUS_EFFECTS_DATA}
        />
      </section>

      {/* Add text section */}
      <section className="mt-4">
        <h2 className="text-white text-lg font-bold">Add Custom Text</h2>
        <input
          type="text"
          placeholder="Add text to the image"
          className="input input-bordered w-full mt-2 focus:outline-none"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />

        <p className="text-sm text-white font-bold my-2">Choose the position</p>
        <select
          className="select select-bordered w-full max-w-xs focus:outline-none"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option disabled selected>
            Where should we put your text?
          </option>
          <option>Center</option>
          <option>Top Left</option>
          <option>Top Center</option>
          <option>Top Right</option>
          <option>Bottom Left</option>
          <option>Bottom Center</option>
          <option>Bottom Right</option>
        </select>

        {/* Add a custom input box */}
        <div className="my-2">
          <p className="text-sm text-white font-bold italic">
            Add a custom location
          </p>
          <input
            type="text"
            className="input input-bordered w-full mt-2 focus:outline-none"
            placeholder="In the middle of image"
            value={customPosition}
            onChange={(e) => setCustomPosition(e.target.value)}
          />
        </div>
      </section>

      {/* Submit buttons */}
      <div className="mt-4 mb-8 flex flex-col gap-y-4">
        <button
          className="btn btn-primary w-full border-indigo-600"
          onClick={handleSubmit}
        >
          {copied ? "Copied 🪄" : "Copy to Clipboard ⚡️"}
        </button>
        <button
          className="btn btn-primary btn-outline w-full border-green-600"
          onClick={() => {}}
        >
          Save to Presets 🎨
        </button>
        <button
          className="btn btn-primary btn-outline w-full border-red-600"
          onClick={handleClearFilters}
        >
          Clear filters 🗑️
        </button>
      </div>
    </div>
  );
};

export default Artboard;
