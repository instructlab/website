'use client';

import { Button, Column, Grid } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import GitHub from '../Icons/github.svg';
import AnimatedTerminal from './components/AnimatedTerminal/AnimatedTerminal';

import styles from './StartExperimenting.module.scss';

export const headerAnimations = {
  text: {
    initial: {
      opacity: 0,
      top: 20,
    },
    animate: {
      opacity: 1,
      top: 0,
      transition: {
        top: {
          duration: 1,
          ease: 'easeOut',
        },
        opacity: {
          delay: 0.3,
          duration: 1,
        },
      },
    },
  },

  title: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.1 } },
  },
};

const StartExperimenting = () => (
  <section className={styles.pane}>
    <Grid className={styles.grid}>
      <Column
        className={styles.graphics}
        lg={{ span: 6 }}
        md={{ span: 4 }}
        sm={{ span: 4, offset: 0 }}
      >
        <AnimatedTerminal />
      </Column>
      <Column
        className={styles.content}
        lg={{ span: 5, offset: 8 }}
        md={{ span: 4, offset: 4 }}
        sm={{ span: 4 }}
      >
        <h2 className={styles.content__header}>Try out InstructLab</h2>
        <p className={styles.content__subhead}>
          To get started, download the ilab command line interface and a
          quantized version of the latest model from GitHub.
        </p>
        <p className={styles.content__subhead}>
          You can experiment locally with synthetic data generation, model
          training, serving and chatting with the model to see if it produces
          the desired outputs.
        </p>
        <Button href="https://github.com/instructlab" className={styles.action}>
          <GitHub className={styles.icon} />
          <span>Check out the project repos</span> <ArrowRight />
        </Button>
      </Column>
    </Grid>
    <footer>
      <Grid className={styles.footerGrid}>
        <Column className={styles.content} lg={16} md={8} sm={4}>
          <div>
            <p>&copy; InstructLab</p>

            <p>
              <a href="https://github.com/instructlab/">GitHub</a>
              {' | '}
              <a href="https://github.com/instructlab/community/blob/main/CODE_OF_CONDUCT.md">
                Code of Conduct
              </a>
            </p>

            <p>Sponsored by Red Hat</p>

            <p>
              <a href="https://creativecommons.org/licenses/by/4.0/deed.en">
                CC-BY-4.0
              </a>
            </p>
          </div>
        </Column>
      </Grid>
    </footer>
  </section>
);

export default StartExperimenting;
