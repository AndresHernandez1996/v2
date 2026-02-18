declare module 'scrollreveal' {
  type RevealConfig = Record<string, unknown>;

  type ScrollRevealInstance = {
    reveal: (
      target: string | Element | NodeList,
      options?: RevealConfig,
    ) => void;
    destroy: () => void;
  };

  export default function ScrollReveal(): ScrollRevealInstance;
}
