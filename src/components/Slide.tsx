import useResize from "@/hooks/use-resize";
import { $lightbox } from "@/stores/lightbox";
import { Match, onCleanup, onMount, Switch } from "solid-js";
import { isServer } from "solid-js/web";

type Props = {
  name: string;
  year: number;
  description: string;
  source: string;
  artist: { image: string; name: string };
  images: {
    gallery: string;
    hero: { large: string; small: string };
    thumbnail: string;
  };
};

function ViewImageButton(props: { gallery: string }) {
  return (
    <button
      class="relative flex h-10 items-center gap-3 bg-black/75 px-4 before:invisible before:absolute before:inset-0 before:size-full before:bg-white/25 hover:before:visible"
      onClick={() => $lightbox.set(props.gallery)}
    >
      <svg class="size-3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g fill="#FFF" fill-rule="nonzero">
          <path d="M7.714 0l1.5 1.5-2.357 2.357 1.286 1.286L10.5 2.786l1.5 1.5V0zM3.857 6.857L1.5 9.214 0 7.714V12h4.286l-1.5-1.5 2.357-2.357zM8.143 6.857L6.857 8.143 9.214 10.5l-1.5 1.5H12V7.714l-1.5 1.5zM4.286 0H0v4.286l1.5-1.5 2.357 2.357 1.286-1.286L2.786 1.5z" />
        </g>
      </svg>

      <span class="text-[0.625rem] font-bold uppercase tracking-[0.13rem] text-white">
        View Image
      </span>
    </button>
  );
}

function MobileSlide(props: Props) {
  return (
    <div class="p-6">
      <div class="relative w-full">
        <img src={props.images.hero.small} alt="" class="w-full object-cover" />

        <div class="absolute inset-0 p-4">
          <ViewImageButton gallery={props.images.gallery} />
        </div>

        <div class="absolute -bottom-12 left-0 right-12 flex flex-col gap-2 bg-white p-6">
          <h1 class="heading-2 text-balance">{props.name}</h1>
          <span class="subhead-1 text-dark-gray">{props.artist.name}</span>
        </div>
      </div>

      <img
        src={props.artist.image}
        alt={props.artist.name}
        class="ml-4 mt-12 size-16"
      />

      <div class="w-full -translate-y-4 text-right text-[6.25rem] font-bold leading-none text-light-gray">
        <span>{props.year}</span>
      </div>

      <p class="body -translate-y-8 text-balance text-dark-gray">
        {props.description}
      </p>

      <a
        href={props.source}
        class="link-2 uppercase text-dark-gray underline hover:text-black"
      >
        Go to source
      </a>
    </div>
  );
}

function TabletSlide(props: Props) {
  return (
    <div class="p-10">
      <div class="grid auto-rows-auto grid-cols-3">
        <img
          src={props.images.hero.large}
          alt=""
          class="col-span-2 col-start-1 row-start-1 object-cover"
        />

        <div class="col-span-2 col-start-1 row-start-1 flex size-full items-end p-4">
          <ViewImageButton gallery={props.images.gallery} />
        </div>

        <div class="col-span-2 col-start-2 row-start-1 flex flex-col items-end">
          <div class="flex h-fit w-full flex-col gap-6 bg-white pb-16 pl-16">
            <h1 class="heading-1 text-balance">{props.name}</h1>
            <span class="subhead-1 text-dark-gray">{props.artist.name}</span>
          </div>

          <img
            src={props.artist.image}
            alt={props.artist.name}
            class="mr-12 size-32"
          />
        </div>

        <div class="relative z-0 col-start-1 row-start-2 translate-y-24">
          <span class="display font-bold text-light-gray">{props.year}</span>
        </div>
      </div>

      <div class="mx-auto flex w-full max-w-[28.5rem] flex-col gap-12">
        <p class="body relative z-10 text-balance text-dark-gray">
          {props.description}
        </p>

        <a
          href={props.source}
          class="link-2 uppercase text-dark-gray underline hover:text-black"
        >
          Go to source
        </a>
      </div>
    </div>
  );
}

function DesktopSlide(props: Props) {
  return (
    <div class="flex h-full w-full flex-row items-stretch overflow-hidden px-10 py-16">
      <div class="relative z-0 h-[35rem] min-w-[30rem]">
        <img
          src={props.images.hero.large}
          alt={props.name}
          class="size-full object-cover"
          draggable="false"
        />

        <div class="absolute bottom-4 left-4">
          <ViewImageButton gallery={props.images.gallery} />
        </div>
      </div>

      <div class="relative z-10 -ml-16 flex min-h-full flex-col justify-between">
        <div class="flex h-fit min-w-[24rem] max-w-[28rem] flex-col gap-6 bg-white pb-16 pl-16">
          <h1 class="heading-1">{props.name}</h1>
          <span class="subhead-1 text-dark-gray">{props.artist.name}</span>
        </div>

        <img
          src={props.artist.image}
          alt={props.artist.name}
          class="-mb-12 ml-24 size-32"
          draggable="false"
        />
      </div>

      <div class="relative flex max-w-fit flex-col justify-between pl-4">
        <span class="display absolute right-0 top-0 z-0 text-light-gray">
          {props.year}
        </span>

        {/* Empty div */}
        <div></div>

        <p class="body relative z-10 pr-32 text-dark-gray">
          {props.description}
        </p>

        <a
          href={props.source}
          class="link-2 uppercase text-dark-gray underline hover:text-black focus:text-black"
        >
          Go to source
        </a>
      </div>
    </div>
  );
}

export default function Slide(props: Props) {
  const size = useResize();

  function keyboardHandler(e: KeyboardEvent) {
    switch (e.key) {
      case "v":
      case "V":
        $lightbox.set(props.images.gallery);
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
    <Switch
      fallback={
        <p class="heading-2 mx-auto animate-pulse p-6 text-center">
          Loading slide...
        </p>
      }
    >
      <Match when={size() > 0 && size() < 768}>
        <MobileSlide {...props} />
      </Match>
      <Match when={size() >= 768 && size() < 1280}>
        <TabletSlide {...props} />
      </Match>
      <Match when={size() >= 1280}>
        <DesktopSlide {...props} />
      </Match>
    </Switch>
  );
}
