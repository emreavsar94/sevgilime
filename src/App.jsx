import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sun, Coffee, Calendar, Star, Music, Gift, Flower, Flower2, Image as ImageIcon, Ticket, ChevronLeft, ChevronRight, Play, Pause, X, Sparkles, Camera, CheckCircle2, Trophy } from 'lucide-react';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('intro');
  const [loveNote, setLoveNote] = useState('');
  const [showCoffee, setShowCoffee] = useState(false);
  const [quizStep, setQuizStep] = useState('start'); // start, question, result
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  // Relationship start date (Year, Month (0-indexed), Day)
  const startDate = new Date(2024, 10, 23);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0 });

  // --- FOTOĞRAF GALERİSİ AYARI ---
  const photos = [
    { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop", caption: "Birlikte ilk tatilimiz..." },
    { url: "https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?q=80&w=600&auto=format&fit=crop", caption: "Gülüşünü sevdiğim an." },
    { url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop", caption: "Seninle her yer güzel." }
  ];
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // --- MÜZİK AYARI ---
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  // Kupon Sistemi
  const [coupons, setCoupons] = useState([
    { id: 1, title: "Sınırsız Masaj", desc: "Bugün yorgunluğunu ben alacağım.", used: false, icon: "💆‍♀️" },
    { id: 2, title: "Kahvaltı Yatakta", desc: "Sen kalkma, kahvaltın sana gelsin.", used: false, icon: "🥐" },
    { id: 3, title: "Film Seçimi Sende", desc: "İtiraz etmeden izleyeceğim.", used: false, icon: "🎬" },
    { id: 4, title: "Bir Tartışmayı Kazan", desc: "Haklısın hayatım kartı.", used: false, icon: "👑" },
  ]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Romantic notes list
  const notes = [
    "Seninle uyanmak, güne başlamanın en güzel yolu.",
    "Gözlerini açtığında güneş benim için ikinci kez doğuyor.",
    "Kahvemden daha sıcak, sabahımdan daha aydınlıksın.",
    "Bugün de seni dünden daha çok seveceğim.",
    "Hayatımdaki en güzel 'İyi ki'sin.",
    "Senin gülüşün benim yakıtım, günaydın hayatım.",
    "Dünyanın en güzel kadınına: Seni Seviyorum.",
    "Varlığın bana her gün verilmiş bir hediye.",
    "Sesini duymadan günüm gerçekten başlamıyor.",
    "Sadece sen olduğun için teşekkür ederim."
  ];

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      setTimeTogether({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNewNote = () => {
    const randomIndex = Math.floor(Math.random() * notes.length);
    setLoveNote(notes[randomIndex]);
  };

  const createFloatingHeart = (x, y) => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'fixed text-2xl pointer-events-none select-none z-[9999]';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.animation = 'float-up 1.5s ease-out forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  };

  const handleScreenClick = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    createFloatingHeart(e.clientX, e.clientY);
  };

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (audioRef.current && !audioError) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => setAudioError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleUseCoupon = async (id) => {
    if (!user) return;
    const updated = coupons.map(c => c.id === id ? { ...c, used: true } : c);
    setCoupons(updated);
    setSelectedCoupon(null);
  };

  if (currentPage === 'intro') {
    return (
      <div
        onClick={() => setCurrentPage('main')}
        className="min-h-screen bg-gradient-to-br from-rose-400 to-orange-300 flex flex-col items-center justify-center text-white p-6 cursor-pointer relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        <Sun size={80} className="mb-6 animate-spin-slow text-yellow-200" />
        <h1 className="text-4xl font-bold text-center mb-4 drop-shadow-md font-serif">Günaydın Sevgilim</h1>
        <p className="text-xl text-center opacity-90 animate-bounce mt-4">Güne başlamak için ekrana dokun...</p>
        <div className="absolute bottom-10 text-sm opacity-70">Senin için hazırlandı ❤️</div>
        <style>{`
          .animate-spin-slow { animation: spin 8s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div
      onClick={handleScreenClick}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 text-gray-800 font-sans pb-10 overflow-x-hidden relative"
    >
      <audio ref={audioRef} src={musicUrl} loop />

      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg text-rose-500 hover:scale-110 transition-transform active:scale-95"
      >
        {isPlaying ? <Pause size={24} className="animate-pulse" /> : <Play size={24} />}
      </button>

      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm p-4 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-500">
            <Heart className="fill-rose-500 animate-pulse" size={24} />
            <span className="font-bold text-lg">Sonsuz Aşkım</span>
          </div>
          <Sparkles className="text-yellow-500" size={20} />
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-md mx-auto relative z-10">
        {/* Profile/Hero */}
        <section className="text-center py-4 relative">
          <div className="inline-block relative p-2 rounded-[2.5rem] bg-gradient-to-tr from-rose-200 via-white to-orange-100 shadow-inner mb-6">
            <div className="bg-white p-2 rounded-[2.2rem] shadow-2xl">
              <div className="w-32 h-32 rounded-[2rem] bg-rose-50 flex items-center justify-center overflow-hidden border-2 border-rose-50">
                <Flower2 className="w-20 h-20 text-rose-400 fill-rose-200 animate-sway" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-rose-50">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Harika Bir Gün Olsun</h2>
          <p className="text-gray-400 text-sm mt-2 font-medium italic">"Gülüşünle dünyayı iyileştirmeye hazır mısın?"</p>
        </section>

        {/* Counter Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-rose-100">
          <div className="absolute -top-5 right-10 p-4 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
            <Calendar size={80} />
          </div>
          <div className="flex items-center gap-2 mb-4 text-rose-500">
            <Calendar size={20} />
            <h3 className="font-semibold">Sonsuzluğa giden yolculuğumuz...</h3>
            <Heart className="text-rose-200 fill-rose-100 ml-auto" size={24} />
            <h1 className="text-[10px] font-bold text-gray-300 uppercase">23.11.2024'den beri</h1>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-rose-50 rounded-lg p-2">
              <div className="text-2xl font-bold text-rose-600">{timeTogether.days}</div>
              <div className="text-xs text-gray-500">Gün</div>
            </div>
            <div className="bg-rose-50 rounded-lg p-2">
              <div className="text-2xl font-bold text-rose-600">{timeTogether.hours}</div>
              <div className="text-xs text-gray-500">Saat</div>
            </div>
            <div className="bg-rose-50 rounded-lg p-2">
              <div className="text-2xl font-bold text-rose-600">{timeTogether.minutes}</div>
              <div className="text-xs text-gray-500">Dakika</div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3 italic">...ve her saniyesine değer.</p>
        </div>

        {/* Daily Note Generator */}
        <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="flex items-center gap-2 mb-4">
            <Gift size={20} />
            <h3 className="font-semibold">Kalbimden Notlar</h3>
          </div>

          <div className="min-h-[80px] flex items-center justify-center text-center">
            {loveNote ? (
              <p className="text-lg font-medium animate-fade-in font-serif italic">"{loveNote}"</p>
            ) : (
              <p className="opacity-80 text-sm">Bugün seni ne kadar sevdiğimi duymak ister misin?</p>
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleNewNote(); }}
            className="w-full mt-4 bg-white text-rose-500 font-bold py-3 rounded-xl shadow-md active:transform active:scale-95 transition-all hover:bg-rose-50"
          >
            {loveNote ? "Bir Tane Daha Çek" : "Kutuyu Aç"}
          </button>
        </div>

        {/* Coffee Interactive */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-5 rounded-3xl transition-all duration-700 ${showCoffee ? 'bg-orange-100 text-orange-600 rotate-[15deg] scale-110 shadow-lg' : 'bg-gray-50 text-gray-300'}`}>
                <Coffee size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Sabah Kahven</h4>
                <p className="text-xs text-gray-500">{showCoffee ? "Afiyet olsun aşkım!" : "Senin için hazırlayayım mı?"}</p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowCoffee(true); }}
              disabled={showCoffee}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showCoffee
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
            >
              {showCoffee ? "Aşkla Hazırlandı ❤️" : "Hazırla"}
            </button>
          </div>

          {showCoffee && (
            <div className="mt-4 flex justify-center animate-fade-in">
              <div className="relative">
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 0.3, 0.6, 0.9].map((delay) => (
                    <div key={delay} className="w-2 h-8 bg-gradient-to-t from-orange-200 to-transparent rounded-full animate-steam-new" style={{ animationDelay: `${delay}s` }} />
                  ))}
                </div>
                <div className="bg-orange-900 w-20 h-14 rounded-b-[1.5rem] rounded-t-sm relative shadow-2xl">
                  <div className="absolute -right-5 top-2 w-8 h-8 border-[6px] border-orange-900 rounded-full" />
                  <div className="absolute top-1 left-1 right-1 h-1 bg-white/20 rounded-full blur-[1px]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Coupons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-black text-xl text-gray-800 px-1">Aşk Kuponların</h3>
            <div className="p-2 bg-rose-50 rounded-lg text-rose-500"><Ticket size={20} /></div>
          </div>
          <div className="grid gap-3">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                onClick={(e) => { e.stopPropagation(); if (!coupon.used) setSelectedCoupon(coupon); }}
                className={`p-4 rounded-3xl border-2 flex items-center justify-between transition-all ${coupon.used ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-rose-50 shadow-sm hover:border-rose-200 cursor-pointer active:scale-98'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl bg-rose-50 p-2 rounded-2xl">{coupon.icon}</span>
                  <div>
                    <h4 className={`font-bold ${coupon.used ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{coupon.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{coupon.used ? 'Kullanıldı' : 'Hemen Kullan'}</p>
                  </div>
                </div>
                {!coupon.used && <ChevronRight className="text-rose-200" size={20} />}
              </div>
            ))}
          </div>
        </div>

        {/* --- COUPON MODAL --- */}
        {selectedCoupon && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center relative shadow-2xl transform transition-all scale-100">
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedCoupon(null); }}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-2"
              >
                <X size={20} />
              </button>
              <div className="text-6xl mb-4 bg-rose-50 w-20 h-20 flex items-center justify-center rounded-full mx-auto">{selectedCoupon.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedCoupon.title}</h3>
              <p className="text-gray-600 mb-6">{selectedCoupon.desc}</p>
              <button
                onClick={(e) => { e.stopPropagation(); handleUseCoupon(selectedCoupon.id); }}
                className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl hover:bg-rose-600 active:scale-95 transition-all shadow-lg shadow-rose-200"
              >
                Kuponu Kullan
              </button>
              <p className="mt-4 text-[10px] text-gray-400 italic">Not: Bu kupon kullanıldıktan sonra tekrar aktif olmaz.</p>
            </div>
          </div>
        )}

        {/* NEW FEATURE: Daily Love Quiz */}
        <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden no-heart">
          <div className="absolute top-0 right-0 p-6 opacity-10"><Trophy size={60} /></div>
          <h3 className="text-rose-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">Günün Aşk Sorusu</h3>

          {quizStep === 'start' && (
            <div className="animate-fade-in">
              <p className="text-lg font-bold mb-6">Bugün beni ne kadar iyi tanıyorsun görelim mi?</p>
              <button onClick={() => setQuizStep('question')} className="w-full bg-rose-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-all">Testi Başlat</button>
            </div>
          )}

          {quizStep === 'question' && (
            <div className="animate-fade-in">
              <p className="text-base font-medium mb-6">"En çok hangi huyunu sevdiğimi biliyor musun?"</p>
              <div className="grid gap-3">
                {['Gülüşünü', 'Zekanı', 'Merhametini', 'Hepsini!'].map((opt, i) => (
                  <button key={i} onClick={() => setQuizStep('result')} className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl text-sm font-medium transition-all text-left px-6 border border-white/5">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 'result' && (
            <div className="text-center animate-fade-in py-4">
              <div className="inline-block p-4 bg-rose-500/20 rounded-full mb-4">
                <CheckCircle2 size={40} className="text-rose-500" />
              </div>
              <p className="text-xl font-black mb-2">DOĞRU CEVAP!</p>
              <p className="text-gray-400 text-sm mb-6">Çünkü senin her halin benim için bir mucize...</p>
              <button onClick={() => setQuizStep('start')} className="text-rose-400 text-xs font-bold uppercase tracking-widest">Yarın Tekrar Dene</button>
            </div>
          )}
        </div>
      </main>



      {/* Footer */}
      <footer className="text-center py-16 px-6">
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5].map(i => (
            <Heart key={i} size={16} className={`text-rose-200 fill-rose-100 transition-all duration-1000 ${isPlaying ? 'animate-heart-beat' : ''}`} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <p className="text-rose-300 text-[10px] font-black uppercase tracking-[0.5em] mb-2 drop-shadow-sm">Seni Her Şeyden Çok Seven Eşin</p>
        <p className="text-gray-300 text-[9px] font-bold">Her Günün Bir Öncekinden Daha Güzel Olsun</p>
      </footer>

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-150px) scale(2); opacity: 0; }
        }
                @keyframes steam-new {
          0% { transform: translateY(0) scaleX(1); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-40px) scaleX(2) scaleY(1.5); opacity: 0; }
        }
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-5px); }
        }
        .animate-steam-new { animation: steam-new 2.5s infinite ease-out; }
        .animate-heart-beat { animation: heart-beat 1.5s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95); }
        .animate-music-bar { animation: music-bar 0.8s infinite ease-in-out; }
        .animate-sway { animation: sway 3s infinite ease-in-out; }
        
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        
        .animate-steam-1 { animation: steam 2s infinite 0s; opacity: 0; }
        .animate-steam-2 { animation: steam 2s infinite 0.5s; opacity: 0; }
        .animate-steam-3 { animation: steam 2s infinite 1s; opacity: 0; }
        
        @keyframes steam {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }

                body { -webkit-tap-highlight-color: transparent; }
        .no-heart { cursor: default; }
      `}</style>
    </div>
  );
};

export default App;