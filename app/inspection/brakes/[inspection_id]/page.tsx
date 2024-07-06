"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import BrakeCard from "@/components/BrakeCard";

const BrakesInspection = ({
  params,
}: {
  params: { inspection_id: string };
}) => {
  const inspectionID = params.inspection_id;
  const router = useRouter();

  const [LFText, setLFText] = useState("");
  const [RFText, setRFText] = useState("");
  const [LRText, setLRText] = useState("");
  const [RRText, setRRText] = useState("");
  const [LFData, setLFData] = useState({
    brakeFluidLevel: "",
    frontBrakeCondition: "",
    rearBrakeCondition: "",
    emergencyBrake: "",
    brakeOverallSummary: "",
  });
  const [RFData, setRFData] = useState({
    brakeFluidLevel: "",
    frontBrakeCondition: "",
    rearBrakeCondition: "",
    emergencyBrake: "",
    brakeOverallSummary: "",
  });
  const [LRData, setLRData] = useState({
    brakeFluidLevel: "",
    frontBrakeCondition: "",
    rearBrakeCondition: "",
    emergencyBrake: "",
    brakeOverallSummary: "",
  });
  const [RRData, setRRData] = useState({
    brakeFluidLevel: "",
    frontBrakeCondition: "",
    rearBrakeCondition: "",
    emergencyBrake: "",
    brakeOverallSummary: "",
  });
  const [LFImage, setLFImage] = useState("");
  const [RFImage, setRFImage] = useState("");
  const [LRImage, setLRImage] = useState("");
  const [RRImage, setRRImage] = useState("");

  const LFURL = "-x-";
  const RFURL = "-x-";
  const LRURL = "-x-";
  const RRURL = "-x-";

  const handleSubmit = async () => {
    const brakeData = {
      inspectionId: inspectionID,
      brakeFluidLevelLeftFront: LFData.brakeFluidLevel ?? "good",
      brakeFluidLevelRightFront: RFData.brakeFluidLevel ?? "good",
      frontBrakeConditionLeftFront: LFData.frontBrakeCondition ?? "good",
      frontBrakeConditionRightFront:
        RFData.frontBrakeCondition ?? "needs replacement",
      rearBrakeConditionLeftRear: LRData.rearBrakeCondition ?? "good",
      rearBrakeConditionRightRear: RRData.rearBrakeCondition ?? "good",
      emergencyBrakeLeftRear: LRData.emergencyBrake ?? "good",
      emergencyBrakeRightRear: RRData.emergencyBrake ?? "good",
      brakeOverallSummary: `${LFData.brakeOverallSummary}, ${RFData.brakeOverallSummary}, ${LRData.brakeOverallSummary}, ${RRData.brakeOverallSummary}`,
      attachedImages: [LFURL, RFURL, LRURL, RRURL],
    };

    try {
      const response = await axios
        .post("http://localhost:8080" + "/api/brakes/post", brakeData)
        .then((res) => {
          console.log(res);
          router.push(`/inspection/engine/${inspectionID}`); // Redirect to the next page
          //! Add the redirect to the next page
        });
    } catch (error) {
      console.error("Error posting brake data:", error);
    }
  };

  return (
    <div className="w-full pt-10 flex flex-col items-center">
      <div className="flex flex-row gap-2 items-center justify-center ">
        <h1 className="text-xl text-bold">Inspection ID:</h1>
        <p>{inspectionID}</p>
      </div>
      <BrakeCard
        placement="Left Front"
        setData={setLFData}
        setImage={(image: string | null) => setLFImage(image || "")}
        setText={setLFText}
        text={LFText}
      />
      <BrakeCard
        placement="Right Front"
        setData={setRFData}
        setImage={(image: string | null) => setRFImage(image || "")}
        setText={setRFText}
        text={RFText}
      />
      <BrakeCard
        placement="Left Rear"
        setData={setLRData}
        setImage={(image: string | null) => setLRImage(image || "")}
        setText={setLRText}
        text={LRText}
      />
      <BrakeCard
        placement="Right Rear"
        setData={setRRData}
        setImage={(image: string | null) => setRRImage(image || "")}
        setText={setRRText}
        text={RRText}
      />

      <Button color="danger" variant="light" onPress={handleSubmit}>
        Proceed to the next stage
      </Button>
    </div>
  );
};

export default BrakesInspection;
