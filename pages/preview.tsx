import React, { useState } from 'react';
import Page from '../components/Page/Page';
import Edit from '../components/TrackEdit/TrackEdit';
import Info from '../components/TrackInfo/TrackInfo';

function HomePage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [expireType, setExpireType] = useState('');
  const [expireValue, setExpireValue] = useState(-1);
  const [color, setColor] = useState('');

  function handleSubmit() {
    console.log(title, desc, expireType, expireValue, color);
  }

  return (
    <>
      <Page>
        <Edit
          onTitleChange={(t) => setTitle(t)}
          onDescChange={(d) => setDesc(d)}
          onExpireChange={(t, v) => { setExpireType(t); setExpireValue(v); }}
          onColorChange={(c) => setColor(c)}
          onSubmit={handleSubmit}
        />
      </Page>
    </>
  );
}

export default HomePage;
