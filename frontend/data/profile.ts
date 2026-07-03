import type { ProfileData } from "@/types";

export const profileData: ProfileData = {
  about: {
    name: "Jeff Zhang",
    title: "Full Stack AI Engineer",
    tagline:
      "I build RAG pipelines, AI agents, and the backend systems that make them production-ready.",
    paragraphs: [
      "I’m a full stack engineer focused on backend systems and AI-driven automation. I care about clean, extensible architecture, and designing solutions that improve real workflows in practical ways.",
      "Currently open to full stack and AI engineering roles where I can build and ship production-ready AI systems.",
      "Previously, I interned at Flowing Bee, where I built multi-agent AI systems that reduced processing time from 30 days to 24 hours, and contributed to full stack web development. I completed my Master's in Artificial Intelligence at the University of Melbourne, following a Bachelor's degree in Computing and Software Systems. These experiences shaped how I approach building systems that balance technical depth with practical usability.",
      "Outside of work, you can find me underwater, behind a lens, or in a theatre seat. I'm drawn to things that reward patience and attention to detail, whether that's descending to a wreck at 40 meters, waiting for the right light, or watching a story come to life on stage.",
    ],
  },
  experience: [
    {
      company: "Flowing Bee",
      role: "Full Stack AI Engineer Intern",
      period: "Nov 2024 - Feb 2025",
      url: "https://www.flowingbee.com/",
      bullets: [
        "Developed admin panel with full CRUD for user and organisation management",
        "Implemented OIDC authentication and role-based authorization in FastAPI to support secure access control",
        "Applied TDD achieving 90%+ coverage for security modules",
        "Designed multi-agent workflow architecture with automated quality checks and smart routing to ensure output quality",
        "Built an AI-powered automation system using Azure OpenAI, reducing a 3–4 day manual research workflow to just a few hours.",
      ],
      techStack: ["FastAPI", "React", "Azure OpenAI", "AutoGen", "pytest"],
    },
  ],
  projects: [
    {
      name: "Visual Similarity Search",
      year: "2026",
      description:
        "End-to-end visual retrieval system: CLIP ViT-B/32 fine-tuned with LoRA, served via FastAPI, indexed with FAISS. AUC 0.925, MAP@10 0.71. Deployed on Hugging Face Spaces with GitHub Actions CI/CD.",
      techStack: ["Python", "PyTorch", "CLIP", "LoRA", "FAISS", "FastAPI", "Docker"],
      url: {
        github: "https://github.com/Syufan/visual-similarity-search",
        live: "/visual-search",
      },
    },
    {
      name: "Personal Portfolio",
      year: "2026",
      description:
        "Full-stack portfolio site built with Next.js and Spring Boot, deployed to AWS EC2. Implemented dev/prod environment separation, startup-time data caching, global exception handling, and environment-variable-based CORS configuration.",
      techStack: [
        "Next.js",
        "Spring Boot",
        "TypeScript",
        "AWS EC2",
        "Tailwind CSS",
      ],
      url: {
        github: "https://github.com/Syufan/Profile",
        live: null,
      },
    },
    {
      name: "AI Fact Checking System",
      year: "2026",
      description:
        "Climate fact-checking pipeline: BM25 retrieval over 100k corpus, Bi-Encoder reranker trained with InfoNCE + hard negatives, Co-Attention verifier for 3-way classification. Built without pretrained models.",
      techStack: ["Python", "PyTorch", "Transformer", "InfoNCE", "BM25", "Word2Vec"],
      url: {
        github:
          "https://github.com/Syufan/Dev-Portfolio/tree/main/ML_Projects/Claim%20Verification",
        live: null,
      },
    },
    {
      name: "Glucope - Diabetic Patient Management",
      year: "2024",
      description:
        "A web-based patient management application supporting daily workflows for patients and clinicians, deployed to Azure and AWS.",
      techStack: [
        "Node.js",
        "Express",
        "JavaScript",
        "Handlebars",
        "MongoDB",
        "Azure",
        "AWS",
        "GitHub Actions",
      ],
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
        "E-commerce backend built with four .NET Core microservices including Catalog, Basket, Discount, and Ordering, connected via RabbitMQ event-driven architecture with Redis caching.",
      techStack: [".NET Core", "PostgreSQL", "Redis", "RabbitMQ", "EF Core", "Docker"],
      url: {
        github:
          "https://github.com/Syufan/Dev-Portfolio/tree/main/FullStack_Projects/MyMicroservice",
        live: null,
      },
    },
  ],
};
