import type { VideoDetails } from "@/lib/types";

import LikeButton from "../LikeButton";
import styles from "./VideoMeta.module.css";

type VideoMetaProps = {
  video: VideoDetails;
};

const formatDate = (unixSeconds: number): string =>
  unixSeconds
    ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(unixSeconds * 1000))
    : "";

const VideoMeta = ({ video }: VideoMetaProps) => {
  const subParts = [formatDate(video.createdTime)];

  if (video.likesTotal !== null) {
    subParts.push(`${video.likesTotal.toLocaleString()} likes`);
  }

  return (
    <section className={styles.meta}>
      <div className={styles.headRow}>
        <h1 className={styles.title}>{video.title}</h1>
        <LikeButton videoId={video.id} />
      </div>

      <div className={styles.channel}>
        {video.ownerAvatarUrl && (
          <img className={styles.avatar} src={video.ownerAvatarUrl} alt="" width={40} height={40} />
        )}
        <div>
          <p className={styles.channelName}>{video.channelName}</p>
          <p className={styles.sub}>{subParts.filter(Boolean).join(" · ")}</p>
        </div>
      </div>

      {video.description && <p className={styles.description}>{video.description}</p>}
    </section>
  );
};

export default VideoMeta;
