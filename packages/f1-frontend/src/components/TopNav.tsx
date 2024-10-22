import Image from 'next/image';
import Link from 'next/link';

const TopNav = () => (
    <div className="container flex items-start justify-between p-4 w-full">
        {/* Logo Section */}
        <Link href="/">
            <Image
                src="/images/f1_logo.png"
                alt="Home"
                width={100}
                height={100}
                className="mr-2"
            />
        </Link>
    </div>
);

export default TopNav;
