import React from "react";
import { ArtStyleType } from "./Sidebar";

type AccordionProps = {
  id: number;
  title: string;
  data: ArtStyleType[];
  setData: React.Dispatch<React.SetStateAction<ArtStyleType[]>>;
  src: ArtStyleType[];
};

/**
 * A simple accordion component that contains all the prompt parameters
 */
const Accordion = ({ id, title, data, setData, src }: AccordionProps) => {
  const handleCheckboxChange = (style: ArtStyleType) => {
    setData((prevData) => {
      if (prevData.includes(style)) {
        return prevData.filter((item) => item !== style);
      } else {
        return [...prevData, style];
      }
    });
  };

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" id={`accordion-${id}`} className="peer" />
      <div className="collapse-title text-lg font-medium">{title}</div>
      <div className="collapse-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {src.map((item) => (
          <label key={item.style} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.includes(item)}
              onChange={() => handleCheckboxChange(item)}
              className="checkbox border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
            />
            <span>{item.style}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
