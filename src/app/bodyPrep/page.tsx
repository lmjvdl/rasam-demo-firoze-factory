import BodyPrepPage from "@/components/bodyPrep/BodyPrepPage";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import { Suspense } from "react";

export default function BodyPrepPageWrapper() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BodyPrepPage />
    </Suspense>
  );
}
