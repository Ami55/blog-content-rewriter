import { ProjectState } from '../types';
import { DEMO_PROJECT } from '../constants';

const STORAGE_KEY = 'blog_content_rewriter_projects';

export function loadProjects(): ProjectState[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = [DEMO_PROJECT];
      saveProjects(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [DEMO_PROJECT];
  } catch (err) {
    console.error('Error loading projects from localStorage:', err);
    return [DEMO_PROJECT];
  }
}

export function saveProjects(projects: ProjectState[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving projects to localStorage:', err);
  }
}
