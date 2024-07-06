"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import ExteriorCard from "@/components/ExteriorCard"; // Assuming you have an ExteriorCard component

const ExteriorInspection = ({
  params,
}: {
  params: { inspection_id: string };
}) => {
  const inspectionID = params.inspection_id;
  const router = useRouter();

  const [rustOrDamageText, setRustOrDamageText] = useState("");
  const [oilLeakText, setOilLeakText] = useState("");
  const [overallSummary, setOverallSummary] = useState("");
  const [rustOrDamageData, setRustOrDamageData] = useState({
    rustOrDamage: false,
    damageExplanation: "",
    oilLeakSuspension: false,
    overallSummary: "",
  });
  const [rustOrDamageImage, setRustOrDamageImage] = useState("");
  const [oilLeakImage, setOilLeakImage] = useState("");

  const handleSubmit = async () => {
    const exteriorData = {
      inspectionId: inspectionID,
      rustOrDamage: rustOrDamageData.rustOrDamage,
      damageExplanation: rustOrDamageData.damageExplanation,
      oilLeakSuspension: rustOrDamageData.oilLeakSuspension,
      overallSummary,
      attachedImages: [rustOrDamageImage, oilLeakImage],
    };

    try {
      const response = await axios
        .post(process.env.BASE_URL + "/api/exterior/post", exteriorData)
        .then((res) => {
          console.log(res);
          router.push(`/inspection/brakes/${inspectionID}`); // Redirect to the next page
          //! Add the redirect to the next page
        });
    } catch (error) {
      console.error("Error posting exterior data:", error);
    }
  };

  return (
    <div className="w-full pt-10 flex flex-col items-center">
      <p>{inspectionID}</p>
      <ExteriorCard
        placement="Rust, Dent or Damage to Exterior"
        setData={setRustOrDamageData}
        setImage={(image: string | null) => setRustOrDamageImage(image || "")}
        setText={setRustOrDamageText}
        text={rustOrDamageText}
      />
      <ExteriorCard
        placement="Oil Leak in Suspension"
        setData={(data) =>
          setRustOrDamageData({
            ...rustOrDamageData,
            oilLeakSuspension: data.oilLeakSuspension,
          })
        }
        setImage={(image: string | null) => setOilLeakImage(image || "")}
        setText={setOilLeakText}
        text={oilLeakText}
      />
      <textarea
        className="max-w-lg p-2"
        placeholder="Overall Summary (1000 Character Notes)"
        rows={6}
        value={overallSummary}
        onChange={(e) => setOverallSummary(e.target.value)}
      />

      <Button color="danger" variant="light" onPress={handleSubmit}>
        Proceed to the next stage
      </Button>
    </div>
  );
};

export default ExteriorInspection;
