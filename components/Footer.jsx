import Logo from "./Logo";

import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

const socials = [
  {
    icon: <FaLinkedin />,
    url: "https://linkedin.com/company/suitmedia",
  },
  {
    icon: <FaInstagram />,
    url: "https://instagram.com/suitmedia",
  },
  {
    icon: <FaYoutube />,
    url: "https://www.youtube.com/channel/UCf2eXYqaSsp4FNPtbarVP_A",
  },
  {
    icon: <FaFacebook />,
    url: "https://facebook.com/suitmedia",
  },
  {
    icon: <FaTwitter />,
    url: "https://twitter.com/suitmedia",
  },
];

function Footer() {
  return (
    <footer className="mt-14 py-10 bg-black">
      <div className="container mx-auto flex flex-col gap-6 justify-center items-center">
        <div className="social flex flex-wrap gap-6 justify-center items-center">
          <Logo />
          {socials.map((social, index) => {
            return (
              <a
                className="text-2xl text-primary-foreground hover:text-primary transition-all"
                href={social.url}
                key={index}
                target="_blank"
              >
                {social.icon}
              </a>
            );
          })}
        </div>
        <p className="text-primary-foreground/80 text-center">
          Copyright © 2023 Marix Marchellino Susanto. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
