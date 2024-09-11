import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentTime, togglePlay } from "../store/reducer";

interface EventZone {
  left: number;
  top: number;
  width: number;
  height: number;
}

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.video.isPlaying);
  const events = useSelector((state: RootState) => state.video.events);
  const loading = useSelector((state: RootState) => state.video.loading);

  const [activeZones, setActiveZones] = useState<EventZone[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying && video.paused) {
        video.play().catch((err) => {
          console.error("Ошибка воспроизведения видео:", err);
        });
      } else if (!isPlaying && !video.paused) {
        video.pause();
      }
    }
  }, [isPlaying]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => {
          console.error("Ошибка при попытке воспроизвести видео:", err);
        });
      }
      dispatch(togglePlay());
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentVideoTime = videoRef.current.currentTime;
      dispatch(setCurrentTime(currentVideoTime));

      const active = events
        .filter((event) => currentVideoTime >= event.timestamp && currentVideoTime <= event.timestamp + event.duration)
        .map((event) => event.zone);

      setActiveZones(active);
    }
  };

  const handleEventClick = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      dispatch(setCurrentTime(timestamp));
    }
  };

  const formatTime = (timestamp: number) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    const milliseconds = Math.floor((timestamp % 1) * 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <div style={{ position: "relative", display: "flex", gap: "20px" }}>
      <video
        ref={videoRef}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        onTimeUpdate={handleTimeUpdate}
        onClick={handleVideoClick}
        controls
      />

      {activeZones.map((zone, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            border: "5px solid green",
            left: `${zone.left}px`,
            top: `${zone.top}px`,
            width: `${zone.width}px`,
            height: `${zone.height}px`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div>
        <p style={{ fontWeight: "600" }}>События</p>
        <div
          style={{
            height: "660px",
            overflow: "auto",
            paddingRight: "60px",
          }}>
          {loading ? (
            <p>Загрузка событий...</p>
          ) : (
            <ul>
              {events.map((event, index) => (
                <li key={index} onClick={() => handleEventClick(event.timestamp)} style={{ cursor: "pointer" }}>
                  {formatTime(event.timestamp)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
