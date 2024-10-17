import { ReactNode, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import styles from './PageShell.module.scss';

type PageShellProps = {
  children?: ReactNode;
  className?: string;
};

const PageShell = ({ children, className }: PageShellProps) => {
  const pageVariants = useMemo(
    () => ({
      hide: { opacity: 0 },
      show: { opacity: 1 },
      unmount: { opacity: 0, transition: { duration: 0.2 } },
    }),
    [],
  );

  return (
    <AnimatePresence>
      <motion.div
        className={classNames(styles.wrapper, className)}
        variants={pageVariants}
        initial="hide"
        animate="show"
        exit="unmount"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageShell;
