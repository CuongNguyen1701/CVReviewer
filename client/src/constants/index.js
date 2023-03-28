import {
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  threejs,
  cuong,
  hnam,
  anon,
} from "../assets";

const members = [
  {
    name: "Nguyen Truc Cuong",
    image: cuong,
    role: "Front-end Developer",
    description: "Description",
  },
  {
    name: "Tran Duc Hoang Nam",
    image: hnam,
    role: "Back-end Developer",
    description: "Description",
  },
  {
    name: "Le Phuong Nam",
    image: anon,
    role: "Back-end Developer",
    description: "Description",
  },
  {
    name: "Do Chi Thanh",
    image: anon,
    role: "Business Advisor",
    description: "Description",
  },
  {
    name: "Dinh Viet Ha",
    image: anon,
    role: "AI Engineer",
    description: "Description",
  },
  {
    name: "Name",
    image: anon,
    role: "Mentor",
    description: "Description",
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

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },

  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
];

export { members, technologies };
