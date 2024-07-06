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
      rustDamage: engineData.rustDamage,
      rustDamageNotes: engineData.rustDamageNotes,
      engineOilCondition: engineData.engineOilCondition,
      engineOilColor: engineData.engineOilColor,
      brakeFluidCondition: engineData.brakeFluidCondition,
      brakeFluidColor: engineData.brakeFluidColor,
      oilLeak: engineData.oilLeak,
      summary: engineData.summary,
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
      <p>{inspectionID}</p>
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