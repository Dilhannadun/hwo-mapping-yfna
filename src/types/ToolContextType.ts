import MinMaxType from "./MinMaxType";

type ToolContextType = {
  telescopeDiameter: number;
  setTelescopeDiameter: (value: number) => void;
  snr0: number;
  setSnr0: (value: number) => void;
  systemDistance: MinMaxType | undefined;
  setSystemDistance: (value: MinMaxType | undefined) => void;
  orbitalDistance: MinMaxType | undefined;
  setOrbitalDistance: (value: MinMaxType | undefined) => void;
  planetRadius: MinMaxType | undefined;
  setPlanetRadius: (value: MinMaxType | undefined) => void;
  stellarRadius: MinMaxType | undefined;
  setStellarRadius: (value: MinMaxType | undefined) => void;
  exoPlanetType: string;
  setExoPlanetType: (value: string) => void;
  isHZActivated: boolean;
  setIsHZActivated: (value: boolean) => void;
  isInstantMesh: boolean;
  setIsInstanceMesh: (value: boolean) => void;
};

export default ToolContextType;
