export const containerSizeVariant = {
  lg: {
    class: "h-26 px-5",
  },
  md: {
    class: "h-20 px-2",
  },
  sm: {
    class: "h-16 px-1.5",
  },
} as const;

export const slotSizeVariant = {
  lg: {
    class: "py-3.5 px-3",
    inactive: {
      width: "90px",
    },
    active: {
      width: "130px",
    },
    "semi-active": {
      width: "100px",
    },
  },
  md: {
    class: "py-2.5 px-2",

    inactive: {
      width: "80px",
    },
    active: {
      width: "100px",
    },
    "semi-active": {
      width: "87px",
    },
  },
  sm: {
    class: "py-2 px-2",

    inactive: {
      width: "70px",
    },
    active: {
      width: "92px",
    },
    "semi-active": {
      width: "80px",
    },
  },
} as const;
