function CommunityPage() {
  return (
    <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Community
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        Connect with like-minded eco-conscious individuals! Our community
        encourages collaboration, sharing repair tips, and promoting sustainable
        practices.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-balance">
            Eco Repair Enthusiasts
          </h2>
          <p className="text-muted-foreground leading-6">
            Share repair projects, ask questions, and showcase sustainable
            practices with the community.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h4l3-8 4 16 3-8h4"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-balance">
            Sustainable Initiatives
          </h2>
          <p className="text-muted-foreground leading-6">
            Collaborate on eco-friendly projects and community-driven
            environmental campaigns.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12l2 2 4-4"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-balance">
            Eco Challenges & Rewards
          </h2>
          <p className="text-muted-foreground leading-6">
            Participate in fun eco-challenges, earn recognition, and motivate
            others to repair and reuse.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default CommunityPage;
