import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Node, DashedNode } from './Node';
import useBreakpoint, { Breakpoint } from '../../../utils/useBreakpoint';

import styles from './TaxonomyTree.module.scss';

export const NODE_DELAY = 0.18;
export const LINE_DRAW_SPEED = 0.5;

const selectedNodeDelay = 2;
const lvlDelay = 6;
const lvl0 = 0;
const lvl1 = lvl0 + 1 + lvlDelay;
const lvl2 = lvl1 + 10 + lvlDelay;
const lvl3 = lvl2 + 7 + lvlDelay;
const lvl4 = lvl3 + 4 + lvlDelay;

const TaxonomyTree = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const animationStarted = useRef(true);
  const inView = useInView(animationRef, { once: true });
  const { breakpoint, isLessThanMD, isLessThanSMD } = useBreakpoint();

  useEffect(() => {
    animationStarted.current = true;
  }, [inView]);

  const [colWidth, _setColWidth] = useState(230);

  const setColWidth = useCallback(
    (w: number) => {
      if (colWidth !== w) _setColWidth(w);
    },
    [colWidth],
  );

  useEffect(() => {
    switch (breakpoint) {
      case Breakpoint.MAX:
      case Breakpoint.XLG:
        setColWidth(230);
        break;
      case Breakpoint.LG:
        setColWidth(180);
        break;
      case Breakpoint.MD:
        setColWidth(160);
        break;
      case Breakpoint.SMD:
      case Breakpoint.LSM:
      case Breakpoint.SM:
        setColWidth(130);
        break;
    }
  }, [breakpoint, colWidth, setColWidth]);

  return (
    <div className={styles.tree} ref={animationRef}>
      {inView ? (
        <Node top={110} label="compositional skills" idx={lvl0 + 0} selected>
          {parent1Ref => (
            <>
              <Node
                top={0}
                left={colWidth}
                parent={parent1Ref}
                width={103}
                idx={lvl1 + 0}
              />
              <Node
                top={30}
                left={colWidth}
                parent={parent1Ref}
                width={83}
                idx={lvl1 + 1}
              />
              <Node
                top={60}
                left={colWidth}
                parent={parent1Ref}
                width={isLessThanSMD ? 78 : 124}
                idx={lvl1 + 2}
              />

              <Node
                top={110}
                left={colWidth}
                parent={parent1Ref}
                width={66}
                idx={lvl1 + 3}
              />

              <Node
                top={170}
                left={colWidth}
                parent={parent1Ref}
                width={isLessThanSMD ? 76 : 90}
                idx={lvl1 + 4}
              >
                {/* {parent2Ref => (
                  <>
                    <Node
                      top={90}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={75}
                      idx={7}
                    />

                    <Node
                      top={165}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={83}
                      idx={8}
                    />
                    <Node
                      top={190}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={64}
                      idx={9}
                    />
                  </>
                )} */}
              </Node>

              <Node
                top={360}
                left={colWidth}
                parent={parent1Ref}
                width={61}
                idx={lvl1 + 5}
              />

              {/* <Node
                top={155}
                left={colWidth}
                parent={parent1Ref}
                width={66}
                dashed
                idx={33}
              /> */}

              <Node
                top={410}
                left={colWidth}
                parent={parent1Ref}
                width={isLessThanMD ? 66 : 96}
                idx={lvl1 + 6}
              />
              <Node
                top={440}
                left={colWidth}
                parent={parent1Ref}
                width={77}
                idx={lvl1 + 7}
              />
              <Node
                top={470}
                left={colWidth}
                parent={parent1Ref}
                width={84}
                idx={lvl1 + 8}
              />
              <Node
                top={500}
                left={colWidth}
                parent={parent1Ref}
                width={104}
                idx={lvl1 + 9}
              />

              <Node
                top={360}
                left={colWidth}
                parent={parent1Ref}
                label="writing"
                idx={lvl1 + 10 + selectedNodeDelay}
                selected
              >
                {parent2Ref => (
                  <>
                    <Node
                      top={isLessThanSMD ? 60 : 220}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={72}
                      idx={lvl2 + 0}
                    />
                    <Node
                      top={isLessThanSMD ? 90 : 250}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={83}
                      idx={lvl2 + 1}
                    />
                    <Node
                      top={isLessThanSMD ? 120 : 280}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={isLessThanMD ? 90 : 97}
                      idx={lvl2 + 2}
                    />
                    <Node
                      top={isLessThanSMD ? 150 : 310}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={66}
                      idx={lvl2 + 3}
                    />

                    <Node
                      top={isLessThanSMD ? 200 : 410}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={isLessThanMD ? 62 : 132}
                      idx={lvl2 + 4}
                    />
                    <Node
                      top={isLessThanSMD ? 230 : 440}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={83}
                      idx={lvl2 + 5}
                    />
                    {/* <Node
                      top={505}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={66}
                      dashed
                      idx={34}
                    /> */}
                    <Node
                      top={isLessThanSMD ? 260 : 470}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      width={isLessThanMD ? 58 : 117}
                      idx={lvl2 + 6}
                    />
                    <Node
                      top={isLessThanSMD ? 60 : 220}
                      left={colWidth * 2}
                      parent={parent2Ref}
                      label="freeform"
                      idx={lvl2 + 7 + selectedNodeDelay}
                      selected
                    >
                      {parent3Ref => (
                        <>
                          <Node
                            top={100}
                            left={colWidth * 3}
                            parent={parent3Ref}
                            width={62}
                            idx={lvl3 + 0}
                          />
                          <Node
                            top={130}
                            left={colWidth * 3}
                            parent={parent3Ref}
                            width={58.8}
                            idx={lvl3 + 1}
                          />
                          <Node
                            top={160}
                            left={colWidth * 3}
                            parent={parent3Ref}
                            width={81}
                            idx={lvl3 + 2}
                          />
                          <Node
                            top={190}
                            left={colWidth * 3}
                            parent={parent3Ref}
                            width={66}
                            idx={lvl3 + 3}
                          />
                          <Node
                            top={130}
                            left={colWidth * 3}
                            parent={parent3Ref}
                            label="poetry"
                            idx={lvl3 + 4 + selectedNodeDelay}
                            selected
                          >
                            {parent4Ref => (
                              <>
                                <Node
                                  top={-50}
                                  left={colWidth * 4}
                                  parent={parent4Ref}
                                  label="Ballad"
                                  idx={lvl4 + 0}
                                />
                                <Node
                                  top={-20}
                                  left={colWidth * 4}
                                  parent={parent4Ref}
                                  label="Epic"
                                  idx={lvl4 + 1}
                                />
                                <Node
                                  top={10}
                                  left={colWidth * 4}
                                  parent={parent4Ref}
                                  label="Freeverse"
                                  idx={lvl4 + 2}
                                />
                                <Node
                                  top={40}
                                  left={colWidth * 4}
                                  parent={parent4Ref}
                                  label="Limerick"
                                  idx={lvl4 + 3}
                                />
                                <Node
                                  top={70}
                                  left={colWidth * 4}
                                  parent={parent4Ref}
                                  label="Narrative poetry"
                                  idx={lvl4 + 4}
                                />

                                <Node
                                  top={190}
                                  left={colWidth * 4}
                                  parent={parent4Ref}
                                  label="Ode sonnet"
                                  idx={lvl4 + 5}
                                />
                                {/* <Node
                                    top={280}
                                    left={colWidth * 4}
                                    parent={parent4Ref}
                                    width={66}
                                    dashed
                                    idx={35}
                                  /> */}
                                <DashedNode
                                  top={220}
                                  left={colWidth * 4}
                                  width={57}
                                  parent={parent4Ref}
                                  label="Haiku"
                                  idx={lvl4 + 12}
                                />
                              </>
                            )}
                          </Node>
                        </>
                      )}
                    </Node>
                  </>
                )}
              </Node>
            </>
          )}
        </Node>
      ) : null}
    </div>
  );
};

export default TaxonomyTree;
