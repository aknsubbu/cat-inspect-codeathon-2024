"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import BatteryCard from "@/components/BatteryCard"; // Import the BatteryCard component

const BatteryInspection = ({
  params,
}: {
  params: { inspection_id: string };
}) => {
  const inspectionID = params.inspection_id;
  const router = useRouter();

  const [text, setText] = useState("");
  const [batteryData, setBatteryData] = useState({
    batteryMake: "",
    batteryReplacementDate: "",
    batteryVoltage: "",
    batteryWaterLevel: "",
    batteryCondition: "",
    batteryLeak: "",
    batterySummary: "",
  });
  const [batteryImage, setBatteryImage] = useState("");

  const handleSubmit = async () => {
    const batteryInfo = {
      inspectionId: inspectionID,
      batteryMake: batteryData.batteryMake ?? "CAT",
      batteryReplacementDate: batteryData.batteryReplacementDate ?? "12th Jan 2021",
      batteryVoltage: batteryData.batteryVoltage ?? "12V",
      batteryWaterLevel: batteryData.batteryWaterLevel ?? "good",
      batteryCondition: batteryData.batteryCondition ?? "ok" ,
      batteryLeak: batteryData.batteryLeak ?? "no",
      batterySummary: batteryData.batterySummary ?? "good, no leaks",
      attachedImage: batteryImage ?? " -x- ",
    };

    try {
      const response = await axios
        .post("http://localhost:8080" + "/api/battery/post", batteryInfo)
        .then((res) => {
          console.log(res);
          router.push(`/inspection/exterior/${inspectionID}`); // Redirect to the next page
          //! Add the redirect to the next page
        });
    } catch (error) {
      console.error("Error posting battery data:", error);
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
      <BatteryCard
        placement="Battery Inspection"
        setData={setBatteryData}
        setImage={(image: string | null) => setBatteryImage(image || "")}
        setText={setText}
        text={text}
      />

      <Button color="danger" variant="light" onPress={handleSubmit}>
        Proceed to the next stage
      </Button>
    </div>
  );
};

export default BatteryInspection;
