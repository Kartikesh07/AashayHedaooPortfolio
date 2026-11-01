"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { Asset } from "@/data/portfolio";
export function Gallery({ items, title }: { items: Asset[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (active !== null && !dialog.current?.open) dialog.current?.showModal();
    else if (active === null && dialog.current?.open) {
      dialog.current.close();
      trigger.current?.focus();
    }
  }, [active]);
  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (!entry.isIntersecting) (entry.target as HTMLVideoElement).pause();
      },
      { threshold: 0.1 },
    );
    grid.current?.querySelectorAll("video").forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [items]);
  const shift = (n: number) =>
    setActive((a) =>
      a === null ? null : (a + n + items.length) % items.length,
    );
  return (
    <>
      <div className="media-grid" ref={grid}>
        {items.map((a, i) =>
          a.src.endsWith(".mp4") ? (
            <figure key={a.id}>
              <video
                controls
                onPlay={(e) => {
                  document.querySelectorAll("video").forEach((v) => {
                    if (v !== e.currentTarget) v.pause();
                  });
                }}
                playsInline
                preload="none"
                poster={a.poster}
                aria-label={`${title} original gameplay ${i + 1}`}
              >
                <source src={a.src} type="video/mp4" />
                Your browser does not support video playback.{" "}
                <a href={a.src}>Download gameplay video</a>
              </video>
              <figcaption className="mono">
                {title} / {String(i + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ) : (
            <button
              className="gallery-item"
              key={a.id}
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={`Expand ${title} image ${i + 1}`}
            >
              <Image
                src={a.src}
                alt={`${title} original portfolio image ${i + 1}`}
                width={a.width}
                height={a.height}
                sizes="(max-width:640px) 90vw, 45vw"
              />
              <Expand size={20} />
            </button>
          ),
        )}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={(e) => {
          e.preventDefault();
          setActive(null);
        }}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") shift(1);
          if (e.key === "ArrowLeft") shift(-1);
        }}
        aria-label={`${title} image gallery`}
      >
        {active !== null && (
          <>
            <button
              className="lightbox-close icon-button"
              autoFocus
              onClick={() => setActive(null)}
              aria-label="Close image gallery"
            >
              <X />
            </button>
            <div className="lightbox-content">
              {items[active].src.endsWith(".mp4") ? (
                <video
                  key={items[active].src}
                  controls
                  playsInline
                  src={items[active].src}
                  poster={items[active].poster}
                />
              ) : (
                <Image
                  src={items[active].src}
                  alt={`${title} expanded image ${active + 1}`}
                  width={items[active].width}
                  height={items[active].height}
                />
              )}
            </div>
            <div className="lightbox-controls">
              <button
                className="icon-button"
                onClick={() => shift(-1)}
                aria-label="Previous image"
              >
                <ArrowLeft />
              </button>
              <span className="mono">
                {active + 1} / {items.length}
              </span>
              <button
                className="icon-button"
                onClick={() => shift(1)}
                aria-label="Next image"
              >
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
