"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    let href = "/";
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-0 h-screen w-screen bg-zinc-900/40 flex justify-center align-middle"
      onClose={onDismiss}
    >
      {children}
      <button onClick={onDismiss} className="close-button" />
    </dialog>,

    document.getElementById("modal-root")!
  );
}
