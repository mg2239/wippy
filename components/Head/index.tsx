import NextHead from 'next/head';

type Props = {
  title?: string;
};

export const Head = ({ title = 'home' }: Props) => {
  return (
    <NextHead>
      <title>{title ? `${title} - wippy` : 'wippy'}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  );
};
