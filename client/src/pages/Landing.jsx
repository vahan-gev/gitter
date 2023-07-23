import React from 'react'
import state from '../store';
import { useSnapshot } from 'valtio';
import Header from '../components/Header/Header';
import {slideAnimation, headTextAnimation} from "../config/motion"
import {motion, AnimatePresence} from 'framer-motion'
function Landing() {
    const snap = useSnapshot(state);
    const MotionHeader = motion(Header);
  return (
    <AnimatePresence>
        <motion.section>
        {snap.intro && (
            <motion.div {...headTextAnimation}>
            <h1 className="head-text">
              LET'S <br className="xl:block hidden" /> DO IT
            </h1>
          </motion.div>
        )}
        </motion.section>
      {/* {snap.isLoggedIn ? <>
        <button onClick={() => {
          state.isLoggedIn = false;
        }}>Logged in</button>
      </> : <>
        <button onClick={() => {
          state.isLoggedIn = true;
        }}>Not logged in</button>
      </>} */}
    </AnimatePresence>
  )
}

export default Landing