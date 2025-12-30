import {
  MessageSquare,
  Activity,
  ThumbsUp,
  Award,
  CheckCircle2,
} from "lucide-react";

export const forumCardsConfig = (dashboard: any) => [
  {
    id: "questions",
    title: "Total Questions",
    value: dashboard.cards.total_questions ?? 0,
    icon: MessageSquare,
  },
  {
    id: "answers",
    title: "Total Answers",
    value: dashboard.cards.total_answers ?? 0,
    icon: Activity,
  },
  {
    id: "question_likes",
    title: "Question Likes",
    value: dashboard.cards.question_likes ?? 0,
    icon: ThumbsUp,
  },
  {
    id: "answer_likes",
    title: "Answer Likes",
    value: dashboard.cards.answer_likes ?? 0,
    icon: Award,
  },
  {
    id: "solutions",
    title: "Solutions",
    value: dashboard.cards.solutions ?? 0,
    icon: CheckCircle2,
  },
];

export const forumChartConfigs = {
  questions: {
    title: "Questions & Answers Trend",
    description: "Daily breakdown of community Q&A activity",
    chartConfig: {
      questions: {
        label: "Questions",
        color: "hsl(217, 91%, 60%)",
      },
      answers: {
        label: "Answers",
        color: "hsl(280, 100%, 70%)",
      },
    },
  },

  solutions: {
    title: "Solutions & Pending",
    description: "Track resolved questions vs pending issues",
    chartConfig: {
      solutions: {
        label: "Solutions",
        color: "hsl(173, 80%, 40%)",
      },
      pending: {
        label: "Pending",
        color: "hsl(25, 95%, 53%)",
      },
    },
  },

  likes: {
    title: "Community Engagement",
    description: "Likes and interactions across questions and replies",
    chartConfig: {
      question_likes: {
        label: "Question Likes",
        color: "hsl(45, 93%, 47%)",
      },
      reply_likes: {
        label: "Reply Likes",
        color: "hsl(142, 76%, 36%)",
      },
    },
  },

  activity: {
    title: "Overall Activity",
    description: "Posts, views, and engagement metrics over time",
    chartConfig: {
      posts: {
        label: "Posts",
        color: "hsl(262, 83%, 58%)",
      },
    },
  },
} as const;
