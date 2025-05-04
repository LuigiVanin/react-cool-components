import { Star, Check } from "lucide-react";
import React, { PropsWithChildren, HTMLAttributes, forwardRef, ForwardRefExoticComponent } from "react";
import { cn } from "@/lib/cn";

export type PriceCardProps = PropsWithChildren<{
  actionSlot?: React.ReactNode;
}>;

export type PriceCardActionProps = HTMLAttributes<HTMLButtonElement>;
export type PriceCardHeaderProps = HTMLAttributes<HTMLElement>;

export type PriceCardTitleProps = {
  title?: string;
  subtitle?: string;
} & HTMLAttributes<HTMLDivElement>;

export type PriceCardBadgeProps = { text?: string, icon?: React.ReactNode } & HTMLAttributes<HTMLDivElement>;
export type PriceCardDividerProps = HTMLAttributes<HTMLDivElement>;
export type PriceCardBodyProps = HTMLAttributes<HTMLDivElement>;
export type PriceCardFeaturesProps = HTMLAttributes<HTMLUListElement>;

export type PriceCardFeatureItemProps = {
  text: string;
} & HTMLAttributes<HTMLLIElement>;

export type PriceCardPriceProps = {
  value?: number;
  description?: string;
} & HTMLAttributes<HTMLDivElement>;

type PriceCardComponent = ForwardRefExoticComponent<PriceCardProps> & {
  Header: typeof PriceCardHeader;
  Title: typeof PriceCardTitle;
  Badge: typeof PriceCardBadge;
  Divider: typeof PriceCardDivider;
  Body: typeof PriceCardBody;
  Features: typeof PriceCardFeatures;
  FeatureItem: typeof PriceCardFeatureItem;
  Price: typeof PriceCardPrice;
  Action: typeof PriceCardAction;
};

const PriceCard = forwardRef<HTMLDivElement, PriceCardProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="group/card wrapper w-80 relative rounded-3xl bg-gradient-to-bl from-green-700 to-80% to-green-500"
      >
        <div className="w-full min-h-32 p-6 bg-convergent dark:bg-neutral-900 shadow-card rounded-3xl border-l border-r border-gray-200 dark:border-gray-800 flex flex-col gap-6 relative">
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <span className="group-hover/card:translate-y-15 ease-in-out group-hover/card:-translate-x-5 transition-transform duration-500 absolute z-0 right-5 -top-16 rounded-[100%] w-28 h-36 bg-green-200 dark:bg-green-800 rotate-[-70deg] blur-3xl" />
          </div>

          {children}
        </div>

        {props.actionSlot}
      </div>
    );
  }
) as PriceCardComponent;

const PriceCardBody = ({
  children,
  className,
  ...props
}: PropsWithChildren<PriceCardBodyProps>) => {
  return (
    <div {...props} className={cn("flex flex-col gap-2", className)}>
      {children}
    </div>
  );
};

const PriceCardFeatures = ({
  children,
  className,
  ...props
}: PropsWithChildren<PriceCardFeaturesProps>) => {
  return (
    <ul {...props} className={cn("flex flex-col gap-3", className)}>
      {children}
    </ul>
  );
};

const PriceCardFeatureItem = ({
  text,
  className,
  ...props
}: PriceCardFeatureItemProps) => {
  return (
    <li {...props} className={cn("flex gap-3 items-center", className)}>
      <span className="flex items-center justify-center dark:bg-green-800 bg-green-100 dark:text-green-400 text-green-600 rounded-full h-5 w-5">
        <Check size={13} strokeWidth={3} />
      </span>

      <p className="text-gray-400 font-medium hover:underline hover:decoration-dashed hover:underline-offset-4">
        {text}
      </p>
    </li>
  );
};

const PriceCardPrice = ({
  className,
  value,
  description,
  children,
  ...props
}: PriceCardPriceProps) => {
  return (
    <footer {...props} className={cn("", className)}>
      <>
        {/* Conditional render */}
        {value && (
          <h3 className="font-semibold text-xl text-foreground">${value}</h3>
        )}

        {/* Conditional render */}
        {description && (
          <p className="text-gray-400 font-medium">{description}</p>
        )}

        {children}
      </>
    </footer>
  );
};



const PriceCardAction = ({
  children,
  className,
  ...props
}: PropsWithChildren<PriceCardActionProps>) => {
  return (
    <button
      {...props}
      className={cn(
        "w-full py-4 font-medium flex justify-center items-center gap-1 cursor-pointer relative group/btn transition-transform duration-150 text-white",
        className
      )}
    >
      {children}
      <span className="absolute size-[2px] bg-white top-3 left-9"></span>
      <span className="absolute size-[1px] bg-white top-5 left-4"></span>
      <span className="absolute size-[1px] bg-white top-8 left-6"></span>
      <span className="absolute size-[1px] bg-white top-10 left-12"></span>
      <span className="absolute size-[1px] bg-white bottom-3 left-3"></span>

      <span className="absolute size-[1px] bg-white top-5 right-4"></span>
      <span className="absolute size-[1px] bg-white top-8 right-6"></span>
      <span className="absolute size-[1px] bg-white top-10 right-12"></span>
      <span className="absolute size-[2px] bg-white opacity-70 top-5 right-11"></span>
      <span className="absolute size-[2px] bg-white top-2 right-8"></span>
    </button>
  );
};

const PriceCardHeader = ({
  children,
  className,
  ...props
}: PropsWithChildren<PriceCardHeaderProps>) => {
  return (
    <header
      {...props}
      className={cn("flex justify-between items-start", className)}
    >
      {children}
    </header>
  );
};

const PriceCardTitle = ({ className, children, title, subtitle, ...props }: PriceCardTitleProps) => {
  return (
    <div {...props} className={cn("flex flex-col", className)}>
      {
        title &&
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      }

      {
        subtitle &&
        <p className="text-neutral-400 font-semibold text-sm">{subtitle}</p>
      }
      {children}
    </div>
  );
};

const PriceCardBadge = ({ className, text, icon, ...props }: PriceCardBadgeProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center gap-1 border-1 border-gray-100 dark:border-gray-700 pr-3 pl-[2px] py-[2px] rounded-full z-10 bg-convergent",
        className
      )}
    >
      <span className="h-6 w-6 bg-green-400 text-white rounded-full flex items-center justify-center">
        {
          !icon
            ? <Star size={13} fill="currentColor" />
            : icon
        }

      </span>
      <p className="uppercase text-sm text-green-500 font-medium">{text || "Popular"}</p>
    </div>
  );
};

const PriceCardDivider = ({ className, ...props }: PriceCardDividerProps) => {
  return (
    <div
      {...props}
      className={cn("w-full h-[1px] bg-calm-300 flex z-10", className)}
    />
  );
};

PriceCard.displayName = "PriceCard";

PriceCard.Header = PriceCardHeader;
PriceCard.Title = PriceCardTitle;
PriceCard.Badge = PriceCardBadge;
PriceCard.Divider = PriceCardDivider;
PriceCard.Body = PriceCardBody;
PriceCard.Features = PriceCardFeatures;
PriceCard.FeatureItem = PriceCardFeatureItem;
PriceCard.Price = PriceCardPrice;
PriceCard.Action = PriceCardAction;

export default PriceCard;

export {
  PriceCard,
  PriceCardAction,
  PriceCardHeader,
  PriceCardTitle,
  PriceCardBadge,
  PriceCardDivider,
  PriceCardBody,
  PriceCardFeatures,
  PriceCardFeatureItem,
  PriceCardPrice,
};
