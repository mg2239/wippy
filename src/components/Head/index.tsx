import React from 'react';
import { Helmet } from 'react-helmet';

export default function Head() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>wippy</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </Helmet>
  );
}
