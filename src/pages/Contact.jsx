import React, { useState, useEffect } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaRocket, FaLightbulb, FaHeart, FaReact,
  FaGithub, FaLinkedin, FaInstagram
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGooglescholar, SiQwiklabs } from "react-icons/si";
import { useTheme } from "../ThemeContext";

// =================== Theme Styles ===================
const themeStyles = {
  icy: {
    cardBg: "bg-white/15 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/25 hover:border-cyan-300/40",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-cyan-600",
    icon: "text-cyan-600",
    footerBg: "bg-gradient-to-t from-white/20 to-white/10 backdrop-blur-xl border-t border-white/20",
    primaryButton: "bg-cyan-500 hover:bg-cyan-600 text-white",
    glow: "shadow-cyan-400/20"
  },
  hot: {
    cardBg: "bg-yellow-50/15 backdrop-blur-xl border-yellow-300/20",
    cardHover: "hover:bg-yellow-50/25 hover:border-yellow-400/40",
    text: "text-yellow-900",
    textSecondary: "text-yellow-800",
    accent: "text-yellow-600",
    icon: "text-yellow-600",
    footerBg: "bg-gradient-to-t from-yellow-50/20 to-yellow-50/10 backdrop-blur-xl border-t border-yellow-300/20",
    primaryButton: "bg-yellow-500 hover:bg-yellow-600 text-white",
    glow: "shadow-yellow-400/20"
  },
  dark: {
    cardBg: "bg-gray-900/15 backdrop-blur-xl border-gray-700/20",
    cardHover: "hover:bg-gray-900/25 hover:border-blue-500/40",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    icon: "text-blue-400",
    footerBg: "bg-gradient-to-t from-gray-900/20 to-gray-900/10 backdrop-blur-xl border-t border-gray-700/20",
    primaryButton: "bg-blue-600 hover:bg-blue-700 text-white",
    glow: "shadow-blue-400/20"
  }
};

const emailInitial = "ab007shetty";
const emailDomains = [
  { domain: "gmail.com", color: "#06b622" },
  { domain: "outlook.com", color: "#ec4899" },
  { domain: "icloud.com", color: "#a56635" }
];

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "", // handled in ContactCard for animation
    link: "mailto:ab007shetty@gmail.com",
    description: "Only active on Gmail"
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+91 8150071512",
    link: "tel:+918150071512",
    description: "Call may not connect as there's no balance"
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Bennekudru, Karnataka",
    link: "https://maps.google.com/?q=Udupi,Karnataka",
    description: "Technically not an island anymore"
  }
];

const socialLinks = [
  {
    icon: <FaGithub />,
    name: "GitHub",
    url: "https://github.com/ab007shetty",
    color: "text-gray-800 dark:text-gray-200",
    description: "2nd Fav Hub"
  },
  {
    icon: <FaLinkedin />,
    name: "LinkedIn",
    url: "https://linkedin.com/in/ab007shetty",
    color: "text-blue-600",
    description: "Thinking of Uninstalling"
  },
  {
    icon: <FaXTwitter />,
    name: "X",
    url: "https://x.com/abshetr",
    color: "text-blue-400",
    description: "Place to pick Fights"
  },
  {
    icon: <FaInstagram />,
    name: "Instagram",
    url: "https://www.instagram.com/abshetr",
    color: "text-pink-500",
    description: "No life behind the code"
  },
  {
    icon: <SiGooglescholar />,
    name: "Google Scholar",
    url: "https://scholar.google.com/citations?user=i1vJxMYAAAAJ",
    color: "text-blue-500",
    description: "Im not a Scholar"
  },
  {
    icon: <SiQwiklabs />,
    name: "Qwiklabs",
    url: "https://www.qwiklabs.com/public_profiles/a71f17d6-36af-4e30-b70f-8771bf211324",
    color: "text-green-500",
    description: "Just for Goodies"
  }
];

