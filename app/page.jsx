import { Suspense } from "react";
import Experience from "@/components/Experience";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <Experience />
    </Suspense>
  );
}
