import {
  withErrorBoundary,
  withSuspense,
  useStorageSuspense,
} from "@extension/shared";
import { domainStorage } from "@extension/storage";
import { useState } from "react";
import clsx from "clsx";

export const LOGO_PROMPT_PEN = "✍️";

/**
 * The main component shown when user opens the popup
 */
const Popup = () => {
  const [text, setText] = useState("");
  const [disableCurrentPage, setDisableCurrentPage] = useState(false);

  const storageData = useStorageSuspense(domainStorage);
  const { domains } = storageData;

  const handleAdd = (domain: string) => {
    domainStorage.addDomain(domain);
    setText(""); // cleanup
  };

  const handleRemove = (domain: string) => {
    domainStorage.removeDomain(domain);
  };

  const handleAddCurrentPage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const url = currentTab?.url || "";

      let domain = "";

      // When url exists store it in the storage
      if (url) {
        const parsedUrl = new URL(url);
        domain = parsedUrl.origin;

        console.log({ url, parsedUrl, domain });
        domainStorage.addDomain(domain);

        // Disable showing current page button
        setDisableCurrentPage(true);
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 p-4">
      <h1 className="text-lg font-bold text-left text-white">
        PromptPen {LOGO_PROMPT_PEN}
      </h1>

      {/* Section to add domains */}
      <section className="mt-4">
        <h2 className="text-sm font-bold text-white">
          Add pages in which widget to appear:
        </h2>

        <div className="mt-2">
          <input
            type="text"
            placeholder="Enter page URL"
            className="w-full p-2 rounded-md bg-slate-800 text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex gap-x-2">
            <button
              className="mt-2 bg-orange-600 p-2 rounded-md text-white w-full"
              onClick={() => handleAdd(text)}
            >
              Add Page
            </button>
            <button
              className={clsx(
                "mt-2 bg-purple-600 p-2 rounded-md text-white w-full",
                disableCurrentPage && "btn-disabled",
              )}
              disabled={disableCurrentPage}
              onClick={handleAddCurrentPage}
            >
              Add Current Page
            </button>
          </div>
        </div>
      </section>

      {/* Section to list all domains */}
      <section className="mt-4">
        <h2 className="text-sm font-bold text-white">List of pages:</h2>

        <div className="mt-2">
          {domains.map((domain) => (
            <div
              key={domain}
              className="flex justify-between items-center bg-slate-800 p-2 rounded-md mt-2"
            >
              <div className="text-white">{domain}</div>
              <div>
                <button
                  className="bg-orange-600 p-2 rounded-md text-white"
                  onClick={() => handleRemove(domain)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
