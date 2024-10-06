import { useContext } from "react";
import RangeItem from "./RangeItem";
import ToolContext from "../../context/tools/ToolContext";
import TwoThumbsRangeItem from "./ReactDoubleRangeItem";
import MinMaxType from "../../types/MinMaxType";
import PlanetContext from "../../context/planets/PlanetContext";

type Props = {
  isOpen: boolean;
  toggleSideNav: () => void;
};

export default function ToolsSideNav({ isOpen, toggleSideNav }: Props) {
  const toolContext = useContext(ToolContext);
  const planetContext = useContext(PlanetContext);

  const handleTeleDiameterSliderChange = (value: number) => {
    toolContext?.setTelescopeDiameter(value);
  };

  const handleSnr0 = (value: number) => {
    toolContext?.setSnr0(value);
  };

  const handleOrbitalDistance = (value: MinMaxType) => {
    toolContext?.setOrbitalDistance(value);
  };

  const handlePlaneterDistance = (value: MinMaxType) => {
    toolContext?.setSystemDistance(value);
  };

  const handlePlanetRadius = (value: MinMaxType) => {
    toolContext?.setPlanetRadius(value);
  };

  const handleStellarRadius = (value: MinMaxType) => {
    toolContext?.setStellarRadius(value);
  };

  const handleInstantMeshToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    toolContext?.setIsInstanceMesh(event.target.checked);
  };

  const handleCleanDataToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    planetContext?.setIsCleanData(event.target.checked);
  };
  const handleHZToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    toolContext?.setIsHZActivated(event.target.checked);
  };

  return (
    <div
      className={`absolute top-0 left-0 h-screen sm:w-[80%] md:w-[50%] lg:w-[20%] bg-black z-20 p-2
         text-white flex flex-col gap-3 overflow-y-scroll transform transition-transform duration-300 ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         }`}
    >
      <div className="flex flex-row justify-end">
        <div
          className="cursor-pointer text-lg p-2 bg-black text-red-500 hover:text-red-800"
          onClick={toggleSideNav}
        >
          X
        </div>
      </div>

      <div className="flex items-center text-xs mb-2">
        <input
          type="checkbox"
          id="cleanData"
          onChange={handleCleanDataToggle}
          checked={planetContext?.isCleanData}
        />
        <label htmlFor="cleanData" className="ml-2">
          Clean Data (Remove Missing Values; e.g., st_rad)
        </label>
      </div>

      <div className="flex items-center text-xs mb-2">
        <input
          type="checkbox"
          id="hzActivator"
          onChange={handleHZToggle}
          checked={toolContext?.isHZActivated}
        />
        <label htmlFor="hzActivator" className="ml-2">
          Detect ExoPlanets in Habitable Zones
        </label>
      </div>

      <RangeItem
        label="HWO Telescope Diameter (m) :"
        min={0}
        max={50}
        id="td"
        onChange={handleTeleDiameterSliderChange}
        defaultValue={toolContext?.telescopeDiameter}
      />
      <RangeItem
        label="SNR0 :"
        min={0}
        max={500}
        id="snr0"
        onChange={handleSnr0}
        defaultValue={toolContext?.snr0}
      />
      <TwoThumbsRangeItem
        rtl={false}
        min={0}
        max={20000}
        step={0.1}
        label="Orbital Distance (Semi-Major Axis) (au):"
        id="od"
        onChange={handleOrbitalDistance}
        defaultMin={0}
        defaultMax={20000}
      />
      <TwoThumbsRangeItem
        rtl={false}
        min={0}
        max={9000}
        step={0.1}
        label="Distance from Earth (pc):"
        id="dfe"
        onChange={handlePlaneterDistance}
        defaultMin={0}
        defaultMax={9000}
      />
      <TwoThumbsRangeItem
        rtl={false}
        min={0}
        max={100}
        step={0.1}
        label="Planet Radius (Earth Radius):"
        id="pr"
        onChange={handlePlanetRadius}
        defaultMin={0}
        defaultMax={100}
      />

      <TwoThumbsRangeItem
        rtl={false}
        min={0}
        max={200}
        step={0.1}
        label="Stellar Radius (Solar Radius):"
        id="sr"
        onChange={handleStellarRadius}
        defaultMin={0}
        defaultMax={200}
      />

      <div className="flex items-center text-xs my-2">
        <input
          type="checkbox"
          id="cleanData"
          onChange={handleInstantMeshToggle}
          checked={toolContext?.isInstantMesh}
        />
        <label htmlFor="cleanData" className="ml-2">
          Is Instant Mesh (Low CPU/GPU Usage)
        </label>
      </div>
    </div>
  );
}
