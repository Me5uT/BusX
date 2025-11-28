
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const toggleLang = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">BusX</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title={isDark ? t('common.themeLight') : t('common.themeDark')}
            >
              {isDark ? (
                 // Sun Icon
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                 // Moon Icon
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 24.048l-1.066.348v-.006c-2.484.776-5.267.57-7.792-.853-3.692-2.083-6.002-6.002-6.002-10.243 0-2.316.684-4.57 1.983-6.495.733-1.087 1.637-2.064 2.665-2.872l.983-.733-.509 1.116c-1.036 2.27.067 5.093 2.457 6.29 2.391 1.198 5.174.562 6.945-1.39l.781-.861.42 1.16c.35 1.002.535 2.065.535 3.143 0 3.395-1.63 6.6-4.405 8.397z" /><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
              )}
            </button>
            <button
              onClick={toggleLang}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700"
            >
              {i18n.language.toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-8 w-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 mt-auto transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} BusX Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
