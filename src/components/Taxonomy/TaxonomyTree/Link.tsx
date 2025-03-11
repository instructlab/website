import { FC, RefObject, useEffect, useState } from 'react';
import { LINE_DRAW_SPEED, NODE_DELAY } from './TaxonomyTree';
import type { Variants } from 'framer-motion';
import { cubicBezier, motion } from 'framer-motion';
import classNames from 'classnames';

import styles from './TaxonomyTree.module.scss';

const linkVariants: Variants = {
  initial: {
    pathLength: 0,
  },
  initialDashed: {
    opacity: 0,
  },
  draw: idx => ({
    pathLength: 1,
    transition: {
      delay: idx * NODE_DELAY,
      duration: LINE_DRAW_SPEED,
      ease: cubicBezier(0.36, 0.2, 0.35, 0.79),
    },
  }),
  drawDashed: idx => ({
    opacity: 1,
    transition: {
      delay: idx * NODE_DELAY,
      duration: 0.01,
      ease: cubicBezier(0.36, 0.2, 0.35, 0.79),
    },
  }),
};

const dashedLinkVariants: Variants = {
  initial: {
    opacity: 0,
  },
  draw: idx => ({
    opacity: 1,
    transition: {
      delay: idx * NODE_DELAY,
      duration: 0.01,
      ease: cubicBezier(0.36, 0.2, 0.35, 0.79),
    },
  }),
};

const Link: FC<{
  idx?: number;
  src: RefObject<HTMLDivElement | null>;
  dest: RefObject<HTMLDivElement | null>;
  dashed?: boolean;
  selected?: boolean;
}> = ({ src, dest, dashed, selected, idx }) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered || !src.current || !dest?.current) return null;

  const r = 16;

  const x0 = src.current.offsetLeft + src.current.offsetWidth;
  const x2 = dest.current.offsetLeft;
  const x1 = (x0 + x2) / 2;

  const y0 = src.current.offsetTop + src.current.offsetHeight / 2;
  const y1 = dest.current.offsetTop + dest.current.offsetHeight / 2;

  return (
    <svg fill="none" className={styles.link}>
      <motion.path
        className={classNames({
          [styles.dashed]: dashed,
          [styles.selected]: selected,
        })}
        d={
          y1 - y0 >= r
            ? `\
          M${x0} ${y0}\
          H${x1 - r}\
          C${x1 - r / 2} ${y0} ${x1} ${y0 + r / 2} ${x1} ${y0 + r}\
          V${y1 - r}\
          C${x1} ${y1 - r / 2} ${x1 + r / 2} ${y1} ${x1 + r} ${y1}\
          H${x2}`
            : y1 - y0 <= -r
              ? `\
          M${x0} ${y0}\
          H${x1 - r}\
          C${x1 - r / 2} ${y0} ${x1} ${y0 - r / 2} ${x1} ${y0 - r}\
          V${y1 + r}\
          C${x1} ${y1 + r / 2} ${x1 + r / 2} ${y1} ${x1 + r} ${y1}\
          H${x2}`
              : `M${x0} ${y0}H${x2}`
        }
        variants={linkVariants}
        initial="initial"
        animate="draw"
        custom={idx}
      />
      {dashed ? (
        <>
          <motion.path
            d={
              y1 - y0 >= r
                ? `\
          M${x0} ${y0}\
          H${x1 - r}\
          C${x1 - r / 2} ${y0} ${x1} ${y0 + r / 2} ${x1} ${y0 + r}\
          V${y1 - r - 25}`
                : y1 - y0 <= -r
                  ? `\
          M${x0} ${y0}\
          H${x1 - r}\
          C${x1 - r / 2} ${y0} ${x1} ${y0 - r / 2} ${x1} ${y0 - r}\
          V${y1 + r - 25}`
                  : `M${x0} ${y0}H${x2}`
            }
            strokeDasharray={'2 3'}
            stroke="e0e0e0"
            variants={dashedLinkVariants}
            initial="initial"
            animate="draw"
            custom={idx}
          />
          <motion.path
            d={
              y1 - y0 >= r
                ? `\
          M${x1} ${y1 - r - 27}\
          V${y1 - r}\
          C${x1} ${y1 - r / 2} ${x1 + r / 2} ${y1} ${x1 + r} ${y1}\
          H${x2}`
                : y1 - y0 <= -r
                  ? `\
          M${x1} ${y1 + r - 27}\
          V${y1 + r}\
          C${x1} ${y1 + r / 2} ${x1 + r / 2} ${y1} ${x1 + r} ${y1}\
          H${x2}`
                  : `M${x0} ${y0}H${x2}`
            }
            strokeDasharray={'2 3'}
            stroke="white"
          />
        </>
      ) : null}
    </svg>
  );
};

export default Link;
