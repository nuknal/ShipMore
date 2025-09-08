import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default function TextLogo() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        <Image
          src="/shipmore.png"
          alt="App Template Logo"
          width={28}
          height={28}
          className="mr-2"
        />
        <p className="text-xl font-bold">
          <span className="text-primary-700 dark:text-primary-400">App</span>
          <span className="text-primary-500 dark:text-primary-300">Template</span>
        </p>
      </Link>
    </div>
  );
}
