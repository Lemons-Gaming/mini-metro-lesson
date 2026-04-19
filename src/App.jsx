import React, { useState, useEffect } from 'react';

// --- Animated Background & Decorative Components ---
const RiverBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden">
    <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 800">
      <path 
        d="M-100,400 C200,300 400,600 700,500 C1000,400 1200,700 1600,600 L1600,900 L-100,900 Z" 
        fill="#A3D4E0" 
      />
      <path 
        d="M-100,450 C250,350 450,650 750,550 C1050,450 1250,750 1600,650 L1600,900 L-100,900 Z" 
        fill="#8CBCC8" 
        opacity="0.6"
      />
    </svg>
  </div>
);

const MovingTrain = ({ color, delay }) => (
  <div className="absolute top-1/2 -translate-y-1/2 w-8 h-4 rounded-sm shadow-md animate-train" style={{ backgroundColor: color, animationDelay: delay }}>
    <div className="absolute top-1/2 left-1 -translate-y-1/2 w-1 h-2 bg-white opacity-50"></div>
  </div>
);

const TunnelDecor = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" className="absolute -z-10 opacity-50">
    <circle cx="20" cy="20" r="18" fill="none" stroke="#ccc" strokeWidth="4" strokeDasharray="4 4" />
  </svg>
);

