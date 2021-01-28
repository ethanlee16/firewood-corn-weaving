import { useEffect, useState } from "react";
import Hls from "hls.js";

import "./FullscreenVideo.css";

type Props = {
  videoId: string;
};

function buildCDNPath(videoId: string): string {
  return `https://d1d9il6x33qc20.cloudfront.net/${videoId}/playlist.m3u8`;
}

const FullscreenVideo: React.FC<Props> = ({ videoId }: Props) => {
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

  return <video className="video" ref={setVideo} controls={false} autoPlay playsInline />;
};

export default FullscreenVideo;
