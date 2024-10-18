import { onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";

export default function ControlButtons(props: { idx: number; max: number }) {
  function keyboardHandler(e: KeyboardEvent) {
    switch (e.key) {
      case "n":
      case "N":
      case "ArrowRight":
        if (props.idx < props.max)
          window.location.href = `/slideshow/${props.idx + 1}`;
        break;
      case "p":
      case "P":
      case "ArrowLeft":
        if (props.idx > 0) window.location.href = `/slideshow/${props.idx - 1}`;
        break;
      case "s":
      case "S":
        window.location.href = "/";
        break;
    }
  }

  onMount(() => {
    if (isServer) return;
    window.addEventListener("keydown", keyboardHandler);
  });

  onCleanup(() => {
    if (isServer) return;
    window.removeEventListener("keydown", keyboardHandler);
  });

  return (
    <div class="flex flex-row items-center justify-center gap-6">
      <button
        aria-label="Previous Slide"
        disabled={props.idx === 0}
        class="enabled:hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-15"
        onClick={() => (window.location.href = `/slideshow/${props.idx - 1}`)}
        aria-keyshortcuts="p"
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
        aria-keyshortcuts="n"
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
