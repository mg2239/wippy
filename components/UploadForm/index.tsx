import { useContext, useState } from 'react';
import { UploadContext } from '../../context/UploadContext';
import { UploadInfo } from '../../types';

export const UploadForm = () => {
  const { onSave, file } = useContext(UploadContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState<'minutes' | 'hours' | 'days'>('hours');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    if (amount < 1) {
      return;
    }

    setSaved(true);
    const info: UploadInfo = {
      title: trimmedTitle,
      expiration: { amount, unit },
    };
    onSave(info);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-left text-sm font-medium"
        >
          Track Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={file?.name || 'Enter track name'}
          disabled={saved}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-left text-sm font-medium">
          Expires In
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            disabled={saved}
            required
            className="w-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          />
          <select
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value as 'minutes' | 'hours' | 'days')
            }
            disabled={saved}
            required
            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={saved}
        className="w-full rounded-md bg-rose-500 px-4 py-2 font-medium text-white transition-colors hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
      >
        {saved ? 'Saving...' : 'Save Track'}
      </button>
    </form>
  );
};
