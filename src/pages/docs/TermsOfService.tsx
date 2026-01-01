function TermsOfServicePage() {
  return (
    <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Terms of Service
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        This page provides the rules and guidelines for using the application.
        All information is presented statically to ensure users understand their
        obligations, permitted actions, and responsibilities clearly.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            User Conduct
          </h2>
          <p className="text-muted-foreground leading-6">
            Describes the expected behavior of users, including prohibited
            actions and responsibilities.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Account Responsibilities
          </h2>
          <p className="text-muted-foreground leading-6">
            Explains the duties of account holders, including secure credential
            management and proper use of the account.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-6">
            Details the limits of the application's responsibility regarding
            user actions, data, and services provided.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default TermsOfServicePage;
