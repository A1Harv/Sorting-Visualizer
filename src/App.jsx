import SortingVisualizer from "./components/SortingVisualizer";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <ThemeToggle />
      <SortingVisualizer />
    </div>
  );
}

export default App;
