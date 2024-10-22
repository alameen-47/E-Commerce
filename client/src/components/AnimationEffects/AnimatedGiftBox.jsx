import { useSpring, animated } from "@react-spring/web";

const AnimatedGiftBox = ({ children }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={props}>
      {/* 🎁 */}
      {children}
    </animated.div>
  );
};

export default AnimatedGiftBox;
