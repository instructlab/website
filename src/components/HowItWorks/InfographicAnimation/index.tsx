import { Fragment, useEffect, useCallback, useState } from 'react';
import { infographicList } from './constant';

import styles from './InfographicAnimation.module.scss';

type Layer = any; // eslint-disable-line

const getPos = (
  //get position of the layer
  dir: string,
  layer: Layer,
  originalSize: number[],
  val = undefined,
) => {
  const idx = dir === 'top' ? 1 : 0;
  const pos = typeof val === 'number' ? val : layer.pos?.[idx] || 0;
  return pos === 0 ? '0' : `${(pos / originalSize[idx]) * 100}%`;
};

type LayerImgProps = {
  layer: Layer; // eslint-disable-line
  size: number;
  originalSize: number[];
  isAnimOn: boolean;
};

const LayerImg = ({ layer, size, originalSize, isAnimOn }: LayerImgProps) => {
  const [targetStyle, setTargetStyle] = useState({});
  const [animList, setAnimList] = useState<any[] | null>(null); // eslint-disable-line
  const Img = layer.img;

  const resetAnimation = useCallback(
    (left: string, top: string, width: string) => {
      setTargetStyle({ left: left, top: top, width: width });
      animList?.map(d => clearTimeout(d));
      setAnimList(null);
    },
    [animList],
  );

  const setAnimation = useCallback(
    (left: string, top: string, width: string) => {
      if (layer.animation) {
        setTargetStyle({
          ...layer.animation[0], //base style to create transition
          left: getPos('left', layer, originalSize, layer.animation[0].left),
          top: getPos('top', layer, originalSize, layer.animation[0].top),
          width,
        });

        const animList = [layer.animation].flat();
        animList.map((d, i) => {
          const animation = setTimeout(
            () => {
              setTargetStyle({
                ...d,
                left: d.left
                  ? getPos('left', layer, originalSize, d.left)
                  : `${left}%`,
                top: d.top
                  ? getPos('top', layer, originalSize, d.top)
                  : `${top}%`,
                width,
              });
            },
            (layer?.delay || 0) * (i + 1),
          );

          setAnimList(prev => (prev ? [...prev, animation] : [animation]));
        });
      }
    },
    [layer, originalSize],
  );

  useEffect(() => {
    if (!layer) return;
    const [left, top] = [
      getPos('left', layer, originalSize),
      getPos('top', layer, originalSize),
    ];
    const width = `${layer.size || 100}%`;

    //if any animation data exist
    if (isAnimOn && layer.animation) {
      setAnimation(left, top, width);
    } else {
      resetAnimation(left, top, width);
    }
  }, [isAnimOn, layer, size]);

  useEffect(() => {
    const [left, top] = [
      getPos('left', layer, originalSize),
      getPos('top', layer, originalSize),
    ];
    const width = `${layer.size || 100}%`;

    if (animList === null) setAnimation(left, top, width);
  }, [animList, layer, originalSize, setAnimation]);

  return (
    <Img
      alt=""
      className={`${styles.animLayer} ${
        isAnimOn && layer.class ? layer.class : ''
      }`}
      style={targetStyle}
    />
  );
};

export type InfographicAnimationProps = {
  size: number;
  kind: keyof typeof infographicList;
  isOn?: boolean;
};

const InfographicAnimation = ({
  size,
  kind,
  isOn = true,
}: InfographicAnimationProps) => {
  const [animList, setAnimList] = useState<any>(null); // eslint-disable-line
  const [isAnimOn, setIsAnimOn] = useState(false);
  const [animWidth, setAnimWidth] = useState(size);

  const resetAnim = useCallback(() => {
    const delays =
      Math.max(...infographicList[kind].layers.map(d => d.delay || 0)) + 5000;
    setTimeout(() => setIsAnimOn(false), delays);
  }, [kind]);

  useEffect(() => {
    setTimeout(() => setIsAnimOn(true), 3000);
  }, []);

  useEffect(() => {
    if (!!infographicList[kind]) {
      if (infographicList[kind].ratio < 1) {
        setAnimWidth(size * infographicList[kind].ratio);
      } else {
        setAnimWidth(size);
      }

      setAnimList(() => ({ ...infographicList[kind] }) as any); // eslint-disable-line
      resetAnim();
    }
  }, [kind, resetAnim, size]);

  useEffect(() => {
    if (!!infographicList[kind]) {
      if (!isOn) {
        setIsAnimOn(false);
      } else if (!isAnimOn) {
        setIsAnimOn(true);
      } else {
        resetAnim();
      }
    }
  }, [isOn, isAnimOn, kind, resetAnim]);

  return (
    <>
      {(!animList || !infographicList[kind]) && (
        <span>{kind} doesn&apos;t exist</span>
      )}
      {!!animList && !!infographicList[kind] && !!animList.layers && (
        <div
          className={styles.animation}
          style={{ width: `${animWidth}px`, aspectRatio: animList.ratio }}
        >
          {animList.layers.map((d: Layer, i: number) => (
            <Fragment key={`anim_${kind}_${i}`}>
              <LayerImg
                layer={d}
                size={animWidth}
                isAnimOn={isAnimOn}
                originalSize={[
                  animList.originalWidth,
                  animList.originalWidth / animList.ratio,
                ]}
              />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default InfographicAnimation;
