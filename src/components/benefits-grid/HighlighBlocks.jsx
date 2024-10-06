import React from "react";
import { Block } from "./Block";
import {
  FiArrowUpRight,
  FiClipboard,
  FiCoffee,
  FiDollarSign,
  FiFeather,
  FiInbox,
  FiMove,
  FiRepeat,
  FiSmile,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { CardTitle } from "./CardTitle";
import { CardSubtitle } from "./CardSubtitle";
import { TimerIcon } from "lucide-react";

export const HighlighBlocks = () => {
  return (
    <>
      <HighlightBlock
        Icon={FiDollarSign}
        iconClassName="text-green-500"
        title="Monetize at your price!"
        subtitle="You set up a price you want!"
      />
      <HighlightBlock
        Icon={FiArrowUpRight}
        iconClassName="text-pink-500"
        title="Grow your margins!"
        subtitle="We charge very low margins so that you can earn more!"
      />
      <HighlightBlock
        Icon={TimerIcon}
        iconClassName="text-blue-500"
        title="Save time and hussle!"
        subtitle="With our easy to do setup you are quickly ready to monetize your repos."
      />
      <HighlightBlock
        Icon={FiMove}
        iconClassName="text-fuchsia-500"
        title="Remain flexible"
        subtitle="Easily update your repos and price without!"
      />
      <HighlightBlock
        Icon={FiClipboard}
        iconClassName="text-red-500"
        title="Stay on track"
        subtitle="You can keep track of all your repos, how they are helping others!"
      />
      {/* <HighlightBlock
        Icon={FiRepeat}
        iconClassName="text-yellow-500"
        title="Repeat what works"
        subtitle="You"
      /> */}
    </>
  );
};

const HighlightBlock = ({ iconClassName, Icon, title, subtitle }) => (
  <Block className="col-span-3 space-y-1.5 md:col-span-1">
    <Icon className={twMerge("text-3xl text-indigo-600", iconClassName)} />
    <CardTitle>{title}</CardTitle>
    <CardSubtitle>{subtitle}</CardSubtitle>
  </Block>
);
