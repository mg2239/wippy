import * as Icons from '@heroicons/react/24/solid';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: keyof typeof Icons;
};

export const Button = ({ icon, ...props }: Props) => {
  const Icon = Icons[icon];

  return (
    <button
      className="bg-slate-800 p-1 text-rose-500 transition-colors hover:bg-slate-700"
      {...props}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
};
