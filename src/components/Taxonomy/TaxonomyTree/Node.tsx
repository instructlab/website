import classNames from 'classnames';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from './Link';
import { FC, ReactNode, RefObject, useRef } from 'react';
import { NODE_DELAY, LINE_DRAW_SPEED } from './TaxonomyTree';

import styles from './TaxonomyTree.module.scss';

const NODE_DRAW_SPEED = 0.5;
const LABEL_DRAW_SPEED = 0.3;
const TIMING_OVERLAP = 0.2;

type NodeProps = {
  children?: (ref: RefObject<HTMLDivElement | null>) => ReactNode;
  className?: string;
  idx: number;
  label?: string;
  left?: number | string;
  parent?: RefObject<HTMLDivElement | null>;
  selected?: boolean;
  top?: number | string;
  width?: number | string;
};

const nodeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  draw: idx => ({
    opacity: 1,
    transition: {
      delay: idx * NODE_DELAY + LINE_DRAW_SPEED - TIMING_OVERLAP,
      duration: NODE_DRAW_SPEED,
    },
  }),
};

const dashedNodeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  draw: idx => ({
    opacity: 1,
    transition: {
      delay: idx * NODE_DELAY + LINE_DRAW_SPEED + TIMING_OVERLAP,
      duration: NODE_DRAW_SPEED,
    },
  }),
};

const nodeBackgroundVariants: Variants = {
  initial: {
    left: '-100%',
  },
  draw: idx => ({
    left: 0,
    transition: {
      delay: idx * NODE_DELAY + LINE_DRAW_SPEED,
      duration: NODE_DRAW_SPEED,
    },
  }),
};

const nodeLabelVariants: Variants = {
  initial: {
    opacity: 0,
  },
  draw: idx => ({
    opacity: 1,
    transition: {
      delay:
        idx * NODE_DELAY + LINE_DRAW_SPEED + NODE_DRAW_SPEED - TIMING_OVERLAP,
      duration: LABEL_DRAW_SPEED,
    },
  }),
};

const typedTextVariants: Variants = {
  initial: {
    opacity: 0,
  },
  draw: ({ nodeIdx, charIdx }) => ({
    opacity: 1,
    transition: {
      delay:
        nodeIdx * NODE_DELAY +
        LINE_DRAW_SPEED +
        NODE_DRAW_SPEED +
        0.12 * charIdx +
        Math.random() * 0.1,
      duration: 0.01,
    },
  }),
};

export const DashedNode: FC<NodeProps> = ({
  children: renderChildren,
  className,
  idx,
  label,
  left,
  parent,
  top,
  width,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.div
        ref={ref}
        className={classNames(styles.node, className, styles.dashed)}
        style={{ top, left, width }}
        variants={dashedNodeVariants}
        initial="initial"
        animate="draw"
        custom={idx}
      >
        {label
          ? Array.from(label).map((char, i) => (
              <motion.span
                key={i}
                variants={typedTextVariants}
                custom={{ nodeIdx: idx, charIdx: i }}
              >
                {char}
              </motion.span>
            ))
          : null}
      </motion.div>
      {parent ? <Link src={parent} dest={ref} dashed idx={idx} /> : null}
      {renderChildren?.(ref)}
    </>
  );
};

export const Node: FC<NodeProps> = ({
  children: renderChildren,
  className,
  idx,
  label,
  left,
  parent,
  selected,
  top,
  width,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.div
        ref={ref}
        className={classNames(styles.node, className, {
          [styles.selected]: selected,
        })}
        style={{ top, left, width }}
        variants={nodeVariants}
        initial="initial"
        animate="draw"
        custom={idx}
      >
        <motion.div
          className={styles.background}
          variants={nodeBackgroundVariants}
          custom={idx}
        ></motion.div>
        <motion.span variants={nodeLabelVariants} custom={idx}>
          {label}
        </motion.span>
      </motion.div>
      {parent ? (
        <Link
          key={`link_${left}_${top}`}
          src={parent}
          dest={ref}
          selected={selected}
          idx={idx}
        />
      ) : null}
      {renderChildren?.(ref)}
    </>
  );
};