// Contact Card with animated domain for email
const ContactCard = ({ contact, index, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const styles = themeStyles[theme];
  const [domainIdx, setDomainIdx] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (contact.label !== "Email") return;
    const interval = setInterval(
      () => setDomainIdx(idx => (idx + 1) % emailDomains.length),
      2100
    );
    return () => clearInterval(interval);
  }, [contact.label]);

  return (
    <a
      href={contact.link}
      target={contact.link.startsWith('http') ? "_blank" : "_self"}
      rel={contact.link.startsWith('http') ? "noopener noreferrer" : undefined}
      className={`block p-6 rounded-2xl border transition-all duration-700 ${styles.cardBg} ${styles.cardHover} shadow-lg transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} group overflow-x-auto`}
      style={{ transitionDelay: `${index * 100}ms`, maxWidth: "100%" }}
    >
      <div className="flex items-start gap-4 min-w-0">
        <div className={`p-3 rounded-xl ${styles.cardBg} border group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <span className={`text-2xl ${styles.icon}`}>{contact.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold ${styles.text} mb-1`}>{contact.label}</h3>
          <p className={`text-base font-semibold ${styles.accent} mb-2 break-all`}>
            {contact.label === "Email" ? (
              <span
                className="transition-colors font-mono cursor-pointer inline-block"
                title={`${emailInitial}@${emailDomains[domainIdx].domain}`}
                style={{
                  letterSpacing: "0.06em",
                  userSelect: "text",
                  padding: "0.1em 0.15em",
                  fontSize: "1.05em",
                  wordBreak: "break-all",
                  maxWidth: "100%",
                }}
              >
                <span>{emailInitial}</span>
                <span className={`mx-1 font-bold`} style={{ textShadow: "none" }}>@</span>
                <span
                  className="animate-email-domain font-bold"
                  style={{
                    color: emailDomains[domainIdx].color,
                    animation: "email-domain 0.5s both"
                  }}
                >
                  {emailDomains[domainIdx].domain}
                </span>
              </span>
            ) : contact.value}
          </p>
          <p className={`text-sm ${styles.textSecondary}`}>{contact.description}</p>
        </div>
      </div>
      <style>
        {`
        @keyframes email-domain {
          0% { opacity: 0; transform: translateY(-12px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-email-domain {
          animation: email-domain 0.5s both;
        }
        `}
      </style>
    </a>
  );
};

// Social card (old card grid style)
const SocialCard = ({ social, index, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const styles = themeStyles[theme];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-xl border transition-all duration-500 ${styles.cardBg} ${styles.cardHover} shadow-lg transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} group`}
      style={{ transitionDelay: `${index * 75}ms` }}
      aria-label={social.name}
      title={social.name}
    >
      <div className="text-center">
        <div className={`inline-flex p-3 rounded-lg ${styles.cardBg} border mb-3 group-hover:scale-110 transition-transform duration-300`}>
          <span className={`text-2xl ${social.color}`}>{social.icon}</span>
        </div>
        <h3 className={`font-semibold ${styles.text} mb-1`}>{social.name}</h3>
        <p className={`text-xs ${styles.textSecondary}`}>{social.description}</p>
      </div>
    </a>
  );
};

export default function Contact() {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 relative">
      {/* Header centered */}
      <div className="mb-16 flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className={`text-5xl md:text-6xl font-bold ${styles.text} mb-4`}>
            Get In <span className={styles.accent}>Touch</span>
          </h1>
          <p className={`text-xl ${styles.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            Stuck, bored, or sad? You know where to find me!
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${styles.text} mb-4 flex items-center justify-center gap-3`}>
            <FaRocket className={`${styles.accent} mr-2`} />
            Hire Me
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {contactInfo.map((contact, index) => (
            <ContactCard key={contact.label} contact={contact} index={index} theme={theme} />
          ))}
        </div>
      </div>

      {/* Social Links (old card grid style) */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${styles.text} mb-4 flex items-center justify-center gap-3`}>
            <FaLightbulb className={styles.accent} />
            Follow My Journey
          </h2>
          <p className={`${styles.textSecondary} text-lg`}>
            Stay updated with my latest projects and tech insights
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {socialLinks.map((social, index) => (
            <SocialCard key={social.name} social={social} index={index} theme={theme} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={`relative mt-20 ${styles.footerBg}`}>
        <div className={`border-t border-opacity-20 ${styles.cardBg} backdrop-blur-xl`}>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className={`text-sm ${styles.textSecondary} text-center md:text-left break-words w-full`}>
                <p className="flex items-center justify-center md:justify-start gap-2 flex-wrap break-all w-full">
                  © {currentYear} Anirudha B Shetty. Made with
                  <FaHeart className={`${styles.accent} animate-pulse`} />
                  in India
                </p>
              </div>
              {/* Fix: Always force 'Powered by React' to be a single line on desktop */}
              <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                <span className={styles.textSecondary}>Powered by</span>
                <FaReact className={`${styles.accent} animate-spin-slow`} />
                <span className={styles.textSecondary}>React</span>
              </div>
            </div>
          </div>
        </div>
        {/* Custom CSS for animations */}
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg);}
            to { transform: rotate(360deg);}
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-spin-slow, .animate-pulse { animation: none; }
          }
        `}</style>
      </footer>
    </div>
  );
}