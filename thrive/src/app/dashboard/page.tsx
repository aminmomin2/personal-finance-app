import { EllipsisVertical } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <div className="bg-white m-5 rounded-3xl border-[var(--hover-color-light)] border-1 shadow-[var(--hover-color-light)] p-5 w-5/7 h-150">
        <div className="flex justify-between items-center mb-3">
          <p className="font-mono">NET WORTH</p>
          <EllipsisVertical className="w-5 h-5"/>
        </div>
        <hr className="text-[var(--color-primary-light)]"></hr>
      </div>
      <div className="bg-white mr-5 mt-5 mb-5 rounded-3xl border-[var(--hover-color-light)] border-1 shadow-[var(--hover-color-light)] p-5 w-2/7 h-150">
        <div className="flex justify-between items-center mb-3">
          <p className="font-mono">SPENDING</p>
          <EllipsisVertical className="w-5 h-5"/>
        </div>
        <hr className="text-[var(--color-primary-light)]"></hr>
      </div>
    </>
  );
}