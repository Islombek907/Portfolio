import { useEffect, useRef } from 'react';
import useProjectsStore from '../store/myProjects';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const Main = () => {
  const { projects, loading, error, fetchProjects } = useProjectsStore();
  const swiperRef = useRef(null);

  useEffect(() => {
    fetchProjects('Islombek907');
  }, [fetchProjects]);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }

      swiperRef.current = new Swiper('.swiper', {
        modules: [Navigation, Autoplay],
        slidesPerView: 2, // Уменьшаем до 2, чтобы слайды помещались
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, [loading, projects]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <main className="container">
        <section className="welcome-section">
          <div className="welcome-left">
            <p className="intro-text">Hello, I am</p>
            <h1 className="name">
              <span className="highlight">Islom</span><br />
              <span className="highlight">Ackerman</span>
            </h1>
            <h2 className="role">Frontend Developer</h2>
            <div className="experience">
              <div className="exp-block">
                <span className="exp-number">10</span>
                <span className="exp-label">
                  months studying Frontend Development
                </span>
              </div>
            </div>
          </div>
          <div className="welcome__right">
            <div className="avatar-container">
              <img className="avatar" src="/avatar.png" alt="" />
              <div className="react"><img src="/react.svg" alt="" /></div>
              <div className="small-ball"></div>
              <div className="black-hole"></div>
              <div className="javascript"></div>
              <div className="tiny-ball"></div>
              <div className="typescript"><img src="/typescript__ball.svg" alt="" /></div>
              <div className="javascript"><img src="/javascript.svg" alt="" /></div>
            </div>
          </div>
        </section>
        <section className="about-me" id='about'>
          <div className="about__me-left">
            <h2 className="title">aboutMe<span>( )</span></h2>
            <p>
              I am a junior frontend developer with 10 months of training from a professional course. During this time, I mastered key web development technologies, including HTML, CSS, SCSS, JavaScript, TypeScript, and React. I also worked with the Zustand state management library for efficient application state handling and am proficient in Git version control. I can create modern, adaptive, and interactive interfaces. I am eager to grow in developing complex web applications and am open to new projects!
            </p>
          </div>
          <div className="cards">
            <div>
              <h3>Frontend Developer</h3>
              <a href="https://github.com/Islombek907" target="_blank">Projects</a>
            </div>
            <img src="code_icon.svg" alt="" />
          </div>
        </section>
      </main>
      <section className="skills" id='skills'>
        <section className="container">
          <h2 className="title skills__title">skills<span>( )</span></h2>
          <div className="skills-list">
            <img src="/javascript.svg" alt="" />
            <img src="/typescript.svg" alt="" />
            <img src="/html5.svg" alt="" />
            <img src="/css.svg" alt="" />
            <img src="/react.svg" alt="" />
            <img className="scss" src="/scss.svg" alt="" />
            <img className="github" src="/git.png" alt="" />
            <img className="zustand" src="/zustand.png" alt="" />
            <img className="figma" src="/figma.png" alt="" />
          </div>
        </section>
      </section>
      <section className="projects" id='projects'>
        <h2 className="title">projects<span>( )</span></h2>
        <div className="swiper">
          <div className="swiper-wrapper">
            {projects.map((project) => (
              <div className="swiper-slide" key={project.id}>
                <div className="project-item">
                  {project.homepage && (
                    <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                      <img
                        src={`https://raw.githubusercontent.com/Islombek907/${project.name}/main/screenshot.png`}
                        alt={project.name}
                        onError={(e) => (e.target.src = '/no__image.webp')}
                      />
                    </a>
                  )}
                  {!project.homepage && (
                    <img
                      src={`https://raw.githubusercontent.com/Islombek907/${project.name}/main/screenshot.png`}
                      alt={project.name}
                      onError={(e) => (e.target.src = '/default-image.png')}
                    />
                  )}
                  <p>{project.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </section>
    </>
  );
};

export default Main;