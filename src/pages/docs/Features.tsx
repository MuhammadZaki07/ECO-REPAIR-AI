function FeaturesPage() {
  return (
    <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Features
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        Explore the core features of our Eco-Repair platform. Each tool and
        functionality is designed to provide a seamless and engaging experience
        for repair enthusiasts.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Eco Repair AI
          </h2>
          <p className="text-muted-foreground leading-6">
            Intelligent assistant that provides step-by-step repair guidance,
            recommended tools, parts, and solutions.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Diagnosis History
          </h2>
          <p className="text-muted-foreground leading-6">
            Stores detailed repair histories including AI recommendations, tools
            used, video guides, and supplementary instructions.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">Forum</h2>
          <p className="text-muted-foreground leading-6">
            Community-driven discussions where users can ask questions, share
            solutions, and mark answers as solutions.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">Eco Coin</h2>
          <p className="text-muted-foreground leading-6">
            Virtual currency earned daily or through community participation.
            Can be redeemed for merchandise, vouchers, or donations.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default FeaturesPage;
