function PlatformPage() {
  return (
    <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Platform
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        Our platform provides a comprehensive ecosystem for electronic repair
        enthusiasts, combining intelligent guidance, community support, and
        gamified incentives to encourage sustainable practices.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Cross-Device Support
          </h2>
          <p className="text-muted-foreground leading-6">
            Access the platform on desktop, tablet, and mobile devices with
            seamless experience.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Eco-Repair AI
          </h2>
          <p className="text-muted-foreground leading-6">
            Intelligent assistant providing step-by-step repair guidance, tool
            recommendations, and maintenance tips.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Secure User Profiles
          </h2>
          <p className="text-muted-foreground leading-6">
            Manage your account securely, track your activities, and personalize
            your experience on the platform.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default PlatformPage;
