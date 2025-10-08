import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initSupaStorage } from "./lib/supaStorage";
import LoadingAnimation from "./components/LoadingAnimation.tsx";
import { useState, useEffect } from "react";

// Create a wrapper component to handle the loading state
const AppWithLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return <App />;
};

async function bootstrap() {
  try {
    await initSupaStorage();
  } catch (e) {
    // Silently handle supaStorage init failure
  }
  createRoot(document.getElementById("root")!).render(<AppWithLoading />);
}

bootstrap();