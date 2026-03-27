import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, ChevronRight, Menu } from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

// --- Local Data (No API required) ---

const POSTS: Post[] = [
  {
    slug: "welcome",
    title: "Добро пожаловать в мой новый блог",
    date: "2026-03-27",
    excerpt: "Первая запись в моем минималистичном блоге, созданном с любовью к плоскому дизайну.",
    content: `
# Привет, мир!

Это мой новый блог. Я решил сделать его максимально простым и понятным. Здесь я буду делиться своими мыслями о дизайне, технологиях и жизни.

## Почему минимализм?

Минимализм позволяет сосредоточиться на главном — на контенте. В мире, переполненном информацией, простота становится настоящей роскошью.

*   **Чистота**: Никаких лишних элементов.
*   **Скорость**: Быстрая загрузка.
*   **Фокус**: Только текст и идеи.

Надеюсь, вам здесь понравится!
    `
  },
  {
    slug: "flat-design-power",
    title: "Сила плоского дизайна",
    date: "2026-03-26",
    excerpt: "Размышления о том, почему плоские цвета и жирные контуры снова в моде.",
    content: `
# Плоский дизайн: Возвращение к истокам

Плоский дизайн (Flat Design) — это не просто отсутствие градиентов. Это философия, которая ставит функциональность выше декоративности.

## Основные принципы

1.  **Отсутствие глубины**: Никаких теней (кроме жестких), скосов или текстур.
2.  **Простые элементы**: Использование базовых геометрических форм.
3.  **Типографика**: Шрифты играют ключевую роль в навигации и иерархии.
4.  **Цвет**: Яркие, насыщенные или, наоборот, нежные пастельные тона.

Жирные черные контуры добавляют уверенности и делают интерфейс более "графичным", почти как в комиксах. Это создает уникальный характер, который выделяется на фоне "зализанных" современных интерфейсов.
    `
  }
];

// --- Components ---

const StylizedPerson = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={cn("w-full h-full", className)}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Abstract Head */}
    <path
      d="M100 40C115 40 130 50 130 75C130 100 110 115 100 115C90 115 70 100 70 75C70 50 85 40 100 40Z"
      fill="#FFDDC1"
      stroke="black"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Abstract Body */}
    <path
      d="M60 120C40 140 40 180 40 180H160C160 180 160 140 140 120C130 110 115 115 100 115C85 115 70 110 60 120Z"
      fill="#C1E1C1"
      stroke="black"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Abstract Arm Left */}
    <path
      d="M50 130L30 155"
      stroke="black"
      strokeWidth="8"
      strokeLinecap="round"
    />
    {/* Abstract Arm Right */}
    <path
      d="M150 130L170 155"
      stroke="black"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
);

const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={cn(
      "bg-white border-4 border-black p-6 transition-all duration-200",
      onClick && "cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
      className
    )}
  >
    {children}
  </div>
);

const Button = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={cn(
      "bg-[#FFDDC1] border-4 border-black px-6 py-2 font-bold text-lg hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all",
      className
    )}
  >
    {children}
  </button>
);

// --- Main App ---

export default function App() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    if (selectedSlug) {
      const post = POSTS.find(p => p.slug === selectedSlug);
      setCurrentPost(post || null);
      window.scrollTo(0, 0);
    } else {
      setCurrentPost(null);
    }
  }, [selectedSlug]);

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-black font-sans selection:bg-[#FFDDC1]">
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 
            className="text-3xl font-black tracking-tighter cursor-pointer"
            onClick={() => setSelectedSlug(null)}
          >
            FLAT<span className="text-[#AF8F6F]">BLOG</span>
          </h1>
          <nav className="hidden md:flex gap-8 font-bold">
            <a href="#" className="hover:underline underline-offset-4">Статьи</a>
            <a href="#" className="hover:underline underline-offset-4">Обо мне</a>
            <a href="#" className="hover:underline underline-offset-4">Контакты</a>
          </nav>
          <Button className="md:hidden p-2">
            <Menu size={24} />
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedSlug ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
                    МЫСЛИ В <br />
                    <span className="bg-[#C1E1C1] px-2 border-4 border-black">ПЛОСКОМ</span> <br />
                    ЦВЕТЕ.
                  </h2>
                  <p className="text-xl text-gray-700 max-w-md">
                    Минималистичный блог о дизайне, коде и простоте. Читайте, вдохновляйтесь, создавайте.
                  </p>
                  <Button onClick={() => POSTS.length > 0 && setSelectedSlug(POSTS[0].slug)}>
                    Читать последний пост
                  </Button>
                </div>
                <div className="relative aspect-square bg-[#FFDDC1] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <StylizedPerson className="p-8" />
                </div>
              </section>

              {/* Posts List */}
              <section className="space-y-8">
                <h3 className="text-3xl font-black border-b-4 border-black inline-block mb-4">НЕДАВНИЕ ЗАПИСИ</h3>
                <div className="grid gap-6">
                  {POSTS.map((post) => (
                    <Card 
                      key={post.slug} 
                      onClick={() => setSelectedSlug(post.slug)}
                      className="group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                            <Calendar size={16} />
                            {new Date(post.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                          <h4 className="text-2xl font-black group-hover:text-[#AF8F6F] transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-gray-600 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="bg-black text-white p-2 border-2 border-black group-hover:bg-[#FFDDC1] group-hover:text-black transition-all">
                          <ChevronRight size={24} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setSelectedSlug(null)}
                className="flex items-center gap-2 font-bold hover:underline mb-8"
              >
                <ArrowLeft size={20} /> Назад к списку
              </button>

              {!currentPost ? (
                <div className="py-20 text-center text-2xl font-bold">Статья не найдена</div>
              ) : (
                <article className="space-y-8">
                  <header className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-500">
                      <Calendar size={20} />
                      {new Date(currentPost.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                      {currentPost.title}
                    </h2>
                  </header>

                  <div className="bg-[#C1E1C1] border-4 border-black p-1 mb-8">
                    <div className="h-4 bg-white border-b-4 border-black"></div>
                  </div>

                  <div className="prose prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:font-black prose-blockquote:border-l-8 prose-blockquote:border-black prose-blockquote:bg-white prose-blockquote:p-6 prose-blockquote:italic">
                    <ReactMarkdown>{currentPost.content}</ReactMarkdown>
                  </div>

                  <footer className="pt-12 mt-12 border-t-4 border-black">
                    <Card className="bg-[#FFDDC1] flex items-center gap-6">
                      <div className="w-24 h-24 border-4 border-black bg-white shrink-0">
                        <StylizedPerson className="p-2" />
                      </div>
                      <div>
                        <h5 className="text-xl font-black">Автор Блога</h5>
                        <p className="text-gray-700">Любитель плоского дизайна и чистого кода. Пишу о том, что важно.</p>
                      </div>
                    </Card>
                  </footer>
                </article>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t-4 border-black bg-white py-12 mt-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter">FLATBLOG</h2>
            <p className="text-gray-500 font-bold">© 2026 Все права защищены.</p>
          </div>
          <div className="flex gap-6 font-bold">
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">GitHub</a>
            <a href="#" className="hover:underline">RSS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
