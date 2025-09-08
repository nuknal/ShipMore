'use client';

import { useState } from 'react';

type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function ToggleSwitch({ id, checked, onChange }: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <div className="relative mr-2 inline-block w-10 select-none align-middle">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        className="absolute block size-6 cursor-pointer appearance-none rounded-full border-4 border-gray-300 bg-white transition-transform duration-200 ease-in-out checked:right-0 checked:border-primary-500 checked:bg-primary-500"
      />
      <label
        htmlFor={id}
        className="block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300"
      />
    </div>
  );
}
