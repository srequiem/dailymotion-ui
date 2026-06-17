import styles from "./VideoPlayer.module.css";

type VideoPlayerProps = {
  embedUrl: string;
  title: string;
};

const VideoPlayer = ({ embedUrl, title }: VideoPlayerProps) => (
  <div className={styles.frame}>
    <iframe
      src={embedUrl}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
);

export default VideoPlayer;
