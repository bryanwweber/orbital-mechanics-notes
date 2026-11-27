import { spawnSync } from "node:child_process";

const projectRoot = new URL("../", import.meta.url);
const githubFile = /^(https:\/\/github\.com\/[^/]+\/[^/]+\/blob\/)([^/]+)\/(.+)$/;

export const plugin = {
	name: "GitHub source permalinks",
	roles: [
		{
			name: "github-source",
			body: { type: String, required: true },
			run({ body }) {
				const match = githubFile.exec(body);
				if (!match) throw new Error("github-source requires a GitHub blob URL");
				const [, base, fallbackRef, path] = match;

				// PR previews build a detached checkout that may differ from GITHUB_SHA.
				const { status, stdout } = spawnSync("git", ["rev-parse", "--verify", "HEAD"], {
					cwd: projectRoot,
					encoding: "utf8",
				});
				const ref = status === 0 ? stdout.trim() : fallbackRef;
				return [
					{
						type: "link",
						url: `${base}${ref}/${path}`,
						children: [{ type: "inlineCode", value: path }],
					},
				];
			},
		},
	],
};
