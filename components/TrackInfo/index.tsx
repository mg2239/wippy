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
      <h1 className="mb-2 text-4xl font-semibold">{track.title}</h1>
      <p>expires {expiration}</p>
    </div>
  );
};
