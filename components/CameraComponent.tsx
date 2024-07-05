"use client";
import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { Camera, CameraType } from "./Camera";

const Wrapper = tw.div`
  fixed
  inset-0
  flex
  items-center
  justify-center
  z-10
  p-10
  m-10
  overflow-hidden
`;

const ContentWrapper = tw.div`
  relative
  flex
  flex-col
  items-center
  justify-center
  w-full
  h-full
`;

const Control = tw.div`
  absolute
  bottom-0
  left-0
  right-0
  flex
  justify-center
  p-4
  bg-black
  bg-opacity-80
`;

const Button = tw.button`
  outline-none
  text-white
  opacity-100
  bg-transparent
  bg-black
  bg-no-repeat
  bg-center
  bg-cover
  cursor-pointer
  filter
  invert-100
  border-none
  hover:opacity-70
`;

const TakePhotoButton = tw(Button)`
  w-20
  h-20
  border-4
  border-black
  rounded-full
  hover:bg-opacity-30
`;

const TorchButton = tw(Button)`
  w-20
  h-20
  border-4
  border-black
  rounded-full
  hover:bg-opacity-30
`;

const ChangeFacingCameraButton = tw(Button)`
  w-20
  h-20
  border-4
  border-black
  rounded-full
  hover:bg-opacity-30
`;

const ImagePreviewWrapper = tw.div`
  absolute
  flex
  items-center
  justify-center
  w-full
  h-full
  top-0
  left-0
`;

const ImagePreview = tw.div`
  w-4/5
  h-4/5 
  bg-cover
  bg-center
  bg-no-repeat
  border-4
  border-black
  shadow-lg
`;

interface CameraComponentProps {
  setImage: (image: string | null) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ setImage }) => {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const camera = useRef<CameraType>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(
    undefined
  );
  const [torchToggled, setTorchToggled] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        setDevices(videoDevices);
      } catch (error) {
        console.error("Error enumerating devices:", error);
      }
    })();
  }, []);

  const handleTakePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      console.log(photo);
      setPreviewImage(photo as string);
      setImage(photo as string);
      setShowImage(true);
    }
  };

  const handleConfirmImage = () => {
    setShowImage(false);
  };

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Camera
            ref={camera}
            aspectRatio="cover"
            errorMessages={{
              noCameraAccessible:
                "No camera device accessible. Please connect your camera or try a different browser.",
              permissionDenied:
                "Permission denied. Please refresh and give camera permission.",
              switchCamera:
                "It is not possible to switch camera to a different one because there is only one video device accessible.",
              canvas: "Canvas is not supported.",
            }}
            facingMode="environment"
            numberOfCamerasCallback={(count) => setNumberOfCameras(count)}
            videoReadyCallback={() => console.log("Video feed ready.")}
            videoSourceDeviceId={activeDeviceId}
          />
          <Control>
            <TakePhotoButton onClick={handleTakePhoto}>Take Photo</TakePhotoButton>
            <TorchButton
              onClick={() => {
                if (camera.current) {
                  setTorchToggled((prev) => !prev);
                  camera.current.toggleTorch();
                }
              }}
            >
              Toggle Torch
            </TorchButton>
            <ChangeFacingCameraButton
              disabled={numberOfCameras <= 1}
              onClick={() => {
                if (camera.current) {
                  const result = camera.current.switchCamera();
                  console.log(result);
                }
              }}
            >
              Change Camera
            </ChangeFacingCameraButton>
          </Control>
        </ContentWrapper>
        {showImage && (
          <ImagePreviewWrapper onClick={handleConfirmImage}>
            <ImagePreview style={{ backgroundImage: `url(${previewImage})` }} />
          </ImagePreviewWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default CameraComponent;