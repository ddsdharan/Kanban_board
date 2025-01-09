import members from "./members.js";

const getMembersByIds = (ids) =>
  members.filter((member) => ids.includes(member.id));

const cards = [
  {
    id: 1,
    category: "UX/UI",
    title: "Wireframing",
    description:
      "Create low-fidelity designs that outline the basic structure and layout of the product or service.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([1, 2]),
    watching: false,
    watchers: 5,
    comments: 2,
    files: 3,
  },
  {
    id: 2,
    category: "Design",
    title: "First design concepts",
    description:
      "Create a concept based on the research and insights gathered during the discovery phase of the project.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([3]),
    watchers: 3,
    watching: false,
    comments: 4,
    files: 1,
  },
  {
    id: 3,
    category: "Marketing",
    title: "Customer Journey Mapping",
    description:
      "Identify the key touchpoints and pain points in the customer journey, and develop strategies to improve the overall customer experience.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([4, 5]),
    watchers: 4,
    watching: false,
    comments: 5,
    files: 2,
  },
  {
    id: 4,
    category: "Branding",
    title: "Branding visual identity",
    description:
      "Create a brand identity system that includes a logo, typography, color palette, and brand guidelines.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([6]),
    watchers: 2,
    watching: false,
    comments: 3,
    files: 4,
  },
  {
    id: 5,
    category: "UX/UI",
    title: "Competitor research",
    description:
      "Research competitors and identify weaknesses and strengths of each of them. Compare their product features, quality, and more.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([1, 2]),
    watchers: 6,
    watching: false,
    comments: 2,
    files: 3,
  },
  {
    id: 6,
    category: "Testing",
    title: "This is a test card",
    description: "I hope you enjoy going through this project - Amit 😎",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([11]),
    watchers: 6,
    watching: false,
    comments: 2,
    files: 3,
  },
  {
    id: 7,
    category: "Branding",
    title: "Marketing materials",
    description:
      "Create branded materials such as business cards, flyers, brochures, and social media graphics.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([4, 5]),
    watchers: 7,
    watching: false,
    comments: 5,
    files: 6,
  },
  {
    id: 8,
    category: "Design",
    title: "Design library",
    description:
      "Develop a comprehensive design library that includes UI components, patterns, and guidelines.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([5, 6]),
    watchers: 4,
    watching: false,
    comments: 3,
    files: 2,
  },
  {
    id: 9,
    category: "Branding",
    title: "Social media branding",
    description:
      "Create branding assets for social media platforms including profile images, cover photos, and post templates.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([1, 3]),
    watchers: 5,
    watching: false,
    comments: 2,
    files: 5,
  },
  {
    id: 10,
    category: "UX/UI",
    title: "Usability testing",
    description:
      "Conduct usability testing sessions to gather feedback on the user interface and identify areas for improvement.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([2, 4]),
    watchers: 3,
    watching: false,
    comments: 1,
    files: 3,
  },
  {
    id: 11,
    category: "Design",
    title: "UI refinement",
    description:
      "Refine the user interface based on feedback and best practices to enhance usability and visual appeal.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([5, 6]),
    watchers: 6,
    watching: false,
    comments: 4,
    files: 3,
  },
  {
    id: 12,
    category: "Development",
    title: "Setup development environment",
    description:
      "Prepare the development environment by installing necessary tools and dependencies.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: true,
      },
    ],
    members: getMembersByIds([2, 11]),
    watchers: 2,
    watching: false,
    comments: 1,
    files: 0,
  },
  {
    id: 13,
    category: "Design",
    title: "Mobile app wireframes",
    description:
      "Create wireframes for the mobile application to outline the structure and layout of key screens.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: true,
      },
    ],
    members: getMembersByIds([1, 2, 11]),
    watchers: 4,
    watching: false,
    comments: 3,
    files: 2,
  },
  {
    id: 14,
    category: "Branding",
    title: "App icon design",
    description:
      "Design an app icon that reflects the brand and stands out in the app store.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: true,
      },
    ],
    members: getMembersByIds([1, 2]),
    watchers: 5,
    watching: false,
    comments: 2,
    files: 3,
  },
  {
    id: 15,
    category: "UX/UI",
    title: "Prototyping",
    description:
      "Develop interactive prototypes to simulate the user experience and gather feedback.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: true,
      },
    ],
    members: getMembersByIds([1, 11]),
    watchers: 6,
    watching: false,
    comments: 4,
    files: 2,
  },
  {
    id: 16,
    category: "Branding",
    title: "Campaign strategy",
    description:
      "Develop a comprehensive strategy for the social media campaign including goals, target audience, and key messages.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([5, 6]),
    watchers: 5,
    watching: false,
    comments: 3,
    files: 2,
  },
  {
    id: 17,
    category: "Marketing",
    title: "Content calendar",
    description:
      "Create a content calendar that outlines the timing and content of posts for the campaign.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([3, 6]),
    watchers: 4,
    watching: false,
    comments: 2,
    files: 3,
  },
  {
    id: 18,
    category: "Design",
    title: "Social media graphics",
    description:
      "Design visual assets for the social media campaign including banners, infographics, and video thumbnails.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([4]),
    watchers: 6,
    watching: false,
    comments: 4,
    files: 1,
  },
  {
    id: 19,
    category: "Branding",
    title: "Hashtag research",
    description:
      "Research popular and relevant hashtags to use in the campaign for maximum reach and engagement.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([3]),
    watchers: 3,
    watching: false,
    comments: 1,
    files: 0,
  },
  {
    id: 20,
    category: "Marketing",
    title: "Campaign launch",
    description:
      "Execute the campaign launch, monitor performance, and make adjustments as needed.",
    checklist: [
      {
        id: 0,
        text: "This is a checklist task, feel free to add more below",
        checked: false,
      },
    ],
    members: getMembersByIds([3, 5, 6]),
    watchers: 7,
    watching: false,
    comments: 5,
    files: 2,
  },
];

export default cards;
