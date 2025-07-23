import React, { createContext, useRef } from "react";
const MusicContext = createContext();

function MusicProvider({ children }) {
  const audioRef = useRef(null);

  const playMusic = () => {
    if (audioRef.current) {
      console.log("Thử phát nhạc...");
      audioRef.current
        .play()
        .then(() => console.log("Nhạc đang phát"))
        .catch((err) => {
          console.error("Lỗi phát nhạc:", err);
        });
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      console.log("Nhạc đã tạm dừng");
    }
  };

  return (
    <MusicContext.Provider value={{ playMusic, pauseMusic }}>
      {children}
      <audio ref={audioRef} loop>
        <source src="/assets/audio/background.mp3" type="audio/mp3" />
      </audio>
    </MusicContext.Provider>
  );
}

export { MusicContext };
export default MusicProvider;
