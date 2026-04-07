import { UserCheck } from "lucide-react";

function Header() {
  return (
    <header className="bg-[#131315] sticky top-0 z-30 flex justify-between items-center px-8 py-4 w-full border-b border-[#262528]">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <input
            className="w-full pl-10 pr-4 py-2 bg-[#1f1f22] border-none rounded-lg text-sm text-[#f9f5f8] focus:ring-2 focus:ring-[#9333ea]/50 placeholder:text-[#adaaad]/50"
            placeholder="Search products..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-xs font-bold text-[#f9f5f8] leading-none">
              Admin User
            </p>
            <p className="text-[10px] text-[#adaaad] font-medium">Owner</p>
          </div>
          <UserCheck />
        </div>
      </div>
    </header>
  );
}

export default Header;
