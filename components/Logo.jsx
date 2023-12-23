import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        priority
        src="/logo.png"
        width={120}
        height={54}
        alt="logo"
      ></Image>
    </Link>
  );
};

export default Logo;
