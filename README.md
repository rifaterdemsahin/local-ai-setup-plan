# local-ai-setup-plan

A decision dashboard for one question: should AI workloads move from cloud subscriptions and the DeepInfra API to a self-hosted 7-GPU WRX80 rig (112GB VRAM) in a storage unit that costs £450/mo and has free electricity?

## 🔗 Links

| What | Link |
|---|---|
| **Live dashboard + calculator** | https://rifaterdemsahin.github.io/local-ai-setup-plan/ |
| Jump straight to the calculator | https://rifaterdemsahin.github.io/local-ai-setup-plan/#calculator |
| 📅 Calendar (monthly reviews, gates, .ics export) | https://rifaterdemsahin.github.io/local-ai-setup-plan/calendar.html |
| Repository | https://github.com/rifaterdemsahin/local-ai-setup-plan |
| Deploy runs (GitHub Actions) | https://github.com/rifaterdemsahin/local-ai-setup-plan/actions |
| Pages settings | https://github.com/rifaterdemsahin/local-ai-setup-plan/settings/pages |
| Infographic: Cloud spend vs local break-even | [Gemini_Generated_Image_g08i9pg08i9pg08i.png](Gemini_Generated_Image_g08i9pg08i9pg08i.png) |
| Infographic: 7-GPU rig vs DeepInfra DeepSeek | [Gemini_Generated_Image_5onljx5onljx5onl.png](Gemini_Generated_Image_5onljx5onljx5onl.png) |
| DeepInfra pricing (to update the £/M rate) | https://deepinfra.com/pricing |
| DeepInfra usage dashboard (to read your monthly token volume) | https://deepinfra.com/dash/usage |
| AMD ROCm docs (RX 6800/6900 support) | https://rocm.docs.amd.com/ |
| llama.cpp (local inference) | https://github.com/ggml-org/llama.cpp |
| Ollama (local model runner) | https://ollama.com/ |

## 🎯 Objective & Key Results

**Objective:** Move AI workloads from cloud to a self-hosted 7-GPU rig, but only once the numbers pay for it.

- **KR1 – Volume:** Reach ≥1.3B tokens/mo (DeepSeek V3) or ≥620M (R1), sustained for 3 months. In Year 1, with hardware included, the targets are 1.95B / 930M.
- **KR2 – Revenue:** Sign 2 local businesses at £225/mo each for private email bots. That's £450/mo, which covers the rent.
- **KR3 – Cost discipline:** Keep cloud spend ≤ £73/mo and rent nothing until KR1 or KR2 is met.
- **KR4 – Capacity:** Get local pipelines running on 1 GPU by Q1 2027, then scale to 112GB VRAM within the £2,720 Year-1 hardware budget.

## ⏱ When to act

Use the calculator each month with your real token volume:

| Calculator says | Meaning | Do |
|---|---|---|
| ⏸ **WAIT** (<50%) | Cloud is cheaper | Stay on subs + API. Build bots at home on the 6900 XT. Don't rent. |
| 🛠 **PREPARE** (50–99%) | Getting close | Buy the next GPUs, talk to clients, get storage quotes. |
| 🚀 **ACT** (≥100%) | Local is cheaper | Rent the unit **if** you have been above break-even for 3 consecutive months, **or** as soon as 2 clients have signed. |

**Today:** about 20M tokens/mo against a break-even of about 1.3B, which is roughly 65× short. **Verdict: WAIT.** Client revenue is the fastest way to reach ACT.

## 📁 Files

- `index.html`: dashboard, OKRs, calculator, UML state and deployment diagrams, break-even chart
- `calendar.html`: month grid, milestones, Gantt roadmap, monthly-review activity diagram, client sequence diagram
- `nav.js`: shared menu injected on every page

## 🚀 Deploy

Every push to `main` deploys to GitHub Pages through `.github/workflows/static.yml`.
