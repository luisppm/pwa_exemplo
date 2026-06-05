import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;
    let interval;
    let zxingControls;

    async function iniciarScanner() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
          },
        });

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Tenta usar a API nativa
        if ("BarcodeDetector" in window) {
          console.log("Usando Barcode Detection API");

          const detector = new BarcodeDetector({
            formats: [
              "ean_13",
              "ean_8",
              "upc_a",
              "upc_e",
              "code_128",
              "code_39",
              "qr_code",
            ],
          });

          interval = setInterval(async () => {
            try {
              const barcodes = await detector.detect(videoRef.current);

              if (barcodes.length > 0) {
                onScan(barcodes[0].rawValue);
              }
            } catch (err) {
              console.error(err);
            }
          }, 500);
        } else {
          console.log("Usando ZXing");

          const reader = new BrowserMultiFormatReader();

          zxingControls = await reader.decodeFromVideoDevice(
            undefined,
            videoRef.current,
            (result) => {
              if (result) {
                onScan(result.getText());
              }
            }
          );
        }
      } catch (err) {
        console.error("Erro ao acessar câmera:", err);
      }
    }

    iniciarScanner();

    return () => {
      if (interval) {
        clearInterval(interval);
      }

      if (zxingControls) {
        zxingControls.stop();
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onScan]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "12px",
      }}
    />
  );
}