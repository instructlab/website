'use client';

import { useEffect, useRef } from 'react';
import Terminal from 'react-animated-term';
import 'react-animated-term/dist/react-animated-term.css';
import styles from './AnimatedTerminal.module.scss';
import { motion, useInView } from 'framer-motion';
import init from './animations/init';
import useLoop from '../../hooks/useLoop';
import serve from './animations/serve';
import chat from './animations/chat';

const defaultTerminal = [{ text: '', cmd: true } as object];

const animations = [
  { value: defaultTerminal, duration: 1000 },
  { value: init, duration: 6000 },
  { value: serve, duration: 4000 },
  { value: chat, duration: 6000 },
];

const AnimatedTerminal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const {
    start: startLoop,
    stop: stopLoop,
    value: animation,
  } = useLoop(animations, animations[0]);

  useEffect(() => {
    if (inView) {
      startLoop();
    }
    return () => stopLoop();
  }, [inView, startLoop, stopLoop]);

  return (
    <motion.div
      ref={ref}
      className={styles.term}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Terminal key={animation} lines={animation} interval={40} />
    </motion.div>
  );
};

export default AnimatedTerminal;
