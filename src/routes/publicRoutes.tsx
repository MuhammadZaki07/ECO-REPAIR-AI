import MainLayout from "@/layouts/MainLayouts";
import AccountDeleted from "@/pages/account-status/AccountDeleted";
import AccountBlocked from "@/pages/account-status/Blocked";
import APIDocumentationPage from "@/pages/docs/APIDocumentation";
import CommunityPage from "@/pages/docs/Community";
import EcoCoinRewardsPage from "@/pages/docs/EcoCoinRewards";
import FeaturesPage from "@/pages/docs/Features";
import HowItWorksPage from "@/pages/docs/HowItWorks";
import LegalDocsPage from "@/pages/docs/LegalDocs";
import PlatformPage from "@/pages/docs/Platform";
import PrivacyPolicyPage from "@/pages/docs/PrivacyPolicy";
import SystemStatusPage from "@/pages/docs/SystemStatus";
import TermsOfServicePage from "@/pages/docs/TermsOfService";
import Forbidden from "@/pages/errors/403";
import ServerError from "@/pages/errors/500";
import LandingPage from "@/pages/landing/Index";
import HelpPage from "@/pages/user/help";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/403",
        element: <Forbidden />,
      },
      {
        path: "/500",
        element: <ServerError />,
      },
      {
        path: "/blocked",
        element: <AccountBlocked />,
      },
      {
        path: "/account-deleted",
        element: <AccountDeleted />,
      },
      {
        path: "/help",
        element: <HelpPage />,
      },
      { path: "/info/platform", element: <PlatformPage /> },
      { path: "/info/features", element: <FeaturesPage /> },
      { path: "/info/how-it-works", element: <HowItWorksPage /> },
      { path: "/info/eco-coin-rewards", element: <EcoCoinRewardsPage /> },
      { path: "/info/community", element: <CommunityPage /> },
      { path: "/docs/legal-docs", element: <LegalDocsPage /> },
      { path: "/docs/privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "/docs/terms-of-service", element: <TermsOfServicePage /> },
      { path: "/docs/api-documentation", element: <APIDocumentationPage /> },
      { path: "/docs/system-status", element: <SystemStatusPage /> },
    ],
  },
];
