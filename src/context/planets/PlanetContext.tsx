import { createContext } from "react";
import ExoPlanetType from "../../types/ExoPlanetType";

interface PlanetContextType {
  planets: ExoPlanetType[];
  isLoading: boolean;
  isCleanData: boolean;
  setIsCleanData: (value: boolean) => void;
  loadingPlanets: boolean;
  setLoadingPlanets: (value: boolean) => void;
}

const PlanetContext = createContext<PlanetContextType>({
  planets: [],
  isLoading: false,
  isCleanData: false,
  setIsCleanData: () => {},
  loadingPlanets: false,
  setLoadingPlanets: () => {},
});

export default PlanetContext;
