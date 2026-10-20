import { useEffect, useMemo, useState } from 'react';
import { HOUSE_DETAILS, QUESTIONS } from './game/data';
import { assignHouse, getHouseResultText, scoreAnswers } from './game/logic';
import type { AnswerMap, HouseKey, QuestionId } from './game/types';

const STORAGE_KEY = 'sorting-hat-last-result';

function App() {
  const [screen, setScreen] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<HouseKey | null>(null);
  const [savedResult, setSavedResult] = useState<HouseKey | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedResult(stored as HouseKey);
    }
  }, []);

  const currentQuestion = QUESTIONS[currentIndex];

  const scoreSummary = useMemo(() => {
    return scoreAnswers(answers);
  }, [answers]);

  useEffect(() => {
    if (result) {
      window.localStorage.setItem(STORAGE_KEY, result);
      setSavedResult(result);
    }
  }, [result]);

  const beginQuiz = () => {
    setScreen('quiz');
    setCurrentIndex(0);
  };

  const restart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setScreen('landing');
  };

  const handleAnswer = (value: number) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);

    const isLastQuestion = currentIndex === QUESTIONS.length - 1;

    if (isLastQuestion) {
      const house = assignHouse(nextAnswers);
      setResult(house);
      setScreen('result');
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex((prev) => prev - 1);
  };

  const shareResult = async () => {
    const text = `I was sorted into ${result ?? 'the Sorting Hat'} in the Sorting Hat Game.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sorting Hat Game',
          text,
        });
        return;
      } catch {
        // Ignore if the user cancels the native share dialog.
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };

  const visibleHouse = result ?? savedResult;

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100">
      <div className="absolute inset-0 overflow-hidden opacity-80">
        <div className="starfield" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {screen === 'landing' ? (
          <section className="glass-panel w-full max-w-5xl overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6 p-6 sm:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                  Hogwarts Academy
                </div>
                <div className="space-y-4">
                  <h1 className="font-display text-4xl leading-tight text-amber-100 sm:text-5xl lg:text-6xl">
                    The Sorting Hat Game
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-slate-200/90 sm:text-lg">
                    Step into the ceremony and let the ancient hat decide which house reflects your choices,
                    character, and instincts.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={beginQuiz}
                    className="rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition-transform hover:-translate-y-0.5"
                  >
                    Start Sorting
                  </button>
                  {savedResult ? (
                    <button
                      type="button"
                      onClick={() => {
                        setResult(savedResult);
                        setScreen('result');
                      }}
                      className="rounded-full border border-slate-300/30 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-amber-300/50"
                    >
                      Previous result: {savedResult}
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="relative flex items-center justify-center bg-slate-950/50 p-6 sm:p-8">
                <div className="hat-scene">
                  <div className="hat-shadow" />
                  <div className="hat-crown" />
                  <div className="hat-brim" />
                  <div className="hat-band" />
                </div>
              </div>
            </div>
          </section>
        ) : screen === 'quiz' ? (
          <section className="glass-panel w-full max-w-3xl p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/80">
                  Sorting Ceremony
                </p>
                <h2 className="mt-2 font-display text-3xl text-amber-50">Question {currentIndex + 1}</h2>
              </div>
              <div className="rounded-full border border-gold/50 bg-slate-900/60 px-3 py-1 text-sm text-amber-100">
                {currentIndex + 1} / {QUESTIONS.length}
              </div>
            </div>

            <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-2xl leading-relaxed text-amber-50 sm:text-3xl">
                {currentQuestion.prompt}
              </h3>

              <div className="grid gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id as QuestionId] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      className={`answer-card ${isSelected ? 'selected' : ''}`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-lg font-semibold text-slate-100">{option.label}</span>
                      <span className="text-sm text-slate-300/80">{option.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentIndex === 0}
                className="rounded-full border border-slate-500/60 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:border-amber-200/60 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={restart}
                className="rounded-full border border-rose-300/40 bg-rose-950/30 px-5 py-2.5 text-sm font-medium text-rose-100 transition hover:border-rose-200/70"
              >
                Restart
              </button>
            </div>
          </section>
        ) : (
          <section className="glass-panel w-full max-w-4xl overflow-hidden">
            {result ? (
              <>
                <div className={`relative p-6 sm:p-8 lg:p-10 ${HOUSE_DETAILS[result].accent}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_40%)]" />
                  <div className="relative flex flex-col gap-4">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-slate-950/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                      House Assignment
                    </div>
                    <h2 className="font-display text-4xl text-white sm:text-5xl">{result}</h2>
                    <div className="text-6xl">{HOUSE_DETAILS[result].emoji}</div>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-8 lg:p-10">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200/80">
                      Your result
                    </p>
                    <h3 className="font-display text-3xl text-amber-50">{getHouseResultText(result)}</h3>
                    <p className="max-w-2xl text-lg leading-8 text-slate-200">
                      {HOUSE_DETAILS[result].description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4 sm:p-5">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                      Response summary
                    </h4>
                    <ul className="space-y-2 text-slate-200">
                      {QUESTIONS.map((question) => (
                        <li key={question.id} className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-amber-100">{question.prompt}</span>
                          <span className="text-slate-400">—</span>
                          <span>
                            {question.options.find((option) => option.value === answers[question.id])?.label ?? 'Not answered'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setAnswers({});
                        setCurrentIndex(0);
                        setResult(null);
                        setScreen('quiz');
                      }}
                      className="rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/25"
                    >
                      Play Again
                    </button>

                    <button
                      type="button"
                      onClick={shareResult}
                      className="rounded-full border border-slate-300/40 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-amber-200/60"
                    >
                      Share Result
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
