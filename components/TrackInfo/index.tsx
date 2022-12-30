import { Track } from '../../types';

type Props = {
  track: Track;
};

export const TrackInfo = ({ track }: Props) => {
  return (
    <>
      <h1 className="mb-2 text-4xl font-semibold">{track.title}</h1>
      <p className="mb-4">expires in 3 days</p>
    </>
  );
};
