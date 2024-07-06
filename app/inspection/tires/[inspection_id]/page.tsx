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

  const handleImageUpload = async (image:any, filename:any) => {
    try {
      const response = await axios.post("/api/imageConversion", {
        baseString: image,
        id: filename,
      });
      return response.data.imagePath;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const LFfilename = `LF_${inspectionID}.png`;
      const RFfilename = `RF_${inspectionID}.png`;
      const LRfilename = `LR_${inspectionID}.png`;
      const RRfilename = `RR_${inspectionID}.png`;

      const LFImagePath = await handleImageUpload(LFImage, LFfilename);
      const RFImagePath = await handleImageUpload(RFImage, RFfilename);
      const LRImagePath = await handleImageUpload(LRImage, LRfilename);
      const RRImagePath = await handleImageUpload(RRImage, RRfilename);

      // Prepare tire data with the uploaded image URLs
      const tireData = {
        inspectionId: inspectionID,
        tirePressureLeftFront: LFData.tirePressure ?? "25",
        tirePressureRightFront: RFData.tirePressure ?? "25",
        tireConditionLeftFront: LFData.tireCondition ?? "Good",
        tireConditionRightFront: RFData.tireCondition ?? "Good",
        tirePressureLeftRear: LRData.tirePressure ?? "25",
        tirePressureRightRear: RRData.tirePressure ?? "25",
        tireConditionLeftRear: LRData.tireCondition ?? "Good",
        tireConditionRightRear: RRData.tireCondition ?? "Good",
        tireOverallSummary: `${LFData.inspectorNotes}, ${RFData.inspectorNotes}, ${LRData.inspectorNotes}, ${RRData.inspectorNotes}`,
        attachedImages: [LFImagePath, RFImagePath, LRImagePath, RRImagePath],
      };

      console.log("Handle Clicked");
      console.log(tireData);

      // Post tire data with the image URLs
      const response = await axios.post(
        "http://localhost:8080/api/tire/post",
        tireData
      );

      console.log(response);
      router.push(`/inspection/battery/${inspectionID}`);
    } catch (error) {
      console.error("Error posting tire data:", error);
    }
  };

  return (
    <div className="w-full pt-10 flex flex-col items-center">
      <div className="flex flex-row gap-2 items-center justify-center ">
        <h1 className="text-xl text-bold">Inspection ID:</h1>
        <p>{inspectionID}</p>
      </div>
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
      <div>
        {/* Image Breakdown Preview */}
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col items-center">
            <img alt="Left Front Tire" src={LFImage} />
            <p>Left Front</p>
          </div>
          <div className="flex flex-col items-center">
            <img alt="Right Front Tire" src={RFImage} />
            <p>Right Front</p>
          </div>
          <div className="flex flex-col items-center">
            <img alt="Left Rear Tire" src={LRImage} />
            <p>Left Rear</p>
          </div>
          <div className="flex flex-col items-center">
            <img alt="Right Rear Tire" src={RRImage} />
            <p>Right Rear</p>
          </div>
        </div>
      </div>

      <Button color="danger" variant="light" onPress={handleSubmit}>
        Proceed to the next stage
      </Button>
    </div>
  );
};

export default TiresInspection;