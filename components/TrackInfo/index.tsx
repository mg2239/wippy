import spacetime from 'spacetime';
import { Track } from '../../types';

type Props = {
  track: Track;
};

export const TrackInfo = ({ track }: Props) => {
  const now = spacetime.now();
  const expiration = now.since(track.expiresAt).rounded;

  return (
    <div className="mb-8">
      <h1 className="mb-2 break-words text-3xl font-semibold sm:text-4xl">
        {track.title}
      </h1>
      <p>expires {expiration}</p>
    </div>
  );
};
