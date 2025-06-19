import {
  AnimationControls,
  TargetAndTransition,
  VariantLabels,
} from "motion/react";

type ExtraLargeNumber = 1 | 2 | 3 | 4;

export type SizeVariant =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | `${ExtraLargeNumber}xl`;

export type Initial = boolean | TargetAndTransition | VariantLabels | undefined;
export type Animate =
  | boolean
  | TargetAndTransition
  | VariantLabels
  | AnimationControls
  | undefined;
