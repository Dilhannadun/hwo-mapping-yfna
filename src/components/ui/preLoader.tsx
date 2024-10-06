import { Sparkles } from "../sparkles";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/telescope.json";

function PreLoader() {
  return (
    <div className="h-screen overflow-hidden bg-black text-white flex flex-col items-center justify-center">
      <div>
        <span className="flex-grow mb-20 items-center justify-center  gap-4 text-center relative z-10 py-10">
          <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#edeffd] to-[#7b9cda] bg-clip-text text-transparent leading-[100%] tracking-tighter">
            Cooking planets
            <br />
            Making universe tasty
          </h1>
        </span>
        <Lottie className="h-40" animationData={animationData} loop={true} />
        <div className="relative -mt-32 h-40 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#163474] after:bg-[#08132b]">
          <Sparkles
            density={400}
            size={1.4}
            direction="top"
            className="absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          />
        </div>
      </div>
    </div>
  );
}

export default PreLoader;
