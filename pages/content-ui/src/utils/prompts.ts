import { ArtConfigTypes } from "@src/context/ArtboardContext";

/**
 * Generate prompt from all parameters
 */
export const generatePrompt = (
  artConfig: ArtConfigTypes,
  customText: string,
  position: string,
  customPosition: string,
): string => {
  let prompt = Object.values(artConfig).flat().join(", ");

  // Add the custom text
  if (customText) {
    prompt += `, add this text "${customText}"`;

    //  Add the position of the custom text
    if (position) prompt += ` at ${position} of the image`;
    else if (customPosition) prompt += ` at ${customPosition} of the image`;
  }

  return prompt;
};
