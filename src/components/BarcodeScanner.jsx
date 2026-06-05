import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
   

    async function iniciarCamera() {
      try {
         const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        const backCamera =
        devices.find(d =>
          d.label.toLowerCase().includes("back")
        ) || devices[0];

        let controls;
    
        controls = await reader.decodeFromVideoDevice(
          backCamera.deviceId,
          videoRef.current,
          callback
        );
      } catch (err) {
        console.error("Erro ao acessar câmera:", err);
      }
    }

    iniciarCamera();

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [onScan]);

  return (
    <video
      ref={videoRef}
      style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "10px",
      }}
    />
  );
}