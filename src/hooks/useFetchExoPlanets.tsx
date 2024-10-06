import axios from "axios";
import { useEffect, useState } from "react";
import ExoPlanet from "../types/ExoPlanetType";

export function useFetchExoPlanets() {
  const [exoPlanets, setExoPlanets] = useState<ExoPlanet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/data/planetery_system_composite_data.json"
        );
        setExoPlanets(response.data.planets);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

  return { exoPlanets, isLoading };
}
