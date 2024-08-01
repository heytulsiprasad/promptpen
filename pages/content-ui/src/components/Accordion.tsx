import {
  ArtCategory,
  ArtStyleType,
  useArtboard,
} from "@src/context/ArtboardContext";
import React from "react";

type AccordionProps = {
  id: number;
  title: string;
  config: ArtCategory;
  src: ArtStyleType[];
};

/**
 * A simple accordion component that contains all the prompt parameters
 */
const Accordion = ({ id, title, config, src }: AccordionProps) => {
  const { artConfig, setArtConfig } = useArtboard();

  const handleCheckboxChange = (item: ArtStyleType) => {
    const { name } = item;

    // When name already exists remove it
    if (artConfig[config].includes(name))
      setArtConfig({
        ...artConfig,
        [config]: artConfig[config].filter((name) => name !== item.name),
      });
    // If not exists, then add it
    else
      setArtConfig({
        ...artConfig,
        [config]: [...artConfig[config], item.name],
      });
  };

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" id={`accordion-${id}`} className="peer" />
      <div className="collapse-title text-lg font-medium">{title}</div>
      <div className="collapse-content grid grid-cols-2 gap-4">
        {src.map((item) => (
          <label key={item.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={artConfig[config].includes(item.name)}
              onChange={() => handleCheckboxChange(item)}
              className="checkbox border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
            />
            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
