import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCoursera, SiGooglescholar, SiQwiklabs } from "react-icons/si";
import { GiMonkey } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { useTheme } from "../ThemeContext";

// AD Scientific Index: fallback to "AD" text styled as a logo
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

const images = [
  "/images/profile1.png",
  "/images/profile2.png",
  "/images/profile3.png",
];

const emailInitial = "ab007shetty";
const emailDomains = [
  { domain: "gmail.com", colorKey: "highlightDomain" },
  { domain: "outlook.com", colorKey: "highlightDomain2" },
  { domain: "icloud.com", colorKey: "highlightDomain3" },
];

const accentsMap = {
  icy: {
    highlight: "text-cyan-200",
    highlightDomain: "text-cyan-400",
    highlightDomain2: "text-pink-400",
    highlightDomain3: "text-lime-400",
    atColor: "text-white",
    outline: "theme-outline",
    buttonPrimary: "bg-cyan-500/90 hover:bg-cyan-400/80 text-white",
    buttonSecondary: "bg-white/80 text-cyan-700 hover:bg-white/60",
    shadow: "shadow-lg border-white/20",
    text: "text-cyan-50/80",
    iconHover: "hover:text-cyan-300",
  },
  hot: {
    highlight: "text-yellow-400",
    highlightDomain: "text-yellow-500",
    highlightDomain2: "text-pink-400",
    highlightDomain3: "text-lime-400",
    atColor: "text-white",
    outline: "theme-outline",
    buttonPrimary: "bg-yellow-400/90 hover:bg-yellow-300/80 text-yellow-900",
    buttonSecondary: "bg-white/90 text-yellow-700 hover:bg-yellow-100",
    shadow: "shadow-lg border-yellow-300/20",
    text: "text-yellow-950/80",
    iconHover: "hover:text-yellow-400",
  },
  dark: {
    highlight: "text-blue-300",
    highlightDomain: "text-blue-400",
    highlightDomain2: "text-pink-400",
    highlightDomain3: "text-lime-400",
    atColor: "text-white",
    outline: "theme-outline",
    buttonPrimary: "bg-blue-600/90 hover:bg-blue-500/80 text-white",
    buttonSecondary: "bg-white/80 text-blue-900 hover:bg-blue-100/80",
    shadow: "shadow-lg border-blue-900/20",
    text: "text-blue-200/80",
    iconHover: "hover:text-blue-300",
  }
};

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

export default function LandingContent({ accent }) {
  const { theme } = useTheme();
  const accents = accentsMap[theme] || accentsMap.icy;

  // Profile image animation (very slow and smooth fade)
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setImgIdx(idx => (idx + 1) % images.length), 6000); // 6s per image
    return () => clearInterval(interval);
  }, []);

  // Email domain animation
  const [domainIdx, setDomainIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setDomainIdx(idx => (idx + 1) % emailDomains.length),
      2100
    );
    return () => clearInterval(interval);
  }, []);

  // Compose sideways email, bottom-left, using writing-mode: sideways-lr
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
        <span className={`mx-1 ${accents.atColor} font-bold`} style={{textShadow: "none"}}>@</span>
        <span className={`${accents[domainObj.colorKey]} animate-email-domain ${accents.outline}`}>{domainObj.domain}</span>
      </span>
    );
  };

  // Both image and text section will use this consistent sizing
  const sectionBoxStyle = {
    flex: "1 1 0%",
    minWidth: "22rem",
    minHeight: "26rem",
    height: "100%",
    width: "100%",
    maxWidth: "32rem",
    maxHeight: "34rem"
  };

  return (
    <>
      <Navbar />

      {/* Social icons at right (vertical, top to down, thick line touches the top) */}
      <div className="fixed z-30 flex flex-col items-center"
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

      {/* Email at left, sideways from bottom left, thick line at the bottom, equal distance from left */}
      <div className="fixed z-30 flex flex-col items-center"
        style={{
          bottom: 0,
          left: 'min(3vw, 2rem)',
        }}
      >
        {getSidewaysEmail()}
        <div className="w-[7px] h-10 bg-current rounded-full opacity-60 theme-outline mt-2" />
      </div>

      <main className="relative z-20 flex flex-col lg:flex-row items-center justify-center min-h-[88vh] px-4 md:px-12 pt-20 pb-8 space-y-12 lg:space-y-0 lg:space-x-24">
        {/* Animated Profile Photo - Same height/width as content, slow fade animation, no glossy wrap */}
        <div
          className="flex items-center justify-center"
          style={sectionBoxStyle}
        >
          <div
            className="rounded-3xl overflow-hidden bg-transparent relative flex items-center justify-center"
            style={{
              ...sectionBoxStyle,
              aspectRatio: "1/1",
              background: "transparent",
              boxShadow: "none", // remove shadow/glossy
            }}
          >
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Profile ${i + 1}`}
                className={`
                  absolute rounded-3xl w-full h-full object-contain object-center
                  profile-img-fade
                  ${imgIdx === i ? "opacity-100 z-10" : "opacity-0 z-0"}
                `}
                style={{
                  transition: "opacity 2.4s cubic-bezier(.4,0,.2,1)", // very smooth and slow
                  background: "transparent",
                  borderRadius: "1.5rem"
                }}
              />
            ))}
          </div>
        </div>
        {/* Text */}
        <div
          className={`text-center lg:text-left max-w-xl bg-white/10 rounded-3xl p-8 backdrop-blur-xl ${accents.shadow} drop-shadow-lg flex items-center`}
          style={{
            ...sectionBoxStyle,
            boxShadow: "none", // remove shadow/glossy
          }}
        >
          <div className="w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              Namaste, 🙏
              <br />
              I'm
              <div className={accents.highlight + " block mt-1 mb-2 text-4xl md:text-5xl font-bold"}>
                Anirudha B Shetty
              </div>
            </h1>
            <p className={`text-lg md:text-xl mb-2 ${accents.text}`}>
              I love giving life to wild dreams. 
            </p>
            <p className={`text-base md:text-lg mb-6 ${accents.text}`}>
              & To be Honest, I don't know what I really am...
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/resume.pdf"
                download
                className={`px-6 py-3 rounded-md font-semibold transition backdrop-blur-sm shadow ${accents.buttonPrimary}`}
              >
                Download Resume
              </a>
              <a
                href="/contact"
                className={`px-6 py-3 rounded-md font-semibold transition shadow ${accents.buttonSecondary}`}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </main>
      <style>
        {`
        /* Outline for text (both theme and icons, email) */
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
        /* Very smooth and slow fade for profile images */
        .profile-img-fade {
          transition: opacity 2.4s cubic-bezier(.4,0,.2,1);
        }
        @keyframes slide-up {
          0% { opacity:0; transform: translateY(30px);}
          100% { opacity:1; transform: translateY(0);}
        }
        .animate-slide-up {
          animation: slide-up 0.7s cubic-bezier(.25,.46,.45,.94) both;
        }
        @keyframes email-domain {
          0% { opacity: 0; transform: translateY(-12px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-email-domain {
          animation: email-domain 0.5s both;
        }
        `}
      </style>
    </>
  );
}