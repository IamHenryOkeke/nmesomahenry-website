import { ArrowUpRight } from "lucide-react";

type AnimatedArrowProps = {
  size?: number;
  className?: string;
};

export function AnimatedArrow({
  size = 18,
  className = "",
}: AnimatedArrowProps) {
  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <ArrowUpRight
        size={size}
        className="arrow-draw transition-transform duration-300 ease-out group-hover:-translate-y-full group-hover:translate-x-full"
      />
      <ArrowUpRight
        size={size}
        className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </span>
  );
}
