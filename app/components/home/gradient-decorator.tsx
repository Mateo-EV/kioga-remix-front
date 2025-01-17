import { cn } from "@/lib/utils";

type GradientDecoratorProps = React.ComponentPropsWithoutRef<"div">;

function GradientDecorator({ className, ...props }: GradientDecoratorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 -z-30 size-[200px] bg-gradient-to-tr from-primary to-background opacity-30 blur-[100px]",
        className,
      )}
      {...props}
    />
  );
}

export default GradientDecorator;
