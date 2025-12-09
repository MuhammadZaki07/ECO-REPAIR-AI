import { PointerHighlight } from "../ui/pointer-highlight";

function CardThree({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="rounded-xl p-6 dark:bg-black bg-neutral-50 border border-black/10 dark:border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/noise.png')] opacity-[0.18] dark:opacity-[0.12]" />

      <div className="relative">
        <div className="relative h-44 w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <div className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300/30 dark:bg-green-500/20 blur-3xl animate-pulse" />

          <div className="absolute inset-0 flex items-center justify-center space-x-4 z-10">
            <div className="h-16 w-3 bg-green-300 dark:bg-green-700 rounded-full" />
            <div className="h-24 w-3 bg-green-400 dark:bg-green-500 rounded-full shadow" />
            <div className="h-12 w-3 bg-green-300 dark:bg-green-700 rounded-full" />
          </div>

          <div className="absolute inset-3 rounded-xl border border-green-400/30 dark:border-green-700/30" />
        </div>

        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight">
          {title}
          <PointerHighlight
            rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose"
            pointerClassName="text-green-500 h-3 w-3"
            containerClassName="inline-block ml-1"
          >
            <span className="relative z-10">{subtitle}</span>
          </PointerHighlight>
        </div>

        <p className="mt-4 text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
}

export default CardThree;
