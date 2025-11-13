import type { ComponentPropsWithoutRef } from "react";

type TeamGridProps = {
  members: Array<{
    login: { uuid: string };
    name: { first: string; last: string };
    email: string;
    location: { city: string; country: string };
    picture: { large: string; medium: string; thumbnail: string };
  }>;
  loading: boolean;
  error: string | null;
};

function CardShell({
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { className?: string }) {
  return (
    <div
      className={`card-shadow relative flex h-full flex-1 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left ${className ?? ""}`}
      {...props}
    />
  );
}

export default function TeamGrid({ members, loading, error }: TeamGridProps) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-10 md:grid md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardShell
            key={`skeleton-${index}`}
            className="animate-pulse border-dashed border-slate-300 bg-slate-50"
          >
            <div className="h-20 w-20 rounded-full bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-200" />
            <div className="h-3 w-full rounded bg-slate-100" />
            <div className="h-3 w-4/5 rounded bg-slate-100" />
          </CardShell>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-600">
        <p className="font-semibold">We couldn&apos;t load the team roster.</p>
        <p className="mt-2 text-sm text-rose-500">{error}</p>
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
        No team members available yet.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between gap-y-10 gap-x-5 md:grid md:grid-cols-2 md:gap-y-14 md:gap-x-8 lg:grid-cols-3">
      {members.map((member) => (
        <CardShell
          key={member.login.uuid}
          className="basis-1/3 sm:basis-2/5 md:basis-auto"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <img
              src={member.picture.large}
              alt={`${member.name.first} ${member.name.last}`}
              className="h-20 w-full rounded-full ring-4 ring-sky-100"
              loading="lazy"
            />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900">
                {member.name.first} {member.name.last}
              </h3>
              <p className="text-sm text-slate-500">{member.email}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-700">Location:</span>{" "}
              {member.location.city}, {member.location.country}
            </p>
            <p>
              <span className="font-medium text-slate-700">Focus:</span>{" "}
              Product Engineering
            </p>
            <p>
              <span className="font-medium text-slate-700">Interests:</span>{" "}
              Cycling, coffee, and building joyful experiences.
            </p>
          </div>
        </CardShell>
      ))}
    </div>
  );
}
