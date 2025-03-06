import { useState, useEffect } from "react";
import Container from "../components/Container";
import UserView from "../components/UserView";

export default function View() {
  const [videoURL, setVideoURL] = useState<string |null>(null);
  const [videoId, setVideoId] = useState<string |null>(null);

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

  return (
    <Container className="container_02">
      {videoURL && videoId ? ( // Verifica se ambos videoURL e videoId tem valor antes de renderizar UserView
        <UserView videoURL={videoURL} id={videoId} />
      ) : (
        <p>Carregando vídeo...</p>
      )}
    </Container>
  );
}