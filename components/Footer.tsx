import { FaXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full mt-10 mb-5">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-center gap-6">
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <a href="">
            Terms
          </a>
          <a href="">
            Privacy
          </a>
          <a href="">
            Docs
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a
            href=""
            aria-label="X profile"
            className="text-gray-600 text-xl"
          >
            <FaXTwitter />
          </a>

          <a
            href=""
            aria-label="Farcaster profile"
            className="text-gray-600 text-xl"
          >
            <SiFarcaster />
          </a>
        </div>
      </div>
    </footer>
  );
}
