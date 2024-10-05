import {
  useRef,
  useLayoutEffect,
  useEffect,
  useMemo,
  useContext,
  useState,
} from "react";
import { useThree } from "@react-three/fiber";
import { BlackHole } from "./BlackHole";
import Earth from "./Earth";
import ExoPlanet from "./ExoPlanet";
import * as THREE from "three";
import ExoPlanetType from "../types/ExoPlanetType";
import ToolContext from "../context/tools/ToolContext";
import { getPlanetColorBySNR } from "../lib/exo-planet-color-filter";
import gsap from "gsap";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Use import.meta.url to set the worker URL correctly
const snrWorkerUrl = new URL(`../web-workers/snrWorker.ts`, import.meta.url);

const filterWorkerUrl = new URL(
  `../web-workers/planetFilterWorker.ts`,
  import.meta.url
);

type Props = {
  numStars: number;
  exoPlanets: ExoPlanetType[] | undefined;
  setViewPosition: (position: THREE.Vector3) => void;
  view: string;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
};

function Scene({
  exoPlanets,
  setViewPosition,
  view,
  cameraRef,
  controlsRef,
}: Props) {
  const toolContext = useContext(ToolContext);
  const gl = useThree((state) => state.gl);
  const groupRef = useRef<THREE.Group>(null);
  const blackHoleRef = useRef<THREE.Mesh>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const [calculatedPlanets, setCalculatedPlanets] = useState<ExoPlanetType[]>(
    []
  );

  useEffect(() => {
    if (
      earthRef.current &&
      blackHoleRef.current &&
      cameraRef.current &&
      controlsRef.current
    ) {
      const targetPosition =
        view === "galaxy"
          ? blackHoleRef.current.position
          : earthRef.current.position;

      const cameraOffset =
        view === "galaxy"
          ? { x: 2.9, y: 0.2, z: 0.5 }
          : { x: 0.00001, y: 0, z: 0 };

      gsap.to(cameraRef.current.position, {
        x: targetPosition.x + cameraOffset.x,
        y: targetPosition.y + cameraOffset.y,
        z: targetPosition.z + cameraOffset.z,
        duration: 6, // Increase duration for smoother animation
        ease: "power1.inOut", // Use a smoother easing function
        onUpdate: () => {
          if (cameraRef.current) setViewPosition(cameraRef.current.position);
        },
      });

      gsap.to(cameraRef.current.rotation, {
        x: view === "galaxy" ? Math.PI / 4 : -Math.PI / 4, // Add rotation
        y: view === "galaxy" ? Math.PI / 4 : -Math.PI / 4,
        duration: 2,
        ease: "power1.inOut",
      });

      gsap.to(controlsRef.current.target, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 2,
        ease: "power1.inOut",
      });
    }
  }, [view, setViewPosition, earthRef, blackHoleRef, cameraRef, controlsRef]);

  // Set the pixel ratio for better scaling
  useLayoutEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
  }, [gl]);

  // Use Web Workers to filter and process planets
  useEffect(() => {
    if (!exoPlanets || !toolContext) return;

    const filterWorker = new Worker(filterWorkerUrl, { type: "module" });

    // Message handler for the filter worker
    const handleFilterMessage = (e: MessageEvent) => {
      const filtered = e.data as ExoPlanetType[];
      if (filtered.length > 0) {
        const snrWorker = new Worker(snrWorkerUrl, { type: "module" });

        snrWorker.postMessage({
          planets: filtered,
          toolContext: {
            telescopeDiameter: toolContext.telescopeDiameter,
            snr0: toolContext.snr0,
          },
        });

        // Message handler for the SNR worker
        const handleSNRMessage = (snrEvent: MessageEvent) => {
          const updatedPlanets = snrEvent.data as ExoPlanetType[];
          setCalculatedPlanets(updatedPlanets);
        };

        snrWorker.addEventListener("message", handleSNRMessage);

        // Cleanup for the SNR worker
        return () => {
          snrWorker.terminate();
          snrWorker.removeEventListener("message", handleSNRMessage);
        };
      }
    };

    filterWorker.postMessage({
      planets: exoPlanets,
      toolContext: {
        orbitalDistance: toolContext.orbitalDistance,
        systemDistance: toolContext.systemDistance,
        planetRadius: toolContext.planetRadius,
        stellarRadius: toolContext.stellarRadius,
      },
    });

    filterWorker.addEventListener("message", handleFilterMessage);

    // Cleanup for the filter worker
    return () => {
      filterWorker.terminate();
      filterWorker.removeEventListener("message", handleFilterMessage);
    };
  }, [exoPlanets, toolContext]);

  // Memoized rendering of exoplanets based on calculated data
  const allExoPlanets = useMemo(() => {
    return calculatedPlanets.map((planet, index) => {
      const planetColor = getPlanetColorBySNR(planet.snr);
      return (
        <ExoPlanet
          key={index}
          planet={planet}
          color={planetColor}
          snrValue={planet.snr}
        />
      );
    });
  }, [calculatedPlanets]);

  return (
    <group ref={groupRef}>
      <BlackHole ref={blackHoleRef} />
      <Earth ref={earthRef} color={"blue"} />
      {allExoPlanets}
    </group>
  );
}

export default Scene;
