import React from 'react';

// enum ExpireTypes {
//   M = 'minutes',
//   H = 'hours',
// }

type Props = {
  onTitleChange: (title: string) => void
  onDescChange: (desc: string) => void
  onExpireChange: (type: string, value: number) => void
  onColorChange: (color: string) => void
  onSubmit: () => void
}

function TrackEdit(
  { onTitleChange, onDescChange, onExpireChange, onColorChange, onSubmit }: Props,
) {
  function validateInfo(event: React.FormEvent<HTMLFormElement>) {
    console.log(event);
  }
  onExpireChange('', 0);
  onColorChange('');
  onSubmit();

  return (
    <div>
      <form onSubmit={(e) => validateInfo(e)}>
        <input type='text' onChange={(e) => onTitleChange(e.target.value)} />
        <input type='text' onChange={(e) => onDescChange(e.target.value)} />
        <div>
          <label htmlFor='expires'></label>
        </div>
        <div>
          <label htmlFor='color'></label>
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default TrackEdit;
