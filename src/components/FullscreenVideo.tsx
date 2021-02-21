import React, { useEffect, useState } from "react";
import Hls from "hls.js";

import "./FullscreenVideo.css";

type Props = React.PropsWithChildren<{
  className?: string;
  hasSubtitles?: boolean;
  videoId: string;
  onComplete?: () => void;
  onPlay?: () => void;
}>;

function buildCDNPath(videoId: string): string {
  return `https://d1d9il6x33qc20.cloudfront.net/${videoId}/playlist.m3u8`;
}

function buildCaptionPath(videoId: string): string {
  return `https://weather-bodies-assets.s3-us-west-1.amazonaws.com/${videoId}/subtitles_new.vtt`;
}

const FullscreenVideo: React.FC<Props> = ({
  children,
  className,
  hasSubtitles,
  videoId,
  onComplete,
  onPlay,
}: Props) => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [videoNotPlaying, setVideoNotPlaying] = useState(false);

  const url = buildCDNPath(videoId);
  useEffect(() => {
    if (video) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      }
    }
    const checkForPlayback = setInterval(() => {
      if (video && video.paused && !video.ended) {
        setVideoNotPlaying(true);
      } else {
        setVideoNotPlaying(false);
      }
    }, 3000);

    return () => {
      clearInterval(checkForPlayback);
    };
  }, [video, url]);

  useEffect(() => {
    if (video && onComplete) {
      video.addEventListener("ended", onComplete);
      return () => {
        video.removeEventListener("ended", onComplete);
      };
    }
  }, [video, onComplete]);

  const videoEl = (
    <video
      className={`video ${className ?? ""}`}
      ref={setVideo}
      controls={false}
      autoPlay
      playsInline
      crossOrigin="anonymous"
      onPlay={onPlay}
    >
      {hasSubtitles ? (
        <track default kind="captions" srcLang="en" src={buildCaptionPath(videoId)} />
      ) : (
        <></>
      )}
    </video>
  );

  return (
    <div className="video-container">
      {videoEl}
      {children && (
        <div className="video-overlay">
          <p>{children}</p>
        </div>
      )}
      {videoNotPlaying && (
        <button
          className="force-playback"
          onClick={() => {
            video?.play();
            setVideoNotPlaying(false);
          }}
        >
          ▶️
        </button>
      )}
      <button
        style={{ position: "fixed", right: 0, top: 0, opacity: 0 }}
        onClick={() => {
          window.confirm("Are you sure you want to skip?") && onComplete?.();
        }}
      >
        Skip
      </button>
    </div>
  );
};

export default FullscreenVideo;
