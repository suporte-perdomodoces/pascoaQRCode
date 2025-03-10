import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UseApi } from "../Hooks/UseApi";
import Container from "../components/Container";
import UserView from "../components/UserView";


const postApi = new UseApi().postApi

export default function View() {
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [orientation, setOrientation] = useState('video-horizontal');
  const location = useLocation(); // Mover para fora da função assíncrona

  useEffect(() => {
    const getFile = async () => {
      const queryParams = new URLSearchParams(location.search);
      const queryValue = queryParams.keys().next().value;

      console.log("query", queryParams)

      
      if (!queryValue) {
        return;
      }
      
      const extensionFileName = queryValue.split(".")[1]

      console.log(extensionFileName)

      const res = await postApi.getPost(queryValue);

      const blob = new Blob([res], { type: `video/.${extensionFileName}` });

      const url = URL.createObjectURL(blob);

      setVideoURL(url);
    };

    getFile();
  }, [location]); // Dependência para garantir que o hook seja chamado quando a location mudar

  useEffect(() => {
    const videos = document.querySelectorAll('video'); 
  
    const updateOrientation = (video: HTMLVideoElement, setOrientation: (orientation: string) => void) => {
      setOrientation(video.videoWidth > video.videoHeight ? 'video-horizontal' : 'video-vertical');
    };
  
    const videoListeners: (() => void)[] = []; 

    for (const video of videos) {
      const orientationUpdater = () => updateOrientation(video, setOrientation);
  
      video.addEventListener('loadedmetadata', orientationUpdater);
      video.addEventListener('resize', orientationUpdater);
  
      videoListeners.push(() => {
        video.removeEventListener('loadedmetadata', orientationUpdater);
        video.removeEventListener('resize', orientationUpdater);
      });
    }
  
    return () => {
      for (const cleanup of videoListeners) cleanup();
    };
  }, []); 

  return (
    <Container className="container_03">
      {videoURL ? (
        <UserView videoURL={videoURL} className={orientation} />
      ) : (
        <p>Carregando vídeo...</p>
      )}
    </Container>
  );
}
