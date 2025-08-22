import React from "react";
import backgroundImage from "../../../assets/Pattern.webp"


interface IBackground {
  bgBlack?: boolean;
  children: React.ReactNode | React.ReactElement;
}


const Background: React.FC<IBackground> = ({ children, bgBlack = false }) => {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      const MAX_OFFSET = 30;

      setOffset({
        x: -x * MAX_OFFSET,
        y: -y * MAX_OFFSET,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-repeat transition-all duration-200 ease-out"
      style={bgBlack ? { background: '#0a0a0a' } : {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${offset.x}px ${offset.y}px`,
      }}
    >
      {children}
    </div>
  );
};

export default Background;
