import type { ProfileData } from "@/types";

export const profileData: ProfileData = {
  about: {
    name: "Jeff Zhang",
    title: "Full Stack AI Engineer",
    tagline:
      "I build RAG pipelines, AI agents, and the backend systems that make them production-ready.",
    paragraphs: [
      "Full stack engineer focused on backend systems and AI-driven automation.",
      "I like building production-ready systems that are simple to operate, easy to test, and useful in the real world.",
      "Open to full stack and AI engineering roles where I can keep shipping, learning, and improving systems from first principles.",
    ],
  },
  experience: [
    {
      company: "Flowing Bee",
      role: "Full Stack AI Engineer Intern",
      period: "Nov 2024 - Feb 2025",
      bullets: [
        "Built a multi-agent AI automation system using Azure OpenAI, reducing processing time from 30 days to 24 hours.",
        "Implemented OIDC authentication and role-based authorization in FastAPI.",
        "Applied TDD and reached 90%+ test coverage for security modules.",
        "Developed an admin panel with full CRUD for user and organisation management.",
      ],
      techStack: ["FastAPI", "React", "Azure OpenAI", "AutoGen", "pytest"],
    },
  ],
  projects: [
    {
      name: "Personal Portfolio",
      year: "2026",
      description:
        "Full-stack portfolio site built with Next.js and Spring Boot. Includes environment separation, cached profile data, and a lightweight deployment path.",
      techStack: [
        "Next.js",
        "Spring Boot",
        "TypeScript",
        "AWS EC2",
        "Tailwind CSS",
      ],
      url: {
        github: "https://github.com/Syufan/Profile",
        live: "https://jeffzhang.dev",
      },
    },
    {
      name: "Glucope - Diabetic Patient Management",
      year: "2024",
      description:
        "Web-based patient management application supporting daily workflows for patients and clinicians.",
      techStack: ["Node.js", "Express", "JavaScript", "MongoDB", "Azure", "AWS"],
      url: {
        github:
          "https://github.com/Syufan/Dev-Portfolio/tree/main/FullStack_Projects/WebLife-Diabetes",
        live: null,
      },
    },
    {
      name: "Microservices Shopping Backend",
      year: "2024",
      description:
        "E-commerce backend with four .NET Core microservices connected via RabbitMQ event-driven architecture.",
      techStack: [".NET Core", "PostgreSQL", "Redis", "RabbitMQ", "Docker"],
      url: {
        github:
          "https://github.com/Syufan/Dev-Portfolio/tree/main/FullStack_Projects/MyMicroservice",
        live: null,
      },
    },
    {
      name: "AI Fact Checking System",
      year: "2024",
      description:
        "RAG-based NLP pipeline for climate claim verification. Ranked top 10 in Kaggle.",
      techStack: ["Python", "PyTorch", "TF-IDF", "Word2Vec", "scikit-learn"],
      url: {
        github:
          "https://github.com/Syufan/Dev-Portfolio/tree/main/ML_Projects/Claim%20Verification",
        live: null,
      },
    },
    {
      name: "Deep Image Similarity Matching System",
      year: "2024",
      description:
        "Triplet network using fine-tuned ResNet152 for visual similarity retrieval.",
      techStack: ["Python", "TensorFlow", "Keras", "ResNet152", "OpenCV"],
      url: {
        github:
          "https://github.com/Syufan/Dev-Portfolio/tree/main/ML_Projects/Deep%20Image%20Similarity%20Matching%20System",
        live: null,
      },
    },
  ],
};
