import { useState } from "react";
import Tilt from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../../styles";
import { members } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant } from "../../utils/motion";

const MemberCard = ({ index, name, image, role, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const handleFlip = () => {
    setIsFlipping(true);
    setIsFlipped(!isFlipped);
  };
  const flipFront = () => {
    setIsFlipping(true);
    setIsFlipped(false);
  };
  const flipBack = () => {
    setIsFlipping(true);
    setIsFlipped(true);
  };
  return (
    <div>
      <Tilt className="xs:w-[250px] w-full">
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => setIsFlipping(false)}
          className=" transform-preserve-3d"
        >
          <motion.div
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card select-none"
          >
            <button
              onClick={handleFlip}
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="bg-tertiary w-full rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
            >
              <AnimatePresence initial={false}>
                {isFlipping ? (
                  <></>
                ) : !isFlipped ? (
                  // Front
                  <>
                    <img
                      src={image}
                      alt="member"
                      className="w-40 h-40 object-contain"
                    />

                    <h3 className="text-white text-[14px] font-bold text-center">
                      {name}
                    </h3>
                    <h4 className="text-white text-[12px] text-center">
                      {role}
                    </h4>
                  </>
                ) : (
                  // Back
                  <>
                    <h4 className=" text-white text-[12px] text-center rotate-y-180">
                      {description}
                    </h4>
                  </>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </motion.div>
      </Tilt>
    </div>
  );
};

//Main function
const About = () => {
  return (
    <div className="select-none">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Us.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Our team has a vỉsion of
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 ">
        {members.map((member, index) => (
          <MemberCard key={member.name} index={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
