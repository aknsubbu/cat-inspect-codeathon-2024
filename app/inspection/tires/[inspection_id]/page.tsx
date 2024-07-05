"use client";
import React, { useState } from "react";

import Translator from "@/components/Translator";

const TiresInspection = ({ params }: { params: { inspection_id: string } }) => {
  const inspectionID = params.inspection_id;
  const [text, setText] = useState("");

  return (
    <div>
      <h1>Inspection ID: {inspectionID}</h1>
      <Translator setText={setText} />
      <p>{text}</p>
    </div>
  );
};

export default TiresInspection;