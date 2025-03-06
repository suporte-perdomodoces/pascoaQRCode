interface UserViewProps {
    videoURL: string;
    id?: string;
  }
  
  export default function UserView({ videoURL, id }: UserViewProps) {
    return <video src={videoURL} id={id} controls width="640" height="360" />; // Adicionei controls e dimensões
  }