import { useEffect, useRef, type RefObject } from 'react';

type UseMenuFocusTrapParams = {
  isOpen: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  fallbackRef?: RefObject<HTMLElement | null>;
  onRequestClose: () => void;
};

export function useMenuFocusTrap({
  isOpen,
  triggerRef,
  contentRef,
  fallbackRef,
  onRequestClose,
}: UseMenuFocusTrapParams) {
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusables = [
        triggerRef.current,
        ...Array.from(
          contentRef.current?.querySelectorAll<HTMLElement>('a, button') ?? [],
        ),
      ].filter(Boolean) as HTMLElement[];

      if (focusables.length <= 1) {
        event.preventDefault();
        return;
      }

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }

      if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [contentRef, isOpen, onRequestClose, triggerRef]);

  useEffect(() => {
    if (!isOpen) {
      lastFocusedElementRef.current?.focus();
      return;
    }

    lastFocusedElementRef.current =
      document.activeElement as HTMLElement | null;

    const rafId = window.requestAnimationFrame(() => {
      const firstFocusable =
        contentRef.current?.querySelector<HTMLElement>('a, button');
      if (firstFocusable) {
        firstFocusable.focus();
        return;
      }

      fallbackRef?.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [contentRef, fallbackRef, isOpen]);
}
