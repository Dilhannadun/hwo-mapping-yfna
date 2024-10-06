import { useState, useEffect, useMemo } from "react";
import ExoPlanetType from "../../types/ExoPlanetType";
import { useFetchExoPlanets } from "../../hooks/useFetchExoPlanets";
import PlanetContext from "./PlanetContext";

type Props = {
  children: React.ReactNode;
};

const PlanetContextProvider = ({ children }: Props) => {
  const [planets, setPlanets] = useState<ExoPlanetType[]>([]);
  const [isCleanData, setIsCleanData] = useState<boolean>(true);

  const { exoPlanets, isLoading } = useFetchExoPlanets();
  const [loadingPlanets, setLoadingPlanets] = useState<boolean>(true);

  useEffect(() => {
    if (exoPlanets.length > 0) {
      // Filter out planets with NaN values in ra, dec, or sy_dist
      const validPlanets = exoPlanets.filter((planet) => {
        const isValidNumber = (value: any) =>
          value != null && value !== "" && !isNaN(value);

        return (
          isValidNumber(planet.ra) &&
          isValidNumber(planet.dec) &&
          isValidNumber(planet.sy_dist) &&
          isValidNumber(planet.pl_orbsmax) &&
          isValidNumber(planet.pl_rade) &&
          (!isCleanData || isValidNumber(planet.st_rad))
        );
      });

      // Set the filtered planets into state
      setPlanets(validPlanets);
    }
  }, [exoPlanets, isCleanData]);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      planets,
      isLoading,
      isCleanData,
      setIsCleanData,
      loadingPlanets,
      setLoadingPlanets,
    }),
    [planets, isLoading, isCleanData, loadingPlanets]
  );

  return (
    <PlanetContext.Provider value={value}>{children}</PlanetContext.Provider>
  );
};

export default PlanetContextProvider;
