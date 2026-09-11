// components/icons/SocialIcons.tsx
// LinkedIn/Instagram/Facebook glyphs, extracted from Footer.tsx (2026-08-27)
// once HeaderOverlayNav needed the same three icons -- genuinely reused now,
// not a speculative extraction. currentColor throughout, same pattern as
// Logo.tsx, so each consumer controls colour via its own ambient text
// colour rather than a second "on dark" variant.
//
// Sizing and the URL-to-icon matching logic stay with each consumer (their
// button sizes and layouts differ) -- only the SVG glyphs themselves are
// shared here.
//
// `InstagramIcon`'s `gradient` prop (owner, 2026-09-11: "is this pink the
// offical color for instagram, please double check their guidelines and
// use the right one" -- the single flat pink this project used before was
// one real stop from Instagram's own gradient, not the actual brand mark).
// Meta's own published values (about.meta.com brand assets, unchanged
// since 2016): #833AB4 -> #C13584 -> #E1306C -> #F77737 -> #FCAF45,
// bottom-left to top-right -- same order/orientation as the app icon.
// `false` (default): unchanged plain `currentColor`, every existing
// neutral usage (Footer, HeaderOverlayNav, MobileNav) is unaffected. Each
// instance needs its own unique gradient id (`useId`) so two gradient
// icons on the same page never collide.
import { useId, type SVGProps } from "react";

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      <path
        d="M0 3.34443C0 2.63656 0.247755 2.05259 0.743243 1.5925C1.23873 1.13239 1.88289 0.902344 2.67568 0.902344C3.45432 0.902344 4.08429 1.12884 4.56564 1.58188C5.06113 2.04906 5.30888 2.6578 5.30888 3.40814C5.30888 4.08767 5.06822 4.65394 4.58687 5.10698C4.09138 5.57416 3.44015 5.80775 2.6332 5.80775H2.61197C1.83333 5.80775 1.20335 5.57416 0.722008 5.10698C0.240662 4.6398 0 4.05227 0 3.34443ZM0.276062 21.9255V7.74018H4.99035V21.9255H0.276062ZM7.60232 21.9255H12.3166V14.0047C12.3166 13.5091 12.3732 13.1269 12.4865 12.8579C12.6847 12.3766 12.9855 11.9696 13.389 11.6369C13.7925 11.3042 14.2986 11.1379 14.9073 11.1379C16.4929 11.1379 17.2857 12.2067 17.2857 14.3444V21.9255H22V13.7923C22 11.6971 21.5045 10.1079 20.5135 9.02493C19.5225 7.94192 18.213 7.40041 16.5849 7.40041C14.7587 7.40041 13.3359 8.18613 12.3166 9.75756V9.80003H12.2954L12.3166 9.75756V7.74018H7.60232C7.63062 8.1932 7.64479 9.60181 7.64479 11.9661C7.64479 14.3303 7.63062 17.6501 7.60232 21.9255Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type InstagramIconProps = SVGProps<SVGSVGElement> & {
  /** Meta's official brand gradient instead of `currentColor`. Default false. */
  gradient?: boolean;
};

export function InstagramIcon({ gradient = false, ...props }: InstagramIconProps) {
  const gradientId = useId();
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      {gradient ? (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#833AB4" />
            <stop offset="25%" stopColor="#C13584" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="75%" stopColor="#F77737" />
            <stop offset="100%" stopColor="#FCAF45" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M15 12C15 12.5933 14.8241 13.1734 14.4944 13.6667C14.1648 14.1601 13.6962 14.5446 13.1481 14.7716C12.5999 14.9987 11.9967 15.0581 11.4147 14.9424C10.8328 14.8266 10.2982 14.5409 9.87868 14.1213C9.45912 13.7018 9.1734 13.1672 9.05764 12.5853C8.94189 12.0033 9.0013 11.4001 9.22836 10.8519C9.45542 10.3038 9.83994 9.83524 10.3333 9.50559C10.8266 9.17595 11.4067 9 12 9C12.7949 9.00247 13.5565 9.31934 14.1186 9.88141C14.6807 10.4435 14.9975 11.2051 15 12ZM21.375 7.875V16.125C21.375 17.5174 20.8219 18.8527 19.8373 19.8373C18.8527 20.8219 17.5174 21.375 16.125 21.375H7.875C6.48261 21.375 5.14726 20.8219 4.16269 19.8373C3.17812 18.8527 2.625 17.5174 2.625 16.125V7.875C2.625 6.48261 3.17812 5.14726 4.16269 4.16269C5.14726 3.17812 6.48261 2.625 7.875 2.625H16.125C17.5174 2.625 18.8527 3.17812 19.8373 4.16269C20.8219 5.14726 21.375 6.48261 21.375 7.875ZM16.5 12C16.5 11.11 16.2361 10.24 15.7416 9.49993C15.2471 8.75991 14.5443 8.18314 13.7221 7.84254C12.8998 7.50195 11.995 7.41283 11.1221 7.58647C10.2492 7.7601 9.44736 8.18868 8.81802 8.81802C8.18868 9.44736 7.7601 10.2492 7.58647 11.1221C7.41283 11.995 7.50195 12.8998 7.84254 13.7221C8.18314 14.5443 8.75991 15.2471 9.49993 15.7416C10.24 16.2361 11.11 16.5 12 16.5C13.1935 16.5 14.3381 16.0259 15.182 15.182C16.0259 14.3381 16.5 13.1935 16.5 12ZM18 7.125C18 6.9025 17.934 6.68499 17.8104 6.49998C17.6868 6.31498 17.5111 6.17078 17.3055 6.08564C17.1 6.00049 16.8738 5.97821 16.6555 6.02162C16.4373 6.06502 16.2368 6.17217 16.0795 6.3295C15.9222 6.48684 15.815 6.68729 15.7716 6.90552C15.7282 7.12375 15.7505 7.34995 15.8356 7.55552C15.9208 7.76109 16.065 7.93679 16.25 8.0604C16.435 8.18402 16.6525 8.25 16.875 8.25C17.1734 8.25 17.4595 8.13147 17.6705 7.9205C17.8815 7.70952 18 7.42337 18 7.125Z"
        fill={gradient ? `url(#${gradientId})` : "currentColor"}
      />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="24 16 14 27" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      <path
        d="M32.3943 22.3516C32.3943 21.3457 33.2883 20.9844 34.2891 20.9844C35.2899 20.9844 36.3587 21.2969 36.3587 21.2969L37 17.4687C37 17.4687 35.6397 17 32.3943 17C30.4024 17 29.2462 17.7617 28.4008 18.8848C27.604 19.9492 27.5749 21.6582 27.5749 22.7617V25.2715H25V29.0117H27.5749V42H32.3943V29.0117H36.213L36.4947 25.2715H32.3943V22.3516Z"
        fill="currentColor"
      />
    </svg>
  );
}
