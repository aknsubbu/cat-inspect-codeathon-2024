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

  function saveBase64ImageToFile(base64String: any, filename: any) {
    // Remove data:image/jpeg;base64, from base64 string
    const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, "");

    // Decode base64 to binary
    const binaryData = Buffer.from(base64Data, "base64");

    // Write binary data to a file
    // fs.writeFile(filename, binaryData, "binary", (err) => {
    //   if (err) throw err;
    //   console.log(`Image saved as ${filename}`);
    // });
  }

  const uploadImage = async (filePath: any, component: any) => {
    const formData = new FormData();

    formData.append("component", component);

    try {
      const file = await fetch(filePath);
      const blob = await file.blob();

      formData.append("file", blob, "image.jpg"); // Replace 'image.jpg' with the actual filename

      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data.publicURL; // Assuming your API response has a public URL
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      // Upload images and get their URLs
      const contentType = "image/jpeg";

      // const LFfilename = "LFImage.jpeg";
      // const RFfilename = "RFImage.jpeg";
      // const LRfilename = "LRImage.jpeg";
      // const RRfilename = "RRImage.jpeg";

      // saveBase64ImageToFile(LFImage, LFfilename);
      // saveBase64ImageToFile(RFImage, RFfilename);
      // saveBase64ImageToFile(LRImage, LRfilename);
      // saveBase64ImageToFile(RRImage, RRfilename);

      // const LFImageURL = await uploadImage(LFfilename, "Tire");
      // const RFImageURL = await uploadImage(RFfilename, "Tire");
      // const LRImageURL = await uploadImage(LRfilename, "Tire");
      // const RRImageURL = await uploadImage(RRfilename, "Tire");
      const LFImageURL = "LFImage";
      const RFImageURL = "RFImage";
      const LRImageURL = "LRImage";
      const RRImageURL = "RRImage";

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
        attachedImages: [LFImageURL, RFImageURL, LRImageURL, RRImageURL],
      };

      console.log("Handle Clicked");
      console.log(tireData);

      // Post tire data with the image URLs
      const response = await axios.post(
        "http://localhost:8080/api/tire/post",
        tireData,
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
            <img alt="Right Front Tire" src={LRImage} />
            <p>Right Front</p>
          </div>
          <div className="flex flex-col items-center">
            <img alt="Right Front Tire" src={RRImage} />
            <p>Right Front</p>
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
