import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import SceneBackground from "./components/SceneBackground";
// import { Perf } from "r3f-perf";
import Scene from "./components/Scene";
import { NUMBER_OF_STARS } from "./config/galaxyConfig";
import Header from "./components/ui/Header";
import { useContext, useRef, useState } from "react";
import PlanetContext from "./context/planets/PlanetContext";
import { ViewType } from "./types/viewTypes";
import * as THREE from "three";
import ChartSideNav from "./components/ui/ChartsSideBar";
import ToolsSideNav from "./components/ui/ToolsSideBar";
import ColorMap from "./components/ui/ColorMap";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import InfoSideNav from "./components/ui/InfoSideBar";
import PreLoader from "./components/ui/preLoader";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const planetContext = useContext(PlanetContext);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [isToolSideBarOpen, setIsToolSideBarOpen] = useState(false);
  const [isInfoSideBarOpen, setIsInfoSideBarOpen] = useState(false);
  const [isChartNavOpen, setIsChartNavOpen] = useState(false);
  const [view, setView] = useState<ViewType>("galaxy");
  const [viewPosition, setViewPosition] = useState<THREE.Vector3>(
    new THREE.Vector3(2.8, 0.3, -0.6)
  );

  const toggleToolBarSideBar = () => {
    setIsToolSideBarOpen(!isToolSideBarOpen);
  };

  const toggleInfoBarSideBar = () => {
    setIsInfoSideBarOpen(!isInfoSideBarOpen);
  };

  const toggleChartNav = () => {
    setIsChartNavOpen(!isChartNavOpen);
  };

  // Function to reset the camera position and controls
  const resetCamera = () => {
    window.location.reload();
  };

  return (
    <div className=" relative">
      <AnimatePresence>
        {planetContext?.isLoading || planetContext?.loadingPlanets ? (
          <motion.div
            className="absolute inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PreLoader />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className={`relative h-screen w-screen z-0 overflow-hidden`}>
        <Header
          onToolsClick={toggleToolBarSideBar}
          onInfoClick={toggleInfoBarSideBar}
          setView={setView}
          view={view}
          resetCamera={resetCamera}
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
          data={planetContext?.planets}
        />
        <ColorMap />
        {planetContext?.isLoading ? (
          <div className="flex h-full w-full items-center justify-center text-white">
            <p>Loading...</p>
          </div>
        ) : (
          <Canvas gl={{ antialias: false }}>
            {/* <Perf position="bottom-right" /> */}
            <PerspectiveCamera
              ref={cameraRef}
              makeDefault
              position={[1.5, 0.12, 0.2]}
              near={0.001} // Reduce this value to be closer to objects
              far={1000} // Increase this value if objects are farther away
            />
            <OrbitControls
              ref={controlsRef}
              zoomSpeed={view === "galaxy" ? 0.09 : 0.5}
              panSpeed={view === "galaxy" ? 0.08 : 0.5}
              rotateSpeed={view === "galaxy" ? 0.02 : 0.09}
              target={viewPosition}
            />
            <SceneBackground texturePath="/images/background/stars_8k.webp" />
            <Scene
              numStars={NUMBER_OF_STARS}
              exoPlanets={planetContext?.planets}
              setViewPosition={setViewPosition}
              view={view}
              cameraRef={cameraRef}
              controlsRef={controlsRef}
            />
          </Canvas>
        )}
      </div>
    </div>
  );
}
