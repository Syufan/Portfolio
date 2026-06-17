export interface About {
  name: string;
  title: string;
  tagline: string;
  paragraphs: string[];
}

export interface Experience {
  period: string;
  company: string;
  role: string;
  url?: string;
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

export interface ProfileData {
  about: About;
  experience: Experience[];
  projects: Project[];
}

export interface SidebarProps {
  data: Pick<ProfileData, "about">;
}
