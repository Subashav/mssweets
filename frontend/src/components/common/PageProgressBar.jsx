import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(45);

    const timer1 = setTimeout(() => {
      setProgress(85);
    }, 60);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 140);

    const timer3 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 280);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] pointer-events-none overflow-hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-[#AE8037] via-[#D9B66F] to-[#F8F2E8] shadow-[0_0_8px_rgba(217,182,111,0.8)] transition-all ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transitionProperty: "width, opacity",
          transitionDuration: progress === 100 ? "180ms" : "220ms"
        }}
      />
    </div>
  );
}
