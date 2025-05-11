import { SizeVariant } from "@/types";

export type MagnifiedDockItemVariant = "inactive" | "semi-active" | "active";

export type MagnifiedDockSizeVariants = Extract<
  SizeVariant,
  "md" | "lg" | "sm"
>;
