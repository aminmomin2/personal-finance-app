import { EllipsisVertical } from "lucide-react";
import { NetWorth } from "../components/NetWorth";
import { Spending } from "../components/Spending";

export default function Dashboard() {
  return (
   <>
  <div className="flex gap-5 m-5 max-w-full">
    {/* Left Panel */}
    <div className="flex flex-col w-5/7">
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-[var(--hover-color-light)]
          shadow-[var(--hover-color-light)]
          p-5
          box-border
        "
      >
        <div className="flex justify-between items-center mb-3">
          <p className="font-mono">NET WORTH</p>
          <EllipsisVertical className="w-5 h-5" />
        </div>
        <hr className="border-t text-[var(--color-primary-light)]" />
        <NetWorth />
      </div>
    </div>

    <div className="flex flex-col w-2/7">
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-[var(--hover-color-light)]
          shadow-[var(--hover-color-light)]
          p-5
          box-border
        "
      >
        <div className="flex justify-between items-center mb-3">
          <p className="font-mono">SPENDING</p>
          <EllipsisVertical className="w-5 h-5" />
        </div>
        <hr className="border-t text-[var(--color-primary-light)]" />
        <Spending />
        <div className="flex flex-col">
          <p>Latest Transactions</p>
          <p>Milk</p>
          <p>Milk</p>
          <p>Milk</p>
          <p>Milk</p>
        </div>
      </div>
    </div>
  </div>
</>

  );
}
