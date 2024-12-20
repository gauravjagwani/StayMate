import {
  FaAirFreshener,
  FaBath,
  FaCity,
  FaFireExtinguisher,
  FaHouseUser,
  FaParking,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { BiSolidFridge, BiWifi } from "react-icons/bi";
import {
  GiCctvCamera,
  GiDesert,
  GiIsland,
  GiMountainRoad,
  GiToaster,
  GiWorld,
} from "react-icons/gi";
import {
  MdMicrowave,
  MdNoMeetingRoom,
  MdOutlinePool,
  MdOutlineVilla,
  MdPets,
  MdYard,
} from "react-icons/md";
import { RiChatPrivateLine } from "react-icons/ri";
import { SiMyspace } from "react-icons/si";
import { PiTelevisionFill } from "react-icons/pi";
export const categoryItems = [
  {
    id: 0,
    name: "beach",
    description: "This Property is close to the Beach.",
    title: "Beach",
    imageUrl:
      "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
  },
  {
    id: 1,
    name: "trending",
    description: "This is a Property which is trending.",
    title: "Trending",
    imageUrl:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
  },
  {
    id: 2,
    name: "beachfront",
    description: "This is a Property is close to the beachfront",
    title: "Beachfront",
    imageUrl:
      "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
  },
  {
    id: 3,
    name: "erathhome",
    description: "This Property is considerd a Earth Home",
    title: "Earth Home",
    imageUrl:
      "https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
  },
  {
    id: 4,
    name: "luxe",
    description: "This Property is considerd Luxorious",
    title: "Luxe",
    imageUrl:
      "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
  },
  {
    id: 5,
    name: "amazingView",
    description: "This property has an amazing View",
    title: "Amazing View",
    imageUrl:
      "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
  },
  {
    id: 6,
    name: "design",
    description: "This property puts a big focus on design ",
    title: "Design",
    imageUrl:
      "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
  },
  {
    id: 7,
    name: "pool",
    description: "This property has an amazing Pool",
    title: "Pool",
    imageUrl:
      "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
  },
  {
    id: 8,
    name: "tiny",
    description: "This property is considered a tiny home",
    title: "Tiny Home",
    imageUrl:
      "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
  },
  {
    id: 9,
    name: "historic",
    description: "This Property is considered historic",
    title: "Historic Home",
    imageUrl:
      "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
  },
  {
    id: 10,
    name: "countryside",
    description: "This Property is located on the countryside",
    title: "Countryside",
    imageUrl:
      "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
  },
  {
    id: 11,
    name: "omg",
    description: "This Property has a wow factor",
    title: "WOW!",
    imageUrl:
      "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
  },
  {
    id: 12,
    name: "surfing",
    description: "This Property is located near to a surfing spot",
    title: "Surfing",
    imageUrl:
      "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
  },
];

export const types = [
  {
    id: 0,
    name: "whole property",
    description:
      "Enjoy exclusive access to the entire property during your stay",
    title: "Whole Property",
    icon: <MdOutlineVilla size={26} />,
  },
  {
    id: 1,
    name: "private room",
    description:
      "Stay in your own private room with access to shared living spaces",
    title: "Private Room",
    icon: <RiChatPrivateLine size={26} />,
  },
  {
    id: 2,
    name: "shared space",
    description:
      "Sleep in a common area or shared room, potentially with other guests or hosts",
    title: "Shared Space",
    icon: <SiMyspace size={26} />,
  },
];

export const facilities = [
  {
    name: "Bath",
    icon: <FaBath size={26} />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill size={26} />,
  },
  {
    name: "Air Conditioning",
    icon: <FaAirFreshener size={26} />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera size={26} />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher size={26} />,
  },
  {
    name: "Wifi",
    icon: <BiWifi size={26} />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet size={26} />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge size={26} />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave size={26} />,
  },
  {
    name: "Stove",
    icon: <GiToaster size={26} />,
  },
  {
    name: "Garden",
    icon: <MdYard size={26} />,
  },
  {
    name: "Parking",
    icon: <FaParking size={26} />,
  },
  {
    name: " Pet allowed",
    icon: <MdPets size={26} />,
  },
];

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
