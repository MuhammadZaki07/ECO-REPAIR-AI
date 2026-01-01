function LegalDocsPage() {
  return (
    <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Legal & Documentation
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        This page contains official documents and legal guidelines that govern
        the use of the application. All information is presented statically to
        help users understand their rights and responsibilities clearly and
        professionally.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Usage Guidelines
          </h2>
          <p className="text-muted-foreground leading-6">
            Official guidelines explaining how users should utilize the
            application's features according to established rules.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Legal References
          </h2>
          <p className="text-muted-foreground leading-6">
            Legal references ensuring that all activities within the application
            comply with applicable laws and regulations.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Policy References
          </h2>
          <p className="text-muted-foreground leading-6">
            Additional documents clarifying the rights and responsibilities of
            users for professional and responsible use of the application.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default LegalDocsPage;
