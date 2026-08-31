// components/icons/MenuIcon.tsx
// The mobile nav trigger's glyph (Figma node 465:2872/465:2873, "Caprio
// Website" file) -- three horizontal bars, the outer two shorter than the
// middle one, not lucide-react's equal-width Menu icon. That asymmetry is
// the actual mark, so it's reproduced from the real exported asset rather
// than reused from lucide. currentColor, same pattern as Logo.tsx and
// icons/SocialIcons.tsx.
import type { SVGProps } from "react";

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      <path
        d="M13.9346 3H1.06542C0.476635 3 0 2.32895 0 1.5C0 0.671052 0.476635 0 1.06542 0H13.9346C14.5234 0 15 0.671052 15 1.5C15 2.32895 14.5234 3 13.9346 3Z"
        fill="currentColor"
      />
      <path
        d="M20.8595 11H1.14052C0.510232 11 0 10.3289 0 9.5C0 8.67105 0.510232 8 1.14052 8H20.8595C21.4898 8 22 8.67105 22 9.5C22 10.3289 21.4898 11 20.8595 11Z"
        fill="currentColor"
      />
      <path
        d="M13.9346 19H1.06542C0.476635 19 0 18.3289 0 17.5C0 16.6711 0.476635 16 1.06542 16H13.9346C14.5234 16 15 16.6711 15 17.5C15 18.3289 14.5234 19 13.9346 19Z"
        fill="currentColor"
      />
    </svg>
  );
}
