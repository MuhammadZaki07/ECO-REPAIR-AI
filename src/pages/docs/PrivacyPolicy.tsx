function PrivacyPolicyPage() {
  return (
  <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Privacy Policy
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        This page outlines how the application collects, uses, and protects user
        data. All information is presented statically to ensure transparency and
        to help users understand their data rights clearly.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Data Collection
          </h2>
          <p className="text-muted-foreground leading-6">
            Explains what types of user data are collected and how this data is
            handled responsibly.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Data Usage
          </h2>
          <p className="text-muted-foreground leading-6">
            Describes how collected data is utilized to improve user experience,
            services, and application functionality.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            User Rights
          </h2>
          <p className="text-muted-foreground leading-6">
            Details user rights regarding personal data, including access,
            modification, and deletion of information.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default PrivacyPolicyPage;
