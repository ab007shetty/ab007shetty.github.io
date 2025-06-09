import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCoursera, SiGooglescholar, SiQwiklabs } from "react-icons/si";
import { GiMonkey } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { useTheme } from "../ThemeContext";

function AdScientificIndexLogo({ className = "" }) {
  return (
    <span
      className={`flex items-center justify-center font-extrabold text-2xl md:text-3xl ${className}`}
      style={{
        fontFamily: "'Inter', 'Arial Black', Arial, sans-serif",
        letterSpacing: "-0.08em",
        fontStyle: "italic",
        width: "1em",
        height: "1em",
        lineHeight: "1",
      }}
      aria-label="AD Scientific Index"
      title="AD Scientific Index"
    >
      AD
    </span>
  );
}

const emailInitial = "ab007shetty";
const emailDomains = [
  { domain: "gmail.com", colorKey: "highlightDomain" },
  { domain: "outlook.com", colorKey: "highlightDomain2" },
  { domain: "icloud.com", colorKey: "highlightDomain3" },
];

const socials = [
  {
    href: "https://github.com/ab007shetty",
    icon: <FaGithub />,
    label: "GitHub"
  },
  {
    href: "https://linkedin.com/in/ab007shetty",
    icon: <FaLinkedin />,
    label: "LinkedIn"
  },
  {
    href: "https://x.com/ab007shetty",
    icon: <FaXTwitter />,
    label: "X"
  },
  {
    href: "https://www.instagram.com/a.b.shetty",
    icon: <FaInstagram />,
    label: "Instagram"
  },
  {
    href: "https://www.coursera.org/user/9a1f6f65c70233a4cbf41887f48e0c06",
    icon: <SiCoursera />,
    label: "Coursera"
  },
  {
    href: "https://scholar.google.com/citations?user=i1vJxMYAAAAJ",
    icon: <SiGooglescholar />,
    label: "Google Scholar"
  },
  {
    href: "https://www.qwiklabs.com/public_profiles/a71f17d6-36af-4e30-b70f-8771bf211324",
    icon: <SiQwiklabs />,
    label: "Qwiklabs"
  },
  {
    href: "https://monkeytype.com/profile/abshetty",
    icon: <GiMonkey />,
    label: "Typing Monkey"
  },
  {
    href: "https://www.adscientificindex.com/scientist/anirudha-b-shetty/4804035",
    icon: <AdScientificIndexLogo />,
    label: "AD Scientific Index"
  },
  {
    href: "https://bit.ly/3IJ8Ds3",
    icon: <BiSearch />,
    label: "Google Search"
  }
];

const accentsMap = {
  icy: {
    highlight: "text-cyan-200",
    highlightDomain: "text-cyan-400",
    highlightDomain2: "text-pink-400",
    highlightDomain3: "text-lime-400",
    atColor: "text-white",
    outline: "theme-outline",
    iconHover: "hover:text-cyan-300",
  },
  hot: {
    highlight: "text-yellow-400",
    highlightDomain: "text-yellow-500",
    highlightDomain2: "text-pink-400",
    highlightDomain3: "text-lime-400",
    atColor: "text-white",
    outline: "theme-outline",
    iconHover: "hover:text-yellow-400",
  },
  dark: {
    highlight: "text-blue-300",
    highlightDomain: "text-blue-400",
    highlightDomain2: "text-pink-400",
    highlightDomain3: "text-lime-400",
    atColor: "text-white",
    outline: "theme-outline",
    iconHover: "hover:text-blue-300",
  }
};

export default function SocialsAndEmail() {
  const { theme } = useTheme();
  const accents = accentsMap[theme] || accentsMap.icy;

  // Email domain animation
  const [domainIdx, setDomainIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setDomainIdx(idx => (idx + 1) % emailDomains.length),
      2100
    );
    return () => clearInterval(interval);
  }, []);

  // Compose sideways email
  const getSidewaysEmail = () => {
    const domainObj = emailDomains[domainIdx];
    return (
      <span
        className={`transition-colors font-mono text-2xl md:text-3xl cursor-pointer flex-nowrap ${accents.outline} email-outline`}
        style={{
          writingMode: "sideways-lr",
          textOrientation: "mixed",
          letterSpacing: "0.06em",
          userSelect: "text",
          padding: "0.1em 0.15em",
          lineHeight: "1.05"
        }}
        title={`${emailInitial}@${domainObj.domain}`}
      >
        <span className={`${accents.highlight} ${accents.outline}`}>{emailInitial}</span>
        <span className={`mx-1 ${accents.atColor} font-bold`} style={{ textShadow: "none" }}>@</span>
        <span className={`${accents[domainObj.colorKey]} animate-email-domain ${accents.outline}`}>{domainObj.domain}</span>
      </span>
    );
  };

  return (
    <>
      {/* Social icons at right */}
      <div className="fixed z-30 flex flex-col items-center landing-content-hide-mobile"
        style={{
          top: 0,
          right: 'min(3vw, 2rem)',
        }}
      >
        <div className="w-[7px] h-10 bg-current rounded-full opacity-60 theme-outline" />
        <div className="flex flex-col gap-5 mt-2 items-center" style={{lineHeight: "1.05"}}>
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={`transition-transform duration-200 hover:scale-125 text-3xl md:text-4xl mb-1 ${accents.iconHover} ${accents.highlight} icon-outline`}
              style={{
                transitionDelay: `${i * 90}ms`,
                padding: "0.10em",
                display: "flex",
                lineHeight: "1.05"
              }}
              aria-label={s.label}
              title={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      {/* Email at left */}
      <div className="fixed z-30 flex flex-col items-center landing-content-hide-mobile"
        style={{
          bottom: 0,
          left: 'min(3vw, 2rem)',
        }}
      >
        {getSidewaysEmail()}
        <div className="w-[7px] h-10 bg-current rounded-full opacity-60 theme-outline mt-2" />
      </div>
      <style>
        {`
        .theme-outline, .icon-outline, .email-outline, .theme-outline * {
          text-shadow:
            -2px -2px 0 #000,
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000,
            0px 2px 0 #000,
            2px 0px 0 #000,
            0px -2px 0 #000,
            -2px 0px 0 #000;
        }
        .icon-outline svg {
          filter: drop-shadow(0 0 1.5px #000) drop-shadow(0 0 2px #000);
        }
        .email-outline {
          letter-spacing: 0.09em;
        }
        @keyframes email-domain {
          0% { opacity: 0; transform: translateY(-12px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-email-domain {
          animation: email-domain 0.5s both;
        }
        @media (max-width: 750px) {
          .landing-content-hide-mobile {
            display: none !important;
          }
        }
        `}
      </style>
    </>
  );
}