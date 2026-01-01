function HowItWorksPage() {
  return (
   <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        How It Works
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        Our platform is designed to make electronic repair simple, interactive,
        and rewarding. Here is the workflow:
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Submit a Repair Request
          </h2>
          <p className="text-muted-foreground leading-6">
            Fill out your device issue in Eco Repair AI. The AI analyzes and
            provides step-by-step solutions.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Review Solutions
          </h2>
          <p className="text-muted-foreground leading-6">
            All valid diagnoses are stored in Diagnosis History, including
            tools, parts, and video guides for reference.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Community Support
          </h2>
          <p className="text-muted-foreground leading-6">
            If AI cannot provide a solution, users can interact in Forum to get
            help from the community and exchange knowledge.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default HowItWorksPage;
