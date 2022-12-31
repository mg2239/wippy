import NextHead from 'next/head';

type Props = {
  title?: string;
  noIndex?: boolean;
};

export const Head = ({ title = 'home', noIndex }: Props) => {
  return (
    <NextHead>
      <title>{title ? `${title} - wippy` : 'wippy'}</title>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="google" content="nositelinkssearchbox" />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </NextHead>
  );
};
