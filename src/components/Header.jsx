import { useState, useEffect } from 'react';

const Header = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="container">
      <div className="about__me">
        <div className="logo">
          <span className="first-name">Islom</span>
          <span className="last-name">Ackerman</span>
        </div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
        </nav>
        <div className="social-contact">
          <a href="https://github.com/Islombek907" target="_blank" className="social-link">
            <img src="/git.svg" alt="" />
          </a>
          <a className='email' href="mailto:islomwebdev7@gmail.com" target="_blank">
            <i class="fa-regular fa-envelope"></i>
            Contact me
          </a>
          <button onClick={toggleTheme} className={`theme-toggle ${theme}`}>
            <img
              src="/sun.svg"
              alt="Switch to light theme"
              className="theme-icon sun"
            />
            <img
              src="/moon.svg"
              alt="Switch to dark theme"
              className="theme-icon moon"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;