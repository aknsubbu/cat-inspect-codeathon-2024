import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Link,
  Button,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import Translator from "./Translator";

import CameraComponent from "@/components/CameraComponent";

interface EngineCardProps {
  placement: string;
  text: string;
  setText: (text: string) => void;
  setImage: (image: string | null) => void;
  setData: (data: {
    rustDamage: boolean;
    rustDamageNotes: string;
    engineOilCondition: string;
    engineOilColor: string;
    brakeFluidCondition: string;
    brakeFluidColor: string;
    oilLeak: boolean;
    summary: string;
  }) => void;
  [key: string]: any; // Add this line to allow additional props
}

const EngineCard: React.FC<EngineCardProps> = ({
  placement,
  text,
  setText,
  setImage,
  setData,
}) => {
  const [rustDamage, setRustDamage] = useState<boolean>(false);
  const [rustDamageNotes, setRustDamageNotes] = useState<string>("");
  const [engineOilCondition, setEngineOilCondition] = useState<string>("");
  const [engineOilColor, setEngineOilColor] = useState<string>("");
  const [brakeFluidCondition, setBrakeFluidCondition] = useState<string>("");
  const [brakeFluidColor, setBrakeFluidColor] = useState<string>("");
  const [oilLeak, setOilLeak] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    function extractBooleanFromText(text: string, keyword: string): boolean {
      const regex = new RegExp(`${keyword}\\s+(yes|y)`, "i");

      return regex.test(text);
    }

    function extractTextFromPattern(text: string, pattern: RegExp): string {
      const match = pattern.exec(text);

      return match ? match[1].trim() : "";
    }

    if (text) {
      setRustDamage(
        extractBooleanFromText(text, "Rust, Dents or Damage in Engine:"),
      );
      setRustDamageNotes(
        extractTextFromPattern(
          text,
          /rust notes(.*)/s
        ),
      );
      setEngineOilCondition(
        extractTextFromPattern(
          text,
          /Engine\s+Oil\s+Condition\s+-\s+(good|bad)/i,
        ),
      );
      setEngineOilColor(
        extractTextFromPattern(
          text,
          /Engine\s+Oil\s+Color\s+-\s+(clean|brown|black)/i,
        ),
      );
      setBrakeFluidCondition(
        extractTextFromPattern(
          text,
          /Brake\s+Fluid\s+Condition\s+-\s+(good|bad)/i,
        ),
      );
      setBrakeFluidColor(
        extractTextFromPattern(
          text,
          /Brake\s+Fluid\s+Color\s*:\s*(clean|brown|black)/i,
        ),
      );
      setOilLeak(extractBooleanFromText(text, "Any oil leak in Engine"));
      setSummary(
        extractTextFromPattern(
          text,
          /Overall\s+Summary\s+\(<1000\s+characters\)\s+(.*)/i,
        ),
      );

      setData({
        rustDamage,
        rustDamageNotes,
        engineOilCondition,
        engineOilColor,
        brakeFluidCondition,
        brakeFluidColor,
        oilLeak,
        summary,
      });
    }
  }, [text, setData]);

  return (
    <div className="w-full flex justify-center">
      <Card className="w-2/3 p-5 gap-2 m-2">
        <CardHeader>
          <h1>{placement}</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center">
          <Translator setText={setText} />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            label="Rust, Dents or Damage in Engine"
            placeholder="Rust, Dents or Damage in Engine"
            value={rustDamageNotes}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setRustDamageNotes}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            label="Engine Oil Condition"
            placeholder="Engine Oil Condition"
            value={engineOilCondition}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setEngineOilCondition}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            label="Engine Oil Color"
            placeholder="Engine Oil Color"
            value={engineOilColor}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setEngineOilColor}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            label="Brake Fluid Condition"
            placeholder="Brake Fluid Condition"
            value={brakeFluidCondition}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBrakeFluidCondition}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            label="Brake Fluid Color"
            placeholder="Brake Fluid Color"
            value={brakeFluidColor}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBrakeFluidColor}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            label="Any oil leak in Engine"
            placeholder="Any oil leak in Engine"
            value={oilLeak ? "Yes" : "No"}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={(value) => setOilLeak(value === "Yes")}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            label="Overall Summary"
            placeholder="Overall Summary"
            value={summary}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setSummary}
          />
          <Button
            className="mt-4"
            color="success"
            variant="light"
            onPress={onOpen}
          >
            Capture Image
          </Button>
        </CardBody>
      </Card>
      <Modal
        backdrop="blur"
        className="flex justify-center items-center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Image Capture
          </ModalHeader>
          <ModalBody className="flex justify-center items-center">
            <CameraComponent setImage={setImage} />
          </ModalBody>

          <ModalFooter>
            <Link isBlock color="success" underline="hover" onClick={onClose}>
              Confirm Image
            </Link>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EngineCard;
