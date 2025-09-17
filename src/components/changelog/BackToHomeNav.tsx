import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export function BackToHomeNav() {
  return (
    <Link href="/" className="group flex items-center transition-opacity hover:opacity-90">
      <ChevronLeft className="mr-1 size-4" />
      <div className="flex items-center">
        <Image
          src="/shipmore.png"
          alt="ShipMore AI Logo"
          width={28}
          height={28}
          className="mr-2"
        />
        <h1 className="text-xl font-bold">
          <span className="text-primary-700 dark:text-primary-400">Ship</span>
          <span className="text-primary-500 dark:text-primary-300">More</span>
        </h1>
      </div>
    </Link>
  );
}
