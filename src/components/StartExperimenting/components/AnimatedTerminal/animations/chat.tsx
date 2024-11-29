import wait from './wait';

import styles from './animationStyles.module.scss';

type BorderedResponseProps = {
  title?: string;
  children?: React.ReactNode;
  footer?: string;
};

const BorderedResponse = ({
  children,
  title,
  footer,
}: BorderedResponseProps) => {
  return (
    <div className={styles.borderedAnswer}>
      {title ? (
        <div className={styles.borderedAnswer__title}>{title}</div>
      ) : null}
      <span>{children}</span>
      {footer ? (
        <div className={styles.borderedAnswer__footer}>{footer}</div>
      ) : null}
    </div>
  );
};

const chat: object[] = [
  {
    text: 'ilab chat',
    cmd: true,
    delay: 40,
  },
  {
    cmd: false,
    ...wait(10, () => ({
      text: (
        <>
          <BorderedResponse title="system">
            Welcome to Chat CLI w/ GGML-MERLINITE-7B-0302-Q4_K_M
          </BorderedResponse>{' '}
        </>
      ),
    })),
  },
  {
    ...wait(
      10,
      (i, arr) => ({
        text: `>>> ${arr.slice(0, i + 1).join('')}`,
      }),
      'what is the capital of canada',
    ),
  },
  {
    cmd: false,
    ...wait(25, i => ({
      text:
        i < 20 ? (
          ''
        ) : (
          <BorderedResponse
            title="ggml-merlinite-7b-0302-Q4_K_M"
            footer="elapsed 1.208 seconds"
          >
            The capital city of Canada is Ottawa. It is located in the province
            of Ontario, on the southern banks of the Ottawa River in the eastern
            portion of southern Ontario. The city serves as the political center
            for Canada, as it is home to Parliament Hill, which houses the House
            of Commons, Senate, Supreme Court, and Cabinet of Canada. Ottawa has
            a rich history and cultural significance, making it an essential
            part of Canada&apos;s identity.
          </BorderedResponse>
        ),
    })),
  },
  {
    text: '>>> ',
    cmd: false,
  },
];

export default chat;
