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
import CameraComponent from "./CameraComponent"; // Assuming you have a CameraComponent

interface ExteriorCardProps {
  placement: string;
  text: string;
  setText: (text: string) => void;
  setImage: (image: string | null) => void;
  setData: (data: {
    rustOrDamage: boolean;
    damageExplanation: string;
    oilLeakSuspension: boolean;
    overallSummary: string;
  }) => void;
}

const ExteriorCard: React.FC<ExteriorCardProps> = ({
  placement,
  text,
  setText,
  setImage,
  setData,
}) => {
  const [rustOrDamage, setRustOrDamage] = useState<boolean>(false);
  const [damageExplanation, setDamageExplanation] = useState<string>("");
  const [oilLeakSuspension, setOilLeakSuspension] = useState<boolean>(false);
  const [overallSummary, setOverallSummary] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    function extractRustOrDamage(text: string): boolean {
      const regex = /rust\s*,\s*dent\s*or\s*damage\s*to\s*exterior\s*:\s*(y|yes)\s*\/\s*(n|no)/i;
      const match = regex.exec(text);
      return match ? match[1].toLowerCase() === "y" : false;
    }

    function extractDamageExplanation(text: string): string {
      const regex = /explain\s*in\s*notes\s*and\s*attach\s*images\s*:\s*(.*)/i;
      const match = regex.exec(text);
      return match ? match[1].trim() : "";
    }

    function extractOilLeakSuspension(text: string): boolean {
      const regex = /oil\s*leak\s*in\s*suspension\s*\(y\/n\)/i;
      const match = regex.exec(text);
      return match ? match[1].toLowerCase() === "y" : false;
    }

    if (text) {
      const rustOrDamage = extractRustOrDamage(text);
      const damageExplanation = extractDamageExplanation(text);
      const oilLeakSuspension = extractOilLeakSuspension(text);

      setRustOrDamage(rustOrDamage);
      setDamageExplanation(damageExplanation);
      setOilLeakSuspension(oilLeakSuspension);

      setData({
        rustOrDamage,
        damageExplanation,
        oilLeakSuspension,
        overallSummary,
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
            defaultValue={rustOrDamage ? "Y" : "N"}
            label="Rust, Dent or Damage to Exterior: Y/N"
            placeholder="Rust, Dent or Damage to Exterior: Y/N"
            value={rustOrDamage ? "Y" : "N"}
            variant="bordered"
            onClear={() => setRustOrDamage(false)}
            onValueChange={(value) => setRustOrDamage(value === "Y")}
          />
          {rustOrDamage && (
            <Input
              isClearable
              className="max-w-lg p-2"
              defaultValue={damageExplanation}
              label="Explanation and Images"
              placeholder="Explain in notes and attach images"
              value={damageExplanation}
              variant="bordered"
              onClear={() => setDamageExplanation("")}
              onValueChange={setDamageExplanation}
            />
          )}
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={oilLeakSuspension ? "Y" : "N"}
            label="Oil leak in Suspension (Y/N)"
            placeholder="Oil leak in Suspension (Y/N)"
            value={oilLeakSuspension ? "Y" : "N"}
            variant="bordered"
            onClear={() => setOilLeakSuspension(false)}
            onValueChange={(value) => setOilLeakSuspension(value === "Y")}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={overallSummary}
            label="Overall Summary (1000 Character Notes)"
            placeholder="Overall Summary (1000 Character Notes)"
            value={overallSummary}
            variant="bordered"
            onClear={() => setOverallSummary("")}
            onValueChange={setOverallSummary}
            maxLength={1000}
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
          <ModalHeader className="flex flex-col gap-1">Image Capture</ModalHeader>
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

export default ExteriorCard;