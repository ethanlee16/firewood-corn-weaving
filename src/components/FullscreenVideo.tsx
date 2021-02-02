import React, { useEffect, useState } from "react";
import Hls from "hls.js";

import "./FullscreenVideo.css";

type Props = React.PropsWithChildren<{
  videoId: string;
}>;

function buildCDNPath(videoId: string): string {
  return `https://d1d9il6x33qc20.cloudfront.net/${videoId}/playlist.m3u8`;
}

const FullscreenVideo: React.FC<Props> = ({ children, videoId }: Props) => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
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
  }, [video, url]);

  const videoEl = <video className="video" ref={setVideo} controls={false} autoPlay playsInline />;

  return children ? (
    <div className="video-container">
      {videoEl}
      <div className="video-overlay">
        <p>{children}</p>
      </div>
    </div>
  ) : (
    videoEl
  );
};

export default FullscreenVideo;
