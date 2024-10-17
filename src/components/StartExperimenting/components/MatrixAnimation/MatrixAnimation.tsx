'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './MatrixAnimation.module.scss';
import classNames from 'classnames';
import { useInView } from 'framer-motion';

enum Color {
  NONE,
  LIGHT,
  DARK,
}

const PAINTED_TILES = 8;

type TileProps = {
  color: Color;
};

const Tile = ({ color }: TileProps) => {
  return (
    <div
      className={classNames(styles.cell, {
        [styles.cell__light]: color === Color.LIGHT,
        [styles.cell__dark]: color === Color.DARK,
      })}
    />
  );
};

const getRandomNumber = (max: number, min = 0) =>
  Math.round(Math.random() * (max - min)) + min;

const pickRandomIds = (count: number, max: number, avoid: string[] = []) => {
  const result: string[] = [];
  while (result.length < count) {
    const numberStr = String(getRandomNumber(max));
    if ([...result, ...avoid].indexOf(numberStr) > -1) continue;
    result.push(numberStr);
  }
  return result;
};

const MatrixAnimation = () => {
  const isFresh = useRef<Record<string, boolean>>({});
  const timeout = useRef<any>(); // eslint-disable-line
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef);

  const [paintedTiles, setPaintedTiles] = useState<Record<string, Color>>(
    pickRandomIds(PAINTED_TILES, 64).reduce(
      (acc, tileIdx, idx) => {
        acc[tileIdx] = idx % 2 ? Color.LIGHT : Color.DARK;
        return acc;
      },
      {} as Record<string, Color>,
    ),
  );

  const getTileIdToClear = useCallback(() => {
    const suitableTiles = Object.keys(paintedTiles).filter(
      key => !isFresh.current[key],
    );
    return suitableTiles.length
      ? suitableTiles[getRandomNumber(suitableTiles.length - 1)]
      : null;
  }, [paintedTiles]);

  const getTileIdToPaint = useCallback(() => {
    return pickRandomIds(1, 64, Object.keys(paintedTiles))[0];
  }, [paintedTiles]);

  const moveTile = useCallback(
    (fromId: string, toId: string) => {
      const color = paintedTiles[fromId];
      const { [fromId]: _, ...otherTiles } = paintedTiles;
      setPaintedTiles({ ...otherTiles, [toId]: color });
    },
    [paintedTiles],
  );

  const repaintTile = useCallback(() => {
    const tileIdToClear = getTileIdToClear();
    if (!tileIdToClear) {
      // Trigger another cycle
      setPaintedTiles({ ...paintedTiles });
      return;
    }

    const tileIdToPaint = getTileIdToPaint();

    isFresh.current[tileIdToPaint] = true;
    setTimeout(() => {
      isFresh.current[tileIdToPaint] = false;
    }, 3000);

    moveTile(tileIdToClear, tileIdToPaint);
  }, [getTileIdToClear, getTileIdToPaint, moveTile, paintedTiles]);

  useEffect(() => {
    clearTimeout(timeout.current);

    if (isInView) {
      const randomTimeout = Math.round(Math.random() * 2000 + 200);
      timeout.current = setTimeout(repaintTile, randomTimeout);
    }
  }, [isInView, repaintTile]);

  return (
    <div className={styles.matrix} ref={wrapperRef}>
      {Array.from(Array(8)).map((_, row) => (
        <div key={`row${row}`} className={styles.row}>
          {Array.from(Array(8)).map((_, col) => {
            const idx = row * 8 + col;
            return isInView ? (
              <Tile key={idx} color={paintedTiles[String(idx)] ?? Color.NONE} />
            ) : null;
          })}
        </div>
      ))}
    </div>
  );
};

export default MatrixAnimation;
