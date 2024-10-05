// import DistanceVsRadius from "../charts/DistanceVsRadius";

import ExoPlanetType from "../../types/ExoPlanetType";
import DistanceVsRadius from "../charts/DistanceVsRadius";

type Props = {
  isOpen: boolean;
  toggleSideNav: () => void;
  data: ExoPlanetType[] | undefined;
};

export default function ChartSideNav({ isOpen, toggleSideNav, data }: Props) {
  return (
    <div
      className={`absolute top-0 right-0 h-screen xs:w-full md:w-[50%] lg:w-[60%] bg-black z-20 p-2
      text-white flex flex-col gap-3 overflow-y-scroll transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex  flex-row justify-end">
        <div
          className="cursor-pointer fixed z-50 text-red-500 hover:text-red-800"
          onClick={toggleSideNav}
        >
          X
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data && <DistanceVsRadius data={data} />}
      </div>
    </div>
  );
}
