# 01: Repo hygiene

**What to build:** The repo stops tracking generated and machine files, so later dependency installs and builds don't produce huge noisy diffs. This lands as its own commit, separate from the redesign.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] A `.gitignore` ignores `node_modules`, `dist`, `.DS_Store` and `.env*`
- [x] `node_modules` and every `.DS_Store` are removed from the git index (the files stay on disk)
- [x] The stray duplicate `esbuild 2` binary is deleted
- [x] `npm install && npm run build` still succeeds, and `git status` is clean afterwards
