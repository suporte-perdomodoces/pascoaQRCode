import { useState, useEffect } from "react";
import Container from "../components/Container";
import UserView from "../components/UserView";

export default function View() {
  const [videoURL, setVideoURL] = useState<string |null>(null);
  const [videoId, setVideoId] = useState<string |null>(null);
  const [orientation, setOrientation] = useState('video-horizontal');

  useEffect(() => {
    const fetchVideoData = async () => {
      const hash = window.location.hash.substring(1); // Remove o '#' inicial
      if (hash) {
        try {
          const response = await fetch(`/api/video?hash=${hash}`); // Sua API aqui
          if (response.ok) {
            const data = await response.json();
            setVideoId(data.id);
            setVideoURL(`/videos/${data.id}.${data.extension}`); // Sua estrutura de diretórios
          } else {
            console.error("Erro ao buscar dados do vídeo");
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      }
    };

    fetchVideoData();
  }, []);

  useEffect(() => {
    const videos = document.querySelectorAll('video'); 
  
    const updateOrientation = (video: HTMLVideoElement, setOrientation: (orientation: string) => void) => {
      setOrientation(video.videoWidth > video.videoHeight ? 'video-horizontal' : 'video-vertical');
    };
  
    const videoListeners: (() => void)[] = []; 
  
    videos.forEach((video) => {
      const orientationUpdater = () => updateOrientation(video, setOrientation);
  
      video.addEventListener('loadedmetadata', orientationUpdater);
      video.addEventListener('resize', orientationUpdater);
  
      videoListeners.push(() => {
        video.removeEventListener('loadedmetadata', orientationUpdater);
        video.removeEventListener('resize', orientationUpdater);
      });
    });
  
    return () => {
      videoListeners.forEach((cleanup) => cleanup()); 
    };
  }, [setOrientation]); 

  return (
    <Container className="container_03">
      {/* {videoURL ? ( */}
        <UserView videoURL="/video/vertical.mp4" id="1" className={orientation}/>
      {/* ) : (
        <p>Carregando vídeo...</p>
      )} */}
    </Container>
  );
}