import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Volume2,
  HelpCircle,
  ChevronRight,
  Check,
  AlertCircle,
  Star,
  GraduationCap
} from 'lucide-react';

interface Question {
  cau: number;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
  ipa: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  giaiThich: string;
}

const QUESTIONS: Question[] = [
  {
    cau: 1,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "books",
    B: "cats",
    C: "dogs",
    D: "maps",
    dapAn: "C",
    ipa: {
      A: "/bʊks/ (-s phát âm là /s/)",
      B: "/kæts/ (-s phát âm là /s/)",
      C: "/dɒɡz/ (-s phát âm là /z/)",
      D: "/mæps/ (-s phát âm là /s/)"
    },
    giaiThich: "books, cats, maps tận cùng bằng âm vô thanh /k/, /t/, /p/ nên phát âm là /s/. dogs tận cùng bằng âm hữu thanh /g/ nên phát âm là /z/."
  },
  {
    cau: 2,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "watches",
    B: "boxes",
    C: "brushes",
    D: "beds",
    dapAn: "D",
    ipa: {
      A: "/ˈwɒtʃɪz/ (-es phát âm là /ɪz/)",
      B: "/ˈbɒksɪz/ (-es phát âm là /ɪz/)",
      C: "/ˈbrʌʃɪz/ (-es phát âm là /ɪz/)",
      D: "/bedz/ (-s phát âm là /z/)"
    },
    giaiThich: "watches, boxes, brushes tận cùng bằng âm xuýt /tʃ/, /s/, /ʃ/ nên phát âm là /ɪz/. beds tận cùng là âm hữu thanh /d/ nên phát âm là /z/."
  },
  {
    cau: 3,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "wanted",
    B: "needed",
    C: "played",
    D: "planted",
    dapAn: "C",
    ipa: {
      A: "/ˈwɒntɪd/ (-ed phát âm là /ɪd/)",
      B: "/ˈniːdɪd/ (-ed phát âm là /ɪd/)",
      C: "/pleɪd/ (-ed phát âm là /d/)",
      D: "/ˈplɑːntɪd/ (-ed phát âm là /ɪd/)"
    },
    giaiThich: "wanted, needed, planted tận cùng bằng âm /t/, /d/ nên -ed phát âm là /ɪd/. played tận cùng bằng nguyên âm nên -ed phát âm là /d/."
  },
  {
    cau: 4,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "looked",
    B: "watched",
    C: "stopped",
    D: "opened",
    dapAn: "D",
    ipa: {
      A: "/lʊkt/ (-ed phát âm là /t/)",
      B: "/wɒtʃt/ (-ed phát âm là /t/)",
      C: "/stɒpt/ (-ed phát âm là /t/)",
      D: "/ˈəʊpənd/ (-ed phát âm là /d/)"
    },
    giaiThich: "looked, watched, stopped tận cùng bằng âm vô thanh /k/, /tʃ/, /p/ nên -ed phát âm là /t/. opened tận cùng bằng âm hữu thanh /n/ nên -ed phát âm là /d/."
  },
  {
    cau: 5,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "pens",
    B: "rulers",
    C: "bags",
    D: "hats",
    dapAn: "D",
    ipa: {
      A: "/penz/ (-s phát âm là /z/)",
      B: "/ˈruːləz/ (-s phát âm là /z/)",
      C: "/bæɡz/ (-s phát âm là /z/)",
      D: "/hæts/ (-s phát âm là /s/)"
    },
    giaiThich: "hats tận cùng bằng âm vô thanh /t/ nên phát âm là /s/. pens, rulers, bags tận cùng bằng âm hữu thanh /n/, /l/ (hoặc nguyên âm), /g/ nên phát âm là /z/."
  },
  {
    cau: 6,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "buses",
    B: "glasses",
    C: "classes",
    D: "tables",
    dapAn: "D",
    ipa: {
      A: "/ˈbʌsɪz/ (-es phát âm là /ɪz/)",
      B: "/ˈɡlɑːsɪz/ (-es phát âm là /ɪz/)",
      C: "/ˈklɑːsɪz/ (-es phát âm là /ɪz/)",
      D: "/ˈteɪblz/ (-s phát âm là /z/)"
    },
    giaiThich: "buses, glasses, classes tận cùng bằng âm /s/ nên phát âm là /ɪz/. tables tận cùng bằng âm /l/ nên phát âm là /z/."
  },
  {
    cau: 7,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "washed",
    B: "worked",
    C: "missed",
    D: "called",
    dapAn: "D",
    ipa: {
      A: "/wɒʃt/ (-ed phát âm là /t/)",
      B: "/wɜːkt/ (-ed phát âm là /t/)",
      C: "/mɪst/ (-ed phát âm là /t/)",
      D: "/kɔːld/ (-ed phát âm là /d/)"
    },
    giaiThich: "washed, worked, missed tận cùng bằng âm vô thanh /ʃ/, /k/, /s/ nên -ed phát âm là /t/. called tận cùng bằng âm hữu thanh /l/ nên -ed phát âm là /d/."
  },
  {
    cau: 8,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "decided",
    B: "visited",
    C: "waited",
    D: "cleaned",
    dapAn: "D",
    ipa: {
      A: "/dɪˈsaɪdɪd/ (-ed phát âm là /ɪd/)",
      B: "/ˈvɪzɪtɪd/ (-ed phát âm là /ɪd/)",
      C: "/ˈweɪtɪd/ (-ed phát âm là /ɪd/)",
      D: "/kliːnd/ (-ed phát âm là /d/)"
    },
    giaiThich: "decided, visited, waited tận cùng bằng âm /d/, /t/ nên -ed phát âm là /ɪd/. cleaned tận cùng bằng âm hữu thanh /n/ nên -ed phát âm là /d/."
  },
  {
    cau: 9,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "cups",
    B: "stamps",
    C: "desks",
    D: "trees",
    dapAn: "D",
    ipa: {
      A: "/kʌps/ (-s phát âm là /s/)",
      B: "/stæmps/ (-s phát âm là /s/)",
      C: "/desks/ (-s phát âm là /s/)",
      D: "/triːz/ (-s phát âm là /z/)"
    },
    giaiThich: "cups, stamps, desks tận cùng bằng âm vô thanh /p/, /k/ nên phát âm là /s/. trees tận cùng bằng nguyên âm /iː/ nên phát âm là /z/."
  },
  {
    cau: 10,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "lived",
    B: "loved",
    C: "smiled",
    D: "laughed",
    dapAn: "D",
    ipa: {
      A: "/lɪvd/ (-ed phát âm là /d/)",
      B: "/lʌvd/ (-ed phát âm là /d/)",
      C: "/smaɪld/ (-ed phát âm là /d/)",
      D: "/lɑːft/ (-ed phát âm là /t/)"
    },
    giaiThich: "laughed có đuôi 'gh' phát âm là âm vô thanh /f/ nên -ed phát âm là /t/. lived, loved, smiled tận cùng bằng âm hữu thanh /v/, /l/ nên phát âm là /d/."
  },
  {
    cau: 11,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "washes",
    B: "teaches",
    C: "goes",
    D: "catches",
    dapAn: "C",
    ipa: {
      A: "/ˈwɒʃɪz/ (-es phát âm là /ɪz/)",
      B: "/ˈtiːtʃɪz/ (-es phát âm là /ɪz/)",
      C: "/ɡəʊz/ (-es phát âm là /z/)",
      D: "/ˈkætʃɪz/ (-es phát âm là /ɪz/)"
    },
    giaiThich: "washes, teaches, catches tận cùng bằng các âm xuýt /ʃ/, /tʃ/ nên phát âm là /ɪz/. goes tận cùng bằng nguyên âm /əʊ/ nên phát âm là /z/."
  },
  {
    cau: 12,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "days",
    B: "boys",
    C: "toys",
    D: "months",
    dapAn: "D",
    ipa: {
      A: "/deɪz/ (-s phát âm là /z/)",
      B: "/bɔɪz/ (-s phát âm là /z/)",
      C: "/tɔɪz/ (-s phát âm là /z/)",
      D: "/mʌnθs/ (-s phát âm là /s/)"
    },
    giaiThich: "months tận cùng bằng âm vô thanh /θ/ nên phát âm là /s/. days, boys, toys tận cùng bằng nguyên âm đôi /eɪ/, /ɔɪ/ nên phát âm là /z/."
  },
  {
    cau: 13,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "started",
    B: "ended",
    C: "painted",
    D: "helped",
    dapAn: "D",
    ipa: {
      A: "/ˈstɑːtɪd/ (-ed phát âm là /ɪd/)",
      B: "/ˈendɪd/ (-ed phát âm là /ɪd/)",
      C: "/ˈpeɪntɪd/ (-ed phát âm là /ɪd/)",
      D: "/helpt/ (-ed phát âm là /t/)"
    },
    giaiThich: "started, ended, painted tận cùng bằng âm /t/, /d/ nên -ed phát âm là /ɪd/. helped tận cùng bằng âm vô thanh /p/ nên phát âm là /t/."
  },
  {
    cau: 14,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "cooked",
    B: "finished",
    C: "liked",
    D: "used",
    dapAn: "D",
    ipa: {
      A: "/kʊkt/ (-ed phát âm là /t/)",
      B: "/ˈfɪnɪʃt/ (-ed phát âm là /t/)",
      C: "/laɪkt/ (-ed phát âm là /t/)",
      D: "/juːzd/ (-ed phát âm là /d/)"
    },
    giaiThich: "cooked, finished, liked tận cùng bằng âm vô thanh /k/, /ʃ/ nên phát âm là /t/. used kết thúc bằng âm hữu thanh /z/ nên -ed phát âm là /d/."
  },
  {
    cau: 15,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "potatoes",
    B: "tomatoes",
    C: "photos",
    D: "matches",
    dapAn: "D",
    ipa: {
      A: "/pəˈteɪtəʊz/ (-es phát âm là /z/)",
      B: "/təˈmɑːtəʊz/ (-es phát âm là /z/)",
      C: "/ˈfəʊtəʊz/ (-s phát âm là /z/)",
      D: "/ˈmætʃɪz/ (-es phát âm là /ɪz/)"
    },
    giaiThich: "matches tận cùng bằng âm xuýt /tʃ/ nên phát âm là /ɪz/. potatoes, tomatoes, photos tận cùng bằng nguyên âm /əʊ/ nên phát âm là /z/."
  },
  {
    cau: 16,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "learned",
    B: "stayed",
    C: "enjoyed",
    D: "walked",
    dapAn: "D",
    ipa: {
      A: "/lɜːnd/ (-ed phát âm là /d/)",
      B: "/steɪd/ (-ed phát âm là /d/)",
      C: "/ɪnˈdʒɔɪd/ (-ed phát âm là /d/)",
      D: "/wɔːkt/ (-ed phát âm là /t/)"
    },
    giaiThich: "walked tận cùng bằng âm vô thanh /k/ nên -ed phát âm là /t/. learned, stayed, enjoyed tận cùng bằng âm hữu thanh /n/, nguyên âm /eɪ/, /ɔɪ/ nên phát âm là /d/."
  },
  {
    cau: 17,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "students",
    B: "teachers",
    C: "farmers",
    D: "drivers",
    dapAn: "A",
    ipa: {
      A: "/ˈstjuːdnts/ (-s phát âm là /s/)",
      B: "/ˈtiːtʃəz/ (-s phát âm là /z/)",
      C: "/ˈfɑːməz/ (-s phát âm là /z/)",
      D: "/ˈdraɪvəz/ (-s phát âm là /z/)"
    },
    giaiThich: "students tận cùng bằng âm vô thanh /t/ nên phát âm là /s/. teachers, farmers, drivers tận cùng bằng nguyên âm /ə/ nên phát âm là /z/."
  },
  {
    cau: 18,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "friends",
    B: "girls",
    C: "boys",
    D: "shirts",
    dapAn: "D",
    ipa: {
      A: "/frendz/ (-s phát âm là /z/)",
      B: "/ɡɜːlz/ (-s phát âm là /z/)",
      C: "/bɔɪz/ (-s phát âm là /z/)",
      D: "/ʃɜːts/ (-s phát âm là /s/)"
    },
    giaiThich: "shirts tận cùng bằng âm vô thanh /t/ nên phát âm là /s/. friends, girls, boys tận cùng bằng âm hữu thanh /d/, /l/, nguyên âm /ɔɪ/ nên phát âm là /z/."
  },
  {
    cau: 19,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "arrived",
    B: "happened",
    C: "listened",
    D: "invited",
    dapAn: "D",
    ipa: {
      A: "/əˈraɪvd/ (-ed phát âm là /d/)",
      B: "/ˈhæpənd/ (-ed phát âm là /d/)",
      C: "/ˈlɪsnd/ (-ed phát âm là /d/)",
      D: "/ɪnˈvaɪtɪd/ (-ed phát âm là /ɪd/)"
    },
    giaiThich: "invited tận cùng bằng âm /t/ nên -ed phát âm là /ɪd/. arrived, happened, listened tận cùng bằng âm hữu thanh /v/, /n/ nên phát âm là /d/."
  },
  {
    cau: 20,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "hoped",
    B: "washed",
    C: "talked",
    D: "rained",
    dapAn: "D",
    ipa: {
      A: "/həʊpt/ (-ed phát âm là /t/)",
      B: "/wɒʃt/ (-ed phát âm là /t/)",
      C: "/tɔːkt/ (-ed phát âm là /t/)",
      D: "/reɪnd/ (-ed phát âm là /d/)"
    },
    giaiThich: "hoped, washed, talked tận cùng bằng âm vô thanh /p/, /ʃ/, /k/ nên -ed phát âm là /t/. rained tận cùng bằng âm hữu thanh /n/ nên -ed phát âm là /d/."
  }
];

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showTheoryModal, setShowTheoryModal] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  const webhookSentRef = useRef<boolean>(false);

  // Calculate score
  const totalCorrect = Object.entries(answers).filter(
    ([cauStr, ans]) => QUESTIONS[Number(cauStr) - 1]?.dapAn === ans
  ).length;

  const currentQ = QUESTIONS[currentIndex];
  const selectedAnswer = answers[currentQ?.cau];
  const answeredCount = Object.keys(answers).length;

  // Speak word using SpeechSynthesis
  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.onstart = () => setSpeakingWord(word);
      utterance.onend = () => setSpeakingWord(null);
      utterance.onerror = () => setSpeakingWord(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Trigger webhook and confetti upon entering result screen
  useEffect(() => {
    if (screen === 'result' && !webhookSentRef.current) {
      webhookSentRef.current = true;

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      // Requirement 4: Send result to Webhook
      const payload = {
        buoi: "Tuần 4",
        loai: "Quy tắc phát âm đuôi -s/-es và -ed",
        dung: totalCorrect,
        tong: 20,
        url: window.location.href
      };

      try {
        fetch("https://script.google.com/macros/s/AKfycbwR-qt3yItcs-NyP99caiZ2Fw83ScFVfGh-vsMaPr5GCPM7_TpkIaJI6yx3TB2GjuNPEQ/exec", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload),
          mode: "no-cors"
        })
          .then(() => {
            console.log("Kết quả đã gửi thành công!");
          })
          .catch((err) => {
            console.error("Lỗi gửi kết quả:", err);
          });
      } catch (e) {
        console.error("Lỗi gửi kết quả:", e);
      }
    }
  }, [screen, totalCorrect]);

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.cau]: opt
    }));
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Last question -> Submit
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    webhookSentRef.current = false;
    setScreen('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered review questions
  const filteredQuestions = QUESTIONS.filter(q => {
    const isCorrect = answers[q.cau] === q.dapAn;
    if (reviewFilter === 'correct') return isCorrect;
    if (reviewFilter === 'wrong') return !isCorrect;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-2xl mx-auto px-4 py-4 sm:py-6">
      {/* Top Header / Brand */}
      <header className="flex items-center justify-between pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Luyện Thi Lớp 10</div>
            <h1 className="text-sm sm:text-base font-bold text-slate-800 line-clamp-1">Tiếng Anh — Chuyên Đề Ngữ Âm</h1>
          </div>
        </div>

        <button
          onClick={() => setShowTheoryModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full text-xs font-semibold transition shadow-sm active:scale-95"
          title="Xem mẹo nhớ quy tắc phát âm"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Mẹo nhớ quy tắc</span>
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 my-4 sm:my-6">
        {/* ================= SCREEN 1: BẮT ĐẦU ================= */}
        {screen === 'intro' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/70 border border-indigo-50 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-white shadow-lg shadow-amber-200/80 mb-5 animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>

            <span className="px-3.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100 mb-3">
              Mục tiêu điểm 9+ Tiếng Anh vào 10
            </span>

            {/* Requirement 1: Hiện tên buổi */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-heading leading-tight">
              Tuần 4 — Quy tắc phát âm đuôi -s/-es và -ed
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mb-6 max-w-lg leading-relaxed">
              Bộ bài tập 20 câu trắc nghiệm chuẩn cấu trúc đề thi tuyển sinh vào lớp 10 THPT. Giúp em làm chủ điểm số phần ngữ âm phát âm đuôi chỉ sau 10 phút!
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8 text-left">
              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  20
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">20 câu hỏi</div>
                  <div className="text-[11px] text-slate-500">Từng câu trọng tâm</div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Chấm điểm ngay</div>
                  <div className="text-[11px] text-slate-500">Giải thích chi tiết</div>
                </div>
              </div>
            </div>

            {/* Mẹo tóm tắt nhanh */}
            <div className="w-full max-w-md bg-amber-50/80 rounded-2xl p-4 border border-amber-200/70 text-left mb-8">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-2 uppercase">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                Mẹo siêu tốc nhớ quy tắc:
              </div>
              <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
                <li><span className="font-semibold">Đuôi -s/-es:</span> Phát âm /s/ với <em>"Thời phong kiến phương tây"</em> (/p/, /t/, /k/, /f/, /θ/).</li>
                <li><span className="font-semibold">Đuôi -ed:</span> Phát âm /ɪd/ với <em>"Tiền đô"</em> (âm /t/, /d/). Phát âm /t/ với <em>"Sáng sớm chạy khắp phố phường"</em>.</li>
              </ul>
            </div>

            {/* Requirement 1: Nút Bắt đầu làm bài */}
            <button
              onClick={() => setScreen('quiz')}
              className="w-full max-w-md py-4 px-6 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-300 transition transform active:scale-[0.98] flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>Bắt đầu làm bài</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ================= SCREEN 2: MÀN HÌNH LÀM BÀI ================= */}
        {screen === 'quiz' && currentQ && (
          <div className="space-y-4">
            {/* Thanh tiến trình */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Tiến độ làm bài
                </span>
                <span className="text-xs font-bold text-slate-700">
                  Câu <span className="text-indigo-600 text-sm">{currentIndex + 1}</span> / {QUESTIONS.length}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Mini question chips for navigation */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-2 mt-2 scrollbar-none">
                {QUESTIONS.map((q, idx) => {
                  const isAnswered = !!answers[q.cau];
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.cau}
                      onClick={() => setCurrentIndex(idx)}
                      className={`shrink-0 w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                          : isAnswered
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Khung câu hỏi */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-indigo-100/60 border border-indigo-50">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Câu hỏi {currentQ.cau}
                </span>
                {selectedAnswer && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Đã chọn đáp án {selectedAnswer}
                  </span>
                )}
              </div>

              {/* Giữ NGUYÊN VĂN từng chữ tiếng Anh — không dịch, không diễn giải lại */}
              <p className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-relaxed">
                {currentQ.hoi}
              </p>

              {/* 4 đáp án A, B, C, D */}
              <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
                {(['A', 'B', 'C', 'D'] as const).map(optionKey => {
                  const word = currentQ[optionKey];
                  const isSelected = selectedAnswer === optionKey;

                  return (
                    <button
                      key={optionKey}
                      onClick={() => handleSelectOption(optionKey)}
                      className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-1 ring-indigo-500'
                          : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50/70'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 flex-1">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                          }`}
                        >
                          {optionKey}
                        </div>
                        <span className="text-base sm:text-lg font-semibold text-slate-800 tracking-wide">
                          {word}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Audio pronounce button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakWord(word);
                          }}
                          className={`p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 transition ${
                            speakingWord === word ? 'text-indigo-600 scale-110 bg-indigo-100' : ''
                          }`}
                          title={`Nghe phát âm từ "${word}"`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition shrink-0 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-indigo-50 flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-1.5 transition ${
                  currentIndex === 0
                    ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Câu trước</span>
              </button>

              <div className="text-xs text-slate-500 font-medium">
                Đã làm: <span className="font-bold text-indigo-600">{answeredCount}</span>/20
              </div>

              {currentIndex === QUESTIONS.length - 1 ? (
                // Câu cuối cùng đổi thành "Nộp bài"
                <button
                  onClick={handleNext}
                  className="py-3 px-6 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200 transition active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Nộp bài</span>
                </button>
              ) : (
                // Nút "Câu tiếp theo"
                <button
                  onClick={handleNext}
                  className="py-3 px-5 sm:px-6 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-200 transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Câu tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= SCREEN 3: MÀN HÌNH KẾT QUẢ ================= */}
        {screen === 'result' && (
          <div className="space-y-6">
            {/* Score Hero Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/70 border border-indigo-50 text-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-100 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-100 rounded-full blur-2xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 text-white shadow-lg shadow-amber-200 mb-3">
                  <Award className="w-9 h-9" />
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                  Kết quả bài thi trắc nghiệm
                </div>

                {/* Requirement 3: Hiện "Em đúng X/20 câu" */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 font-heading">
                  Em đúng <span className="text-indigo-600">{totalCorrect}</span>/20 câu
                </h2>

                <div className="text-sm font-medium text-slate-600 mb-4">
                  Điểm số quy đổi: <span className="font-bold text-amber-600 text-lg">{(totalCorrect * 0.5).toFixed(1)}/10 điểm</span>
                </div>

                {/* Đánh giá động */}
                <div className="inline-block px-4 py-2 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs sm:text-sm font-semibold max-w-md mx-auto">
                  {totalCorrect === 20 && '🌟 Xuất sắc tuyệt đối! Em đã nắm trọn 100% quy tắc phát âm -s và -ed!'}
                  {totalCorrect >= 17 && totalCorrect < 20 && '🎉 Rất tốt! Em nắm kiến thức rất vững vàng, sẵn sàng bứt phá đề thi vào 10!'}
                  {totalCorrect >= 13 && totalCorrect < 17 && '👏 Khá tốt! Em hãy xem kỹ lại các câu sai bên dưới để ghi nhớ các âm xuýt và ngoại lệ nhé!'}
                  {totalCorrect >= 8 && totalCorrect < 13 && '💪 Em cần ôn tập thêm một chút. Hãy đọc kỹ phần giải thích chi tiết bên dưới nhé!'}
                  {totalCorrect < 8 && '🌱 Cố gắng lên nhé! Em đọc lại phần mẹo nhớ quy tắc rồi làm lại lần nữa để đạt điểm cao hơn nhé!'}
                </div>

                {/* Requirement 3: Nút "Làm lại từ đầu" */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm lại từ đầu</span>
                  </button>

                  <button
                    onClick={() => setShowTheoryModal(true)}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Xem lại lý thuyết</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between gap-2 px-1">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                <span>Chi tiết đáp án từng câu</span>
              </h3>

              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    reviewFilter === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Tất cả (20)
                </button>
                <button
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    reviewFilter === 'wrong' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Sai ({20 - totalCorrect})
                </button>
                <button
                  onClick={() => setReviewFilter('correct')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    reviewFilter === 'correct' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Đúng ({totalCorrect})
                </button>
              </div>
            </div>

            {/* Danh sách câu hỏi kèm dấu tích xanh/đỏ và đáp án đúng */}
            <div className="space-y-4">
              {filteredQuestions.map(q => {
                const studentAns = answers[q.cau];
                const isCorrect = studentAns === q.dapAn;

                return (
                  <div
                    key={q.cau}
                    className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition ${
                      isCorrect ? 'border-emerald-100 hover:border-emerald-200' : 'border-rose-100 hover:border-rose-200'
                    }`}
                  >
                    {/* Header: Câu số + Dấu tích xanh / Dấu X đỏ */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                          Câu {q.cau}
                        </span>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            <XCircle className="w-3.5 h-3.5" /> Sai
                          </span>
                        )}
                      </div>

                      <div className="text-xs">
                        <span className="text-slate-400">Đáp án đúng: </span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {q.dapAn}
                        </span>
                      </div>
                    </div>

                    {/* Câu hỏi giữ NGUYÊN VĂN tiếng Anh */}
                    <div className="text-sm sm:text-base font-semibold text-slate-900 mb-3">
                      {q.hoi}
                    </div>

                    {/* 4 options grid with status */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {(['A', 'B', 'C', 'D'] as const).map(opt => {
                        const isStudentChoice = studentAns === opt;
                        const isTargetDapAn = q.dapAn === opt;

                        let optClasses = 'border-slate-100 bg-slate-50/60 text-slate-700';
                        if (isTargetDapAn) {
                          optClasses = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-300';
                        } else if (isStudentChoice && !isTargetDapAn) {
                          optClasses = 'border-rose-300 bg-rose-50 text-rose-900 line-through';
                        }

                        return (
                          <div
                            key={opt}
                            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${optClasses}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{opt}.</span>
                              <span>{q[opt]}</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => speakWord(q[opt])}
                              className="text-slate-400 hover:text-indigo-600 transition p-1"
                              title={`Phát âm "${q[opt]}"`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Phiên âm IPA & Giải thích chi tiết */}
                    <div className="bg-indigo-50/60 rounded-xl p-3 border border-indigo-100 text-xs text-slate-700 space-y-1.5">
                      <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Phiên âm chi tiết:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 font-mono">
                        <div>A. {q.A}: {q.ipa.A}</div>
                        <div>B. {q.B}: {q.ipa.B}</div>
                        <div>C. {q.C}: {q.ipa.C}</div>
                        <div>D. {q.D}: {q.ipa.D}</div>
                      </div>
                      <div className="pt-1 border-t border-indigo-100/70 text-slate-700">
                        <span className="font-semibold text-indigo-800">Giải thích: </span>
                        {q.giaiThich}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom replay button */}
            <div className="text-center pt-4 pb-8">
              <button
                onClick={handleReset}
                className="w-full py-4 px-6 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 transition active:scale-95 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Làm lại từ đầu</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: MẸO NHỚ QUY TẮC ================= */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-indigo-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Bảng Mẹo Nhớ Quy Tắc Phát Âm
                </h3>
              </div>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quy tắc 1: Đuôi -s/-es */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-indigo-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                1. Quy tắc phát âm đuôi -s / -es:
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                  <div className="font-bold text-sky-900">
                    Phát âm là /s/:
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    Khi âm cuối là các âm vô thanh: <span className="font-mono font-bold text-sky-700">/p/, /k/, /f/, /t/, /θ/</span>.
                  </div>
                  <div className="text-amber-800 font-medium mt-1 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                    💡 Mẹo nhớ: <strong>"Thời phong kiến phương tây"</strong> hoặc <strong>"Phải phục thù thôi"</strong>.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="font-bold text-purple-900">
                    Phát âm là /ɪz/:
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    Khi âm cuối là các âm xuýt: <span className="font-mono font-bold text-purple-700">/s/, /z/, /ʃ/, /tʃ/, /ʒ/, /dʒ/</span> (thường tận cùng bằng chữ cái s, x, z, ch, sh, ce, ge).
                  </div>
                  <div className="text-amber-800 font-medium mt-1 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                    💡 Mẹo nhớ: <strong>"Sông xưa giờ chẳng shợ zì"</strong>.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="font-bold text-emerald-900">
                    Phát âm là /z/:
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    Khi âm cuối là các âm hữu thanh còn lại (b, d, g, v, l, m, n, r, các nguyên âm).
                  </div>
                </div>
              </div>
            </div>

            {/* Quy tắc 2: Đuôi -ed */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-sm text-indigo-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                2. Quy tắc phát âm đuôi -ed:
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                  <div className="font-bold text-sky-900">
                    Phát âm là /ɪd/:
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    Khi động từ tận cùng bằng âm: <span className="font-mono font-bold text-sky-700">/t/, /d/</span> (wanted, needed, decided).
                  </div>
                  <div className="text-amber-800 font-medium mt-1 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                    💡 Mẹo nhớ: <strong>"Tiền đô"</strong> (T - Đ).
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="font-bold text-purple-900">
                    Phát âm là /t/:
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    Khi động từ tận cùng bằng các âm vô thanh: <span className="font-mono font-bold text-purple-700">/p/, /k/, /f/, /s/, /ʃ/, /tʃ/</span> (looked, watched, stopped).
                  </div>
                  <div className="text-amber-800 font-medium mt-1 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                    💡 Mẹo nhớ: <strong>"Sáng sớm chạy khắp phố phường"</strong>.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="font-bold text-emerald-900">
                    Phát âm là /d/:
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    Tất cả các trường hợp còn lại (nguyên âm và phụ âm hữu thanh: lived, loved, played, opened).
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowTheoryModal(false)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition cursor-pointer text-sm shadow-md"
            >
              Đã hiểu & Tiếp tục làm bài
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-2 text-xs text-slate-400">
        Lớp 9 Luyện Thi Vào 10 — Chuyên Đề Phát Âm Đuôi -s/-es & -ed
      </footer>
    </div>
  );
}
