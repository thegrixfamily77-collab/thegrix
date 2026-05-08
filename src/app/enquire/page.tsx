import { EnquirePageContent } from "@/app/enquire/EnquirePageContent";
import { Suspense } from "react";

export default function EnquirePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg animate-pulse rounded-2xl border border-slate-200 bg-white p-8 text-slate-500 mt-10 mb-12">
          Loading enquiry…
        </div>
      }
    >
      <EnquirePageContent />
    </Suspense>
  );
}
