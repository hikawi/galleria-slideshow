import data from "@/data.json";
import useResize from "@/hooks/use-resize";
import { For, Match, onCleanup, onMount, Switch } from "solid-js";
import { isServer } from "solid-js/web";

function indexOf(node: any) {
  return data.findIndex((val) => val === node);
}

function MasonryTab({ node, index }: { node: any; index: number }) {
  return (
    <a
      class="group relative cursor-pointer"
      href={`/slideshow/${indexOf(node)}`}
      tabindex={index + 2}
    >
      {/* Idk what to put as alt text, if title it clashes with the title text. If description then it's too long, etc. */}
      <img src={node.images.thumbnail} alt="" class="size-full object-cover" />

      <div class="absolute inset-0 hidden bg-white/50 group-hover:block"></div>
      <div class="absolute inset-0 top-1/3 bg-gradient-to-b from-transparent to-black/85"></div>

      <div class="absolute inset-8 right-12 flex flex-col justify-end gap-2">
        <h1 class="heading-2 text-white">{node.name}</h1>
        <span class="subhead-2 text-white/75">{node.artist.name}</span>
      </div>
    </a>
  );
}

function MobileMasonry() {
  return (
    <div class="flex flex-col gap-6 p-6">
      <For each={data}>
        {(node, idx) => <MasonryTab node={node} index={idx()} />}
      </For>
    </div>
  );
}

function TabletMasonry() {
  return (
    <div class="grid grid-flow-row grid-cols-2 gap-10 p-10">
      <div class="flex flex-col gap-10">
        <For each={data.filter((node) => !node.mdCol2)}>
          {(node, idx) => <MasonryTab node={node} index={idx()} />}
        </For>
      </div>
      <div class="flex flex-col gap-10">
        <For each={data.filter((node) => node.mdCol2)}>
          {(node, idx) => <MasonryTab node={node} index={idx()} />}
        </For>
      </div>
    </div>
  );
}

function DesktopMasonry() {
  function keyboardHandler(e: KeyboardEvent) {
    switch (e.key) {
      case "s":
      case "S":
        window.location.href = "/slideshow/0";
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
    <div class="grid grid-cols-4 gap-10 p-10">
      <For each={[1, 2, 3, 4]}>
        {(col) => (
          <div class="flex flex-col gap-10">
            <For each={data.filter((node) => node.xlCol === col)}>
              {(node, idx) => <MasonryTab node={node} index={idx()} />}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}

export default function Masonry() {
  const size = useResize();

  return (
    <Switch
      fallback={
        <p class="mx-auto animate-pulse p-10 text-center">Loading...</p>
      }
    >
      <Match when={size() < 768}>
        <MobileMasonry />
      </Match>
      <Match when={size() >= 768 && size() < 1280}>
        <TabletMasonry />
      </Match>
      <Match when={size() >= 1280}>
        <DesktopMasonry />
      </Match>
    </Switch>
  );
}
