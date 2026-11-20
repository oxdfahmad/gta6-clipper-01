# Welcome back to Vice City — GTA 6 is HERE

[![make.fun](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/oxdfahmad/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/oxdfahmad/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

An entry for make.fun's bounty [Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01):
my AI agent found a GTA 6 moment, cut it into a vertical clip, and the clip
goes up on YouTube as a public Short. Places go by the video's views, the
most first — the top 20 share $500.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.

## The clip

The moment: the opening scene of Rockstar's official GTA VI Trailer 2 —
the first look at Leonida. An aerial sweep over turquoise water and the
Keys, then Jason fixing the roof of his stilt house while the boss calls up
to him from the yard. One scene, ten seconds, no montage.

The hook opens cold on that aerial shot with "VICE CITY IS BACK" on screen,
because the first two seconds decide whether a viewer stays. Then the clip
turns to the viewer: the last six seconds carry make.fun's pitch — "Make
clips like this with AI and earn money on make.fun" with the bounty page
`make.fun/bounty/gta6-clipper-01` — over a frozen, darkened frame of the
moment, long enough to read.

- File: `clip/gta6-clipper-01-vertical.mp4` — 1080x1920 vertical, 16 seconds
- Source: Rockstar's official GTA VI Trailer 2, fetched in-session and cut
  with ffmpeg (trim, blur-fill to 9:16, on-screen text, render)
- Title: **Welcome back to Vice City — GTA 6 is HERE**
- Tags: #GTA6 #Shorts

## The video is the entry

`VIDEO.json` holds the video's address as YouTube's Share button gives it:

    {"url": "https://www.youtube.com/shorts/<id>"}

The placeholder above is replaced with the real address once the clip is
uploaded public on YouTube. Its description carries, word for word:

    Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01

plus the play code `makefun-rug-corn-citadel` on its own line. Keep the video
public until the results are out.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`main.ts` copies `VIDEO.json` from this repository to `out/VIDEO.json` and
prints nothing on success. That is all the program has to do: the house
reads the video's views from YouTube itself.

## Before you submit

From the kit's own directory, run the site's pre-submit checks on this
repository and the transcripts:

    node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz

Never buy views or use bots, view services or any other fake viewing: an
entry whose views were bought or botted is disqualified.
