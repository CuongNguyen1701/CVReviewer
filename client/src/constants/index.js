import { cuong, hnam, pnam, anon, thanh, hadinh } from "../assets";

const members = [
  {
    name: "Do Chi Thanh",
    image: thanh,
    role: "Business Analyst",
    description:
      "Third year student at Hanoi University of Science and Technology, majoring in Computer Science",
  },
  {
    name: "Dinh Viet Ha",
    image: hadinh,
    role: "AI Engineer",
    description:
      "Sophomore student at Hanoi University of Science and Technology, majoring in Computer Science",
  },
  {
    name: "Nguyen Truc Cuong",
    image: cuong,
    role: "Fullstack Developer",
    description:
      "Sophomore student at Hanoi University of Science and Technology, majoring in Computer Science",
  },
  {
    name: "Le Phuong Nam",
    image: pnam,
    role: "Data Analyst",
    description:
      "Sophomore student at Hanoi University of Science and Technology, majoring in Computer Science",
  },
  {
    name: "DreamFlare",
    image: anon,
    role: "Team",
    description: "Description",
  },
  {
    name: "Tran Duc Hoang Nam",
    image: hnam,
    role: "Fullstack Developer",
    description:
      "Sophomore student at Hanoi University of Science and Technology, majoring in Computer Science",
  },
];

export const navLinks = [
  {
    id: "home",
    title: "Home",
    pathname: "/",
  },
  {
    id: "service",
    title: "Service",
    pathname: "/",
  },
  {
    id: "about",
    title: "About",
    pathname: "/",
  },
];

export { members };
