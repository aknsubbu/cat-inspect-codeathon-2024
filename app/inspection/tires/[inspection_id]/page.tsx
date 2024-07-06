"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import TireCard from "@/components/TireCard";

const TiresInspection = ({ params }: { params: { inspection_id: string } }) => {
  const inspectionID = params.inspection_id;

  const router = useRouter();

  const [LFtext, setLFText] = useState("");
  const [RFtext, setRFText] = useState("");
  const [LRtext, setLRText] = useState("");
  const [RRtext, setRRText] = useState("");
  const [LFData, setLFData] = useState({
    tirePressure: "",
    tireCondition: "",
    inspectorNotes: "",
  });
  const [RFData, setRFData] = useState({
    tirePressure: "",
    tireCondition: "",
    inspectorNotes: "",
  });
  const [LRData, setLRData] = useState({
    tirePressure: "",
    tireCondition: "",
    inspectorNotes: "",
  });
  const [RRData, setRRData] = useState({
    tirePressure: "",
    tireCondition: "",
    inspectorNotes: "",
  });
  const [LFImage, setLFImage] = useState("");
  const [RFImage, setRFImage] = useState("");
  const [LRImage, setLRImage] = useState("");
  const [RRImage, setRRImage] = useState("");

  const handleSubmit = async () => {
    const tireData = {
      inspectionId: inspectionID,
      tirePressureLeftFront: LFData.tirePressure,
      tirePressureRightFront: RFData.tirePressure,
      tireConditionLeftFront: LFData.tireCondition,
      tireConditionRightFront: RFData.tireCondition,
      tirePressureLeftRear: LRData.tirePressure,
      tirePressureRightRear: RRData.tirePressure,
      tireConditionLeftRear: LRData.tireCondition,
      tireConditionRightRear: RRData.tireCondition,
      tireOverallSummary: `${LFData.inspectorNotes}, ${RFData.inspectorNotes}, ${LRData.inspectorNotes}, ${RRData.inspectorNotes}`,
      attachedImages: [LFImage, RFImage, LRImage, RRImage],
    };

    try {
      const response = await axios
        .post(process.env.BASE_URL + "/api/tire/post", tireData)
        .then((res) => {
          console.log(res);
          //! Add the redirect to the next page
          router.push(`/inspection/battery/${inspectionID}`);
        });
    } catch (error) {
      console.error("Error posting tire data:", error);
    }
  };

  return (
    <div className="w-full pt-10 flex flex-col items-center">
      <p>{inspectionID}</p>
      <TireCard
        placement="Left Front"
        setData={setLFData}
        setImage={(image: string | null) => setLFImage(image || "")}
        setText={setLFText}
        text={LFtext}
      />
      <TireCard
        placement="Right Front"
        setData={setRFData}
        setImage={(image: string | null) => setRFImage(image || "")}
        setText={setRFText}
        text={RFtext}
      />
      <TireCard
        placement="Left Rear"
        setData={setLRData}
        setImage={(image: string | null) => setLRImage(image || "")}
        setText={setLRText}
        text={LRtext}
      />
      <TireCard
        placement="Right Rear"
        setData={setRRData}
        setImage={(image: string | null) => setRRImage(image || "")}
        setText={setRRText}
        text={RRtext}
      />

      <Button color="danger" variant="light" onPress={handleSubmit}>
        Proceed to the next stage
      </Button>
    </div>
  );
};

export default TiresInspection;
