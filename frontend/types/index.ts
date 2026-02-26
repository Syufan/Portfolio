export interface Job {
    period: string;
    company: string;
    role: string;
    url: string;
    bullets: string[];
    techStack: string[];
}

export interface Project {
    name: string;
    year: string;
    description: string;
    techStack: string[];
    url: {
      github: string | null;
      live: string | null;
    };
}
