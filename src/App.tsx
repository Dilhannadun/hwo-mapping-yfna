import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/ui/Header";
import ChartSideNav from "./components/ui/ChartsSideBar";
import InfoSideNav from "./components/ui/InfoSideBar";
import ToolsSideNav from "./components/ui/ToolsSideBar";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import SceneBackground from "./components/SceneBackground";
function App() {
  const [isToolSideBarOpen, setIsToolSideBarOpen] = useState(false);
  const [isInfoSideBarOpen, setIsInfoSideBarOpen] = useState(false);
  const [isChartNavOpen, setIsChartNavOpen] = useState(false);

  const [planets, setPlanets] = useState([]);
  
  useEffect(() => {
    fetch("/data/exo-planet-data/planetery_system_composite_data.json")
      .then((response) => response.json())
      .then((data) => setPlanets(data.planets))
      .catch((error) => console.error("Error fetching planet data:", error));
  }, []);

  const toggleToolBarSideBar = () => {
    setIsToolSideBarOpen(!isToolSideBarOpen);
  };

  const toggleInfoBarSideBar = () => {
    setIsInfoSideBarOpen(!isInfoSideBarOpen);
  };

  const toggleChartNav = () => {
    setIsChartNavOpen(!isChartNavOpen);
  };

  return (
    <div className="relative h-screen w-screen z-0 overflow-hidden">
      <Header
        onToolsClick={toggleToolBarSideBar}
        onInfoClick={toggleInfoBarSideBar}
        onChartsClick={toggleChartNav}
      />
      <ToolsSideNav
        isOpen={isToolSideBarOpen}
        toggleSideNav={toggleToolBarSideBar}
      />
      <InfoSideNav
        isOpen={isInfoSideBarOpen}
        toggleSideNav={toggleInfoBarSideBar}
      />

      <ChartSideNav
        isOpen={isChartNavOpen}
        toggleSideNav={toggleChartNav}
        data={planets}
      />

      <Canvas gl={{ antialias: false }}>
        <Perf position="bottom-right" />
        <SceneBackground texturePath="/images/background/stars_8k.webp" />
      </Canvas>

    </div>
  );
}

export default App;
