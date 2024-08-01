/* eslint-disable jsx-a11y/label-has-associated-control */
import { useStorageSuspense } from "@extension/shared";
import { appStorage } from "@extension/storage";
import { ArtConfigTypes, useArtboard } from "@src/context/ArtboardContext";
import { generatePrompt } from "@src/utils/prompts";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Copy } from "react-feather";

type PresetType = {
  id: string;
  name: string;
  prompt: string;
  artConfig: ArtConfigTypes;
  customText: string;
  position: string;
  customPosition: string;
};

const Presets = () => {
  const {
    artConfig,
    customText,
    customPosition,
    position,
    handleClearFilters,
  } = useArtboard();
  const [name, setName] = useState("");

  const { presets } = useStorageSuspense(appStorage);

  const handleSavePreset = () => {
    if (!name) return;

    const prompt = generatePrompt(
      artConfig,
      customText,
      position,
      customPosition,
    );

    const newPreset: PresetType = {
      id: nanoid(),
      name,
      prompt,
      artConfig,
      customText,
      position,
      customPosition,
    };

    // Save prompt to preset
    appStorage.addPreset(newPreset);

    // Clear filters
    handleClearFilters();
  };

  return (
    <div>
      {/* Save to preset */}
      <section className="mt-4">
        <label
          className="form-control w-full max-w-xs mb-2"
          htmlFor="preset-name"
        >
          <div className="label">
            <span className="label-text">Name your preset</span>
          </div>
          <input
            type="text"
            id="preset-name"
            name="preset-name"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button
          className="btn btn-primary btn-outline w-full border-green-600"
          onClick={handleSavePreset}
        >
          Save 🔥
        </button>
      </section>

      {/* List of all presets */}
      <section className="mt-4">
        <h2 className="text-lg text-white font-bold">Your presets</h2>
        <div className="grid grid-cols-1 gap-4 mt-2">
          {presets &&
            presets.map((preset: PresetType) => (
              <div key={preset.id} className="card bg-slate-900">
                <div className="card-body">
                  <div className="flex gap-x-2 items-center">
                    <h2 className="card-title">{preset.name}</h2>
                    <div className="tooltip" data-tip="Click to copy">
                      <Copy className="text-white" size={18} />
                    </div>
                  </div>
                  <p className="text-sm text-white">{preset.prompt}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Presets;
