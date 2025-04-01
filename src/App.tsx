import './App.css'
import Header from "./components/Header.tsx";
import NumberGrid from "./components/NumberGrid.tsx";
import StatsWidget from "./components/StatsWidget.tsx";

function App() {

  return (
      <div className="bg-[#0d0b18] text-[#8cdefd] h-screen w-screen font-mono flex flex-col">
        <Header />
        <div className="flex flex-1r relative h-[65%]">
            <NumberGrid />
        </div>
        <StatsWidget />
      </div>
  )
}

export default App
