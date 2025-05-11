type ExtraLargeNumber = 1 | 2 | 3 | 4;

export type SizeVariant =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | `${ExtraLargeNumber}xl`;
