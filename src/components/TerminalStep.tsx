import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/shadcn-io/terminal";

interface TerminalStepProps {
  hasStarted: boolean;
  alreadyPlayedOnce: boolean;
  activeStep: number;
  steps: { title: string }[];
  isComplete: boolean;
}

export const TerminalStep = ({
  hasStarted,
  alreadyPlayedOnce,
  activeStep,
  steps,
  isComplete,
}: TerminalStepProps) => {
  const staticPrompts = [
    "Initializing AI repair protocol...",
    "Loading components...",
    "Verifying system status...",
  ];

  const systemFinishLogs = [
    "> system.sync() .......... OK",
    "> releasing memory ....... OK",
    "> done.",
  ];

  return (
    <Terminal className="h-64 my-20 w-full font-mono overflow-hidden bg-black">
      {!hasStarted && !alreadyPlayedOnce && (
        <AnimatedSpan className="text-yellow-400 flex items-center gap-2">
         <span className="text-white">$</span> Waiting to enter viewport...
        </AnimatedSpan>
      )}

      {hasStarted && (
        <>
          {/* Static prompts */}
          {staticPrompts.map((line, index) => (
            <AnimatedSpan
              key={index}
              delay={index * 150}
              className="text-gray-400 flex items-center gap-2"
            >
              <span className="text-white">$</span> {`${line}`}
            </AnimatedSpan>
          ))}

          {/* Step info */}
          <AnimatedSpan
            delay={1000 + staticPrompts.length * 150}
            className="text-yellow-400 font-semibold flex items-center gap-2"
          >
            <span className="text-white">$</span>{" "}
            {`Step ${activeStep + 1}/${steps.length}: ${
              steps[activeStep].title
            }`}
          </AnimatedSpan>

          {isComplete && (
            <TypingAnimation
              delay={1200 + staticPrompts.length * 150}
              duration={40}
              className="text-green-400 flex items-center gap-2"
            >
              {`> Progress: 100%`}
            </TypingAnimation>
          )}

          {isComplete && (
            <>
              {systemFinishLogs.map((line, index) => (
                <TypingAnimation
                  key={index}
                  delay={1200 + staticPrompts.length * 150 + 500 + index * 300}
                  duration={30}
                  className={`flex items-center gap-2 ${
                    line.includes("done")
                      ? "text-green-500 font-bold"
                      : "text-green-400/80"
                  }`}
                >
                  {line}
                </TypingAnimation>
              ))}

              <AnimatedSpan
                delay={
                  1200 +
                  staticPrompts.length * 150 +
                  500 +
                  systemFinishLogs.length * 300 +
                  100
                }
                className="text-green-500 font-bold mt-2 flex items-center gap-2"
              >
                <span className="text-white">$</span> ✓ All steps completed!
              </AnimatedSpan>
            </>
          )}
        </>
      )}
    </Terminal>
  );
};
