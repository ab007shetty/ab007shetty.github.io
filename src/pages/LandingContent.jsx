import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

const images = [
  "/images/profile1.png",
  "/images/profile2.png",
  "/images/profile3.png",
];

const accentsMap = {
  icy: {
    highlight: "text-cyan-600",
    secondary: "text-gray-700",
    text: "text-gray-600",
    glassBackground: "bg-white/[0.08]",
    glassBorder: "border-white/[0.15]",
    buttonPrimary: "bg-cyan-500 hover:bg-cyan-400 text-white border-none",
    buttonSecondary: "bg-white/90 text-cyan-700 hover:bg-white border-none",
    imageBorder: "border-white/[0.2]",
    shadowColor: "rgba(255, 255, 255, 0.1)",
    nameColor: "text-cyan-600",
    backdropBlur: "backdrop-blur-[20px]",
  },
  hot: {
    highlight: "text-yellow-600",
    secondary: "text-white/80",
    text: "text-white/90",
    glassBackground: "bg-white/[0.08]",
    glassBorder: "border-white/[0.15]",
    buttonPrimary: "bg-yellow-400/90 hover:bg-yellow-300 text-yellow-900 border-none",
    buttonSecondary: "bg-white/90 text-yellow-700 hover:bg-yellow-100 border-none",
    imageBorder: "border-white/[0.2]",
    shadowColor: "rgba(255, 255, 255, 0.1)",
    nameColor: "text-yellow-600",
    backdropBlur: "backdrop-blur-[20px]",
  },
  dark: {
    highlight: "text-blue-400",
    secondary: "text-white/80",
    text: "text-white/90",
    glassBackground: "bg-white/[0.08]",
    glassBorder: "border-white/[0.15]",
    buttonPrimary: "bg-blue-600/90 hover:bg-blue-500 text-white border-none",
    buttonSecondary: "bg-white/90 text-blue-900 hover:bg-blue-100 border-none",
    imageBorder: "border-white/[0.2]",
    shadowColor: "rgba(255, 255, 255, 0.1)",
    nameColor: "text-blue-400",
    backdropBlur: "backdrop-blur-[20px]",
  }
};

const typewriterText = [
  "Full-Stack Developer",
  "AI Enthusiast",
  "Cloud Architect",
  "Problem Solver",
  "Dream Builder"
];

export default function LandingContent() {
  const { theme } = useTheme();
  const accents = accentsMap[theme] || accentsMap.icy;

  // Profile image animation
  const [imgIdx, setImgIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Typewriter effect
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse position for subtle parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => setImgIdx(idx => (idx + 1) % images.length), 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const fullText = typewriterText[textIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < fullText.length) {
        setCurrentText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % typewriterText.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  // Subtle mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main
      className="relative z-20 flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-2 md:px-8 py-8 space-y-8 md:space-y-0 md:space-x-10"
      style={{ width: "100vw", minHeight: "82vh" }}
    >
      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float opacity-40"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Profile Image Section */}
      <div
        className="flex items-center justify-center profile-pic-container"
        style={{
            flex: "0 0 auto",
            minWidth: "320px",
            minHeight: "320px",
            width: "100%",
            height: "100%",
            maxWidth: "420px",
            maxHeight: "620px",
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
            minHeight: 650,
            minWidth: 650,
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

      {/* Content Section - Side by Side with Image, Centered Card on Mobile */}
      <div
        className={`
          relative transition-all duration-1000 ease-out delay-200 w-full max-w-[580px]
          flex justify-center mx-auto
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
      >
        <div
          className={`
            ${accents.glassBackground} ${accents.backdropBlur} ${accents.glassBorder}
            border-2 rounded-[2rem] p-8 md:p-10 lg:p-12 relative overflow-hidden
            hover:scale-[1.01] transition-all duration-700 ease-out
            shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]
            before:absolute before:inset-0 before:rounded-[2rem] before:p-[1px]
            before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent before:-z-10
            mx-auto
          `}
          style={{
            maxWidth: 580,
            minWidth: 0,
            minHeight: "400px",
            transform: `translate(${-mousePos.x * 0.2}px, ${-mousePos.y * 0.2}px)`
          }}
        >
          <div className="relative z-10">
            {/* Greeting */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
                <span className="wave-animation inline-block">🙏</span>
                <span className="ml-3">Namaste!</span>
              </h1>

              <div className="text-lg md:text-xl lg:text-2xl mb-6">
                I'm{" "}
                <span
                  className={`font-bold text-2xl md:text-3xl lg:text-4xl ${accents.nameColor} drop-shadow-sm`}
                >
                  Anirudha B Shetty
                </span>
              </div>

              {/* Typewriter effect */}
              <div className="h-8 flex items-center md:justify-start justify-center">
                <span className={`text-lg md:text-xl ${accents.secondary} font-mono`}>
                  {currentText}
                  <span className="animate-blink ml-1">|</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className={`space-y-4 mb-10 ${accents.text} text-center md:text-left`}>
              <p className="text-lg md:text-xl leading-relaxed animate-fade-in-up">
                I love giving life to <span className={`${accents.highlight} font-semibold`}>wild dreams</span> through code.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400 justify-center md:justify-start">
              <a
                href="/resume.pdf"
                download
                className={`
                  group px-8 py-4 rounded-2xl font-semibold transition-all duration-300
                  ${accents.buttonPrimary}
                  transform hover:scale-105 hover:-translate-y-1
                  shadow-lg hover:shadow-xl
                  relative overflow-hidden text-center
                  whitespace-nowrap flex-1 sm:flex-none min-w-[200px]
                `}
              >
                <span className="relative z-10">Download Resume</span>
                <div className="freeze-effect" />
              </a>

              <button
                type="button"
                className={`
                  group px-8 py-4 rounded-2xl font-semibold transition-all duration-300
                  ${accents.buttonSecondary}
                  transform hover:scale-105 hover:-translate-y-1
                  shadow-lg hover:shadow-xl
                  relative overflow-hidden text-center
                  whitespace-nowrap flex-1 sm:flex-none min-w-[200px]
                `}
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="relative z-10">Let's Connect</span>
                <div className="freeze-effect" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .freeze-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, 
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease-out;
        }

        .group:hover .freeze-effect {
          transform: translateX(100%);
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .wave-animation { animation: wave 2s ease-in-out infinite; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }

        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        .profile-img-fade {
          transition: opacity 2.4s cubic-bezier(.4,0,.2,1);
        }

        @media (max-width: 1023px) {
          .profile-pic-container {
            min-width: 190px !important;
            min-height: 190px !important;
            max-width: 250px !important;
            max-height: 250px !important;
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
        }
        @media (max-width: 640px) {
          .profile-pic-container {
            min-width: 92vw !important;
            min-height: 92vw !important;
            max-width: 99vw !important;
            max-height: 99vw !important;
          }
        }
      `}</style>
    </main>
  );
}