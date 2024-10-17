import { $lightbox } from "@/stores/lightbox";
import { useStore } from "@nanostores/solid";
import { Show } from "solid-js";
import { Portal } from "solid-js/web";

export default function Lightbox() {
  const lightbox = useStore($lightbox);

  return (
    <Show when={lightbox() !== ""}>
      <Portal>
        <div class="absolute inset-0 flex min-h-fit w-full flex-col items-center justify-center gap-4 overflow-scroll bg-black/85 px-6 py-10 md:gap-10">
          <div class="flex w-full flex-row justify-end">
            <button
              class="text-[0.875rem] font-bold uppercase tracking-[0.1875rem] text-white hover:opacity-25 focus:opacity-25"
              onClick={() => $lightbox.set("")}
            >
              Close
            </button>
          </div>

          <div class="size-fit">
            <img src={lightbox()} alt="" class="size-full object-contain" />
          </div>
        </div>
      </Portal>
    </Show>
  );
}
