import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Query from './Query.tsx'
import './index.css'

// Root component that manages the state
function RootComponent() {
  const [showQueryComponent, setShowQueryComponent] = useState(false);

  // Function to toggle the new component
  const openQueryComponent = () => {
    setShowQueryComponent(true);
  };

  return (
    <StrictMode>
      {/* Conditionally render both App and NewComponent */}
      {!showQueryComponent ? (
        <App openQueryComponent={openQueryComponent} />
      ) : (
        <Query />
      )}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(
  <RootComponent />
)
