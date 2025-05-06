import { create } from 'zustand';

const useProjectsStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,
  fetchProjects: async (username) => {
    set({ loading: true, error: null });
    try {
      let allProjects = [];
      let page = 1;
      const perPage = 100;

      while (true) {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allProjects = [...allProjects, ...data];

        const linkHeader = response.headers.get('Link');
        if (!linkHeader || !linkHeader.includes('rel="next"')) break;

        page++;
      }

      set({ projects: allProjects, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useProjectsStore;