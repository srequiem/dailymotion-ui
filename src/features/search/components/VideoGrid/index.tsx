import type { Video } from "@/lib/types";

import VideoCard from "../VideoCard";

import styles from "./VideoGrid.module.css";

type VideoGridProps = {
  videos: Video[];
};

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <div className={styles.grid}>
      {videos.map((video) => (
        <div key={video.id} className={styles.item}>
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
