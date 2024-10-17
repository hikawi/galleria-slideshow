export default function ControlButtons(props: { idx: number; max: number }) {
  return (
    <div class="flex flex-row items-center justify-center gap-6">
      <button
        aria-label="Previous Slide"
        disabled={props.idx === 0}
        class="enabled:hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-15"
        onClick={() => (window.location.href = `/slideshow/${props.idx - 1}`)}
      >
        <svg
          class="h-4 w-auto md:h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 24"
        >
          <g stroke="#000" fill="none" fill-rule="evenodd">
            <path
              d="M24.166 1.843L3.627 12.113l20.539 10.269V1.843z"
              stroke-width="2"
            />
            <path fill="#D8D8D8" d="M.986.5h-1v22.775h1z" />
          </g>
        </svg>
      </button>

      <button
        aria-label="Next Slide"
        disabled={props.idx === props.max}
        class="enabled:hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-15"
        onClick={() => (window.location.href = `/slideshow/${props.idx + 1}`)}
      >
        <svg
          class="h-4 w-auto md:h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 24"
        >
          <g stroke="#000" fill="none" fill-rule="evenodd">
            <path
              d="M1.528 1.843l20.538 10.27L1.528 22.382V1.843z"
              stroke-width="2"
            />
            <path fill="#D8D8D8" d="M24.708.5h1v22.775h-1z" />
          </g>
        </svg>
      </button>
    </div>
  );
}
