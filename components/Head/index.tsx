import NextHead from 'next/head';

type Props = {
  title?: string;
};

export const Head = ({ title = 'home' }: Props) => {
  return (
    <NextHead>
      <title>{title ? `${title} - wippy` : 'wippy'}</title>
    </NextHead>
  );
};
