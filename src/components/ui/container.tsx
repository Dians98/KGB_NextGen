import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={["mx-auto w-full max-w-page px-gutter", className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
