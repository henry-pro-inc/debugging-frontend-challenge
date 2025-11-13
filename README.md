# Frontend Debug Challenge — Team Spotlight

This repo powers a live debugging interview for junior frontend candidates. During the session, you’ll pair with an interviewer to diagnose and fix three issues in an Astro + React + TypeScript app. Code-generation tools are off-limits; rely on your own reasoning, docs, and the browser devtools.

## Session Flow

1. **Install & start** – Run `npm install` (already done before the session) and `npm run dev` if you want a fresh local copy.
2. **Explore `/team-spotlight`** – That page contains the broken experience. The interviewer will share a quick walkthrough before you dive in.
3. **Fix the issues** – Work through the three bugs below, talking through your approach as you go.
4. **Summarize** – Wrap up with a quick recap of what you found, how you verified each fix, and anything you’d improve with more time.

## Bugs to Diagnose

1. **API data never appears** – On the `TeamSpotlight` page the roster stays empty even though the request to `https://randomuser.me/api` succeeds.
2. **Card layout looks off** – Profile photos in `TeamGrid` are stretched and the name/email stack beneath the image instead of sitting beside it.
3. **Carousel stuck on first person** – The spotlight carousel doesn’t react when the active slide changes, so the highlighted teammate never updates.
