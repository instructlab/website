import { Column, Button, Grid } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Logo from './graphics/Logo';
import GitHub from '../Icons/github.svg';
import HuggingFace from '../Icons/hf.svg';
import Paper from '../Icons/paper.svg';
import TagLogo from '../Icons/ilab-logo.svg';

import styles from './Leadspace.module.scss';

const Leadspace = () => (
  <section className={styles.pane}>
    <Grid>
      <Column
        className={styles.content}
        xlg={{ span: 6, offset: 1 }}
        lg={{ span: 6 }}
        md={{ span: 3 }}
        sm={{ span: 4 }}
      >
        <h1 className={styles.content__header}>InstructLab</h1>
        <p className={styles.content__subhead}>
          A new community-based approach to build truly open-source LLMs
        </p>
        <Button href="https://github.com/instructlab" className={styles.action}>
          <GitHub className={styles.icon} />
          <span>Join the community</span> <ArrowRight />
        </Button>
        <Button
          href="https://ui.instructlab.ai/login"
          className={styles.action}
        >
          <TagLogo className={styles.icon} />
          <span>Try the Taxonomy UI</span> <ArrowRight />
        </Button>
        <Button href="https://docs.instructlab.ai/" className={styles.action}>
          <GitHub className={styles.icon} />
          <span>Read our Documentation</span> <ArrowRight />
        </Button>
        <Button
          href="https://huggingface.co/instructlab"
          className={styles.action}
        >
          <HuggingFace className={styles.icon} />
          <span>Check out the latest model</span> <ArrowRight />
        </Button>
        <Button
          href="https://arxiv.org/abs/2403.01081"
          className={styles.action}
        >
          <Paper className={styles.icon} />
          <span>Read the paper</span> <ArrowRight />
        </Button>
      </Column>
      <Column
        className={styles.graphicsWrapper}
        xlg={{ span: 8, offset: 7 }}
        lg={{ span: 10, offset: 6 }}
        md={{ span: 4, offset: 4 }}
      >
        <div className={styles.graphics}>
          <Logo />
        </div>
      </Column>
    </Grid>
  </section>
);

export default Leadspace;
