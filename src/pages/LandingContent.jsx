import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

const images = [
  "/images/profile1.png",
  "/images/profile2.png",
  "/images/profile3.png",
];

const accentsMap = {
  icy: {
    highlight: "text-cyan-200",
    shadow: "shadow-lg border-white/20",
    text: "text-cyan-50/80",
    buttonPrimary: "bg-cyan-500/90 hover:bg-cyan-400/80 text-white",
    buttonSecondary: "bg-white/80 text-cyan-700 hover:bg-white/60",
  },
  hot: {
    highlight: "text-yellow-400",
    shadow: "shadow-lg border-yellow-300/20",
    text: "text-yellow-950/80",
    buttonPrimary: "bg-yellow-400/90 hover:bg-yellow-300/80 text-yellow-900",
    buttonSecondary: "bg-white/90 text-yellow-700 hover:bg-yellow-100",
  },
  dark: {
    highlight: "text-blue-300",
    shadow: "shadow-lg border-blue-900/20",
    text: "text-blue-200/80",
    buttonPrimary: "bg-blue-600/90 hover:bg-blue-500/80 text-white",
    buttonSecondary: "bg-white/80 text-blue-900 hover:bg-blue-100/80",
  }
};

export default function LandingContent() {
  const { theme } = useTheme();
  const accents = accentsMap[theme] || accentsMap.icy;

  // Profile image animation (very slow and smooth fade)
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setImgIdx(idx => (idx + 1) % images.length), 6000); // 6s per image
    return () => clearInterval(interval);
  }, []);

  // Sizing for image and text
  // On desktop: side by side, text comes from right
  // On mobile: stacked, but image still large
  return (
    <main
      className="relative z-20 flex flex-col lg:flex-row items-center justify-center min-h-[90vh] px-2 md:px-8 py-8 space-y-8 lg:space-y-0 lg:space-x-24"
      style={{ width: "100vw", minHeight: "82vh" }}
    >
      {/* Profile image */}
      <div
        className="flex items-center justify-center profile-pic-container"
        style={{
          flex: "0 0 auto",
          minWidth: "390px",
          minHeight: "390px",
          width: "100%",
          height: "100%",
          maxWidth: "650px",
          maxHeight: "650px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="rounded-3xl overflow-hidden bg-transparent relative flex items-center justify-center"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 340,
            minWidth: 340,
            maxWidth: 650,
            maxHeight: 650,
            aspectRatio: "1/1",
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
                transition: "opacity 2.4s cubic-bezier(.4,0,.2,1)",
                background: "transparent",
                borderRadius: "1.5rem"
              }}
            />
          ))}
        </div>
      </div>
      {/* Text */}
      <div
        className={`text-center lg:text-left bg-white/10 rounded-3xl p-10 md:p-12 backdrop-blur-xl ${accents.shadow} drop-shadow-lg flex items-center landing-text-animate`}
        style={{
          flex: "1 1 0%",
          maxWidth: 580,
          minWidth: 390,
          minHeight: 390,
          fontSize: "1.18rem"
        }}
      >
        <div className="w-full">
          <h1
            className="font-bold mb-2 drop-shadow-lg"
            style={{
              fontSize: "2.5rem",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap", // keeps it in one line
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            Namaste, 🙏
            <br />
            I'm{" "}
            <span
              className={accents.highlight + " font-bold"}
              style={{
                fontSize: "2.8rem",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                display: "inline-block",
                verticalAlign: "middle"
              }}
            >
              Anirudha B Shetty
            </span>
          </h1>
          <p className={`text-xl md:text-xl mb-2 ${accents.text}`}>
            I love giving life to wild dreams.
          </p>
          <p className={`text-lg md:text-xl mb-6 ${accents.text}`}>
            & More than that, I also don't know what I really am...
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <a
              href="/resume.pdf"
              download
              className={`px-8 py-4 rounded-md font-semibold transition backdrop-blur-sm shadow ${accents.buttonPrimary}`}
            >
              Download Resume
            </a>
            <button
  type="button"
  className={`px-8 py-4 rounded-md font-semibold transition shadow ${accents.buttonSecondary}`}
  onClick={() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Contact Me
</button>
          </div>
        </div>
      </div>
      <style>
        {`
        .profile-img-fade {
          transition: opacity 2.4s cubic-bezier(.4,0,.2,1);
        }
        @media (max-width: 1023px) {
          .profile-pic-container {
            min-width: 270px !important;
            min-height: 270px !important;
            max-width: 350px !important;
            max-height: 350px !important;
          }
        }
        @media (max-width: 750px) {
          .profile-pic-container {
            min-width: 80vw !important;
            min-height: 80vw !important;
            max-width: 90vw !important;
            max-height: 90vw !important;
          }
          .profile-img-fade {
            max-width: 100vw !important;
            max-height: 100vw !important;
          }
          .landing-text-animate {
            margin-top: 2.5rem !important;
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: 98vw !important;
            padding: 1.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .profile-pic-container {
            min-width: 92vw !important;
            min-height: 92vw !important;
            max-width: 99vw !important;
            max-height: 99vw !important;
          }
        }
        .landing-text-animate {
          animation: slideInRight 0.9s cubic-bezier(.25,.8,.25,1) both;
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        `}
      </style>
    </main>
  );
}