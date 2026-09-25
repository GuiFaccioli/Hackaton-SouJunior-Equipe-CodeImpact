import { useEffect, useRef } from "react";

export const wrapOffset = (offset: number, period: number) =>
  period > 0 ? ((offset % period) + period) % period : 0;

/** Autoplay and user input share one circular coordinate, never native scroll. */
export function useCircularTrack(speed = 20) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const viewport = ref.current;
    const track = viewport?.firstElementChild as HTMLElement | null;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!viewport || !track || !first) return;
    let offset = 0;
    let period = first.getBoundingClientRect().width;
    let frame = 0;
    let previous = 0;
    let pointer: number | null = null;
    let lastX = 0;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const paint = () => {
      offset = wrapOffset(offset, period);
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };
    const resize = () => {
      const next = first.getBoundingClientRect().width;
      offset = period ? offset / period * next : 0;
      period = next;
      paint();
    };
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    observer?.observe(first);
    const animate = (time: number) => {
      if (previous && pointer === null && !document.hidden && !reduced?.matches) {
        offset += speed * Math.min(time - previous, 50) / 1000;
        paint();
      }
      previous = time;
      frame = requestAnimationFrame(animate);
    };
    const wheel = (event: WheelEvent) => {
      const delta = event.deltaX || (event.shiftKey ? event.deltaY : 0);
      if (!delta) return;
      event.preventDefault();
      offset += delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1);
      paint();
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      pointer = event.pointerId;
      lastX = event.clientX;
      viewport.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (pointer !== event.pointerId) return;
      offset += lastX - event.clientX;
      lastX = event.clientX;
      paint();
    };
    const up = () => { pointer = null; };
    const drag = (event: Event) => event.preventDefault();
    viewport.addEventListener("wheel", wheel, { passive: false });
    viewport.addEventListener("pointerdown", down);
    viewport.addEventListener("pointermove", move);
    viewport.addEventListener("pointerup", up);
    viewport.addEventListener("pointercancel", up);
    viewport.addEventListener("lostpointercapture", up);
    viewport.addEventListener("dragstart", drag);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      viewport.removeEventListener("wheel", wheel);
      viewport.removeEventListener("pointerdown", down);
      viewport.removeEventListener("pointermove", move);
      viewport.removeEventListener("pointerup", up);
      viewport.removeEventListener("pointercancel", up);
      viewport.removeEventListener("lostpointercapture", up);
      viewport.removeEventListener("dragstart", drag);
    };
  }, [speed]);
  return ref;
}
