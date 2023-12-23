// link hooks
import Link from "next/link";
import { usePathname } from "next/navigation";

// framer motion
import { motion } from "framer-motion";

const links = [
  { path: "/", name: "Work" },
  { path: "/about", name: "About" },
  { path: "/services", name: "Services" },
  { path: "/ideas", name: "Ideas" },
  { path: "/careers", name: "Careers" },
  { path: "/contact", name: "Contact" },
];

function Nav({ containerStyles, linkStyles, underlineStyle }) {
  const path = usePathname();

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`capitalize ${
              path === link.path && "font-semibold"
            } ${linkStyles}`}
          >
            {link.path === path && (
              <motion.span
                intial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                layoutId="underline"
                className={`${underlineStyle}`}
              />
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Nav;
