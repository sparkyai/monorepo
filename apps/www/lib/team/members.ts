import type { StaticImageData } from "next/image";
import AlexDiakov from "./avatar/Alex Diakov.webp";
import AndrewKamlyk from "./avatar/Andrew Kamlyk.webp";
import DenKarpov from "./avatar/Den Karpov.webp";
import JuliaDiakova from "./avatar/Julia Diakova.webp";
import VladyslavStasiuk from "./avatar/Vladyslav Stasiuk.webp";

type Social = {
  url: string;
  name: string;
};

const SOCIALS = {
  AlexDiakov: [
    { url: "https://www.linkedin.com/in/alex-diakov/", name: "LinkedIn" },
    { url: "https://t.me/alex_diakov", name: "Telegram" },
  ],
  AndrewKamlyk: [
    { url: "https://www.linkedin.com/in/andrii-kamlyk-788486270/", name: "LinkedIn" },
    { url: "https://t.me/AndronAmlike", name: "Telegram" },
  ],
  DenKarpov: [],
  JuliaDiakova: [
    { url: "https://www.linkedin.com/in/yuliia-diakova/", name: "LinkedIn" },
    { url: "https://t.me/Yuliia_Diakova", name: "Telegram" },
  ],
  VladyslavStasiuk: [
    { url: "https://www.linkedin.com/in/vladyslav-stasiuk/", name: "LinkedIn" },
    { url: "https://t.me/vladyslav_stasiuk", name: "Telegram" },
  ],
};

type Member = {
  name: string;
  image: StaticImageData;
  socials: Social[];
  summary: string;
  position: string;
};

export default {
  en: [
    {
      name: "Julia Diakova",
      image: JuliaDiakova,
      socials: SOCIALS.JuliaDiakova,
      summary: "User-centric design, intuitive interfaces, enhancing experience.",
      position: "UI/UX Designer",
    },
    {
      name: "Vladyslav Stasiuk",
      image: VladyslavStasiuk,
      socials: SOCIALS.VladyslavStasiuk,
      summary: "Collaborative leadership, technical expertise, shared innovation.",
      position: "Co-founder & Developer",
    },
    {
      name: "Alex Diakov",
      image: AlexDiakov,
      socials: SOCIALS.AlexDiakov,
      summary: "Visionary leader, strategic decision-maker, company oversight.",
      position: "Founder & CEO",
    },
    {
      name: "Den Karpov",
      image: DenKarpov,
      socials: SOCIALS.DenKarpov,
      summary: "Skilled coder, versatile programming, efficient problem-solver.",
      position: "Python Developer",
    },
    {
      name: "Andrew Kamlyk",
      image: AndrewKamlyk,
      socials: SOCIALS.AndrewKamlyk,
      summary: "Empathetic communicator, problem resolution, client satisfaction.",
      position: "Customer support, QA",
    },
  ],
  ru: [
    {
      name: "Юлия Дьякова",
      image: JuliaDiakova,
      socials: SOCIALS.JuliaDiakova,
      summary: "Ориентированный на пользовательский дизайн, улучшение опыта.",
      position: "UI/UX Дизайнер",
    },
    {
      name: "Владисла Стасюк",
      image: VladyslavStasiuk,
      socials: SOCIALS.VladyslavStasiuk,
      summary: "Совместное лидерство, технический опыт, стратегические решения.",
      position: "Соучредитель",
    },
    {
      name: "Александр Дьяков",
      image: AlexDiakov,
      socials: SOCIALS.AlexDiakov,
      summary: "Дальновидный лидер, стратегические решения, надзор за компанией.",
      position: "Основатель",
    },
    {
      name: "Денис Карпов",
      image: DenKarpov,
      socials: SOCIALS.DenKarpov,
      summary: "Квалифицированный кодер, универсальное программирование.",
      position: "Разработчик Python",
    },
    {
      name: "Андрей Камлык",
      image: AndrewKamlyk,
      socials: SOCIALS.AndrewKamlyk,
      summary: "Эмпатический коммуникатор, решение проблем.",
      position: "Тестировщик Поддержка клиентов",
    },
  ],
  uk: [
    {
      name: "Юлія Дякова",
      image: JuliaDiakova,
      socials: SOCIALS.JuliaDiakova,
      summary: "Орієнтований на користувача дизайн,  покращення досвіду.",
      position: "UI/UX Дизайнер",
    },
    {
      name: "Владисла Стасюк",
      image: VladyslavStasiuk,
      socials: SOCIALS.VladyslavStasiuk,
      summary: "Спільне лідерство, технічний досвід, спільні інновації, стратегічні рішення.",
      position: "Співзасновник",
    },
    {
      name: "Олександр Дяков",
      image: AlexDiakov,
      socials: SOCIALS.AlexDiakov,
      summary: "Далекоглядний лідер, стратегічні рішення, управління компанією.",
      position: "Засновник",
    },
    {
      name: "Денис Карпов",
      image: DenKarpov,
      socials: SOCIALS.DenKarpov,
      summary: "Кваліфікований кодер, універсальне програмування.",
      position: "Розробник Python",
    },
    {
      name: "Андрій Камлик",
      image: AndrewKamlyk,
      socials: SOCIALS.AndrewKamlyk,
      summary: "Емпатичний комунікатор, вирішення проблем.",
      position: "Тестувальник Підтримка клієнтів",
    },
  ],
} as Record<string, Member[]>;
