import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./HomePage.tsx";
import { ErrorBoundary } from "react-error-boundary";

// Polyfill for HTML5 Drag and Drop on mobile devices
import { polyfill } from "mobile-drag-drop";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";
import "mobile-drag-drop/default.css";

polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="text-red-800 text-center text-3xl font-bold">
          Something went wrong. Please refresh the page.
        </div>
      }
    >
      <HomePage />
    </ErrorBoundary>
  </StrictMode>,
);
