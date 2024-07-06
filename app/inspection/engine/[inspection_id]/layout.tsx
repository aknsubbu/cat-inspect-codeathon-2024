
import ProgressSteps from "@/components/ProgressSteps";

export default function EngineInspection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-4 py-2 ">
      <ProgressSteps stage={6} />
      <div className=" w-full text-center justify-center pb-10">{children}</div>
    </section>
  );
}
