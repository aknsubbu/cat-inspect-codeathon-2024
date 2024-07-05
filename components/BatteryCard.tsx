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

interface BatteryCardProps {
  placement: string;
  text: string;
  setText: (text: string) => void;
  setImage: (image: string | null) => void;
  setData: (data: {
    batteryMake: string;
    batteryReplacementDate: string;
    batteryVoltage: string;
    batteryWaterLevel: string;
    batteryCondition: string;
    batteryLeak: string;
    batterySummary: string;
  }) => void;
  [key: string]: any; // Add this line to allow additional props
}

const BatteryCard: React.FC<BatteryCardProps> = ({
  placement,
  text,
  setText,
  setImage,
  setData,
}) => {
  const [batteryMake, setBatteryMake] = useState<string | null>("");
  const [batteryReplacementDate, setBatteryReplacementDate] = useState<string | null>("");
  const [batteryVoltage, setBatteryVoltage] = useState<string | null>("");
  const [batteryWaterLevel, setBatteryWaterLevel] = useState<string | null>("");
  const [batteryCondition, setBatteryCondition] = useState<string | null>("");
  const [batteryLeak, setBatteryLeak] = useState<string | null>("");
  const [batterySummary, setBatterySummary] = useState<string | null>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    function extractBatteryMake(text: string) {
      const regex = /battery\s+make\s+is\s+(\w+)/i;
      const match = regex.exec(text);
      return match ? match[1] : null;
    }

    function extractBatteryReplacementDate(text: string) {
      const regex = /battery\s+replacement\s+date\s+is\s+(\d{2}\/\d{2}\/\d{4})/i;
      const match = regex.exec(text);
      return match ? match[1] : null;
    }

    function extractBatteryVoltage(text: string) {
      const regex = /battery\s+voltage\s+is\s+(\d+V)/i;
      const match = regex.exec(text);
      return match ? match[1] : null;
    }

    function extractBatteryWaterLevel(text: string) {
      const regex = /battery\s+water\s+level\s+is\s+(good|ok|low)/i;
      const match = regex.exec(text);
      return match ? match[1].toLowerCase() : null;
    }

    function extractBatteryCondition(text: string) {
      const regex = /battery\s+condition\s+is\s+(yes|no)/i;
      const match = regex.exec(text);
      return match ? match[1].toLowerCase() : null;
    }

    function extractBatteryLeak(text: string) {
      const regex = /battery\s+leak\s+or\s+rust\s+is\s+(yes|no)/i;
      const match = regex.exec(text);
      return match ? match[1].toLowerCase() : null;
    }

    function extractBatterySummary(text: string) {
      const regex = /battery\s+summary\s+is\s+(.*)/i;
      const match = regex.exec(text);
      return match ? match[1].trim() : null;
    }

    if (text) {
      const batteryMake = extractBatteryMake(text);
      const batteryReplacementDate = extractBatteryReplacementDate(text);
      const batteryVoltage = extractBatteryVoltage(text);
      const batteryWaterLevel = extractBatteryWaterLevel(text);
      const batteryCondition = extractBatteryCondition(text);
      const batteryLeak = extractBatteryLeak(text);
      const batterySummary = extractBatterySummary(text);

      setBatteryMake(batteryMake);
      setBatteryReplacementDate(batteryReplacementDate);
      setBatteryVoltage(batteryVoltage);
      setBatteryWaterLevel(batteryWaterLevel);
      setBatteryCondition(batteryCondition);
      setBatteryLeak(batteryLeak);
      setBatterySummary(batterySummary);

      setData({
        batteryMake: batteryMake ?? "",
        batteryReplacementDate: batteryReplacementDate ?? "",
        batteryVoltage: batteryVoltage ?? "",
        batteryWaterLevel: batteryWaterLevel ?? "",
        batteryCondition: batteryCondition ?? "",
        batteryLeak: batteryLeak ?? "",
        batterySummary: batterySummary ?? "",
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
            defaultValue={batteryMake !== null ? batteryMake : undefined}
            label="Battery Make"
            placeholder="Battery Make"
            value={batteryMake !== null ? batteryMake : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBatteryMake}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={batteryReplacementDate !== null ? batteryReplacementDate : undefined}
            label="Battery Replacement Date"
            placeholder="Battery Replacement Date"
            value={batteryReplacementDate !== null ? batteryReplacementDate : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBatteryReplacementDate}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={batteryVoltage !== null ? batteryVoltage : undefined}
            label="Battery Voltage"
            placeholder="Battery Voltage"
            value={batteryVoltage !== null ? batteryVoltage : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBatteryVoltage}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={batteryWaterLevel !== null ? batteryWaterLevel : undefined}
            label="Battery Water Level"
            placeholder="Battery Water Level"
            value={batteryWaterLevel !== null ? batteryWaterLevel : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBatteryWaterLevel}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={batteryCondition !== null ? batteryCondition : undefined}
            label="Battery Condition"
            placeholder="Battery Condition"
            value={batteryCondition !== null ? batteryCondition : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBatteryCondition}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={batteryLeak !== null ? batteryLeak : undefined}
            label="Battery Leak / Rust"
            placeholder="Battery Leak / Rust"
            value={batteryLeak !== null ? batteryLeak : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBatteryLeak}
          />
          <Input
            isClearable
            isRequired
            className="max-w-lg p-2"
            defaultValue={batterySummary !== null ? batterySummary : undefined}
            label="Battery Overall Summary"
            placeholder="Battery Overall Summary"
            value={batterySummary !== null ? batterySummary : undefined}
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={setBatterySummary}
          />
          <Button
            color="success"
            variant="light"
            onPress={onOpen}
            className="mt-4"
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
            <Link
              isBlock
              color="success"
              underline="hover"
              onClick={onClose}
            >
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

export default BatteryCard;