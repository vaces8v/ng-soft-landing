"use client";

import { RefObject, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  pathWidth?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  pathWidth = 2,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const lastValuesRef = useRef({
    width: 0,
    height: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    d: "",
  });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      const svgWidth = Math.round(containerRect.width);
      const svgHeight = Math.round(containerRect.height);

      const startX =
        rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY =
        rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX =
        rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY =
        rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

      const controlY = startY - curvature;
      const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;

      const last = lastValuesRef.current;
      const dimChanged = last.width !== svgWidth || last.height !== svgHeight;
      const posChanged =
        Math.abs(last.startX - startX) > 0.5 ||
        Math.abs(last.startY - startY) > 0.5 ||
        Math.abs(last.endX - endX) > 0.5 ||
        Math.abs(last.endY - endY) > 0.5;

      if (dimChanged) {
        setSvgDimensions({ width: svgWidth, height: svgHeight });
      }
      if (posChanged || dimChanged || last.d !== d) {
        setPathD(d);
        lastValuesRef.current = {
          width: svgWidth,
          height: svgHeight,
          startX,
          startY,
          endX,
          endY,
          d,
        };
      }
    };

    const scheduleUpdate = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        updatePath();
      });
    };

    const media = window.matchMedia("(max-width: 767px)");
    const useWindowResize = media.matches;

    let resizeObserver: ResizeObserver | null = null;

    if (useWindowResize) {
      const onResize = () => scheduleUpdate();
      window.addEventListener("resize", onResize);
      scheduleUpdate();
      return () => {
        if (rafIdRef.current != null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        window.removeEventListener("resize", onResize);
      };
    } else {
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdate();
      });
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      scheduleUpdate();
      return () => {
        if (rafIdRef.current != null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        if (resizeObserver) resizeObserver.disconnect();
      };
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeOpacity="0.5"
      />
    </svg>
  );
};