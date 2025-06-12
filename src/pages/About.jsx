import React, { useState } from "react";
import {
  FaBriefcase, FaGraduationCap, FaCode, FaTrophy, FaBuilding, FaSchool, FaUniversity,
  FaServer, FaTools, FaDatabase, FaCheckCircle, FaExternalLinkAlt,
  FaMapMarkerAlt, FaCalendarAlt, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJira, FaBug, FaJava, FaCloud
} from "react-icons/fa";
import {
  SiPython, SiJavascript, SiC, SiCsharp, SiPhp, SiRedux, SiPostman, SiBootstrap, SiTailwindcss, SiExpress, SiMysql, SiMongodb, SiJest, SiBitbucket, SiFirebase, SiRailway, SiVercel, SiDjango, SiMicrosoftsqlserver, SiCloudera
} from "react-icons/si";
import { FaChrome } from "react-icons/fa";
import { useTheme } from "../ThemeContext";

// ========== THEME STYLES (certificate style) ==========
const themeStyles = {
  icy: {
    cardBg: "bg-white/15 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/25 hover:border-cyan-300/40 hover:shadow-cyan-400/20",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-cyan-600",
    cardTitle: "font-bold text-gray-800",
    cardDesc: "font-normal text-gray-700",
    percent: "text-cyan-500",
    barBg: "bg-cyan-100/50",
    bar: "from-cyan-400 to-cyan-200",
    button: "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-800 border-cyan-400/40",
    glow: "shadow-cyan-400/20",
    badge: "bg-cyan-100/30 text-cyan-800 border-cyan-300/40",
    filterActive: "bg-cyan-500/30 text-cyan-800 border-cyan-400/60",
    sidebarActive: "bg-cyan-500/90 text-gray-900 border-cyan-400 font-bold", // <--- fix here
    sidebar: "text-cyan-900 hover:text-cyan-700"
  },
  hot: {
    cardBg: "bg-yellow-50/15 backdrop-blur-xl border-yellow-300/20",
    cardHover: "hover:bg-yellow-50/25 hover:border-yellow-400/40 hover:shadow-yellow-400/20",
    text: "text-yellow-900",
    textSecondary: "text-yellow-800",
    accent: "text-yellow-600",
    cardTitle: "font-bold text-yellow-900",
    cardDesc: "font-normal text-yellow-800",
    percent: "text-yellow-600",
    barBg: "bg-yellow-100/50",
    bar: "from-yellow-400 to-yellow-200",
    button: "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-900 border-yellow-500/40",
    glow: "shadow-yellow-400/20",
    badge: "bg-yellow-100/30 text-yellow-900 border-yellow-400/40",
    filterActive: "bg-yellow-500/30 text-yellow-900 border-yellow-500/60",
    sidebarActive: "bg-yellow-400/90 text-yellow-900 border-yellow-500 font-bold", // <--- fix here
    sidebar: "text-yellow-900 hover:text-yellow-700"
  },
  dark: {
    cardBg: "bg-gray-900/15 backdrop-blur-xl border-gray-700/20",
    cardHover: "hover:bg-gray-900/25 hover:border-blue-500/40 hover:shadow-blue-400/20",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    cardTitle: "font-bold text-gray-100",
    cardDesc: "font-normal text-gray-300",
    percent: "text-blue-400",
    barBg: "bg-blue-900/50",
    bar: "from-blue-400 to-blue-900",
    button: "bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border-blue-500/40",
    glow: "shadow-blue-400/20",
    badge: "bg-blue-900/30 text-blue-200 border-blue-500/40",
    filterActive: "bg-blue-600/30 text-blue-200 border-blue-500/60",
    sidebarActive: "bg-blue-900 text-blue-200 border-blue-400 font-bold", // <--- fix here
    sidebar: "text-blue-200 hover:text-blue-400"
  }
};

