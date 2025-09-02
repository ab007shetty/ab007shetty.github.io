import{u as j,r as l,j as t,F as C,z as E}from"./index-CAPENow8.js";const w={icy:{cardBg:"bg-white/15 backdrop-blur-xl border-white/20",cardHover:"hover:bg-white/25 hover:border-cyan-300/40 hover:shadow-cyan-400/20",text:"text-gray-800",textSecondary:"text-gray-600",accent:"text-cyan-600",button:"bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-800 border-cyan-400/40",badge:"bg-cyan-100/30 text-cyan-800 border-cyan-300/40",glow:"shadow-cyan-400/20",filterActive:"bg-cyan-500/30 text-cyan-800 border-cyan-400/60",lightboxBg:"bg-white/95 backdrop-blur-xl"},hot:{cardBg:"bg-yellow-50/15 backdrop-blur-xl border-yellow-300/20",cardHover:"hover:bg-yellow-50/25 hover:border-yellow-400/40 hover:shadow-yellow-400/20",text:"text-yellow-900",textSecondary:"text-yellow-800",accent:"text-yellow-600",button:"bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-900 border-yellow-500/40",badge:"bg-yellow-100/30 text-yellow-900 border-yellow-400/40",glow:"shadow-yellow-400/20",filterActive:"bg-yellow-500/30 text-yellow-900 border-yellow-500/60",lightboxBg:"bg-yellow-50/95 backdrop-blur-xl"},dark:{cardBg:"bg-gray-900/15 backdrop-blur-xl border-gray-700/20",cardHover:"hover:bg-gray-900/25 hover:border-blue-500/40 hover:shadow-blue-400/20",text:"text-gray-100",textSecondary:"text-gray-300",accent:"text-blue-400",button:"bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border-blue-500/40",badge:"bg-blue-900/30 text-blue-200 border-blue-500/40",glow:"shadow-blue-400/20",filterActive:"bg-blue-600/30 text-blue-200 border-blue-500/60",lightboxBg:"bg-gray-900/95 backdrop-blur-xl"}},u=[{id:1,title:"Google IT Support",organization:"Google",category:"Professional",skills:["Network Protocols","Cybersecurity","Operating Systems"],image:"/images/it-support.jpg"},{id:2,title:"IBM Cybersecurity Analyst",organization:"IBM",category:"Professional",skills:["Pen testing","forensics","Incident Response"],image:"/images/cybersecurity.png"},{id:3,title:"Cloud Architecture with Google Cloud",organization:"Google Cloud",category:"Professional",skills:["Containerization","Cloud Services","Prompt Engineering"],image:"/images/google-cloud.jpg"},{id:4,title:"Full-Stack Web Development with React Specialization",organization:"The Hong Kong University of Science and Technology",category:"Specialization",skills:["React","Node.js","MongoDB","Express.js","Bootstrap"],image:"/images/react.png"},{id:5,title:"Python for Everybody",organization:"University of Michigan",category:"Specialization",skills:["Data Structures","Web Scrapping","Visualizing"],image:"/images/py.png"},{id:6,title:"Django for Everybody",organization:"University of Michigan",category:"Specialization",skills:["Django","PythonAnywhere","JSON","SQLite"],image:"/images/django.jpg"},{id:7,title:"Web Design for Everybody",organization:"University of Michigan",category:"Specialization",skills:["Wireframing","Responsive Design"],image:"/images/web-design.jpg"},{id:8,title:"Modern Big Data Analysis with SQL",organization:"Cloudera",category:"Specialization",skills:["Hadoop","Hive","Spark","SQL"],image:"/images/big-data.jpg"},{id:9,title:"Blockchain",organization:"University at Buffalo",category:"Specialization",skills:["Blockchain","Distributed Systems"],image:"/images/blockchain.png"},{id:10,title:"Narrative Economics",organization:"Yale University, Stanford Online",category:"Course",skills:["Socioeconomics","Consumer Behaviour"],image:"/images/economy.png"},{id:11,title:"Machine Learning",organization:"Stanford Online",category:"Course",skills:["Machine Learning","AI"],image:"/images/ml.png"},{id:12,title:"Introduction to Psychology",organization:"Yale University",category:"Course",skills:["Critical Thinking","Psychology"],image:"/images/psychology.jpg"},{id:13,title:"Infosys certified Google Cloud Digital Leader",organization:"Infosys",category:"Infosys",skills:["Google Cloud"],image:"/images/infy-gcp-leader.png"},{id:14,title:"Infosys Certified Front End Web Developer",organization:"Infosys",category:"Infosys",skills:["Front End Web Development"],image:"/images/infy-frontend.png"},{id:15,title:"Infosys Certified Cloud Beginner",organization:"Infosys",category:"Infosys",skills:["Cloud Computing","Cloud Fundamentals"],image:"/images/infy-cloud.png"},{id:16,title:"Hackothsav",organization:"SMVITM",category:"Others",skills:["MERN Stack","Hackathon"],image:"/images/hackothsav.png"},{id:17,title:"SSLC District Topper",organization:"SMVITM",category:"Others",skills:["SSLC","Topper"],image:"/images/sslc.jpg"},{id:18,title:"Entrepreneurship Awareness Camp",organization:"Entrepreneurship Development Institute of India",category:"Others",skills:["Entrepreneurship Awareness"],image:"/images/entrepreneurship.jpg"},{id:19,title:"Web Development Internship",organization:"Inmovidu",category:"Others",skills:["Web Development","Internship"],image:"/images/internship.png"},{id:20,title:"Technical Quiz",organization:"SMVITM",category:"Others",skills:["Technical Quiz"],image:"/images/quiz.jpg"},{id:21,title:"Build a Face Recognition Application using Python",organization:"GUVI",category:"Others",skills:["Python","Face Recognition"],image:"/images/guvi.png"}],N=({isOpen:o,onClose:e,children:n})=>{const[s,r]=l.useState(!1);return l.useEffect(()=>{r(!0)},[]),l.useEffect(()=>{if(s){if(o){if(document.body.style.overflow="hidden",document.body.style.paddingRight="0px",document.documentElement.style.overflow="hidden",!document.getElementById("certificate-modal-container")){const c=document.createElement("div");c.id="certificate-modal-container",c.style.cssText=`
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 2147483647 !important;
          pointer-events: auto !important;
          width: 100vw !important;
          height: 100vh !important;
        `,document.body.appendChild(c)}}else{document.body.style.overflow="",document.body.style.paddingRight="",document.documentElement.style.overflow="";const d=document.getElementById("certificate-modal-container");d&&document.body.removeChild(d)}return()=>{document.body.style.overflow="",document.body.style.paddingRight="",document.documentElement.style.overflow="";const d=document.getElementById("certificate-modal-container");if(d)try{document.body.removeChild(d)}catch{}}}},[o,s]),null},I=({certificates:o,index:e,isOpen:n,onClose:s,onPrev:r,onNext:d})=>{const{theme:c}=j(),[m,y]=l.useState(!1);return l.useEffect(()=>{y(!0)},[]),l.useEffect(()=>{if(!n)return;const a=g=>{g.key==="Escape"&&(g.preventDefault(),g.stopPropagation(),s())};return document.addEventListener("keydown",a,!0),()=>{document.removeEventListener("keydown",a,!0)}},[n,s]),l.useEffect(()=>{if(!m)return;const a=document.getElementById("certificate-modal-container");if(n&&e!==null&&o[e]&&a){const g=o[e];a.innerHTML=`
        <div style="
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 2147483647 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 1rem !important;
          background: rgba(0, 0, 0, 0.8) !important;
          backdrop-filter: blur(4px) !important;
        " id="modal-backdrop">
          <div style="
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 1rem !important;
            max-width: 80rem !important;
            width: 100% !important;
            max-height: 97vh !important;
            overflow: hidden !important;
            position: relative !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
          " id="modal-content">
            
            <!-- Close Button -->
            <button id="modal-close" style="
              position: absolute !important;
              top: 1rem !important;
              right: 1rem !important;
              z-index: 20 !important;
              background: rgba(255, 255, 255, 0.9) !important;
              color: #374151 !important;
              padding: 0.5rem !important;
              border-radius: 50% !important;
              border: none !important;
              cursor: pointer !important;
              font-size: 1.25rem !important;
              width: 2.5rem !important;
              height: 2.5rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              transition: all 0.2s !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            ">×</button>
            
            <!-- Previous Button -->
            <button id="modal-prev" ${e===0?"disabled":""} style="
              position: absolute !important;
              left: 1rem !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              z-index: 20 !important;
              background: rgba(255, 255, 255, 0.9) !important;
              color: #374151 !important;
              padding: 0.75rem !important;
              border-radius: 50% !important;
              border: none !important;
              cursor: ${e===0?"not-allowed":"pointer"} !important;
              font-size: 1.25rem !important;
              width: 3rem !important;
              height: 3rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              transition: all 0.2s !important;
              opacity: ${e===0?"0.4":"1"} !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            ">‹</button>
            
            <!-- Next Button -->
            <button id="modal-next" ${e===o.length-1?"disabled":""} style="
              position: absolute !important;
              right: 1rem !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              z-index: 20 !important;
              background: rgba(255, 255, 255, 0.9) !important;
              color: #374151 !important;
              padding: 0.75rem !important;
              border-radius: 50% !important;
              border: none !important;
              cursor: ${e===o.length-1?"not-allowed":"pointer"} !important;
              font-size: 1.25rem !important;
              width: 3rem !important;
              height: 3rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              transition: all 0.2s !important;
              opacity: ${e===o.length-1?"0.4":"1"} !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            ">›</button>
              
              <!-- Certificate Image -->
              <div style="
                width: 100% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              ">
                <div style="
                  position: relative !important;
                  width: 100% !important;
                  max-width: 55rem !important;
                  aspect-ratio: 33/25 !important;
                  background: white !important;
                  border-radius: 0.75rem !important;
                  overflow: hidden !important;
                  border: 1px solid #e5e7eb !important;
                  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                ">
                  <img
                    src="${g.image}"
                    alt="${g.title}"
                    style="
                      position: absolute !important;
                      top: 0 !important;
                      left: 0 !important;
                      width: 100% !important;
                      height: 100% !important;
                      object-fit: cover !important;
                    "
                  />
                </div>
              </div>
              
              <!-- Navigation Info -->
              <div style="
                text-align: center !important;
                margin-top: 1.5rem !important;
                color: #6b7280 !important;
                font-size: 0.875rem !important;
              ">
                ${e+1} of ${o.length}
              </div>
            </div>
          </div>
        </div>
      `;const b=a.querySelector("#modal-backdrop"),h=a.querySelector("#modal-close"),x=a.querySelector("#modal-prev"),f=a.querySelector("#modal-next"),v=a.querySelector("#modal-content");b&&b.addEventListener("click",p=>{p.target===b&&s()}),h&&h.addEventListener("click",p=>{p.stopPropagation(),s()}),x&&e>0&&x.addEventListener("click",p=>{p.stopPropagation(),r()}),f&&e<o.length-1&&f.addEventListener("click",p=>{p.stopPropagation(),d()}),v&&v.addEventListener("click",p=>{p.stopPropagation()}),document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden"}else a&&(a.innerHTML="",document.body.style.overflow="",document.documentElement.style.overflow="");return()=>{a&&(a.innerHTML=""),document.body.style.overflow="",document.documentElement.style.overflow=""}},[n,e,o,s,r,d,m]),t.jsx(N,{isOpen:n,onClose:s})},$=({certificate:o,onClick:e,index:n})=>{const{theme:s}=j(),r=w[s]||w.icy,[d,c]=l.useState(!1);return l.useEffect(()=>{const m=setTimeout(()=>c(!0),n*100);return()=>clearTimeout(m)},[n]),t.jsxs("div",{className:`
        ${r.cardBg} ${r.cardHover} border rounded-2xl p-3 cursor-pointer
        transition-all duration-500 transform ${r.glow} shadow-lg
        ${d?"translate-y-0 opacity-100":"translate-y-8 opacity-0"}
        hover:scale-105
      `,onClick:()=>e(n),style:{transitionDelay:`${n*50}ms`,minWidth:0},title:o.title,children:[t.jsxs("div",{className:"flex items-center",children:[t.jsx("div",{className:"w-36 h-[110px] min-w-[9rem] rounded-xl overflow-hidden bg-white border flex items-center justify-center mr-4 relative aspect-[33/25]",children:t.jsx("img",{src:o.image,alt:o.title,className:"absolute inset-0 w-full h-full object-cover",style:{aspectRatio:"33/25",width:"100%",height:"100%",objectFit:"cover"}})}),t.jsxs("div",{className:"flex-1 flex flex-col justify-between h-full min-w-0",children:[t.jsx("div",{className:"mb-2 flex items-center gap-2",children:t.jsx("span",{className:`px-2 py-1 rounded-full border font-bold border-dashed ${r.accent} bg-white/20 text-xs tracking-wide`,children:o.category})}),t.jsx("div",{className:"flex flex-wrap gap-1 mb-2",children:o.skills&&o.skills.map((m,y)=>t.jsx("span",{className:`${r.badge} border px-2 py-0.5 rounded-xl text-xs`,children:m},y))})]})]}),t.jsxs("div",{className:"mt-4 text-center",children:[t.jsx("h3",{className:`font-bold ${r.text} text-lg leading-tight mb-1`,children:o.title}),t.jsx("p",{className:`${r.accent} font-semibold text-sm`,children:o.organization})]})]})},L=()=>{const{theme:o}=j(),e=w[o]||w.icy,[n,s]=l.useState("Professional"),[r,d]=l.useState(u.filter(i=>i.category==="Professional")),[c,m]=l.useState(null),[y,a]=l.useState(!1),g=l.useRef(null),h=["All",...Array.from(new Set(u.map(i=>i.category)))],x=i=>i==="All"?u.length:u.filter(k=>k.category===i).length;l.useEffect(()=>{d(n==="All"?u:u.filter(i=>i.category===n))},[n]);const f=i=>s(i),v=i=>{m(i),a(!0)},p=()=>{a(!1),m(null)},S=()=>{c>0&&m(c-1)},z=()=>{c<r.length-1&&m(c+1)};return t.jsxs("div",{className:"min-h-screen p-4 sm:p-8",children:[t.jsxs("div",{className:"max-w-7xl mx-auto",children:[t.jsx("div",{id:"certifications",ref:g,className:"pt-[120px] -mt-[120px]"}),t.jsxs("div",{className:"text-center mb-8",children:[t.jsxs("h1",{className:`pt-10 text-4xl sm:text-5xl font-bold ${e.text} mb-4 flex flex-wrap items-center justify-center gap-2 break-words`,style:{wordBreak:"break-word",overflowWrap:"break-word",minWidth:0,maxWidth:"100%",whiteSpace:"normal"},children:[t.jsx(C,{className:`shrink-0 ${e.accent}`,style:{fontSize:"1.2em"}}),t.jsx("span",{style:{minWidth:0,maxWidth:"100%"},children:"Certifications"})]}),t.jsx("p",{className:`text-xl ${e.textSecondary} max-w-3xl mx-auto`,children:"This is Exactly how I spent my time during the Corona Pandemic."})]}),t.jsxs("div",{className:"flex flex-wrap gap-4 justify-center mb-12",children:[t.jsxs("span",{className:"flex items-center gap-2",children:[t.jsx(E,{className:`${e.textSecondary}`}),t.jsx("span",{className:`${e.text} font-medium`,children:"Filter by:"})]}),h.map(i=>t.jsxs("button",{onClick:()=>f(i),className:`
                px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300
                ${n===i?e.filterActive+" ring-2 ring-offset-2 ring-cyan-400":`${e.button} hover:scale-105`}
              `,children:[i,t.jsx("span",{className:`ml-2 inline-block px-1.5 py-0.5 rounded-full text-xs font-bold ${n===i?"bg-white/20 text-current":"bg-black/10 text-current"}`,children:x(i)}),n===i&&t.jsx("span",{className:"ml-2 inline-block text-xs font-bold text-green-600",children:"✓"})]},i))]}),t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:r.map((i,k)=>t.jsx($,{certificate:i,onClick:v,index:k},i.id))}),r.length===0&&t.jsxs("div",{className:"text-center py-20",children:[t.jsx("div",{className:`text-6xl ${e.textSecondary} mb-4`,children:"🔍"}),t.jsx("h3",{className:`text-2xl font-bold ${e.text} mb-2`,children:"No certificates found"}),t.jsx("p",{className:`${e.textSecondary}`,children:"Try adjusting your filters to see more certificates."})]}),t.jsx(I,{certificates:r,index:c,isOpen:y,onClose:p,onPrev:S,onNext:z})]}),t.jsx("style",{children:`
        @media (max-width: 767px) {
          .max-w-7xl, .grid, .flex, .certifications-section {
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box;
          }
          h1, .certifications-title {
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .grid > div {
            min-width: 0 !important;
          }
        }
      `})]})};export{L as default};
