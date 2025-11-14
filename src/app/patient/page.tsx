import React, { Suspense } from "react";
import PatientView from "../_components/PatientView";

const PatientPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientView />
    </Suspense>
  );
};

export default PatientPage;
