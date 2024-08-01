import {
  withErrorBoundary,
  withSuspense,
  useStorageSuspense,
} from "@extension/shared";
import { appStorage } from "@extension/storage/lib";
import { useEffect, useState } from "react";
import clsx from "clsx";

export const LOGO_PROMPT_PEN = "✍️";

const isValidURL = (text: string): boolean => {
  try {
    new URL(text);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * The main component shown when user opens the popup
 */
const Popup = () => {
  const [text, setText] = useState("");
  const [disableCurrentPage, setDisableCurrentPage] = useState(false);

  useEffect(() => {
    // Scan the stored domains to see if current page is added
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const url = currentTab?.url || "";

      let domain = "";

      // When url exists store it in the storage
      if (url) {
        const parsedUrl = new URL(url);
        domain = parsedUrl.origin;

        // If domain exists inside domains only then enable the extension
        if (domains.includes(domain)) setDisableCurrentPage(true);
      }
    });
  });

  const storageData = useStorageSuspense(appStorage);
  const { domains } = storageData;

  const handleAdd = (domain: string) => {
    // Check if text is actually a valid URL
    if (isValidURL(domain)) {
      appStorage.addDomain(domain);
      setText(""); // cleanup
    }
  };

  const handleRemove = (domain: string) => {
    appStorage.removeDomain(domain);
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
        appStorage.addDomain(domain);

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
            placeholder="https://google.com"
            className="w-full p-2 rounded-md bg-slate-800 text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex gap-x-2">
            <button
              className={clsx(
                "mt-2 bg-orange-600 p-2 rounded-md text-white w-full",
                (!text || !isValidURL(text)) &&
                  "cursor-not-allowed pointer-events-none opacity-40",
              )}
              onClick={() => handleAdd(text)}
              disabled={!text || !isValidURL(text)}
            >
              Add Page
            </button>
            <button
              className={clsx(
                "mt-2 bg-purple-600 p-2 rounded-md text-white w-full",
                disableCurrentPage &&
                  "cursor-not-allowed pointer-events-none opacity-40",
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
