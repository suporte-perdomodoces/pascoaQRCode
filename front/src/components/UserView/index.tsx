import './UserView.css';

interface UserViewProps {
  videoURL: string;
  className: string;
}

export default function UserView({ videoURL, className }: UserViewProps) {
  return (
    <div className='UserView-container'>
      <img src="/public/image/perdomoLogo.png" alt="Logo P" className='UserView-logo' />
        {/* <video src='/public/video/horizontal.mp4' controls className='video-horizontal'/> */}
        {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
        <video src={videoURL} controls className={className} />
    </div>
  )
}