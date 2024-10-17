import { createSignal, onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";

export default function useResize() {
  const [size, setSize] = createSignal(0);

  function updateSize() {
    setSize(window.innerWidth);
  }

  onMount(() => {
    if (isServer) return;
    updateSize();
    window.addEventListener("resize", updateSize);
  });

  onCleanup(() => {
    if (isServer) return;
    window.removeEventListener("resize", updateSize);
  });

  return size;
}
