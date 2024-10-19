import { Card as FlowbiteCard } from "flowbite-react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Card = ({ children }: Props) => {
  return <FlowbiteCard>{children}</FlowbiteCard>;
};
Card;
Card.displayName = "Card";
export { Card };
