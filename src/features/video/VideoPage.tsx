import { Link, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";

import VideoMeta from "./components/VideoMeta";
import VideoPlayer from "./components/VideoPlayer";
import { useVideo } from "./useVideo";
import styles from "./VideoPage.module.css";

const VideoPage = () => {
  const { id = "" } = useParams();
  const { data: video, isLoading, isError, refetch } = useVideo(id);

  return (
    <main className={`container ${styles.videoPageContainer}`}>
      <Link to="/" className={styles.back}>
        ← Back to browse
      </Link>

      {isLoading && <Spinner />}
      {isError && (
        <EmptyState
          message="This video couldn’t be loaded. It may be private or unavailable."
          action={
            <Button variant="primary" onClick={() => refetch()}>
              Try again
            </Button>
          }
        />
      )}
      {video && (
        <article>
          <VideoPlayer embedUrl={video.embedUrl} title={video.title} />
          <VideoMeta video={video} />
        </article>
      )}
    </main>
  );
};

export default VideoPage;
