"use client";
import { useRef } from "react";

import { usePathname } from "next/navigation";

// framer motion
import { motion, useScroll, useTransform } from "framer-motion";

const banners = [
  {
    path: "/",
    heading: "Our Work",
    subheading: "We make something you love",
    src: "/banners/work.jpg",
  },
  {
    path: "/about",
    heading: "About Us",
    subheading:
      "Our second home where technology & creativity fused into digital chemistry",
    src: "/banners/about.jpeg",
  },
  {
    path: "/services",
    heading: "Services",
    subheading: "Suitmedia help our clients succesd through digital innovation",
    src: "/banners/services.jpg",
  },
  {
    path: "/ideas",
    heading: "Ideas",
    subheading: "Where all our great things begin",
    src: "/banners/ideas.jpg",
  },
  {
    path: "/careers",
    heading: "Careers",
    subheading: "We never tire of the mantra quality over quantity",
    src: "/banners/careers.jpeg",
  },
  {
    path: "/contact",
    heading: "Contact Us",
    subheading: "Let's make a great connection",
    src: "/banners/contact.jpg",
  },
];

const Banner = () => {
  const pathName = usePathname();
  const banner = banners.find((banner) => banner.path === pathName);

  // framer motion
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative flex justify-center items-center w-full h-[calc(100vh-6rem)] max-h-[650px] clip-banner">
      <motion.div
        ref={ref}
        style={{ y: yBg, backgroundImage: `url(${banner.src})` }}
        className={`absolute w-full h-full bg-fill-shadow bg-cover bg-center`}
      ></motion.div>
      <div className="text-primary-foreground text-center z-10">
        <h1 className="text-6xl">{banner.heading}</h1>
        <p className="text-2xl mt-1">{banner.subheading}</p>
      </div>
    </div>
  );
};

export default Banner;
