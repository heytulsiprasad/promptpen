import { useEffect, useState } from "react";
import ToggleSidebar from "./components/ToggleSidebar";
import Sidebar from "./components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useStorageSuspense } from "@extension/shared";
import { domainStorage } from "@extension/storage";
import clsx from "clsx";

export const LOGO_PROMPT_PEN = "✍️";

// Variants for the sidebar
const slideVariants = {
  hidden: { x: "100%" },
  visible: { x: "0%" },
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Entry point for the entire content app
 */
const App = () => {
  // State to enable extension on the current page
  const [enableExtension, setEnableExtension] = useState(false);

  // State to open the sidebar view
  const [showSidebar, setShowSidebar] = useState(true);

  // Fetch the domains from storage
  const storageData = useStorageSuspense(domainStorage);
  const { domains } = storageData;

  useEffect(() => {
    console.log({ domains });

    const url = window.location.href;

    let domain = "";

    // When url exists store it in the storage
    if (url) {
      const parsedUrl = new URL(url);
      domain = parsedUrl.origin;

      // If domain exists inside domains only then enable the extension
      if (domains.includes(domain)) setEnableExtension(true);
    }
  }, [domains]);

  return (
    <div className={clsx(!enableExtension && "hidden")}>
      <AnimatePresence>
        {showSidebar ? (
          <motion.div
            key="sidebar"
            className="fixed top-0 right-0 w-80"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Sidebar setShowSidebar={setShowSidebar} />
          </motion.div>
        ) : (
          <motion.div
            className="fixed top-16 right-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeVariants}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              mass: 1,
            }}
          >
            <ToggleSidebar setShowSidebar={setShowSidebar} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
