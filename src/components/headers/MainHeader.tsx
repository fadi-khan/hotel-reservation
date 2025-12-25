import Image from 'next/image';
import Link from 'next/link';
import { BiMenu } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { LoginModal } from '../auth/LoginModal';
import { UserDropdown } from '../dropdowns/UserDropdown';

interface MainHeaderProps {
  setIsOpen: () => void;
}

export const MainHeader = ({ setIsOpen }: MainHeaderProps) => {
  // ✅ Get user from Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = !!user?.email; // Logged in if user has an id

  return (
    <header className="flex justify-between px-4 lg:px-12 shadow-blue-400 border border-blue-900 shadow-sm">
      <Link href="/" className="flex items-center h-1/2 cursor-pointer">
        <Image src="/logos/logo.png" alt="Logo" width={85} height={67} />
      </Link>

      <div className="flex items-center gap-2">
        <ul className="hidden md:flex gap-7 text-blue-900 font-medium items-center">
          <Link href="/home">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {!isLoggedIn ? <LoginModal /> : <UserDropdown />}
        </ul>

        <BiMenu
          className="size-8 md:hidden text-blue-900 cursor-pointer"
          onClick={setIsOpen}
        />
      </div>
    </header>
  );
};
