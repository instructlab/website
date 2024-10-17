import { useWindowSize } from '@react-hookz/web';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DebugAnimationContext from './utils/DebugAnimationContext';
import InfographicAnimation, {
  InfographicAnimationProps,
} from './InfographicAnimation';
import classNames from 'classnames';

import styles from './Slideshow.module.scss';

const DEBUG_ANIMATIONS = false;

const steps = [
  {
    animationSize: 400,
    animationName: 'detect-gap',
    description: (
      <>
        InstructLab can augment models through <strong>skills recipes</strong>{' '}
        used to generate synthetic data for tuning. Experiments can be run
        locally on quantized version of these models.
      </>
    ),
  },
  {
    animationSize: 450,
    animationName: 'taxonomy',
    description: (
      <>
        Skills recipes take the form of example inputs / outputs for a desired
        skill. These skills are organized in a structured{' '}
        <strong>taxonomy</strong> and anyone can contribute to it.
      </>
    ),
  },
  {
    animationSize: 320,
    animationName: 'synthetic-data',
    description: (
      <>
        InstructLab uses the skills recipes to systematically generate new{' '}
        <strong>synthetic data</strong>.
      </>
    ),
  },
  {
    animationSize: 400,
    animationName: 'fine-tune',
    description: (
      <>
        The InstructLab base model is re-tuned using all synthetic data
        generated to date. This includes any new contributions, which introduce{' '}
        <strong>new skills</strong>.
      </>
    ),
  },
];

const SLIDE_HEIGHT = 800;

const Slideshow = () => {
  const slidesLength = 4;
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const { scrollYProgress } = useScroll({ target: wrapperRef });

  const slideNumber = useTransform(() => {
    const result = Math.floor(scrollYProgress.get() * slidesLength);
    return result === slidesLength ? result - 1 : result;
  });

  // DEBUG_ANIMATIONS
  const debugSlideProgress = useTransform(
    () => (scrollYProgress.get() * slidesLength) % 1,
  );

  const wrapperHeight = useMemo(
    () => slidesLength * SLIDE_HEIGHT,
    [slidesLength],
  );

  const scrollStart = useRef(0);
  const scrollEnd = useRef(0);

  useEffect(() => {
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    if (!wrapperRect) {
      return;
    }

    scrollStart.current = window.scrollY + wrapperRect.top;
    scrollEnd.current = scrollStart.current + wrapperHeight - windowHeight;

    if (window.scrollY > scrollStart.current && scrollYProgress.get() === 0) {
      window.scrollTo({ top: scrollStart.current });
    } else if (
      window.scrollY < scrollStart.current &&
      scrollYProgress.get() > 0
    ) {
      scrollYProgress.set(0);
    }
  }, [scrollYProgress, windowHeight, windowWidth, wrapperHeight]);

  const scrollToSlide = useCallback((idx: number) => {
    if (!scrollStart.current || !scrollEnd.current) return;
    const scrollHeightPerSlide =
      (scrollEnd.current - scrollStart.current) / slidesLength;
    const slidePosition = Math.ceil(
      scrollStart.current + scrollHeightPerSlide * idx,
    );
    window.scrollTo({ top: slidePosition, behavior: 'instant' });
  }, []);

  const switchSlide = useCallback(
    (idx: number) => {
      if (currentSlide !== idx) {
        setCurrentSlide(idx);
      }
    },
    [currentSlide],
  );

  useMotionValueEvent(slideNumber, 'change', idx => {
    switchSlide(idx);
  });

  return (
    <DebugAnimationContext.Provider value={DEBUG_ANIMATIONS}>
      <div
        className={styles.slideshowWrapper}
        style={{ height: `${wrapperHeight}px` }}
        ref={wrapperRef}
      >
        {DEBUG_ANIMATIONS ? (
          <motion.div
            className={styles.debugProgressBar}
            style={{
              scaleX: debugSlideProgress,
            }}
          />
        ) : null}

        <div className={styles.slideshow}>
          <h2>How it works</h2>
          <div className={styles.slideshow__slides}>
            <div className={styles.cardWrapper}>
              {steps.map((d, i) => (
                <button
                  key={`howitworks_${i}`}
                  className={classNames(styles.stepWrapper, styles.column, {
                    [styles.active]: currentSlide === i,
                  })}
                  onClick={() => scrollToSlide(i)}
                >
                  <div className={styles.animWrapper}>
                    <InfographicAnimation
                      size={d.animationSize}
                      kind={
                        d.animationName as InfographicAnimationProps['kind']
                      }
                      isOn={currentSlide === i}
                    />
                  </div>

                  <div className={styles.footer}>
                    <div className={styles.order}>{Number(i) + 1}</div>
                    <div className={styles.description}>{d.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DebugAnimationContext.Provider>
  );
};

export default memo(Slideshow);
