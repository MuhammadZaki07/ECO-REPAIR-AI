function EcoCoinRewardsPage() {
  return (
    <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Eco-Coin Rewards
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg text-muted-foreground">
        Eco Coins are virtual tokens that reward user engagement and daily
        activity. They can be redeemed for merchandise, vouchers, or donations.
      </p>

      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Daily Claims
          </h2>
          <p className="text-muted-foreground leading-6">
            Users can claim Eco Coins once per day to maintain a steady reward
            balance.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Redemption Options
          </h2>
          <p className="text-muted-foreground leading-6">
            Redeem Eco Coins for vouchers, merchandise, or even donate to
            eco-friendly initiatives.
          </p>
        </li>

        <li className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold text-balance mb-2">
            Community Interaction
          </h2>
          <p className="text-muted-foreground leading-6">
            Eco Coins are also earned via Forum participation, helping to gamify
            community engagement and support.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default EcoCoinRewardsPage;
