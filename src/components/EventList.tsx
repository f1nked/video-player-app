import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentTime } from "../store/reducer";

interface Event {
  timestamp: number;
  duration: number;
}

interface EventListProps {
  events: Event[];
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const milliseconds = Math.floor((time % 1) * 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
};

const EventList: React.FC<EventListProps> = ({ events }) => {
  const dispatch = useDispatch();

  return (
    <ul>
      {events
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((event, index) => (
          <li key={index} onClick={() => dispatch(setCurrentTime(event.timestamp))}>
            {formatTime(event.timestamp)}
          </li>
        ))}
    </ul>
  );
};

export default EventList;
