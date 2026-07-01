import * as LottieReact from "lottie-react";
import errorfile from "@assets/lottieFiles/error.json";

const Lottie = (LottieReact as any).default;

const Example = () => {
  return <Lottie animationData={errorfile} />;
};

export default Example;