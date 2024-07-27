import "@src/Popup.css";
import { withErrorBoundary, withSuspense } from "@extension/shared";

const Popup = () => {
  console.log("Popup script");

  return (
    <div className="App bg-slate-50">
      <h2>PromptPen Home</h2>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
