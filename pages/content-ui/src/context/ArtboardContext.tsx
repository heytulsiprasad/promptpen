import { ReactNode, createContext, useContext, useState } from "react";

export enum ArtCategory {
  ARTISTIC = "Artistic",
  LENSES_AND_PERSPECTIVES = "Lenses and Perspectives",
  LIGHTING_AND_COLOR_EFFECTS = "Lighting and Color Effects",
  TEXTURE_AND_SURFACE_EFFECTS = "Texture and Surface Effects",
  ASPECT_RATIO_AND_FRAMING = "Aspect Ratio and Framing",
  MISCELLANEOUS_EFFECTS = "Miscellaneous Effects",
}

export type ArtStyleType = {
  name: string;
  prompt: string;
};

export type ArtConfigTypes = Record<ArtCategory, string[]>;

type ArtboardInfo = {
  artConfig: ArtConfigTypes;
  setArtConfig: (config: ArtConfigTypes) => void;
  customText: string;
  setCustomText: (text: string) => void;
  position: string;
  setPosition: (position: string) => void;
  customPosition: string;
  setCustomPosition: (position: string) => void;
  handleClearFilters: () => void;
};

export const INITIAL_ART_CONFIG = {
  [ArtCategory.ARTISTIC]: [],
  [ArtCategory.LENSES_AND_PERSPECTIVES]: [],
  [ArtCategory.LIGHTING_AND_COLOR_EFFECTS]: [],
  [ArtCategory.TEXTURE_AND_SURFACE_EFFECTS]: [],
  [ArtCategory.ASPECT_RATIO_AND_FRAMING]: [],
  [ArtCategory.MISCELLANEOUS_EFFECTS]: [],
};

// create the initial state
const initialState: ArtboardInfo = {
  artConfig: INITIAL_ART_CONFIG,
  setArtConfig: () => {},
  customText: "",
  setCustomText: () => {},
  position: "",
  setPosition: () => {},
  customPosition: "",
  setCustomPosition: () => {},
  handleClearFilters: () => {},
};

const ArtboardInfoContext = createContext<ArtboardInfo>(initialState);

// enable use of context
export const useArtboard = () => useContext(ArtboardInfoContext);

// create the context
const ArtboardProvider = ({ children }: { children: ReactNode }) => {
  const [artConfig, setArtConfig] = useState<ArtConfigTypes>(
    initialState.artConfig,
  );
  const [customText, setCustomText] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [customPosition, setCustomPosition] = useState<string>("");

  // function clean up prompt
  const handleClearFilters = () => {
    setArtConfig(INITIAL_ART_CONFIG);
    setCustomText("");
    setPosition("");
    setCustomPosition("");
  };

  // build the context object
  const value = {
    artConfig,
    setArtConfig,
    customText,
    setCustomText,
    position,
    setPosition,
    customPosition,
    setCustomPosition,
    handleClearFilters,
  };

  return (
    <ArtboardInfoContext.Provider value={value}>
      {children}
    </ArtboardInfoContext.Provider>
  );
};

export default ArtboardProvider;
