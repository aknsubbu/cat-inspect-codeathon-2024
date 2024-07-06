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

import { title } from "@/components/primitives";
import CameraComponent from "@/components/CameraComponent";

interface TireCardProps {
  placement: string;
  text: string;
  setText: (text: string) => void;
  setImage: (image: string | null) => void;
  setData: (data: {
    tirePressure: string;
    tireCondition: string;
    inspectorNotes: string;
  }) => void;
  [key: string]: any; // Add this line to allow additional props
}

const TireCard: React.FC<TireCardProps> = ({
  placement,
  text,
  setText,
  setImage,
  setData,
}) => {
  const [tirePressure, setTirePressure] = useState<string | null>("");
  const [tireCondition, setTireCondition] = useState<string | null>(null);
  const [inspectorNotes, setInspectorNotes] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    function extractNumberBeforePsi(text: string) {
      const regex = /(\d+)\s*(?=psi|PSI)/i;
      const match = regex.exec(text);

      return match ? parseInt(match[1]) : null;
    }

    function extractTireCondition(text: string) {
      const regex =
        /(?:tyre|tire)\s+condition\s+is\s+(good|bad|ok|needs\s+replacement)/i;
      const match = regex.exec(text);

      return match ? match[1].toLowerCase() : null; // Convert to lower case for consistency
    }

    function extractInspectorNotes(text: string) {
      const regex = /inspector\s+(?:specific\s+)?notes\s+are\s*(.*)/i;
      const match = regex.exec(text);

      return match ? match[1].trim() : null;
    }
    if (text) {
      const tirePressure = extractNumberBeforePsi(text)?.toString() ?? null;
      const tireCondition = extractTireCondition(text);
      const inspectorNotes = extractInspectorNotes(text);

      setTirePressure(tirePressure);
      setTireCondition(tireCondition);
      setInspectorNotes(inspectorNotes);

      setData({
        tirePressure: tirePressure ?? "",
        tireCondition: tireCondition ?? "",
        inspectorNotes: inspectorNotes ?? "",
      });
    }
  }, [text, setData]);

  return (
    <div className="w-full flex justify-center">
      <Card className="w-2/3 p-5 gap-2 m-2">
        <CardHeader>
          <h1 className={title({})}>{placement}</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center">
          <Translator setText={setText} />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={tirePressure !== null ? tirePressure : undefined}
            label="Tire Pressure"
            placeholder="The tire pressure is"
            value={tirePressure !== null ? tirePressure : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setTirePressure}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={tireCondition !== null ? tireCondition : undefined}
            label="Tire Condition"
            placeholder="The tire condition is"
            value={tireCondition !== null ? tireCondition : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setTireCondition}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={inspectorNotes !== null ? inspectorNotes : undefined}
            label="Inspector Specific Notes"
            placeholder="Inspector Specific Notes are"
            value={inspectorNotes !== null ? inspectorNotes : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setInspectorNotes}
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
        className="flex flex-col justify-center items-center w-full h-full"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Image Capture
          </ModalHeader>
          <ModalBody className="flex justify-center items-center max-w-lg max-h-lg">
            <CameraComponent setImage={setImage} />
          </ModalBody>

          <ModalFooter className="w-full">
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

export default TireCard;
