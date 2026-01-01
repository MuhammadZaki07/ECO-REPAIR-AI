function SystemStatusPage() {
  return (
    <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        System Status
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        This page shows a playful representation of the application's system
        status. All information is for demonstration purposes only and does not
        reflect real-time system data.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <h2 className="text-2xl font-semibold text-balance">
              Server Health
            </h2>
          </div>
          <p className="text-muted-foreground leading-6">
            Displays a fictional server health status with playful indicators
            for uptime and performance.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <h2 className="text-2xl font-semibold text-balance">
              Database Status
            </h2>
          </div>
          <p className="text-muted-foreground leading-6">
            Shows mock database connectivity and responsiveness in a gimik style
            for visual demonstration.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <h2 className="text-2xl font-semibold text-balance">
              API Endpoints
            </h2>
          </div>
          <p className="text-muted-foreground leading-6">
            Presents sample endpoint status and response times, designed solely
            for aesthetic and gimik purposes.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default SystemStatusPage;
