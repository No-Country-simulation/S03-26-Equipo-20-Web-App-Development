import type { StatProps } from "../../types/dashboard";

export default function StatCardItem({ label, value, icon }: StatProps) {
  return (
    <div
      className={`bg-[#131315] p-6 rounded-2xl transition-colors hover:bg-[#1f1f22] group border border-[#cc97ff]/10 shadow-[0px_0px_30px_rgba(147,51,234,0.05)]`}
    >
      <div className="flex justify-center items-start mb-6">
        <div
          className={`p-2 bg-[#262528] rounded-lg group-hover:text-[#cc97ff] transition-colors`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <h3 className="text-[#adaaad] text-sm text-center font-medium mb-1">
        {label}
      </h3>
      <div className="flex items-baseline justify-center gap-2">
        <p className="text-3xl font-black text-white tracking-tighter">
          {value}
        </p>
      </div>
    </div>
  );
}
