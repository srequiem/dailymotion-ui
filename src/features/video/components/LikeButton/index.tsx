import { useLikes } from "../../hooks/useLikes";
import styles from "./LikeButton.module.css";

type LikeButtonProps = {
  videoId: string;
};

const LikeButton = ({ videoId }: LikeButtonProps) => {
  const { isLiked, toggle } = useLikes(videoId);
  const classes = [styles.button, isLiked ? styles.liked : ""].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} onClick={toggle} aria-pressed={isLiked}>
      <svg className={styles.heart} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21s-7.5-4.6-10-9.3C.6 8.4 2.2 5 5.5 5c2 0 3.3 1.1 4.2 2.4C10.6 6.1 12 5 14 5c3.3 0 4.9 3.4 3.5 6.7C19.5 16.4 12 21 12 21z"
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>{isLiked ? "Liked" : "Like"}</span>
    </button>
  );
};

export default LikeButton;
