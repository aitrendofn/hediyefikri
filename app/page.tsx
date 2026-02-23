"use client";

import { useEffect, useMemo, useState } from "react";

type Recipient =
  | "sevgili_es"
  | "anne_baba"
  | "kardes"
  | "arkadas"
  | "is_arkadasi";

type Vibe = "duygusal" | "pratik" | "eglenceli" | "minimal" | "lux";

type Occasion = "dogum_gunu" | "yildonumu" | "tesekkur" | "surpriz";

type GiftIdea = {
  title: string;
  why: string;
  budget: string;
  twist: string;
};

function formatTry(amount: number) {
  if (!Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat("tr-TR").format(amount) + " ₺";
}

function generateGiftIdeas(input: {
  recipient: Recipient;
  budget: number;
  vibe: Vibe;
  occasion: Occasion;
}): GiftIdea[] {
  const { recipient, budget, vibe, occasion } = input;

  const isLow = budget <= 300;
  const isMid = budget > 300 && budget <= 1200;
  const isHigh = budget > 1200;

  const base: GiftIdea[] = [];

  if (vibe === "duygusal") {
    base.push({
      title: "Kişiye özel mektup + mini anı kutusu",
      why: "Duygusal hediyeler en çok “hatıra” üzerinden değer kazanır.",
      budget: isLow ? "50–250 ₺" : isMid ? "200–600 ₺" : "400–1000 ₺",
      twist: "Kutunun içine 3 küçük “görev kartı” koy (ör. birlikte yapılacak 3 şey).",
    });
  }

  if (vibe === "pratik") {
    base.push({
      title: "Günlük hayatı kolaylaştıran “problem çözen” hediye",
      why: "Pratik kişiler ‘işe yarayan’ şeye daha çok bağlanır.",
      budget: isLow ? "150–300 ₺" : isMid ? "400–1200 ₺" : "1200–3000 ₺",
      twist: "Hediyeyi küçük bir notla ‘neden bunu seçtim’ diye kişiselleştir.",
    });
  }

  if (vibe === "eglenceli") {
    base.push({
      title: "Mini sürpriz avı (3 ipucu + final hediye)",
      why: "Deneyim hediyesi, eğlenceli kişilerde daha çok ‘an’ bırakır.",
      budget: isLow ? "0–250 ₺" : isMid ? "200–800 ₺" : "500–2000 ₺",
      twist: "İlk ipucu WhatsApp’tan, ikinci ipucu evde, üçüncü ipucu dışarıda olsun.",
    });
  }

  if (vibe === "minimal") {
    base.push({
      title: "Kaliteli tek parça (az ama iyi)",
      why: "Minimal kişiler çok seçenekten değil, doğru seçilmiş tek parçadan hoşlanır.",
      budget: isLow ? "200–350 ₺" : isMid ? "600–1500 ₺" : "1500–4000 ₺",
      twist: "Ambalajı sade tut: tek renk + küçük bir kart.",
    });
  }

  if (vibe === "lux") {
    base.push({
      title: "Premium deneyim: özel gün paketi",
      why: "Lüks algısı ‘deneyim + sunum’ birleşiminden gelir.",
      budget: isLow ? "300 ₺+" : isMid ? "1200–2500 ₺" : "2500–8000 ₺",
      twist: "Sunumu güçlendir: kaliteli hediye paketi + kişiye özel not.",
    });
  }

  const recipientAdditions: GiftIdea[] = [];
  if (recipient === "sevgili_es") {
    recipientAdditions.push({
      title: "Birlikte deneyim: küçük bir kaçamak planı",
      why: "Romantik ilişkilerde ‘birlikte zaman’ çok yüksek değer üretir.",
      budget: isLow ? "0–300 ₺" : isMid ? "400–1500 ₺" : "1500–7000 ₺",
      twist: "Planı ‘gizemli’: sadece saat ve buluşma noktası ver.",
    });
  } else if (recipient === "anne_baba") {
    recipientAdditions.push({
      title: "Aile anısı: dijital fotoğraflardan basılı albüm",
      why: "Aile için en güçlü hediye: emek + hatıra.",
      budget: isLow ? "100–300 ₺" : isMid ? "300–900 ₺" : "900–2000 ₺",
      twist: "Albümün ilk sayfasına kısa bir teşekkür mektubu ekle.",
    });
  } else if (recipient === "kardes") {
    recipientAdditions.push({
      title: "Hobi seti (oyun, spor, çizim, müzik)",
      why: "Kardeşlerde ortak ilgi alanı hediyeyi ‘kullanılır’ yapar.",
      budget: isLow ? "150–350 ₺" : isMid ? "400–1300 ₺" : "1300–3500 ₺",
      twist: "Beraber kullanacağınız küçük bir ‘ikili’ parça ekle.",
    });
  } else if (recipient === "arkadas") {
    recipientAdditions.push({
      title: "Kişiye özel küçük jest: kupaya/tişörte anlamlı bir detay",
      why: "Arkadaş için önemli olan: ‘beni düşünmüş’ hissi.",
      budget: isLow ? "100–300 ₺" : isMid ? "300–900 ₺" : "900–2000 ₺",
      twist: "Birlikte çekildiğiniz bir fotoğrafı küçük kart yap.",
    });
  } else if (recipient === "is_arkadasi") {
    recipientAdditions.push({
      title: "Şık ama güvenli hediye: masaüstü/kalem/termos",
      why: "İş ortamında risksiz ama kaliteli seçenekler en mantıklısıdır.",
      budget: isLow ? "150–350 ₺" : isMid ? "350–1200 ₺" : "1200–3000 ₺",
      twist: "Notu kısa tut: ‘Başarılar / teşekkürler’ gibi.",
    });
  }

  const occasionHint =
    occasion === "yildonumu"
      ? "Yıldönümü için daha romantik bir sunum seç."
      : occasion === "tesekkur"
      ? "Teşekkür için küçük ama anlamlı bir detay ekle."
      : occasion === "surpriz"
      ? "Sürprizde zamanlama her şey: beklenmedik anda ver."
      : "Doğum gününde kişiselleştirme puan kazandırır.";

  const all = [...base, ...recipientAdditions];

  const fillers: GiftIdea[] = [
    {
      title: "Kişiselleştirilmiş playlist + küçük not",
      why: "Bedava/ucuz ama çok etkili; tamamen kişisel.",
      budget: "0–150 ₺",
      twist: "Her 3 şarkı için 1 cümlelik ‘neden bu şarkı’ notu yaz.",
    },
    {
      title: "Hediye kartı ama ‘senaryo’ ile",
      why: "Kartı soğuk olmaktan çıkarıp deneyime çevirir.",
      budget: formatTry(Math.max(200, budget)),
      twist: "Kartı bir ‘mini görev’ ile ver: önce 1 kahve, sonra hediye.",
    },
  ];

  let ideas = [...all];
  while (ideas.length < 6) ideas.push(fillers[ideas.length % fillers.length]);

  ideas = ideas.sort(() => Math.random() - 0.5);

  ideas[0] = { ...ideas[0], why: ideas[0].why + " " + occasionHint };

  return ideas.slice(0, 6);
}

function buildShareText(g: GiftIdea) {
  return [
    "🎁 HediyeFikri Önerisi",
    "",
    `✅ ${g.title}`,
    "",
    `Neden? ${g.why}`,
    `Sürpriz dokunuş: ${g.twist}`,
    "",
    "#hediyefikri",
  ].join("\n");
}

function buildShortCaption(g: GiftIdea) {
  return `🎁 ${g.title}\n✨ ${g.twist}\n#hediyefikri`;
}

export default function Home() {
  const [recipient, setRecipient] = useState<Recipient>("sevgili_es");
  const [budget, setBudget] = useState<number>(500);
  const [vibe, setVibe] = useState<Vibe>("duygusal");
  const [occasion, setOccasion] = useState<Occasion>("dogum_gunu");
  const [results, setResults] = useState<GiftIdea[]>([]);

  const [favorites, setFavorites] = useState<GiftIdea[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const addToFavorites = (gift: GiftIdea) => {
    const updated = [...favorites, gift];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const shareGift = async (g: GiftIdea) => {
    const text = buildShareText(g);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "HediyeFikri Önerisi",
          text,
        });
        return;
      } catch {
        // iptal edilirse sorun değil
      }
    }

    await navigator.clipboard.writeText(text);
    alert("Paylaşım metni kopyalandı. Instagram/Facebook/TikTok'a yapıştırabilirsin.");
  };

  const budgetLabel = useMemo(() => formatTry(budget), [budget]);

  const onGenerate = () => {
    const ideas = generateGiftIdeas({ recipient, budget, vibe, occasion });
    setResults(ideas);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            🎁 HediyeFikri
          </h1>
          <p className="mt-3 text-gray-400 max-w-2xl">
            30 saniyede “doğru” hediyeyi bul. Kişiye, bütçeye ve tarza göre akıllı
            öneriler üretir.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Sol: Form */}
          <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-lg font-semibold">Hızlı seçim</h2>
            <p className="mt-1 text-sm text-gray-400">
              4 alan doldur, önerileri al.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-gray-300">Kime?</label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value as Recipient)}
                  className="mt-2 w-full rounded-lg bg-gray-900 border border-gray-800 p-3"
                >
                  <option value="sevgili_es">Sevgili / Eş</option>
                  <option value="anne_baba">Anne / Baba</option>
                  <option value="kardes">Kardeş</option>
                  <option value="arkadas">Arkadaş</option>
                  <option value="is_arkadasi">İş arkadaşı</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300">
                  Bütçe: <span className="text-gray-400">{budgetLabel}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={8000}
                  step={50}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="mt-3 w-full"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Tarz</label>
                <select
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value as Vibe)}
                  className="mt-2 w-full rounded-lg bg-gray-900 border border-gray-800 p-3"
                >
                  <option value="duygusal">Duygusal</option>
                  <option value="pratik">Pratik</option>
                  <option value="eglenceli">Eğlenceli</option>
                  <option value="minimal">Minimal</option>
                  <option value="lux">Lüks</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300">Amaç</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as Occasion)}
                  className="mt-2 w-full rounded-lg bg-gray-900 border border-gray-800 p-3"
                >
                  <option value="dogum_gunu">Doğum günü</option>
                  <option value="yildonumu">Yıldönümü</option>
                  <option value="tesekkur">Teşekkür</option>
                  <option value="surpriz">Sürpriz</option>
                </select>
              </div>

              <button
                onClick={onGenerate}
                className="w-full rounded-xl bg-white text-black font-semibold py-3 hover:opacity-85 transition"
              >
                Önerileri Üret
              </button>

              <p className="text-xs text-gray-500">
                Not: Bu sürüm kural tabanlıdır. AI entegrasyonu sonraki adım.
              </p>
            </div>
          </section>

          {/* Sağ: Sonuçlar */}
          <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">Öneriler</h2>
              {results.length > 0 && (
                <span className="text-xs text-gray-400">
                  {results.length} sonuç
                </span>
              )}
            </div>

            {results.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-gray-800 p-6 text-gray-400 text-sm">
                Formu doldurup <b>“Önerileri Üret”</b> butonuna bas.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {results.map((g, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-800 bg-gray-900 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold">{g.title}</h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {g.budget}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-300">{g.why}</p>

                    <p className="mt-3 text-sm text-gray-400">
                      <span className="text-gray-300 font-medium">
                        Sürpriz dokunuş:
                      </span>{" "}
                      {g.twist}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => addToFavorites(g)}
                        className="text-xs bg-gray-800 border border-gray-700 px-3 py-2 rounded hover:bg-gray-700 transition"
                      >
                        ⭐ Favorilere Ekle
                      </button>

                      <button
                        onClick={() => shareGift(g)}
                        className="text-xs bg-white text-black px-3 py-2 rounded hover:opacity-80 transition"
                      >
                        📤 Paylaş
                      </button>

                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(buildShortCaption(g));
                          alert("Kısa caption kopyalandı (Instagram/TikTok için).");
                        }}
                        className="text-xs bg-gray-800 border border-gray-700 px-3 py-2 rounded hover:bg-gray-700 transition"
                      >
                        📋 Kısa Caption
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Favoriler Bölümü */}
        <section className="mt-10 rounded-2xl border border-gray-800 bg-gray-950 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Favoriler</h2>
            {favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className="text-xs text-gray-300 underline hover:text-white"
              >
                Favorileri temizle
              </button>
            )}
          </div>

          {favorites.length === 0 ? (
            <p className="mt-4 text-sm text-gray-400">
              Henüz favori yok. Bir öneride <b>“Favorilere Ekle”</b> butonuna bas.
            </p>
          ) : (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {favorites.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-800 bg-gray-900 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{f.title}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {f.budget}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">{f.why}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 text-xs text-gray-600">
          © {new Date().getFullYear()} HediyeFikri — MVP
        </footer>
      </div>
    </main>
  );
}