import React from "react";
import ReserveVisitOptionTile from "./ReserveVisitOptionTile";
import { motion } from "framer-motion";

const ReserveVisitDateTile = (props) => {
  return (
    <motion.div
      whileInView={{ y: [100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, delay: 0.05 }}
      style={{ opacity: 0 }}
    >
      <ReserveVisitOptionTile
        title={"Choose date"}
        imgUrl={"/images/others/clock-image.png"}
        imgAlt={"clock-image-tile"}
        redirectUrl={""}
        optionFunc={props.optionFunc}
        option={"date"}
      />
    </motion.div>
  );
};

export default ReserveVisitDateTile;