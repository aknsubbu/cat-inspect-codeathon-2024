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
import CameraComponent from "./CameraComponent"; // Replace with correct path to CameraComponent

interface BrakeCardProps {
  placement: string;
  text: string;
  setText: (text: string) => void;
  setImage: (image: string | null) => void;
  setData: (data: {
    brakeFluidLevel: string;
    frontBrakeCondition: string;
    rearBrakeCondition: string;
    emergencyBrake: string;
    brakeOverallSummary: string;
  }) => void;
  [key: string]: any; // Add this line to allow additional props
}

const BrakeCard: React.FC<BrakeCardProps> = ({
  placement,
  text,
  setText,
  setImage,
  setData,
}) => {
  const [brakeFluidLevel, setBrakeFluidLevel] = useState<string | null>("");
  const [frontBrakeCondition, setFrontBrakeCondition] = useState<string | null>(
    null
  );
  const [rearBrakeCondition, setRearBrakeCondition] = useState<string | null>(
    null
  );
  const [emergencyBrake, setEmergencyBrake] = useState<string | null>(null);
  const [brakeOverallSummary, setBrakeOverallSummary] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    function extractBrakeFluidLevel(text: string) {
      const regex = /brake\s+fluid\s+level\s*:\s*(good|ok|low)/i;
      const match = regex.exec(text);
      return match ? match[1].toLowerCase() : null;
    }

    function extractBrakeCondition(text: string, position: string) {
      const regex = new RegExp(`brake\\s+condition\\s+for\\s+${position}\\s+-\\s+(good|ok|needs\\s+replacement)`, "i");
      const match = regex.exec(text);
      return match ? match[1].toLowerCase() : null;
    }

    function extractEmergencyBrake(text: string) {
      const regex = /emergency\s+brake\s*:\s*(good|ok|low)/i;
      const match = regex.exec(text);
      return match ? match[1].toLowerCase() : null;
    }

    function extractOverallSummary(text: string) {
      const regex = /brake\s+overall\s+summary\s*:\s*(.{1,1000})/i;
      const match = regex.exec(text);
      return match ? match[1].trim() : "";
    }

    if (text) {
      const fluidLevel = extractBrakeFluidLevel(text);
      const frontCondition = extractBrakeCondition(text, "front");
      const rearCondition = extractBrakeCondition(text, "rear");
      const emergency = extractEmergencyBrake(text);
      const overallSummary = extractOverallSummary(text);

      setBrakeFluidLevel(fluidLevel);
      setFrontBrakeCondition(frontCondition);
      setRearBrakeCondition(rearCondition);
      setEmergencyBrake(emergency);
      setBrakeOverallSummary(overallSummary);

      setData({
        brakeFluidLevel: fluidLevel ?? "",
        frontBrakeCondition: frontCondition ?? "",
        rearBrakeCondition: rearCondition ?? "",
        emergencyBrake: emergency ?? "",
        brakeOverallSummary: overallSummary,
      });
    }
  }, [text, setData]);

  return (
    <div className="w-full flex justify-center">
      <Card className="w-2/3 p-5 gap-2 m-2">
        <CardHeader>
          <h1 className="text-xl font-semibold">{placement}</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center">
          <Translator setText={setText} />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={
              brakeFluidLevel !== null ? brakeFluidLevel : undefined
            }
            label="Brake Fluid Level"
            placeholder="Brake fluid level is"
            value={brakeFluidLevel !== null ? brakeFluidLevel : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBrakeFluidLevel}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={
              frontBrakeCondition !== null ? frontBrakeCondition : undefined
            }
            label="Front Brake Condition"
            placeholder="Front brake condition is"
            value={
              frontBrakeCondition !== null ? frontBrakeCondition : undefined
            }
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setFrontBrakeCondition}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={
              rearBrakeCondition !== null ? rearBrakeCondition : undefined
            }
            label="Rear Brake Condition"
            placeholder="Rear brake condition is"
            value={
              rearBrakeCondition !== null ? rearBrakeCondition : undefined
            }
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setRearBrakeCondition}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={emergencyBrake !== null ? emergencyBrake : undefined}
            label="Emergency Brake"
            placeholder="Emergency brake is"
            value={emergencyBrake !== null ? emergencyBrake : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setEmergencyBrake}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={brakeOverallSummary}
            label="Brake Overall Summary"
            placeholder="Brake overall summary is"
            value={brakeOverallSummary}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={(value) => setBrakeOverallSummary(value)}
          />
          <Button color="success" variant="light" onPress={onOpen} className="mt-4">
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

export default BrakeCard;