import { useEffect, useMemo, useState } from "react";
import SpotlightCarousel from "./SpotlightCarousel";
import TeamGrid from "./TeamGrid";

type RandomUser = {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  location: { city: string; country: string };
  picture: { large: string; medium: string; thumbnail: string };
};

const API_URL = "https://randomuser.me/api?results=10&nat=us,ca,gb,au";

export default function TeamSpotlight() {
  const [teamMembers, setTeamMembers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTeam() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }



        setTeamMembers([]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong when loading team members."
        );
      } finally {
        setLoading(false);
      }
    }

    loadTeam();
  }, []);

  const spotlightCandidates = useMemo(() => {
    return teamMembers.slice(0, 3);
  }, [teamMembers]);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 lg:pt-16">
      <header className="flex flex-col gap-4 text-center lg:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-500">
          Meet the team
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Team Spotlight
        </h1>
        <p className="text-base text-slate-600 sm:text-lg">
          Every week we highlight different teammates across the organisation.
          Review the spotlight carousel and the full roster below.
        </p>
      </header>

      <SpotlightCarousel members={spotlightCandidates} />

      <TeamGrid members={teamMembers} loading={loading} error={error} />
    </section>
  );
}
