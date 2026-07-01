import { Suspense } from "react";

import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspenseFallback = ({ children , initLoad= false }: { children: React.ReactNode , initLoad?:Boolean }) => {
  return (
    <Suspense
      fallback={
        initLoad ? <LottieHandler type="initLoading" message="loading please wait.." width={400} height={200} />:
        <LottieHandler type="loading" height={300} />
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;