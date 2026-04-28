import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  TimerOff,
  BookOpen,
  BookText,
  Brain,
  Sparkles,
  Smartphone,
} from "lucide-react";
import TrackerScreen from "./screens/TrackerScreen";
import SummarizerScreen from "./screens/SummarizerScreen";
import BookSummarizerScreen from "./screens/BookSummarizerScreen";
import AiTutorScreen from "./screens/AiTutorScreen";
import IslamicScreen from "./screens/IslamicScreen";
import WellbeingScreen from "./screens/WellbeingScreen";
import type { TabRoute } from "./types";

const TABS: {
  route: TabRoute;
  label: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
}[] = [
  {
    route: "tracker",
    label: "المذاكرة",
    icon: <TimerOff size={20} />,
    iconActive: <Timer size={20} />,
  },
  {
    route: "summarizer",
    label: "تلخيص",
    icon: <BookOpen size={20} className="opacity-60" />,
    iconActive: <BookOpen size={20} />,
  },
  {
    route: "bookSummarizer",
    label: "كتاب",
    icon: <BookText size={20} className="opacity-60" />,
    iconActive: <BookText size={20} />,
  },
  {
    route: "aiTutor",
    label: "مساعد",
    icon: <Brain size={20} className="opacity-60" />,
    iconActive: <Brain size={20} />,
  },
  {
    route: "islamic",
    label: "أذكار",
    icon: <Sparkles size={20} className="opacity-60" />,
    iconActive: <Sparkles size={20} />,
  },
  {
    route: "wellbeing",
    label: "الشاشة",
    icon: <Smartphone size={20} className="opacity-60" />,
    iconActive: <Smartphone size={20} />,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabRoute>("tracker");

  const renderScreen = () => {
    switch (activeTab) {
      case "tracker":
        return <TrackerScreen key="tracker" />;
      case "summarizer":
        return <SummarizerScreen key="summarizer" />;
      case "bookSummarizer":
        return <BookSummarizerScreen key="bookSummarizer" />;
      case "aiTutor":
        return <AiTutorScreen key="aiTutor" />;
      case "islamic":
        return <IslamicScreen key="islamic" />;
      case "wellbeing":
        return <WellbeingScreen key="wellbeing" />;
      default:
        return <TrackerScreen key="tracker" />;
    }
  };

  return (
    <div className="h-screen w-full bg-void flex justify-center items-center" dir="rtl">
      <div className="relative w-full max-w-[430px] h-full sm:h-[90vh] sm:rounded-[32px] overflow-hidden bg-void border sm:border-divider shadow-2xl">
        {/* Main content area */}
        <div className="h-full w-full pb-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="h-full w-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-void/90 backdrop-blur-xl border-t border-divider z-50">
          <div className="flex items-center justify-around px-2 py-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.route;
              return (
                <button
                  key={tab.route}
                  onClick={() => setActiveTab(tab.route)}
                  className="relative flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-lg transition-colors"
                >
                  <motion.div
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={
                      isActive ? "text-text-primary" : "text-text-secondary"
                    }
                  >
                    {isActive ? tab.iconActive : tab.icon}
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 w-5 h-[2px] rounded-full bg-emerald"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`text-[10px] font-medium ${
                      isActive ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