const allSkillDetails = [
  { key: "python", name: "Python", icon: <SiPython className="text-yellow-500"/>, desc: "Programming Language", percent: 90 },
  { key: "java", name: "Java", icon: <FaJava className="text-red-500"/>, desc: "Programming Language", percent: 85 },
  { key: "js", name: "Javascript", icon: <SiJavascript className="text-yellow-400"/>, desc: "Programming Language", percent: 92 },
  { key: "php", name: "PHP", icon: <SiPhp className="text-indigo-400"/>, desc: "Programming Language", percent: 80 },
  { key: "sql", name: "SQL", icon: <SiMicrosoftsqlserver className="text-red-800"/>, desc: "Programming Language", percent: 75 },
  { key: "react", name: "React.js", icon: <FaReact className="text-cyan-400"/>, desc: "Front-End Framework", percent: 88 },
  { key: "redux", name: "Redux.js", icon: <SiRedux className="text-purple-600"/>, desc: "State Management", percent: 78 },
  { key: "bootstrap", name: "Bootstrap", icon: <SiBootstrap className="text-purple-700"/>, desc: "CSS Framework", percent: 82 },
  { key: "tailwind", name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400"/>, desc: "CSS Framework", percent: 84 },
  { key: "nodejs", name: "Node.js", icon: <FaNodeJs className="text-green-600"/>, desc: "Backend Runtime", percent: 85 },
  { key: "express", name: "Express.js", icon: <SiExpress className="text-black dark:text-white"/>, desc: "Backend Framework", percent: 80 },
  { key: "django", name: "Django", icon: <SiDjango className="text-green-900"/>, desc: "Backend Framework", percent: 75 },
  { key: "restapi", name: "RESTful APIs", icon: <FaServer className="text-blue-400"/>, desc: "API Design", percent: 82 },
  { key: "gcp", name: "Google Cloud Platform", icon: <FaCloud className="text-blue-400"/>, desc: "Cloud Platform", percent: 72 },
  { key: "mongodb", name: "MongoDB", icon: <SiMongodb className="text-green-500"/>, desc: "NoSQL Database", percent: 84 },
  { key: "mysql", name: "MySQL", icon: <SiMysql className="text-blue-700"/>, desc: "RDBMS", percent: 80 },
  { key: "firebase", name: "Firebase", icon: <SiFirebase className="text-yellow-500"/>, desc: "Cloud Database", percent: 77 },
  { key: "cloudera", name: "Cloudera", icon: <SiCloudera className="text-yellow-900"/>, desc: "Big Data Platform", percent: 70 },
  { key: "jest", name: "Jest", icon: <SiJest className="text-pink-600"/>, desc: "Testing", percent: 78 },
  { key: "postman", name: "Postman", icon: <SiPostman className="text-orange-500"/>, desc: "API Testing", percent: 86 },
  { key: "chromedevtools", name: "Chrome Dev Tools", icon: <FaChrome className="text-blue-500"/>, desc: "Debugging", percent: 85 },
  { key: "git", name: "Git", icon: <FaGitAlt className="text-orange-700"/>, desc: "Version Control", percent: 92 },
  { key: "bitbucket", name: "Bitbucket", icon: <SiBitbucket className="text-blue-600"/>, desc: "Version Control", percent: 72 },
  { key: "docker", name: "Docker", icon: <FaDocker className="text-blue-500"/>, desc: "Containerization", percent: 85 },
  { key: "railway", name: "Railway", icon: <SiRailway className="text-indigo-400"/>, desc: "Cloud Deployment", percent: 69 },
  { key: "vercel", name: "Vercel", icon: <SiVercel className="text-black dark:text-white"/>, desc: "Cloud Deployment", percent: 72 },
  { key: "jira", name: "Jira", icon: <FaJira className="text-blue-500"/>, desc: "Project Management", percent: 78 },
  { key: "agile", name: "Agile & Scrum", icon: <FaTools className="text-green-600"/>, desc: "Methodology", percent: 80 },
];

// GROUPS
const skillSections = [
  { group: "Programming Languages", icon: <FaCode className="text-yellow-600" />, keys: ["python", "java", "js", "php", "sql"] },
  { group: "Front-End Development", icon: <FaReact className="text-cyan-400" />, keys: ["react", "redux", "bootstrap", "tailwind"] },
  { group: "Back-End Development", icon: <FaServer className="text-blue-500" />, keys: ["nodejs", "express", "django", "restapi"] },
  { group: "Databases", icon: <FaDatabase className="text-orange-700" />, keys: ["mongodb", "mysql", "firebase", "cloudera"] },
  { group: "Testing & Debugging", icon: <FaBug className="text-red-500" />, keys: ["jest", "postman", "chromedevtools"] },
  { group: "DevOps & Deployment", icon: <FaTools className="text-green-600" />, keys: ["git", "bitbucket", "docker", "railway", "vercel", "gcp"] },
  { group: "Project Management", icon: <FaJira className="text-blue-500" />, keys: ["jira", "agile"] }
];

// HIGHLIGHTS, EXPERIENCE, EDUCATION (unchanged, except education label color)
const highlights = [
  { emoji: "🎓", text: "Completed 100+ courses on Coursera.", link: "https://www.coursera.org/user/9a1f6f65c70233a4cbf41887f48e0c06" },
  { emoji: "☁️", text: "Google Cloud Arcade Champion — completed 300+ Google Cloud Qwiklabs.", link: "https://www.cloudskillsboost.google/public_profiles/a71f17d6-36af-4e30-b70f-8771bf211324" },
  { emoji: "🏅", text: "Hackothsav National Finalist: Consolation prize winner in a national-level hackathon.", link: "" },
  { emoji: "🌟", text: "Ranked among Top 6000 GitHub developers (India) with 150+ stars and 50+ forks.", link: "https://stardev.io/developers/ab007shetty#country-badge" },
  { emoji: "📄", text: 'Authored a research paper: "Facial Recognition Using Haar Cascade and LBP Classifiers", 100+ citations (Elsevier).', link: "https://scholar.google.com/citations?user=i1vJxMYAAAAJ" }
];

const experienceGroups = [
  {
    label: "Infosys",
    entries: [{ title: "Systems Engineer", company: "Infosys", location: "Mysuru, Karnataka", period: "2022 - 2023", description: [
      "Worked on web application development and maintenance for enterprise clients.",
      "Collaborated with cross-functional teams to deliver high-quality software.",
      "Automated deployment processes and implemented CI/CD pipelines."
    ], skills: ["Java", "Spring Boot", "React", "CI/CD", "SQL Server", "Git"] }]
  },
  {
    label: "Digitran Technologies",
    entries: [{ title: "Software Developer", company: "Digitran Technologies", location: "Bengaluru, Karnataka", period: "2021 - 2022", description: [
      "Developed and maintained SaaS products for logistics and healthcare.",
      "Integrated REST APIs and enhanced system performance.",
      "Worked in an Agile team and participated in code reviews."
    ], skills: ["Node.js", "React.js", "MongoDB", "REST APIs", "Agile"] }]
  }
];

const educationGroups = [
  {
    label: "SSLC (10th Grade)",
    icon: <FaSchool className="text-cyan-500" />,
    entries: [{  institution: "Maryknoll High School, Udupi", period: "2015", location: "Udupi, Karnataka", grade: "96.16% – Secured 6th place at the district level in Kannada medium." }]
  },
  {
    label: "PU Course (PCMB)",
    icon: <FaGraduationCap className="text-yellow-600" />,
    entries: [{  institution: "Viveka PU College, Udupi", period: "2017", location: "Udupi, Karnataka", grade: "87.83% – PCMB" }]
  },
  {
    label: "B.E. – Computer Science",
    icon: <FaUniversity className="text-blue-500" />,
    entries: [{  institution: "Shri Madhwa Vadiraja Institute of Technology and Management, Udupi", period: "2021", location: "Udupi, Karnataka", grade: "7.38 CGPA" }]
  }
];

// ========== COMPONENTS ==========
function MainTabBar({ activeTab, setActiveTab, styles }) {
  const tabs = [
    { id: "skills", label: "Skills", icon: <FaCode /> },
    { id: "highlights", label: "Highlights", icon: <FaTrophy /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase /> },
    { id: "education", label: "Education", icon: <FaGraduationCap /> }
  ];
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mb-12 gap-3 sm:gap-0">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto justify-center
            ${activeTab === tab.id
              ? `${styles.button} border ${styles.glow} shadow-lg scale-105`
              : `${styles.textSecondary} hover:${styles.text}`
            }`}
          style={{ minWidth: 170 }}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

function SideTabBar({ groups, activeIndex, setActiveIndex, iconMap = {} }) {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  return (
    <div className="flex flex-wrap md:flex-col gap-2 md:pr-6 mb-4 md:mb-0 w-full md:w-auto">
      {groups.map((g, idx) => (
        <button
          key={g.label || g.group}
          onClick={() => setActiveIndex(idx)}
          className={`
            w-1/2 md:w-full text-left px-5 py-3 rounded-xl font-semibold transition-all duration-300 border flex items-center gap-2 justify-center md:justify-start text-base
            ${activeIndex === idx
              ? `${styles.sidebarActive} border-2`
              : `${styles.sidebar} border-transparent`}
          `}
        >
          {iconMap && iconMap[g.label || g.group] ? iconMap[g.label || g.group] : g.icon}
          <span className="whitespace-pre-line">{g.label || g.group}</span>
        </button>
      ))}
    </div>
  );
}

function SkillCard({ skill, styles }) {
  return (
    <div
      className={`
        ${styles.cardBg} ${styles.cardHover} border rounded-2xl
        transition-all duration-300 transform ${styles.glow} shadow-lg
        hover:scale-105
      `}
      style={{
        minHeight: 110,
        padding: "1.2rem 1.4rem",
        border: "1.5px solid rgba(0,195,255,0.11)",
        margin: "0 auto",
        width: "100%",
        maxWidth: "100%",
        backdropFilter: "blur(7px)"
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{skill.icon}</span>
          <div>
            <div className={`text-[18px] ${styles.cardTitle}`}>{skill.name}</div>
            <div className={`text-[15px] ${styles.cardDesc}`} style={{marginTop: -2}}>{skill.desc}</div>
          </div>
        </div>
        <div className={`font-bold text-xl ${styles.percent}`}>{skill.percent}%</div>
      </div>
      {/* Progress Bar */}
      <div className="w-full mt-2 mb-1">
        <div className={`h-[6px] rounded-full relative overflow-hidden ${styles.barBg}`}>
          <div
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${styles.bar}`}
            style={{
              width: `${skill.percent}%`,
              background: styles.bar === "from-cyan-400 to-cyan-200"
                ? "linear-gradient(90deg, #22d3ee 25%, #a5f3fc 100%)"
                : styles.bar === "from-yellow-400 to-yellow-200"
                ? "linear-gradient(90deg, #facc15 25%, #fef08a 100%)"
                : "linear-gradient(90deg, #60a5fa 25%, #1e3a8a 100%)"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// ========== MAIN ==========
export default function About() {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const [activeTab, setActiveTab] = useState("skills");
  const [skillsTab, setSkillsTab] = useState(0);
  const [expTab, setExpTab] = useState(0);
  const [eduTab, setEduTab] = useState(0);

  const experienceIcons = { Infosys: <FaBuilding />, "Digitran Technologies": <FaBuilding /> };
  const skillGroupIcons = {};
  skillSections.forEach(s => { skillGroupIcons[s.group] = s.icon; });

  // Education heading coloring per theme
  const edulabelStyle = `text-2xl font-bold ${styles.text}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className={`text-5xl md:text-6xl font-bold ${styles.text} mb-4`}>
          About <span className={styles.accent}>Me</span>
        </h1>
        <p className={`text-xl ${styles.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
          Passionate Full-Stack Developer with 3.5 years of Professional Experience.
        </p>
      </div>
      <MainTabBar activeTab={activeTab} setActiveTab={setActiveTab} styles={styles} />
      <div className="min-h-[600px] transition-all duration-500">
        {/* Skills */}
        {activeTab === "skills" && (
          <div className="flex flex-col md:flex-row gap-10 animate-fadein">
            <SideTabBar
              groups={skillSections}
              activeIndex={skillsTab}
              setActiveIndex={setSkillsTab}
              iconMap={skillGroupIcons}
            />
            <div className="flex-1 transition-all duration-500">
              <div className="mb-6 flex items-center gap-2">
                {skillSections[skillsTab].icon}
                <h2 className={`text-2xl font-bold ${styles.text} mb-3`}>
                  {skillSections[skillsTab].group}
                </h2>
              </div>
              <div className="flex flex-wrap gap-5 skills-grid">
                {skillSections[skillsTab].keys.map((key, i) => {
                  const skill = allSkillDetails.find(s => s.key === key);
                  if (!skill) return null;
                  return (
                    <div
                      key={key}
                      style={{
                        flex: "1 1 48%",
                        minWidth: "48%",
                        maxWidth: "100%",
                        margin: "0 auto"
                      }}
                    >
                      <SkillCard skill={skill} styles={styles} />
                    </div>
                  );
                })}
              </div>
              <style>{`
                @media (max-width:900px) {
                  .skills-grid > div { flex-basis: 48% !important; min-width: 48% !important; }
                }
                @media (max-width:700px) {
                  .skills-grid > div { flex-basis: 100% !important; min-width: 100% !important; }
                }
              `}</style>
            </div>
          </div>
        )}
        {/* Highlights */}
        {activeTab === "highlights" && (
          <div className="w-full transition-all duration-500 animate-fadein">
            <div className={`w-full mx-auto ${styles.cardBg} ${styles.cardHover} border rounded-2xl shadow-xl p-7 ${styles.glow} transition-all duration-500`}>
              <div className="flex items-center mb-6 gap-3">
                <FaTrophy className={`text-3xl ${styles.accent}`} />
                <h2 className={`text-3xl font-bold ${styles.text}`}>Highlights</h2>
              </div>
              <ul className="flex flex-col gap-6 w-full">
                {highlights.map((ach, i) => (
                  <li key={i} className="flex gap-4 items-start animate-slideup" style={{ animationDelay: `${i * 0.11}s` }}>
                    <span className="text-2xl mt-1 leading-none select-none">{ach.emoji}</span>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center gap-2 text-lg font-medium">
                        <span className={`${styles.text}`}>{ach.text}</span>
                        {ach.link &&
                          <a
                            href={ach.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`ml-1 ${styles.accent} hover:underline inline-flex items-center`}
                          >
                            <FaExternalLinkAlt className="text-sm" />
                          </a>
                        }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Experience */}
        {activeTab === "experience" && (
          <div className="flex flex-col md:flex-row gap-10 animate-fadein">
            <SideTabBar
              groups={experienceGroups}
              activeIndex={expTab}
              setActiveIndex={setExpTab}
              iconMap={experienceIcons}
            />
            <div className="flex-1">
              {experienceGroups[expTab].entries.map((exp, idx) => (
                <div
                  key={idx}
                  className={`mb-8 p-6 rounded-2xl border ${styles.cardBg} ${styles.cardHover} ${styles.glow} shadow-lg animate-slideup`}
                  style={{ animationDelay: `${idx * 0.12}s` }}
                >
                  <div className="flex flex-wrap gap-2 mb-3 items-center">
                    <span className={`text-lg font-bold ${styles.text}`}>{exp.title}</span>
                    <span className={`text-base font-semibold ${styles.accent}`}>{exp.company}</span>
                    <span className={`flex items-center gap-2 text-sm ${styles.textSecondary}`}>
                      <FaCalendarAlt className="text-xs" />
                      {exp.period}
                    </span>
                    <span className={`flex items-center gap-2 text-sm ${styles.textSecondary}`}>
                      <FaMapMarkerAlt className="text-xs" />
                      {exp.location}
                    </span>
                  </div>
                  <ul className={`mb-3 pl-0 flex flex-col gap-2`}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="mt-1 text-cyan-400">
                          <FaCheckCircle className="text-base" />
                        </span>
                        <span className={`${styles.textSecondary}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-xs ${styles.button} border`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Education */}
        {activeTab === "education" && (
          <div className="flex flex-col md:flex-row gap-7 items-stretch animate-fadein">
            {educationGroups.map((edu, idx) => (
              <div
                key={edu.label}
                className={`flex-1 min-w-[260px] mb-8 md:mb-0 p-6 rounded-2xl border ${styles.cardBg} ${styles.cardHover} ${styles.glow} shadow-lg flex flex-col gap-4 items-center animate-slideup`}
                style={{ animationDelay: `${idx * 0.16}s` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  {edu.icon}
                  <span className={edulabelStyle}>{edu.label}</span>
                </div>
                {edu.entries.map((entry, idy) => (
                  <div key={idy} className="flex flex-col items-center text-center">
                    <div className="text-lg font-bold mb-1 flex items-center gap-2">
                      <FaGraduationCap className="text-cyan-500" />
                      {entry.degree}
                    </div>
                    <div className={`text-base font-semibold ${styles.accent}`}>{entry.institution}</div>
                    <div className="flex flex-wrap gap-3 justify-center text-sm items-center my-2">
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="text-xs" />
                        {entry.period}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FaMapMarkerAlt className="text-xs" />
                        {entry.location}
                      </span>
                    </div>
                    <div className={`text-sm ${styles.textSecondary}`}>
                      <span className={`inline-block px-2 py-1 rounded-full border ${styles.badge} font-bold`}>
                        {entry.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .animate-fadein { animation: fadeInTab 0.6s cubic-bezier(.4,0,.2,1);}
        .animate-slideup { animation: slideUpCard 0.6s cubic-bezier(.4,0,.2,1) both;}
        @keyframes fadeInTab {
          from { opacity: 0; transform: translateY(16px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes slideUpCard {
          from { opacity: 0; transform: translateY(48px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}