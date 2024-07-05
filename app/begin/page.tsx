"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { title } from "@/components/primitives";
import ProgressSteps from "@/components/ProgressSteps";

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export default function BeginPage() {
  const [name, setName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [vehicleID, setVehicleID] = useState("");
  const [truckModel, setTruckModel] = useState("");
  const [inspectorName, setInspectorName] = useState("");
  const [serviceHours, setServiceHours] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [redirect, setRedirect] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position: any) {
      console.log("calling the function")
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      setCoordinates({ latitude, longitude });

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  };

  const PageTitle = () => {
    return (
      <div className="relative pt-5">
        <h1 className={title({ size: "lg" })}>
          Begin your&nbsp;
          <span className={title({ size: "lg", color: "yellow" })}>
            inspection&nbsp;
          </span>
        </h1>
      </div>
    );
  };

  const InitContent = () => {
    return (
      <div className="gap-5">
        <Input
          isClearable
          isRequired
          className="max-w-lg p-2"
          label="Inspector ID"
          placeholder="Enter your Inspector ID"
          value={name}
          variant="bordered"
          onClear={() => console.log("input cleared")}
          onValueChange={setName}
        />
        <Input
          isClearable
          isRequired
          className="max-w-lg p-2"
          label="Customer ID"
          placeholder="Enter your Customer ID"
          value={customerID}
          variant="bordered"
          onClear={() => console.log("input cleared")}
          onValueChange={setCustomerID}
        />
        <Input
          isClearable
          isRequired
          className="max-w-lg p-2"
          label="Vehicle ID"
          placeholder="Enter your Vehicle ID"
          value={vehicleID}
          variant="bordered"
          onClear={() => console.log("input cleared")}
          onValueChange={setVehicleID}
        />
        <Button
          className="max-w-lg p-5 m-5 "
          color="warning"
          variant="solid"
          onClick={handleProceedClick}
        >
          Proceed
        </Button>
      </div>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleProceedClick = async () => {
    try {
      // const response = await axios.get(
      //   process.env.BASE_URL + "fetchCustomerData",
      // );

      // setCustomerName(response.data.customerName);
      // setTruckModel(response.data.truckModel);
      // setInspectorName(response.data.inspectorName);
      getLocation();
      onOpen();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNextStage = async () => {
    try {
      const response = await axios.post(
        process.env.BASE_URL + "startInspection",
        {
          inspectorID: name,
          customerID: customerID,
          vehicleID: vehicleID,
          serviceHours: serviceHours,
          timestamp: new Date().toISOString(),
        },
      );

      setRedirect(response.data.redirect);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div>
        <ProgressSteps stage={1} />
        <PageTitle />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 pt-10">
        <InitContent />
      </div>
      <Modal
        backdrop="blur"
        className="flex justify-center items-center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Inspection Start Details
          </ModalHeader>
          <ModalBody className="flex justify-center items-center">
            <Input
              isReadOnly
              isRequired
              className="w-lg p-2"
              label="Inspector ID"
              value={name}
              variant="bordered"
            />
            <Input
              isReadOnly
              isRequired
              className="w-lg p-2"
              label="Inspector Name"
              value={inspectorName}
              variant="bordered"
            />
            <Input
              isReadOnly
              isRequired
              className="w-lg p-2"
              label="Customer ID"
              value={customerID}
              variant="bordered"
            />
            <Input
              isReadOnly
              isRequired
              className="w-lg p-2"
              label="Customer Name"
              value={customerName}
              variant="bordered"
            />
            <Input
              isReadOnly
              isRequired
              className="w-lg p-2"
              label="Vehicle ID"
              value={vehicleID}
              variant="bordered"
            />
            <Input
              isReadOnly
              isRequired
              className="w-lg p-2"
              label="Vehicle Model"
              value={truckModel}
              variant="bordered"
            />
            <Input
              isReadOnly
              isRequired
              className="w-lg p-2"
              defaultValue={
                coordinates.latitude !== null
                  ? coordinates.latitude.toString()
                  : ""
              }
              label="Latitude"
              variant="bordered"
            />
            <Input
              isReadOnly
              isRequired
              className="w-lg p-2"
              defaultValue={
                coordinates.longitude !== null
                  ? coordinates.longitude.toString()
                  : ""
              }
              label="Longitude"
              variant="bordered"
            />
            <Input
              isClearable
              isRequired
              className="w-lg p-2"
              label="Service Hours"
              placeholder="Enter the service hours"
              value={serviceHours}
              variant="bordered"
              onClear={() => console.log("input cleared")}
              onValueChange={setServiceHours}
            />
          </ModalBody>
          <ModalFooter>
            <Link
              isBlock
              color="success"
              underline="hover"
              onClick={handleNextStage}
            >
              Proceed to next stage
            </Link>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
