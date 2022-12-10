import { PlusIcon } from '@heroicons/react/20/solid';

export const Upload = () => {
  return (
    <input className="mb-2 flex items-center rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-gray-700">
      <PlusIcon className="mr-1 h-6 w-6" />
      <p className="mr-1">Upload file</p>
    </input>
  );
};
