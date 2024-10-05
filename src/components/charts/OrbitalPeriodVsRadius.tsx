import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import ExoPlanetType from "../../types/ExoPlanetType";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const OrbitalPeriodVsRadius = ({ data }: { data: ExoPlanetType[] }) => {
  // Filter and format data for short orbital periods (<= 50 days)
  const shortOrbitalPeriodData = data
    .filter((planet) => planet.pl_orbper && planet.pl_orbper <= 50)
    .map((planet) => ({
      x: planet.pl_orbper,
      y: planet.pl_rade,
      planetName: planet.pl_name,
    }));

  // Filter and format data for medium orbital periods (50 < days <= 100)
  const mediumOrbitalPeriodData = data
    .filter(
      (planet) =>
        planet.pl_orbper && planet.pl_orbper > 50 && planet.pl_orbper <= 100
    )
    .map((planet) => ({
      x: planet.pl_orbper,
      y: planet.pl_rade,
      planetName: planet.pl_name,
    }));

  // Filter and format data for large planet radius (> 2 Earth Radii)
  const largePlanetRadiusData = data
    .filter((planet) => planet.pl_rade && planet.pl_rade > 2)
    .map((planet) => ({
      x: planet.pl_orbper,
      y: planet.pl_rade,
      planetName: planet.pl_name,
    }));

  const chartData = {
    datasets: [
      {
        label: "Orbital Period vs Radius (<= 50 days)",
        data: shortOrbitalPeriodData,
        backgroundColor: "#82ca9d",
      },
      {
        label: "Orbital Period vs Radius (50 < days <= 100)",
        data: mediumOrbitalPeriodData,
        backgroundColor: "#8884d8",
      },
      {
        label: "Large Planet Radius (> 2 ER)",
        data: largePlanetRadiusData,
        backgroundColor: "#ffc658",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Orbital Period (days)",
        },
      },
      y: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Planet Radius (ER)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"scatter">) => {
            const raw = tooltipItem.raw as {
              planetName: string;
              x: number;
              y: number;
            };
            return `${raw.planetName}: Orbital Period: ${raw.x} days, Radius: ${raw.y} ER`;
          },
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default OrbitalPeriodVsRadius;
