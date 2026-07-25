import React, { useState, useEffect } from "react";
import { mockQuizzes } from "../../data/mockData";
import { Card, Button, Badge, Breadcrumb } from "../../components/common/UIComponents";
import { useToast } from "../../context/ToastContext";
import confetti from "canvas-confetti";
import { Clock, HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const QuizPage = () => {
  const { showToast } = useToast();
  const quiz = mockQuizzes[0];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSelectOption = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score += 1;
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    const percentage = (score / quiz.questions.length) * 100;

    if (percentage >= 70) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      showToast(`Quiz Passed! Score: ${score}/${quiz.questions.length} (${percentage}%)`, "success");
    } else {
      showToast(`Quiz Completed. Score: ${score}/${quiz.questions.length}`, "info");
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentStep(0);
    setTimeLeft(quiz.durationMinutes * 60);
  };

  const currentQ = quiz.questions[currentStep];
  const totalScore = calculateScore();
  const percentage = Math.round((totalScore / quiz.questions.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: "Dashboard", href: "/student/dashboard" }, { label: "Quiz Runner" }]} />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 glass-card rounded-2xl">
        <div>
          <Badge variant="indigo" className="mb-1">{quiz.course}</Badge>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{quiz.title}</h1>
          <p className="text-xs text-slate-500">{quiz.questionsCount} Multiple Choice Questions</p>
        </div>

        {!isSubmitted && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 font-mono font-bold text-sm">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        <Card className="p-6 space-y-6">
          {/* Question Stepper Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Question {currentStep + 1} of {quiz.questions.length}</span>
              <span>{Math.round(((currentStep + 1) / quiz.questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>

            {/* Answer Options Grid */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.01]"
                        : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-400"
                    }`}
                  >
                    <span>{option}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? "border-white bg-white text-blue-600" : "border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Previous
            </Button>

            {currentStep < quiz.questions.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleSubmitQuiz} className="bg-emerald-600 hover:bg-emerald-700">
                Submit Quiz Assessment
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* Quiz Result Screen */
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <Card className="text-center p-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Assessment Result</h2>
              <p className="text-xs text-slate-500 mt-1">Here is your score performance breakdown</p>
            </div>

            <div className="p-6 max-w-xs mx-auto rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                {totalScore} / {quiz.questions.length}
              </span>
              <span className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Score: {percentage}%
              </span>
              <Badge variant={percentage >= 70 ? "success" : "danger"}>
                {percentage >= 70 ? "PASSED WITH DISTINCTION" : "NEEDS IMPROVEMENT"}
              </Badge>
            </div>

            <Button variant="outline" size="sm" onClick={handleRestart} className="mx-auto">
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </Button>
          </Card>

          {/* Detailed Question Review & Answers Explanation */}
          <Card className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Answer Explanations</h3>
            <div className="space-y-4">
              {quiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border space-y-2 ${
                      isCorrect
                        ? "bg-emerald-500/5 border-emerald-500/20"
                        : "bg-rose-500/5 border-rose-500/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {q.question}
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Correct Answer: </span>
                      <span className="text-emerald-600 font-bold">{q.options[q.correctAnswer]}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic bg-white/50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      💡 {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
