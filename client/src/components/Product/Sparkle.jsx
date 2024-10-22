export const Sparkle = ({ children }) => {
  const handleClick = (e) => {
    const sparkleContainer = document.createElement("div");
    sparkleContainer.className = "sparkle-container";
    sparkleContainer.style.left = `${e.clientX}px`;
    sparkleContainer.style.top = `${e.clientY}px`;
    document.body.appendChild(sparkleContainer);

    // Create sparkles
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkleContainer.appendChild(sparkle);

      // Set random position and animation duration
      sparkle.style.left = `${Math.random() * 100}px`;
      sparkle.style.top = `${Math.random() * 100}px`;
      sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`; // Random duration between 0.5s and 1.5s

      // Randomly rotate each sparkle
      sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;
    }

    // Remove the sparkle container after the animation
    setTimeout(() => {
      sparkleContainer.remove();
    }, 1500); // Adjust based on your animation duration
  };

  return (
    <span
      onClick={handleClick}
      className="relative top-2 left-2 max-w-max text-white moving-gradient px-4 py-1.5 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center animate-pulse duration-700 mb-1 glow-vibrant"
      style={{ background: "linear-gradient(270deg, black, teal)" }}
    >
      {children}
    </span>
  );
};
