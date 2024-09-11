import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsRequest } from "./store/reducer";
import VideoPlayer from "./components/VideoPlayer";
import { RootState } from "./store";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.video.loading);
  const error = useSelector((state: RootState) => state.video.error);

  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, [dispatch]);

  return (
    <div>
      <h1>Видео плеер с событиями</h1>
      {error && <p>Ошибка: {error}</p>}
      <VideoPlayer />
    </div>
  );
};

export default App;
