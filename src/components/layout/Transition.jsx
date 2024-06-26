import { motion } from "framer-motion";
import React from "react";

const Transition = (Page) => {
  // eslint-disable-next-line react/display-name
  return (props) => (
    <motion.div
      // transition={{
      //   type: "spring",
      //   duration: 1,
      //   bounce: 0.2,
      // }}
      initial={{
        opacity: 0,
        x: -100,
      }}
      animate={{
        opacity: 1,
        x: 0,

        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.2,
        },
      }}
      exit={{
        opacity: 0,
        x: 100,
        transition: {
          type: "spring",
          duration: 0.5,
          bounce: 0.1,
        },
      }}
    >
      <Page {...props} />
      <motion.div></motion.div>
    </motion.div>
  );
};

export default Transition;
