import listColors from "./listColours.js";
import members from "./members.js";
import notes from "./notes.js";
import cards from "./cards.js";
import plantLtd from "../assets/plant-ltd.png";
import webPlatform from "../assets/web-platform-logo.png";
import devDreamer from "../assets/DDLogo.png";
import socialCampaign from "../assets/social-campaign.png";

const getMembersByIds = (ids) =>
  members.filter((member) => ids.includes(member.id));

const getNotesByIds = (ids) =>
  notes.filter((note) => ids.includes(note.id));

const getCardsByIds = (ids) =>
  cards.filter((card) => ids.includes(card.id));

const boards = [
  {
    id: 1,
    name: "Plant Ltd",
    img: plantLtd,
    members: getMembersByIds([1, 2, 3, 4, 9, 11]),
    notes: getNotesByIds([1]),
    lists: [
      {
        id: "list-1",
        name: "To Do",
        color: listColors["To Do"],
        cards: getCardsByIds([1, 2]),
      },
      {
        id: "list-2",
        name: "In Progress",
        color: listColors["In Progress"],
        cards: getCardsByIds([3, 4]),
      },
      {
        id: "list-3",
        name: "Done",
        color: listColors["Done"],
        cards: getCardsByIds([5, 6, 7]),
      },
    ],
  },
  {
    id: 2,
    name: "Web Platform",
    img: webPlatform,
    members: getMembersByIds([1, 3, 5, 6]),
    notes: getNotesByIds([1]),
    lists: [
      {
        id: "list-1",
        name: "To Do",
        color: listColors["To Do"],
        cards: getCardsByIds([8]),
      },
      {
        id: "list-2",
        name: "In Progress",
        color: listColors["In Progress"],
        cards: getCardsByIds([9]),
      },
      {
        id: "list-3",
        name: "Done",
        color: listColors["Done"],
        cards: getCardsByIds([10, 11]),
      },
    ],
  },
  {
    id: 3,
    name: "James White",
    img: devDreamer,
    members: getMembersByIds([1, 2, 3]),
    notes: getNotesByIds([1]),
    lists: [
      {
        id: "list-1",
        name: "To Do",
        color: listColors["To Do"],
        cards: getCardsByIds([]),
      },
      {
        id: "list-2",
        name: "In Progress",
        color: listColors["In Progress"],
        cards: getCardsByIds([]),
      },
      {
        id: "list-3",
        name: "Done",
        color: listColors["Done"],
        cards: getCardsByIds([12, 13, 14, 15]),
      },
    ],
  },
  {
    id: 4,
    name: "Social Campaign",
    img: socialCampaign,
    members: getMembersByIds([1, 2, 3, 4, 6, 7, 8]),
    notes: getNotesByIds([1]),
    lists: [
      {
        id: "list-1",
        name: "To Do",
        color: listColors["To Do"],
        cards: getCardsByIds([16, 17]),
      },
      {
        id: "list-2",
        name: "In Progress",
        color: listColors["In Progress"],
        cards: getCardsByIds([18]),
      },
      {
        id: "list-3",
        name: "Done",
        color: listColors["Done"],
        cards: getCardsByIds([19, 20]),
      },
    ],
  },
];

export default boards;
