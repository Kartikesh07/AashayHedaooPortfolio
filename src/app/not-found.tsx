import Link from "next/link";
import { ArrowLeft, Gamepad2, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#17231F] text-[#F7F4EC] flex items-center justify-center p-6 bg-grid-dark">
      <div className="max-w-md w-full bg-[#1E2E29] border border-[#2F453E] p-8 rounded-xs text-center space-y-6 shadow-2xl">
        <div className="w-12 h-12 mx-auto rounded-xs bg-[#233530] border border-[#2F453E] flex items-center justify-center text-[#F36B45]">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs uppercase tracking-widest text-[#C8F17A]">
            ERROR 404 // COLLISION DETECTED
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#F7F4EC]">
            Level Out of Bounds
          </h1>
          <p className="text-xs sm:text-sm text-[#8E9B92] font-sans leading-relaxed">
            The coordinates you requested do not exist in the active level hierarchy.
            The scene graph may have been unloaded or moved.
          </p>
        </div>

        <div className="p-4 rounded-xs bg-[#233530] border border-[#2F453E] font-mono text-[11px] text-[#EDE9DD] text-left space-y-1">
          <div>&gt; raycast.hit = null</div>
          <div>&gt; level_state = &apos;UNRESOLVED_ROUTE&apos;</div>
          <div>&gt; recommendation: respawn at checkpoint</div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#F36B45] hover:bg-[#DE552F] text-white font-mono text-xs uppercase tracking-wider rounded-xs transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Playbook Hub</span>
        </Link>
      </div>
    </div>
  );
}

