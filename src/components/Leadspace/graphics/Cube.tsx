'use client';

import {
  EasingFunction,
  Variants,
  cubicBezier,
  easeInOut,
  motion,
  useInView,
} from 'framer-motion';
import { useMemo, useRef } from 'react';

import styles from './Cube.module.scss';

type Phase = [number, number, EasingFunction?];

const phaseTransition = ([start, end, easing]: Phase) => ({
  delay: start,
  duration: end - start,
  ease: easing,
});

const Cube = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const inView = useInView(animationRef, { once: true });

  const animationPhases: Record<string, Phase> = useMemo(
    () => ({
      dockingCubesOpacity: [0, 0.2],
      cube3Opacity: [0.8, 1],
      cube1SlideIn: [0, 1.2, cubicBezier(0.35, 0.67, 0.41, 1)],
      cube2SlideIn: [0, 1.3, cubicBezier(0.35, 0.67, 0.41, 1)],
      cube3SlideIn: [0.7, 1.8, cubicBezier(0.35, 0.67, 0.41, 1)],
      showTile: [2, 2.5, easeInOut],
      showShape: [2, 2.5, easeInOut],
      removeTileOutline: [2.1, 2.6, easeInOut],
      removeShapeOutline: [2.2, 2.7, easeInOut],
      straightenTile: [2.7, 3.9, easeInOut],
      straightenShape: [2.8, 3.7, easeInOut],
      moveTileToSpot: [2.7, 4, cubicBezier(0.56, 0.01, 0.45, 0.99)],
      moveShapeToSpot: [2.8, 4, cubicBezier(0.56, 0.01, 0.45, 0.99)],
    }),
    [],
  );

  const cube1Variants: Variants = useMemo(() => {
    const { cube1SlideIn, dockingCubesOpacity } = animationPhases;

    return {
      initial: {
        translateY: '-50vh',
        opacity: 0,
      },
      show: {
        opacity: 1,
        transition: phaseTransition(dockingCubesOpacity),
      },
      dock: {
        translateY: 0,
        transition: phaseTransition(cube1SlideIn),
      },
    };
  }, [animationPhases]);

  const cube2Variants: Variants = useMemo(() => {
    const { cube2SlideIn, dockingCubesOpacity } = animationPhases;

    return {
      initial: {
        translateY: 800,
        opacity: 0,
      },
      show: {
        opacity: 1,
        transition: phaseTransition(dockingCubesOpacity),
      },
      dock: {
        translateY: 0,
        transition: phaseTransition(cube2SlideIn),
      },
    };
  }, [animationPhases]);

  const cube3Variants: Variants = useMemo(() => {
    const {
      cube3Opacity,
      cube3SlideIn,
      showTile,
      removeTileOutline,
      straightenTile,
      moveTileToSpot,
    } = animationPhases;

    return {
      initial: {
        top: '-100vh',
        opacity: 0,
      },
      initialOutline: {
        opacity: 1,
      },
      initialTile: {
        opacity: 0,
        scale: '1, 1',
      },
      show: {
        opacity: 1,
        transition: phaseTransition(cube3Opacity),
      },
      move: {
        top: -313,
        transition: phaseTransition(cube3SlideIn),
      },
      showTile: {
        opacity: 1,
        transition: phaseTransition(showTile),
      },
      removeOutline: {
        opacity: 0,
        transition: phaseTransition(removeTileOutline),
      },
      straighten: {
        scale: '1.0775, 1.86',
        transition: phaseTransition(straightenTile),
      },
      rotate: {
        transform: 'rotate(-105deg) translateX(-7px) translateY(83px)',
        transition: phaseTransition(moveTileToSpot),
      },
    };
  }, [animationPhases]);

  const cubeVariants: Variants = useMemo(() => {
    const { showShape, removeShapeOutline, straightenShape, moveShapeToSpot } =
      animationPhases;
    return {
      initial: {
        opacity: 1,
      },
      initialShape: {
        opacity: 0,
        scale: '1, 1',
      },
      showShape: {
        opacity: 1,
        transition: phaseTransition(showShape),
      },
      removeOutline: {
        opacity: 0,
        transition: phaseTransition(removeShapeOutline),
      },
      straighten: {
        scale: '1.04, 1.8',
        transition: phaseTransition(straightenShape),
      },
      rotate: {
        transform: 'rotate(75deg) translateX(89px) translateY(-41px)',
        transition: phaseTransition(moveShapeToSpot),
      },
    };
  }, [animationPhases]);

  return (
    <div className={styles.cubeWrapper} ref={animationRef}>
      {inView ? (
        <>
          <motion.svg
            width="342"
            height="577"
            viewBox="0 0 342 577"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={cubeVariants}
            initial="initial"
            animate={['rotate']}
          >
            <motion.g
              name="outlines"
              variants={cubeVariants}
              initial="initial"
              animate={['removeOutline']}
            >
              <g name="back">
                <path
                  d="M226.583 216.844L170.052 184.205L113.521 216.844L170.052 249.484L226.583 216.844Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M170.05 314.76L226.581 282.12V216.842L170.05 249.481V314.76Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M57.5806 510.861L114.112 478.222V412.943L57.5806 445.583V510.861Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M57.5799 510.861V445.583L1.04883 412.943V478.222L57.5799 510.861Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M169.87 249.53L113.449 216.891L57.7188 249.5L113.339 282.169L169.87 249.53Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M57.5799 445.492V380.214L1.04883 347.574V412.853L57.5799 445.492Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M114.111 282.212L57.5799 249.572L1.04883 282.212L57.5799 314.851L114.111 282.212Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M57.5799 380.125V314.846L1.04883 282.207V347.486L57.5799 380.125Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
              </g>

              <motion.g
                name="cube2"
                variants={cube2Variants}
                initial="initial"
                animate={['show', 'dock']}
              >
                <path
                  d="M170.711 445.594L114.18 412.955L57.6488 445.594L114.18 478.234L170.711 445.594Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M114.18 543.508L170.711 510.868V445.59L114.18 478.229V543.508Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M114.18 543.508V478.229L57.6488 445.59V510.868L114.18 543.508Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
              </motion.g>

              <motion.g
                name="cube1"
                variants={cube1Variants}
                initial="initial"
                animate={['show', 'dock']}
              >
                <path
                  d="M283.062 249.444L226.531 216.805L170 249.444L226.531 282.084L283.062 249.444Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M226.531 347.358L283.062 314.718V249.44L226.531 282.079V347.358Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M226.531 347.358V282.079L170 249.44V314.718L226.531 347.358Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
              </motion.g>

              <g name="front">
                <path
                  d="M283.556 510.611L340.087 477.972V412.693L283.556 445.332V510.611Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M226.981 543.252L283.512 510.612V445.333L226.981 477.973V543.252Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M283.301 445.295L339.832 412.655V347.376L283.301 380.016V445.295Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M113.831 477.978V412.699L57.3 380.06V445.339L113.831 477.978Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M170.407 575.894L226.938 543.255V477.976L170.407 510.615V575.894Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M170.407 575.894V510.615L113.876 477.976V543.255L170.407 575.894Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M226.981 477.978L283.512 445.339V380.06L226.981 412.699V477.978Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M226.938 412.699L170.407 380.06L113.876 412.699L170.407 445.339L226.938 412.699Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M170.407 510.611L226.938 477.972V412.693L170.407 445.332V510.611Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M170.407 510.611V445.332L113.876 412.693V477.972L170.407 510.611Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M339.831 282.189L283.3 249.55L226.769 282.189L283.3 314.829L339.831 282.189Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M283.301 380.105L339.832 347.466V282.187L283.301 314.826V380.105Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M226.403 282.189L169.872 249.55L113.341 282.189L169.872 314.829L226.403 282.189Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M283.121 314.871L226.59 282.232L170.059 314.871L226.59 347.511L283.121 314.871Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M226.59 412.785L283.122 380.145V314.867L226.59 347.506V412.785Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M226.59 412.785V347.506L170.059 314.867V380.145L226.59 412.785Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M170.644 314.871L114.113 282.232L57.5813 314.871L114.113 347.511L170.644 314.871Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M114.113 412.785L170.644 380.145V314.867L114.113 347.506V412.785Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M114.113 412.785V347.506L57.5813 314.867V380.145L114.113 412.785Z"
                  fill="black"
                  stroke="white"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
              </g>
            </motion.g>

            <motion.g
              name="topShape"
              variants={cubeVariants}
              initial="initialShape"
              animate={['showShape', 'straighten']}
            >
              <path
                d="M170.049 184.2L339.829 282.18L226.589 347.51L170.359 315.04L114.119 347.51L1.04883 282.21L170.049 184.2Z"
                fill="white"
                stroke="white"
                strokeLinejoin="round"
              />
            </motion.g>
          </motion.svg>

          <motion.svg
            width="341"
            height="132"
            viewBox="0 0 341 132"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={cube3Variants}
            initial="initial"
            animate={['show', 'move', 'rotate']}
            style={{ transformOrigin: '164px 601px' }}
          >
            <motion.g
              variants={cube3Variants}
              initial="initialOutline"
              animate={['showOutline', 'removeOutline']}
            >
              <path
                d="M227.062 347.639L170.531 315L114 347.639L170.531 380.279L227.062 347.639Z"
                fill="black"
                stroke="white"
                strokeMiterlimit="10"
                strokeLinejoin="round"
              />
              <path
                d="M170.531 445.553L227.062 412.913V347.635L170.531 380.274V445.553Z"
                fill="black"
                stroke="white"
                strokeMiterlimit="10"
                strokeLinejoin="round"
              />
              <path
                d="M170.531 445.553V380.274L114 347.635V412.913L170.531 445.553Z"
                fill="black"
                stroke="white"
                strokeMiterlimit="10"
                strokeLinejoin="round"
              />
            </motion.g>

            <motion.path
              d="M227.062 347.639L170.531 315L114 347.639L170.531 380.279L227.062 347.639Z"
              fill="white"
              stroke="white"
              strokeMiterlimit="10"
              strokeLinejoin="round"
              variants={cube3Variants}
              initial="initialTile"
              animate={['showTile', 'straighten']}
            />
          </motion.svg>
        </>
      ) : null}
    </div>
  );
};

export default Cube;
