'use client';

import { cubicBezier, motion, useInView } from 'framer-motion';
import { useCallback, useMemo, useRef, useState } from 'react';

import styles from './ReleaseCycleDiagram.module.scss';
import { useResizeObserver } from '@react-hookz/web';

const ReleaseCycleDiagram = () => {
  const wrapperRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(wrapperRef, { once: true });
  const [baseFontSize, setBaseFontSize] = useState(16);

  useResizeObserver(wrapperRef, entry => {
    setBaseFontSize(entry.contentRect.width / 35);
  });

  const animationPhases: Record<string, [number, number]> = useMemo(
    () => ({
      image1: [0, 0.5],
      line1: [0.3, 1],
      text1: [0.7, 1],
      arrow1: [1, 1.1],
      image2: [1, 1.5],
      line2: [1, 1.7],
      text2: [1.4, 1.7],
      arrow2: [1.7, 1.8],
      image3: [1.7, 2.2],
      line3: [1.7, 2.4],
      text3: [2.1, 2.4],
      arrow3: [2.4, 2.5],
    }),
    [],
  );

  const getLineProps = useCallback(
    (line: number) => {
      const phase = animationPhases[`line${line}`];
      return {
        initial: { pathLength: 0 },
        animate: {
          pathLength: isInView ? 1 : 0,
          transition: {
            delay: phase[0],
            duration: phase[1] - phase[0],
            ease: cubicBezier(0.36, 0.2, 0.35, 0.79),
          },
        },
      };
    },
    [animationPhases, isInView],
  );

  const getAnimationProps = useCallback(
    (name: string) => {
      const phase = animationPhases[name];
      return {
        initial: { opacity: 0 },
        animate: {
          opacity: isInView ? 1 : 0,
          transition: { delay: phase[0], duration: phase[1] - phase[0] },
        },
      };
    },
    [animationPhases, isInView],
  );

  return (
    <div className={styles.releaseCycleDiagram}>
      <div className={styles.labelsWrapper}>
        <div
          className={styles.labels}
          style={{
            fontSize: `${baseFontSize}px`,
            lineHeight: `${baseFontSize * 1.25}px`,
          }}
        >
          <motion.div className={styles.title}>InstructLab</motion.div>
          <motion.div className={styles.img1} {...getAnimationProps('image1')}>
            Open source community experiments with skills
          </motion.div>
          <motion.div className={styles.img2} {...getAnimationProps('image2')}>
            Contributors open pull requests for InstructLab
          </motion.div>
          <motion.div className={styles.img3} {...getAnimationProps('image3')}>
            New skills merged into community LLM
          </motion.div>
          <motion.div className={styles.arrow1} {...getAnimationProps('text1')}>
            New skills recipes
          </motion.div>
          <motion.div className={styles.arrow2} {...getAnimationProps('text2')}>
            Approved pull requests
          </motion.div>

          <motion.div className={styles.arrow3} {...getAnimationProps('text3')}>
            Updated community model
          </motion.div>
        </div>
      </div>

      <svg
        ref={wrapperRef}
        width="559"
        height="446"
        viewBox="0 0 559 446"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arrow 1 */}
        <motion.path
          d="M388 49.75L495 49.75L495 311.25"
          stroke="black"
          {...getLineProps(1)}
        />
        <motion.path
          d="M495 49H495.75V48.25H495V49ZM495 318L499.33 310.5H490.67L495 318Z"
          fill="black"
          {...getAnimationProps('arrow1')}
        />

        {/* Arrow 2 */}
        <motion.path d="M431 382L128 382" stroke="black" {...getLineProps(2)} />
        <motion.path
          d="M128 382L135.5 386.33L135.5 377.67L128 382Z"
          fill="black"
          {...getAnimationProps('arrow2')}
        />

        {/* Arrow 3 */}
        <motion.path
          d="M64.75 318L64.75 49L171.25 49"
          stroke="black"
          {...getLineProps(3)}
        />
        <motion.path
          d="M178 49L170.5 53.3301V44.6699L178 49ZM64 49H63.25V48.25H64V49Z"
          fill="black"
          {...getAnimationProps('arrow3')}
        />

        {/* Img 1 */}
        <motion.g {...getAnimationProps('image1')}>
          <rect x="256.083" width="13.6667" height="13.6667" fill="black" />
          <rect x="290.25" width="13.6667" height="13.6667" fill="black" />
          <rect x="307.333" width="13.6667" height="13.6667" fill="black" />
          <rect
            x="239"
            y="17.082"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="273.167"
            y="17.082"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="290.25"
            y="17.082"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="307.333"
            y="17.082"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="256.083"
            y="34.168"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="273.167"
            y="34.168"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="307.333"
            y="34.168"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="256.083"
            y="51.25"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="290.25"
            y="51.25"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="307.333"
            y="51.25"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="239"
            y="68.332"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="273.167"
            y="68.332"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="290.25"
            y="68.332"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
          <rect
            x="307.333"
            y="68.332"
            width="13.6667"
            height="13.6667"
            fill="black"
          />
        </motion.g>

        {/* Img 2 */}
        <motion.g {...getAnimationProps('image2')}>
          <circle cx="495" cy="382" r="64" fill="black" />
          <rect
            width="60"
            height="60"
            transform="translate(465 352)"
            fill="white"
            fillOpacity="0.01"
            style={{ mixBlendMode: 'multiply' }}
          />
          <path
            d="M466.875 410.8C466.699 410.8 466.526 410.731 466.399 410.603C466.204 410.408 466.148 410.112 466.254 409.861L471.879 396.736C471.913 396.657 471.962 396.584 472.024 396.524L514.596 353.95C515.076 353.468 515.717 353.204 516.397 353.204C516.397 353.204 516.397 353.204 516.399 353.204C517.08 353.204 517.721 353.468 518.203 353.95L523.052 358.799C524.044 359.792 524.044 361.409 523.052 362.404L480.476 404.978C480.416 405.038 480.345 405.087 480.264 405.121L467.139 410.746C467.055 410.783 466.965 410.8 466.875 410.8ZM469.635 405.4L468.161 408.839L471.598 407.365L469.635 405.4ZM470.207 404.065L472.935 406.795L479.325 404.056V401.425H476.25C475.877 401.425 475.575 401.123 475.575 400.75V397.675H472.944L470.207 404.065ZM476.925 400.075H480C480.373 400.075 480.675 400.377 480.675 400.75V402.871L513.733 369.812L507.188 363.267L474.129 396.325H476.25C476.623 396.325 476.925 396.627 476.925 397V400.075ZM508.144 362.312L514.688 368.858L516.546 367L510 360.454L508.144 362.312ZM510.956 359.5L517.5 366.046L522.096 361.45C522.562 360.981 522.562 360.22 522.096 359.753L517.247 354.904C517.02 354.677 516.72 354.552 516.399 354.552C516.397 354.552 516.397 354.552 516.397 354.552C516.077 354.552 515.777 354.677 515.552 354.904L510.956 359.5ZM513.75 410.8C513.577 410.8 513.403 410.734 513.272 410.603L496.397 393.728L497.351 392.772L499.686 395.108L503.895 390.897L504.851 391.853L500.642 396.063L504.375 399.796L506.709 397.459L507.666 398.416L505.329 400.75L509.062 404.483L513.272 400.272L514.228 401.228L510.017 405.438L513.75 409.171L522.171 400.75L505.772 384.353L506.728 383.399L523.603 400.274C523.867 400.538 523.867 400.966 523.603 401.23L514.228 410.605C514.097 410.734 513.923 410.8 513.75 410.8ZM481.414 396.541L480.459 395.584L507.647 368.397L508.603 369.351L481.414 396.541ZM483.274 380.601L466.399 363.726C466.134 363.462 466.134 363.036 466.399 362.772L475.774 353.397C476.038 353.132 476.464 353.132 476.728 353.397L493.603 370.272L492.649 371.226L476.25 354.829L467.829 363.25L471.563 366.983L475.774 362.774L476.728 363.728L472.517 367.938L476.25 371.671L478.586 369.336L479.541 370.291L477.204 372.625L480.938 376.358L485.149 372.149L486.103 373.103L481.892 377.313L484.226 379.649L483.274 380.601Z"
            fill="white"
          />
        </motion.g>

        {/* Img 3 */}
        <motion.g {...getAnimationProps('image3')}>
          <circle cx="64" cy="382" r="64" fill="#51FFC4" />
          <rect
            width="62"
            height="62"
            transform="translate(33 351)"
            fill="white"
            fillOpacity="0.01"
            style={{ mixBlendMode: 'multiply' }}
          />
          <path
            d="M89.1875 357.781C89.1875 358.316 88.7535 358.75 88.2187 358.75C87.684 358.75 87.25 358.316 87.25 357.781C87.25 357.246 87.684 356.812 88.2187 356.812C88.7535 356.812 89.1875 357.246 89.1875 357.781ZM84.3437 356.812C83.809 356.812 83.375 357.246 83.375 357.781C83.375 358.316 83.809 358.75 84.3437 358.75C84.8785 358.75 85.3125 358.316 85.3125 357.781C85.3125 357.246 84.8785 356.812 84.3437 356.812ZM80.4687 356.812C79.934 356.812 79.5 357.246 79.5 357.781C79.5 358.316 79.934 358.75 80.4687 358.75C81.0035 358.75 81.4375 358.316 81.4375 357.781C81.4375 357.246 81.0035 356.812 80.4687 356.812ZM93.0625 409.823H34.9375C34.5519 409.823 34.24 409.511 34.24 409.125V354.875C34.24 354.489 34.5519 354.177 34.9375 354.177H93.0625C93.4481 354.177 93.76 354.489 93.76 354.875V409.125C93.76 409.511 93.4481 409.823 93.0625 409.823ZM35.635 408.428H92.365V361.385H35.635V408.428ZM35.635 359.99H92.365V355.572H35.635V359.99ZM59.1562 397.775L57.8736 397.227L69.4986 370.102L70.7812 370.65L59.1562 397.775ZM74.509 392.182L73.5209 391.193L80.7787 383.937L73.5209 376.68L74.509 375.693L82.259 383.443C82.5322 383.717 82.5322 384.158 82.259 384.43L74.509 392.182ZM54.1478 392.182L46.3978 384.432C46.1246 384.158 46.1246 383.717 46.3978 383.445L54.1478 375.695L55.134 376.682L47.8761 383.937L55.1321 391.193L54.1478 392.182Z"
            fill="black"
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default ReleaseCycleDiagram;
