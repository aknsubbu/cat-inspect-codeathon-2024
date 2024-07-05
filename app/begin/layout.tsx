import React from 'react'

import ProgressSteps from "@/components/ProgressSteps";

export default function BeginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ProgressSteps stage={1} />
      <div className=" text-center justify-center">{children}</div>
    </section>
  );
}
