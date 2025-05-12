export function SoundIcon({ muted = false }: { muted?: boolean }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        {muted ? (
          // Muted speaker
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M9 9.75V14.25M15 5.25v13.5M3.75 8.25v7.5h3.75L12 19.5V4.5L7.5 8.25H3.75z"
          />
        ) : (
          // Speaker with waves
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 5.25v13.5L6.75 14.25H3.75v-4.5h3L11.25 5.25zM16.5 8.25a3.75 3.75 0 010 7.5m2.25-9.75a6.75 6.75 0 010 12.75"
          />
        )}
      </svg>
    );
  }
  