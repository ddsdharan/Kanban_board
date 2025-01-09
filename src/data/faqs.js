import reactIcon from "../assets/React-icon.png";
import reduxIcon from "../assets/redux-icon.webp";
import reactRouterIcon from "../assets/react-router.svg";
import tailwindIcon from "../assets/tailwind-icon.png";
import githubIcon from "../assets/github-logo.png";
import reactIconsIcon from "../assets/react-icons-icon.svg";
import dndKitIcon from "../assets/dndkit-icon.png";

const faqs = [
  {
    id: 1,
    question: "What technologies and tools did you use to build this project?",
    answer:
      "This project was built from scratch using a modern web stack including React JS for the front end, Redux for global state management, React Router Dom for navigation, and Tailwind CSS for styling. I also used tools like Git/GitHub for version control, React Icons, uuid for generating unique id's and React Dnd-Kit for the drag n drop feature for the cards.",
    icons: [
      { id: 1, src: reactIcon, title: "React JS" },
      { id: 2, src: reduxIcon, title: "Redux" },
      { id: 3, src: reactRouterIcon, title: "React Router DOM" },
      { id: 4, src: tailwindIcon, title: "Tailwind CSS" },
      { id: 5, src: githubIcon, title: "Git/Github" },
      { id: 6, src: reactIconsIcon, title: "React Icons" },
      { id: 7, src: dndKitIcon, title: "dnd kit" },
    ],
  },
  {
    id: 2,
    question: "What challenges did you face and how did you overcome them?",
    answer:
      "One challenge was managing state across multiple components efficiently, I solved this by implementing Redux for global centralized state management, which reduced prop drilling and made the code more scalable. My choice between Redux and Reacts Context API came down to the scalability of my project, it made more sense to go for Redux due to the size of the project. I also leveraged Tailwind CSS for custom media queries.",
  },
  {
    id: 3,
    question: "How do you ensure your code is maintainable and scalable?",
    answer:
      "I follow best practices such as modular component architecture, ensuring that each component is reusable and focused on a single responsibility. I also write clean, readable code and use version control to track changes.",
  },
  {
    id: 4,
    question:
      "How do you stay up to date with the latest technologies and industry trends?",
    answer:
      "I stay up to date by following industry blogs, regularly checking documentation for langauges I'm interested in and continuing to create tutorials for my YouTube channel - Dev Dreamer. I also regularly explore new tools and libraries to ensure I'm always learning and staying current with the latest trends in software development.",
  },
  {
    id: 5,
    question: "How can the project be improved?",
    answer:
      "There are may ways in which the project can be improved such as: (1) moving the data from using a file system to a back end with something like Mongo DB and Node JS to create a fully fledged full stack application, (2) Adding a filter button section on top of each board so users can filter cards by category, (3) Allowing for the creation of new lists. These are all things I could do to further improve the project.",
  },
  {
    id: 6,
    question: "Who designed the project?",
    answer:
      "I did not design the project, instead the vast majority of the design comes from Dribbble - https://dribbble.com/shots/21227113-Managemate-Task-Management-Dashboard with quite a few additional tweaks from myself.",
  },
];

export default faqs;
