"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";

import EngineCard from "@/components/EngineCard";

const EngineInspection = ({ params }: { params: { inspection_id: string } }) => {
  const inspectionID = params.inspection_id;

  const [engineText, setEngineText] = useState("");
  const [engineData, setEngineData] = useState({
    rustDamage: false,
    rustDamageNotes: "",
    engineOilCondition: "",
    engineOilColor: "",
    brakeFluidCondition: "",
    brakeFluidColor: "",
    oilLeak: false,
    summary: "",
  });
  const [engineImage, setEngineImage] = useState("");

  const handleSubmit = async () => {
    const engineInspectionData = {
      inspectionId: inspectionID,
      rustDamage: engineData.rustDamage ?? 'yes',
      rustDamageNotes: engineData.rustDamageNotes ?? 'yes,damage to part',
      engineOilCondition: engineData.engineOilCondition ?? "good",
      engineOilColor: engineData.engineOilColor ?? "clean",
      brakeFluidCondition: engineData.brakeFluidCondition ?? "good",
      brakeFluidColor: engineData.brakeFluidColor ?? "brown",
      oilLeak: engineData.oilLeak ?? 'yes',
      summary: engineData.summary ?? "some issues",
      attachedImage: engineImage,
    };

    try {
      const response = await axios
        .post("http://localhost:8080" + "/api/engine/post", engineInspectionData)
        .then((res) => {
          console.log(res);
          //! Add the redirect to the next page
        });
    } catch (error) {
      console.error("Error posting engine data:", error);
    }
  };

  return (
    <div className="w-full pt-10 flex flex-col items-center">
      <div className="flex flex-row gap-2 items-center justify-center ">
        <h1 className="text-xl text-bold">
          Inspection ID: 
        </h1>
        <p>{inspectionID}</p>
      </div>
      <EngineCard
        placement="Engine Inspection"
        setData={setEngineData}
        setImage={(image: string | null) => setEngineImage(image || "")}
        setText={setEngineText}
        text={engineText}
      />

      <Button color="danger" variant="light" onPress={handleSubmit}>
        Proceed to the next stage
      </Button>
    </div>
  );
};

export default EngineInspection;