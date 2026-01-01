function APIDocumentationPage() {
  return (
   <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        API Documentation
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        This page presents a playful representation of the application's API.
        All content is for demonstration purposes only and should not be
        considered real API documentation.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            GET /users
          </h2>
          <p className="text-muted-foreground leading-6">
            Fetches a list of fictional users with playful stats and gimik
            details for demo purposes.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            POST /repair
          </h2>
          <p className="text-muted-foreground leading-6">
            Submits a fake repair request to our imaginary Eco Repair AI.
            Responses are gimik only and not functional.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            GET /leaderboard
          </h2>
          <p className="text-muted-foreground leading-6">
            Returns a playful leaderboard ranking fictional users. Designed for
            demo and aesthetic purposes only.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default APIDocumentationPage;
