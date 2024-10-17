'use client';

import { useState } from 'react';
import { Column, Grid } from '@carbon/react';
import TaxonomyTree from './TaxonomyTree/TaxonomyTree';
import useResize from '../../utils/useResize';

import styles from './Taxonomy.module.scss';

const StartExperimenting = () => {
  const [showTree, setShowTree] = useState(true);
  useResize(
    () => setShowTree(true),
    () => setShowTree(false),
  );

  return (
    <section className={styles.pane}>
      <Grid className={styles.grid}>
        <Column
          className={styles.column}
          lg={{ span: 16 }}
          md={{ span: 8 }}
          sm={{ span: 4 }}
        >
          <div className={styles.graphics}>{showTree && <TaxonomyTree />}</div>
          <div className={styles.content}>
            <h2 className={styles.content__header}>Taxonomy</h2>
            <p className={styles.content__subhead}>
              A taxonomy of skills and knowledge helps to identify gaps in
              desired capabilities, and then generate enough diversity in
              synthetic data to tune base models efficiently.
            </p>
          </div>
        </Column>
      </Grid>
    </section>
  );
};

export default StartExperimenting;
