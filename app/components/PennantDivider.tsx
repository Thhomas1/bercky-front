export const PennantDivider = () => {
  return (
    <div className="hidden flex-col items-center md:flex">
      <div className="h-3 w-3 rounded-full bg-primary/60" />
      <div className="w-px flex-1 bg-border" />
      <svg
        width="56"
        height="120"
        viewBox="0 0 56 120"
        className="-mt-1"
        aria-hidden="true"
      >
        <path
          d="M4 0 H52 V90 L28 116 L4 90 Z"
          className="fill-card stroke-primary/40"
          strokeWidth="1.5"
        />
        <path
          d="M10 4 V86 L28 106 L46 86 V4"
          fill="none"
          className="stroke-primary/30"
          strokeWidth="1.5"
        />
        <g className="stroke-primary/70" strokeWidth="1.5" fill="none">
          <path d="M28 70 V44" strokeLinecap="round" />
          <path d="M28 48 C20 46 16 40 16 34" strokeLinecap="round" />
          <path d="M28 54 C20 52 17 47 17 42" strokeLinecap="round" />
          <path d="M28 60 C20 58 18 54 18 50" strokeLinecap="round" />
          <path d="M28 48 C36 46 40 40 40 34" strokeLinecap="round" />
          <path d="M28 54 C36 52 39 47 39 42" strokeLinecap="round" />
          <path d="M28 60 C36 58 38 54 38 50" strokeLinecap="round" />
        </g>
      </svg>

      <div className="w-px flex-1 bg-border" />
    </div>
  );
};

export default PennantDivider;