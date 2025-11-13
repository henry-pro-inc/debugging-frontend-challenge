import { Fragment, useEffect, useMemo, useState } from "react";

type SpotlightCarouselProps = {
  members: Array<{
    login: { uuid: string };
    name: { first: string; last: string };
    email: string;
    location: { city: string; country: string };
    picture: { large: string; medium: string; thumbnail: string };
  }>;
};

export default function SpotlightCarousel({ members }: SpotlightCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!members.length) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current + 1 >= members.length ? 0 : current + 1
      );
    }, 3000);

    setActiveIndex(0);

    return () => window.clearInterval(interval);
  }, [members]);

  const activeMember = useMemo(() => {
    return members[activeIndex];
  }, [members]);

  if (!members.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-white to-slate-50 p-10 shadow-sm">
        <div className="text-center text-slate-500">
          Spotlight is loading once team members arrive.
        </div>
      </div>
    );
  }

  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-slate-50 p-10 shadow-lg">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <img
          src={activeMember.picture.large}
          alt={`${activeMember.name.first} ${activeMember.name.last}`}
          className="mx-auto h-32 w-32 rounded-full border-4 border-white object-cover object-center shadow-md ring-4 ring-sky-100"
          loading="lazy"
        />

        <div className="flex-1 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            Weekly spotlight
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {activeMember.name.first} {activeMember.name.last}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{activeMember.email}</p>

          <div className="mt-4 space-y-3 text-base text-slate-600">
            <p>
              <strong className="font-semibold text-slate-700">Based in:</strong>{" "}
              {activeMember.location.city}, {activeMember.location.country}
            </p>
            <p>
              <strong className="font-semibold text-slate-700">
                Favorite project:
              </strong>{" "}
              n/a — waiting for the team to fill this in!
            </p>
            <p>
              <strong className="font-semibold text-slate-700">
                Fun fact:
              </strong>{" "}
              Collects retro keyboards and enjoys early morning hikes.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {members.map((member, index) => (
          <Fragment key={member.login.uuid}>
            <button
              type="button"
              className={`h-2 w-10 rounded-full transition ${
                index === activeIndex
                  ? "bg-sky-500"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show spotlight for ${member.name.first} ${member.name.last}`}
            />
          </Fragment>
        ))}
      </div>
    </article>
  );
}