// --- Icon Components ---
const CircleIcon = ({ color = "currentColor", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
    <circle cx="12" cy="12" r="9" fill="white" />
  </svg>
);

const SquareIcon = ({ color = "currentColor", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
    <rect x="3" y="3" width="18" height="18" fill="white" />
  </svg>
);

const TriangleIcon = ({ color = "currentColor", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round">
    <polygon points="12,3 21,20 3,20" fill="white" />
  </svg>
);

const StarIcon = ({ color = "currentColor", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round">
    <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="white" />
  </svg>
);

// --- Main Application ---
export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTeacherGuide, setShowTeacherGuide] = useState(false);
  
  // State for the graph (Only passengers now)
  const [scores, setScores] = useState([
    { id: 1, passengers: '' }
  ]);

  // Steps definition
  const steps = [
    { title: 'תחנת מוצא', color: 'bg-[#005BAA]', stroke: '#005BAA', icon: CircleIcon },
    { title: 'משחקון ראשון', color: 'bg-[#E32025]', stroke: '#E32025', icon: SquareIcon },
    { title: 'תחנת חשיבה', color: 'bg-[#FFD600]', stroke: '#FFD600', icon: TriangleIcon },
    { title: 'משחקון שני', color: 'bg-[#009640]', stroke: '#009640', icon: CircleIcon },
    { title: 'ניתוח מיומנויות', color: 'bg-[#98005D]', stroke: '#98005D', icon: StarIcon },
    { title: 'גרף שיפור', color: 'bg-[#F38FB3]', stroke: '#F38FB3', icon: SquareIcon }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  // Inject CSS for Train Animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes trainMove {
        0% { left: -10%; }
        100% { left: 110%; }
      }
      .animate-train {
        animation: trainMove 8s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // --- Content Components ---

  const GameLauncher = ({ primary = false }) => (
    <div className={`flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border-2 ${primary ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} mt-6`}>
      <h3 className="text-xl font-bold mb-2">מוכנים להתחיל?</h3>
      <p className="text-gray-600 mb-4 text-center">המשחק ייפתח בכרטיסייה חדשה כדי להבטיח שהוא יעבוד בצורה חלקה.</p>
      <a 
        href="https://www.coolmathgames.com/0-mini-metro-london" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-xl hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
        <span>שחק ב- Mini Metro</span>
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </a>
    </div>
  );

  const IntroStep = () => (
    <div className="space-y-6 animate-fade-in text-right relative z-10">
      <h1 className="text-4xl font-black mb-6 flex items-center gap-3">
        ברוכים הבאים ל-Mini Metro
      </h1>
      <p className="text-xl">במשחק הזה אתם מהנדסי התחבורה של עיר צומחת. עליכם לתכנן רשת רכבות תחתית חכמה ויעילה.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow border-t-4 border-[#005BAA] relative overflow-hidden">
          <CircleIcon color="#005BAA" size={48} />
          <h3 className="text-xl font-bold mt-4">הנוסעים</h3>
          <p className="mt-2 text-gray-700 font-medium">כל צורה קטנה מייצגת נוסע שרוצה להגיע לתחנה בעלת צורה זהה.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow border-t-4 border-[#E32025] relative overflow-hidden">
          <SquareIcon color="#E32025" size={48} />
          <h3 className="text-xl font-bold mt-4">התחנות והקווים</h3>
          <p className="mt-2 text-gray-700 font-medium">מתחו קווים בין התחנות. נסו לגוון את צורות התחנות על אותו קו!</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow border-t-4 border-[#FFD600] relative overflow-hidden">
          <div className="flex gap-1 items-end">
             <div className="w-8 h-4 bg-gray-800 rounded-sm"></div>
             <div className="w-8 h-4 bg-gray-800 rounded-sm"></div>
          </div>
          <h3 className="text-xl font-bold mt-4">המשאבים</h3>
          <p className="mt-2 text-gray-700 font-medium">בסוף כל שבוע (במשחק) תקבלו קרונות, מנהרות או קווים. בחרו בחוכמה!</p>
        </div>
      </div>
      
      <GameLauncher primary={true} />
    </div>
  );

  const PlayStep = ({ title, desc, duration }) => (
    <div className="space-y-4 animate-fade-in text-right relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black">{title}</h2>
        <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-bold">{duration}</span>
      </div>
      <p className="text-xl bg-white/70 p-4 rounded-lg font-medium shadow-sm">{desc}</p>
      
      <div className="mt-8">
        <GameLauncher />
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h4 className="font-bold text-lg mb-2 text-blue-800">טיפ של מהנדסים:</h4>
        <p className="text-blue-900">שימו לב היכן מצטברים נוסעים. האם הרכבת מלאה מדי? אולי כדאי להוסיף לה קרון? האם התחנה רחוקה מדי? אולי צריך למתוח קו חדש?</p>
      </div>
    </div>
  );

  const TrueFalseGame = () => {
    const [answers, setAnswers] = useState({});
    
    const questions = [
      { id: 1, text: "קו רכבת מעגלי (לולאה) הוא בדרך כלל יעיל יותר מקו ישר הלוך-חזור.", isTrue: true, explanation: "נכון! בלולאה הרכבת לא צריכה לעצור ולהסתובב בקצה, והיא מפזרת נוסעים ברצף." },
      { id: 2, text: "חיבור של 4 תחנות עגולות ברצף על אותו קו זו אסטרטגיה מצוינת.", isTrue: false, explanation: "לא נכון. רוב הנוסעים בתחנה עגולה רוצים להגיע למשולש או ריבוע. רצף עיגולים יגרום לרכבת להתמלא ולא להתרוקן." },
      { id: 3, text: "כמות המנהרות (גשרים מעל הנהר) שיש לי היא מוגבלת.", isTrue: true, explanation: "נכון מאוד! חציית נהר דורשת משאב מיוחד. אל תבזבזו מנהרות ללא צורך." },
      { id: 4, text: "אי אפשר למחוק קו רכבת אחרי ששרטטתי אותו.", isTrue: false, explanation: "לא נכון. אפשר (ורצוי!) למחוק קווים ולתכנן אותם מחדש כשהעיר גדלה ומשתנה." }
    ];

    return (
      <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-gray-100 mt-6 text-right">
        <h3 className="text-2xl font-bold mb-4">בדיקת אסטרטגיה: נכון או לא נכון?</h3>
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="border-b border-gray-100 pb-4 last:border-0">
              <p className="text-lg font-medium mb-3">{q.text}</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setAnswers({...answers, [q.id]: true})}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${answers[q.id] === true ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  נכון
                </button>
                <button 
                  onClick={() => setAnswers({...answers, [q.id]: false})}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${answers[q.id] === false ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  לא נכון
                </button>
              </div>
              {answers[q.id] !== undefined && (
                <div className={`mt-3 p-3 rounded-lg text-sm ${answers[q.id] === q.isTrue ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  <strong>{answers[q.id] === q.isTrue ? 'צדקתם! ' : 'טעות. '}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MidPointStep = () => (
    <div className="space-y-6 animate-fade-in text-right relative z-10">
      <h2 className="text-3xl font-black mb-2">תחנת חשיבה</h2>
      <p className="text-xl text-gray-700 mb-6 bg-white/60 inline-block p-2 rounded">עצירה קצרה לפני שממשיכים למשחק הבא.</p>
      <TrueFalseGame />
    </div>
  );

  const SkillsStep = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [gameMemory, setGameMemory] = useState("");
    
    const skills = [
      "חשיבה אלגוריתמית",
      "פתרון בעיות תחת לחץ",
      "ניהול משאבים (גשרים/קרונות)",
      "זיהוי תבניות",
      "תעדוף משימות (מי דחוף יותר?)",
      "אופטימיזציה של נתיבים"
    ];

    const toggleSkill = (skill) => {
      if (selectedSkills.includes(skill)) {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
      } else {
        setSelectedSkills([...selectedSkills, skill]);
      }
    };

    return (
      <div className="space-y-8 animate-fade-in text-right relative z-10">
        <h2 className="text-3xl font-black mb-2">ניתוח ורפלקציה</h2>
        
        <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-[#98005D]/20">
          <h3 className="text-xl font-bold mb-4">אילו מיומנויות המשחק פיתח בכם? (בחרו את מה שהרגשתם)</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-full border-2 font-medium transition-all ${
                  selectedSkills.includes(skill) 
                    ? 'bg-[#98005D] text-white border-[#98005D]' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#98005D]'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          {selectedSkills.length > 0 && (
             <p className="mt-4 text-[#98005D] font-bold">מעולה! המשחק אכן נוגע בכל המיומנויות האלו, החשובות מאוד בעולם התכנות וההנדסה.</p>
          )}
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-orange-200">
          <h3 className="text-xl font-bold mb-4">לאיזה משחק (או אפליקציה מציאותית) זה מזכיר לכם?</h3>
          <p className="text-gray-600 mb-3">חשבו על משחקים אחרים שדורשים בנייה, ניהול תנועה, או אפילו אפליקציות שאתם משתמשים בהן ביומיום.</p>
          <input 
            type="text" 
            value={gameMemory}
            onChange={(e) => setGameMemory(e.target.value)}
            placeholder="למשל: SimCity, Waze, צינורות..."
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:border-orange-500 focus:outline-none"
          />
          {gameMemory.length > 2 && (
            <div className="mt-4 bg-orange-50 p-3 rounded text-orange-800">
              <strong>מעניין!</strong> הרבה מערכות תנועה ואלגוריתמים של ניתוב (כמו ב-Waze או ברשתות תקשורת אינטרנט) עובדים על בעיות דומות של מניעת עומסים וצווארי בקבוק.
            </div>
          )}
        </div>
      </div>
    );
  };

  const GraphStep = () => {
    const handleAddScore = () => {
      setScores([...scores, { id: scores.length + 1, passengers: '' }]);
    };

    const handleScoreChange = (index, value) => {
      const newScores = [...scores];
      newScores[index].passengers = value;
      setScores(newScores);
    };

    // Calculate dynamic graph points
    const validScores = scores.filter(s => s.passengers && !isNaN(s.passengers)).map(s => Number(s.passengers));
    const maxScore = validScores.length > 0 ? Math.max(...validScores) : 100;
    const graphHeight = 250;

    return (
      <div className="space-y-6 animate-fade-in text-right relative z-10">
        <h2 className="text-3xl font-black mb-2">גרף שיפור עצמי</h2>
        <p className="text-xl text-gray-700 mb-6 bg-white/60 inline-block p-2 rounded">הזינו את כמות הנוסעים שהצלחתם להסיע בכל משחק.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Data Entry Form */}
          <div className="bg-white/95 p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">טבלת ניקוד (נוסעים)</h3>
            <div className="space-y-3">
              {scores.map((score, idx) => (
                <div key={score.id} className="flex gap-4 items-center bg-gray-50 p-2 rounded-lg">
                  <span className="font-bold w-20 text-gray-600">משחק {score.id}:</span>
                  <input 
                    type="number" 
                    placeholder="כמה נוסעים?" 
                    value={score.passengers}
                    onChange={(e) => handleScoreChange(idx, e.target.value)}
                    className="border-2 border-gray-200 rounded-md p-2 flex-1 text-center font-bold text-lg focus:border-[#F38FB3] focus:outline-none transition-colors"
                    dir="ltr"
                  />
                  <CircleIcon color="#F38FB3" size={20} />
                </div>
              ))}
              <button 
                onClick={handleAddScore}
                className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                + הוסף משחק נוסף
              </button>
            </div>
          </div>

          {/* Dynamic Graph */}
          <div className="bg-white/95 p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
             <h3 className="font-bold text-xl mb-6 self-start text-gray-800 z-10">עקומת הלמידה שלך</h3>
             
             {validScores.length < 2 ? (
                <div className="text-gray-400 text-center py-12 z-10">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                  <p className="text-lg font-medium">הזינו לפחות 2 תוצאות כדי לראות את קו ההתקדמות</p>
                </div>
             ) : (
                <div className="w-full relative z-10 mt-4" style={{ height: `${graphHeight}px` }}>
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                     <div className="w-full h-px bg-gray-400"></div>
                     <div className="w-full h-px bg-gray-400"></div>
                     <div className="w-full h-px bg-gray-400"></div>
                     <div className="w-full h-px bg-gray-400"></div>
                     <div className="w-full h-px bg-gray-400"></div>
                  </div>

                  <div className="absolute -left-6 bottom-0 text-sm font-bold text-gray-500">{0}</div>
                  <div className="absolute -left-8 top-0 text-sm font-bold text-[#005BAA] bg-blue-50 px-1 rounded">{maxScore}</div>
                  
                  <svg width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible mt-2">
                     <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor="#E32025" />
                           <stop offset="50%" stopColor="#FFD600" />
                           <stop offset="100%" stopColor="#009640" />
                        </linearGradient>
                     </defs>
                     <polyline
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={validScores.map((score, index) => {
                          const x = (index / (validScores.length - 1)) * 100;
                          const y = graphHeight - ((score / maxScore) * graphHeight);
                          return `${x}%,${y}`;
                        }).join(' ')}
                      />
                      {/* Points */}
                      {validScores.map((score, index) => {
                          const x = (index / (validScores.length - 1)) * 100;
                          const y = graphHeight - ((score / maxScore) * graphHeight);
                          return (
                            <g key={index}>
                              <circle 
                                cx={`${x}%`} 
                                cy={y} 
                                r="8" 
                                fill="white" 
                                stroke="#005BAA" 
                                strokeWidth="4" 
                              />
                              <text x={`${x}%`} y={y - 15} textAnchor="middle" fill="#4B5563" fontSize="12" fontWeight="bold">
                                {score}
                              </text>
                            </g>
                          );
                        })}
                  </svg>
                </div>
             )}
          </div>
        </div>
      </div>
    );
  };

  const TeacherGuide = () => (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl mb-8 text-right relative overflow-hidden">
      <div className="absolute -right-10 -top-10 opacity-10"><SquareIcon size={150} /></div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="bg-white text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-black">?</span>
        הנחיות למורה (מערך 90 דקות)
      </h2>
      <ul className="space-y-4 text-lg relative z-10">
        <li className="flex items-start gap-3">
          <span className="font-bold text-red-400 min-w-[80px]">25 דקות:</span>
          <span><strong>התנסות ראשונה:</strong> התלמידים משחקים ללא הנחיה מוקדמת. המטרה: לחוות את הבעיה, להבין את המכניקה ואת צוואר הבקבוק.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="font-bold text-yellow-400 min-w-[80px]">15 דקות:</span>
          <span><strong>עצירה ודיון:</strong> מעבר על "תחנת חשיבה". דיון על אסטרטגיות: למה קווים מעגליים טובים? התמודדות עם משאבים מוגבלים.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="font-bold text-green-400 min-w-[80px]">25 דקות:</span>
          <span><strong>משחקון שני:</strong> יישום האסטרטגיות. התלמידים מנסים לשפר את השיא שלהם תוך חשיבה אלגוריתמית וניהול קווים דינמי.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="font-bold text-purple-400 min-w-[80px]">15 דקות:</span>
          <span><strong>ניתוח והכללה:</strong> מעבר על שאלות הניתוח ומיומנויות. חיבור המשחק לעולם האמיתי (איך Waze עובד? רשתות תקשורת).</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="font-bold text-pink-400 min-w-[80px]">10 דקות:</span>
          <span><strong>סיכום ומדידה:</strong> הזנת נתונים לגרף השיפור העצמי ורפלקציה.</span>
        </li>
      </ul>
      <button 
        onClick={() => setShowTeacherGuide(false)}
        className="mt-6 px-6 py-2 bg-white hover:bg-gray-200 rounded-full text-gray-900 font-bold transition shadow-lg relative z-10"
      >
        הסתר הנחיות מורה
      </button>
    </div>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-[#F4F7F6] text-gray-900 font-sans relative overflow-x-hidden" dir="rtl" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      <RiverBackground />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 -space-x-reverse relative">
            <div className="w-10 h-10 rounded-full bg-[#E32025] flex items-center justify-center shadow-md z-30"><SquareIcon color="white" size={20}/></div>
            <div className="w-10 h-10 rounded-full bg-[#005BAA] flex items-center justify-center shadow-md z-20"><CircleIcon color="white" size={20}/></div>
            <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center shadow-md z-10"><TriangleIcon color="white" size={20}/></div>
          </div>
          <h1 className="text-2xl font-black tracking-tight">מעבדת תכנון: Mini Metro</h1>
        </div>
        <button 
          onClick={() => setShowTeacherGuide(!showTeacherGuide)}
          className="text-sm border-2 border-gray-400 hover:border-gray-900 hover:bg-gray-900 hover:text-white px-4 py-2 rounded-full transition-all font-bold shadow-sm"
        >
          {showTeacherGuide ? 'סגור הנחיות' : 'מורה? לחץ כאן'}
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-6 mt-4 relative z-10">
        
        {showTeacherGuide && <TeacherGuide />}

        {/* Metro Navigation Timeline */}
        <div className="mb-12 relative select-none mt-8">
          
          {/* Main Track Line Background */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-200 -translate-y-1/2 rounded-full overflow-hidden">
             {/* Animated Moving Train on the track */}
             <MovingTrain color="#E32025" delay="0s" />
             <MovingTrain color="#005BAA" delay="4s" />
          </div>

          <div className="flex justify-between items-center relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer group relative"
                  onClick={() => setCurrentStep(index)}
                  style={{ width: `${100 / steps.length}%` }}
                >
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center border-[5px] transition-all duration-300 relative z-20
                    ${isActive ? 'bg-white' : 'bg-gray-100 border-gray-300'}
                    ${isCurrent ? 'scale-125 shadow-xl' : 'hover:scale-110 shadow-md'}
                  `}
                  style={{ borderColor: isActive ? step.stroke : '#D1D5DB' }}
                  >
                    <Icon color={isActive ? step.stroke : '#9CA3AF'} size={24} />
                    
                    {/* Inner dot for inactive */}
                    {!isActive && <div className="absolute w-3 h-3 bg-gray-300 rounded-full"></div>}
                  </div>
                  
                  {/* Track Fill Progress */}
                  {index < steps.length - 1 && (
                     <div 
                       className="absolute top-1/2 -left-[50%] right-[50%] h-3 -translate-y-1/2 -z-10 transition-all duration-500"
                       style={{ 
                         backgroundColor: isActive ? steps[index].stroke : 'transparent',
                         opacity: index < currentStep ? 1 : 0
                       }}
                     ></div>
                  )}

                  <span className={`mt-4 text-sm font-bold text-center transition-colors px-2 py-1 rounded-md ${isCurrent ? 'bg-gray-900 text-white shadow-md' : isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {/* Decorative Tunnels */}
          <div className="absolute -left-10 top-10"><TunnelDecor /></div>
          <div className="absolute -right-10 bottom-20"><TunnelDecor /></div>

          {currentStep === 0 && <IntroStep />}
          {currentStep === 1 && <PlayStep title="משחקון ראשון" duration="25 דקות" desc="שחקו באופן חופשי. נסו להבין איך המשחק עובד, מה גורם לתחנות להפוך לצפופות, ואיך משתמשים נכון בקרונות. אל תחששו מפסילות - לומדים מטעויות!" />}
          {currentStep === 2 && <MidPointStep />}
          {currentStep === 3 && <PlayStep title="משחקון שני" duration="25 דקות" desc="עכשיו כשאתם מכירים את הכללים והאסטרטגיות – נסו לשבור את השיא שלכם. השתמשו בקווים מעגליים וגוונו בצורות התחנות על כל קו." />}
          {currentStep === 4 && <SkillsStep />}
          {currentStep === 5 && <GraphStep />}
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 flex justify-between items-center border-t-2 border-gray-200/50 pt-8 relative z-10">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2 ${currentStep === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-800 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-gray-300'}`}
          >
            <span>לתחנה הקודמת</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
          
          {currentStep < steps.length - 1 ? (
             <button 
              onClick={handleNext}
              className="px-8 py-4 rounded-full font-bold text-lg bg-gray-900 text-white shadow-xl hover:bg-gray-800 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
              <span>לתחנה הבאה</span>
            </button>
          ) : (
            <div className="px-8 py-4 rounded-full font-black text-lg bg-[#009640] text-white shadow-xl flex items-center gap-2">
              <StarIcon color="white" size={24} />
              הגעתם לתחנה הסופית!
            </div>
          )}
        </div>

      </main>
    </div>
  );
}