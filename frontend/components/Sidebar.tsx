import { getProfile } from "@/services/api";
import NavLinks from "./NavLinks";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

export default async function Sidebar() {
  const data = await getProfile();
    return (
      <aside className="w-1/3 h-screen sticky top-0 flex flex-col justify-between py-16">
        <div>
          <h1 className="text-5xl font-bold text-white">{data.about.name}</h1>
          <h2 className="text-lg text-white mt-2">{data.about.title}</h2>
          <p className="text-slate-400 mt-2">{data.about.tagline}</p>
          <NavLinks />
          <a
            href="/resume.pdf"
            download
            className="text-slate-400 hover:text-white transition-colors duration-150 flex items-center gap-1 text-sm mt-8 group"
          >
            Resume <FiDownload size={14} className="transition-transform duration-150 group-hover:scale-135" />
          </a>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <a href="https://github.com/Syufan/Dev-Portfolio/tree/main" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/yufan-zhang-93ba64282" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.instagram.com/jeffery_yu_fan/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
            <FaInstagram size={20} />
          </a>
        </div>
      </aside>
    );
  }
