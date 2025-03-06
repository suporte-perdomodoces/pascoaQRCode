import { useState, useRef, useEffect } from "react";
import "./Recorder.css";
import Button from "../Button";
import Input from "../Input";
import Label from "../Label";

export default function Recorder({ setVideoBlob }: { setVideoBlob: (blob: Blob | null) => void }) {
  const [recording, setRecording] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [showRecordedVideo, setShowRecordedVideo] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const [fileInputDisabled, setFileInputDisabled] = useState(false);
  const [recordButtonDisabled, setRecordButtonDisabled] = useState(false);

  useEffect(() => {
    return () => {
      if (recordedVideoUrl) {
        URL.revokeObjectURL(recordedVideoUrl);
      }
    };
  }, [recordedVideoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setVideoBlob(e.target.files[0]);
      setRecordButtonDisabled(true);
      setShowRecordedVideo(true);
      setRecordedVideoUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setFile(null);
      setVideoBlob(null);
      setRecordButtonDisabled(false);
      setShowRecordedVideo(false);
      setRecordedVideoUrl(null);
    }
  };

  async function startRecording() {
    try {
      if (recordedVideoUrl) {
        URL.revokeObjectURL(recordedVideoUrl);
        setRecordedVideoUrl(null);
      }
      setShowRecordedVideo(false);
      setFile(null);
      setVideoBlob(null);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      mediaRecorder.current = new MediaRecorder(stream);
      recordedChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        setVideoBlob(blob);
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setShowRecordedVideo(true);
        setFileInputDisabled(true); // Desabilita o input de arquivo
      };

      mediaRecorder.current.start();
      setRecording(true);
      setFileInputDisabled(true);
    } catch (error) {
      console.error("Erro ao acessar a câmera/microfone:", error);
    }
  }

  function stopRecording() {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setRecording(false);
    }

    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setFileInputDisabled(false);
  }

  return (
    <div className="recorder">
      <h2>Grave o vídeo do cliente</h2>
      <video
        ref={videoRef}
        className="video"
        autoPlay
        controls={showRecordedVideo}
        src={showRecordedVideo && recordedVideoUrl ? recordedVideoUrl : undefined}
        muted={recording}
      ></video>
      <div className="controls">
        <Label htmlFor="file" className="video-file-label">
          <img src="/image/uploadIcon.png" alt="upload" className="video-icon-upload" />
        </Label>
        <Input
          type="file"
          id="file"
          name="file"
          placeholder=""
          value=""
          r
          onChange={handleFileChange}
          className="video-input-file"
          d={fileInputDisabled}
        />
        <Button
          onClick={recording ? stopRecording : startRecording}
          className="video-button-start"
          d={recordButtonDisabled}
        >
          {recording ? "Parar" : "Gravar"}
        </Button>
      </div>
    </div>
  );
}