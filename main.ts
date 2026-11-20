// gta6-clipper-01 — the video is the entry.
//
// This program hands the house the video's address: it reads VIDEO.json
// from this repository, checks it really names one YouTube video, and
// copies it into the output directory, where the gate reads it. Nothing
// the program writes about the video is scored — the house reads the
// video itself through the YouTube Data API and ranks it by views.
//
// The clip (clip/gta6-clipper-01-vertical.mp4) was cut in-session from
// Rockstar's official GTA VI Trailer 2: the opening scene of Leonida —
// Jason fixing the roof of his stilt house while the boss calls up to
// him — trimmed to its first 10 seconds, cropped to vertical 9:16, with
// "VICE CITY IS BACK" over the hook and make.fun's pitch on screen at
// the end. It is uploaded to YouTube by hand as a public Short, and
// VIDEO.json is then pointed at its address.
//
// Node 22, standard library only. No network, no wall clock, no files
// outside this repository, and repeated runs write the same bytes.
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const LINK_FILE = 'VIDEO.json';

// A YouTube video id is exactly 11 characters from [A-Za-z0-9_-];
// anything shorter or longer is not a video id, so reject it outright.
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

function loadVideoUrl(): string {
  const path = join(BOT_DIR, LINK_FILE);
  if (!existsSync(path)) {
    throw new Error(`${LINK_FILE} is missing from ${BOT_DIR}`);
  }
  const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error(`${LINK_FILE} must be a JSON object`);
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error(`${LINK_FILE} must hold a string url`);
  }
  return url;
}

// Pull the 11-character video id out of a Shorts, watch, or youtu.be URL.
// Returns null when the URL is not in one of those shapes.
function extractVideoId(url: string): string | null {
  const match = url.match(
    /^(?:https:\/\/(?:www\.|m\.)?youtube\.com\/(?:shorts\/|watch\?v=)|https:\/\/youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#].*)?$/,
  );
  return match === null ? null : match[1];
}

const url = loadVideoUrl();
const videoId = extractVideoId(url);
if (videoId === null || !VIDEO_ID_PATTERN.test(videoId)) {
  throw new Error(`${LINK_FILE} does not name a YouTube video: ${url}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, LINK_FILE), join(OUTPUT_DIR, LINK_FILE));
console.log(`wrote ${join(OUTPUT_DIR, LINK_FILE)} (video ${videoId})`);
