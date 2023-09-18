import type { StaticImageData } from "next/image";
import AlinaKim from "./Alina Kim.webp";
import AndriyKovalenko from "./Andriy Kovalenko.webp";
import TopMorris from "./Tom Morris.webp";

function review(name: string, jobTitle: string, avatar: StaticImageData, text: string) {
  return {
    text,
    author: {
      name,
      avatar: {
        alt: name,
        src: avatar.src,
        name,
        mime: "image/webp",
        width: avatar.width,
        height: avatar.height,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- controlled
        placeholder: avatar.blurDataURL!,
      },
      jobTitle,
    },
  };
}

export default {
  en: [
    review(
      "Alina Kim",
      "Blogger",
      AlinaKim,
      "Sparky decreased my content writing costs from $890 to $260 per month, and as someone who works on projects in multiple countries, including the USA, UK, Ukraine, and others, this cost-saving solution has been invaluable.",
    ),
    review(
      "Andriy Kovalenko",
      "Marker Manager",
      AndriyKovalenko,
      "Sparky is a game-changer for marketers like me. It saves me time and effort while producing top-quality content. It's a must-have tool for any marketer who wants to stay ahead of the game.",
    ),
    review(
      "Tom Morris",
      "CEO Inter Co.",
      TopMorris,
      "I just wanted to give you guys a quick shout out for your amazing AI templates! As a busy business owner, I don't have a lot of time to spend on content creation, but your templates have made it a breeze.",
    ),
  ],
  ru: [
    review(
      "Алина Ким",
      "Блогер",
      AlinaKim,
      "Sparky снизил мои расходы на написание контента с $890 до $260 в месяц, и для меня, работающего над проектами в разных странах, включая США, Великобританию, Украину и другие, это решение для экономии средств оказалось бесценным.",
    ),
    review(
      "Андрей Коваленко",
      "Контент менеджер",
      AndriyKovalenko,
      "Sparky меняет правила игры для таких маркетологов, как я. Это экономит мое время и усилия, создавая высококачественный контент. Это обязательный инструмент для любого маркетолога, который хочет быть впереди игры.",
    ),
    review(
      "Tom Morris",
      "CEO Inter Co.",
      TopMorris,
      "Я просто хотел быстро выразить вам ребята признательность за ваши потрясающие шаблоны на основе искусственного интеллекта! Будучи занятым владельцем бизнеса, у меня нет много времени на создание контента, но ваши шаблоны сделали это процесс легким.",
    ),
  ],
  uk: [
    review(
      "Аліна Кім",
      "Блогер",
      AlinaKim,
      "Sparky зменшив мої витрати на написання контенту з $890 до $260 на місяць, і для мене, як для людини яка працює над проектами у різних країнах, включаючи США, Великобританію, Україну та інші, це рішення для економії коштів виявилося безцінним.",
    ),
    review(
      "Андрій Коваленко",
      "Менеджер вмісту",
      AndriyKovalenko,
      "Sparky змінює правила гри для таких маркетологів, як я. Це економить мій час і зусилля, створюючи високоякісний вміст. Це обов’язковий інструмент для будь-якого маркетолога, який хоче залишатися попереду гри.",
    ),
    review(
      "Tom Morris",
      "CEO Inter Co.",
      TopMorris,
      "Я просто хотів швидко висловити вам, хлопці, подяку за ваші дивовижні шаблони на основі штучного інтелекту! Будучи зайнятим власником бізнесу, у мене немає багато часу на створення контенту, але ваші шаблони зробили цей процес легким.",
    ),
  ],
} as Record<string, ReturnType<typeof review>[]>;
