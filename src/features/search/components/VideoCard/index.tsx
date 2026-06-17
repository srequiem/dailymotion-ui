import { Link } from "react-router-dom";

import type { Video } from "@/lib/types";
import { formatDuration } from "@/lib/formatDuration";

import styles from "./VideoCard.module.css";

type VideoCardProps = {
  video: Video;
};

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link to={`/video/${video.id}`} className={styles.card}>
      <div className={styles.thumb}>
        {video.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt="" loading="lazy" width={320} height={180} />
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
        {video.duration > 0 && (
          <span className={styles.duration}>{formatDuration(video.duration)}</span>
        )}
      </div>
      <h3 className={styles.title}>{video.title}</h3>
      <p className={styles.channel}>{video.channelName}</p>
    </Link>
  );
};

export default VideoCard;
