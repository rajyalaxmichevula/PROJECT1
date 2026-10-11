import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GitBranch,
  Play,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Visual Workflow Builder",
    description:
      "Design workflows with a simple visual interface and connect each step exactly how you need it.",
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description:
      "Run workflows reliably with real-time execution tracking and clear workflow status.",
  },
  {
    icon: BarChart3,
    title: "Powerful Monitoring",
    description:
      "Track executions, failures, system health, and workflow activity from one dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Keep your workflows and organization data protected with authentication and controlled access.",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Trigger",
    description: "Start your workflow",
  },
  {
    number: "02",
    title: "Process",
    description: "Execute your logic",
  },
  {
    number: "03",
    title: "Condition",
    description: "Evaluate the result",
  },
  {
    number: "04",
    title: "Action",
    description: "Complete the task",
  },
];

const WorkflowStepCard = ({ step, showArrow = false }) => {
  return (
    <div className="relative w-36 rounded-xl border border-white/10 bg-[#10243a] p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-medium text-blue-400">
          {step.number}
        </span>

        <CheckCircle2 size={14} className="text-emerald-400" />
      </div>

      <p className="text-sm font-semibold text-white">{step.title}</p>

      <p className="mt-1 text-[10px] leading-4 text-slate-500">
        {step.description}
      </p>

      {showArrow && (
        <ArrowRight
          size={14}
          className="absolute -right-9 top-1/2 -translate-y-1/2 text-blue-400"
        />
      )}
    </div>
  );
};

const WorkflowList = () => {
  return (
    <div className="space-y-3">
      {workflowSteps.map((step, index) => (
        <div key={step.number}>
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#10243a] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-xs font-semibold text-blue-400">
              {step.number}
            </div>

            <div>
              <p className="text-sm font-semibold">{step.title}</p>

              <p className="mt-0.5 text-xs text-slate-500">
                {step.description}
              </p>
            </div>

            <CheckCircle2 size={17} className="ml-auto text-emerald-400" />
          </div>

          {index < workflowSteps.length - 1 && (
            <div className="ml-9 h-3 w-px bg-blue-500/30" />
          )}
        </div>
      ))}
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#071525] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-2.5"
            aria-label="FlowForge home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <GitBranch size={20} strokeWidth={2.2} />
            </div>

            <span className="text-xl font-bold tracking-tight">FlowForge</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Workflow
            </a>

            <a
              href="#about"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/auth"
              className="hidden rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white sm:block"
            >
              Log in
            </a>

            <a
              href="/auth?mode=signup"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#071525]"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.18),transparent_45%)]" />

          <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Workflow automation made simple
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
                Build, Orchestrate
                <span className="block text-blue-500">
                  and Scale Your Workflows
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                FlowForge gives your team a powerful platform to design,
                execute, monitor, and manage workflows from one place.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/auth?mode=signup"
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  Start Building
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href="#workflow"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:w-auto"
                >
                  <Play size={16} fill="currentColor" />
                  See How It Works
                </a>
              </div>
            </div>

            <div className="relative mx-auto mt-16 max-w-6xl">
              <div className="absolute -inset-4 -z-0 rounded-3xl bg-blue-600/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1c30] shadow-2xl shadow-black/30">
                <div className="flex h-12 items-center gap-2 border-b border-white/10 bg-[#09192b] px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

                  <div className="ml-4 h-7 flex-1 rounded-md border border-white/5 bg-white/[0.03]" />
                </div>

                <div className="grid min-h-[360px] grid-cols-[170px_1fr]">
                  <div className="border-r border-white/10 bg-[#071525] p-4">
                    <div className="mb-6 flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md bg-blue-600" />
                      <span className="text-sm font-semibold">FlowForge</span>
                    </div>

                    <div className="space-y-2">
                      <div className="rounded-md bg-blue-600/20 px-3 py-2 text-xs text-blue-300">
                        Dashboard
                      </div>

                      <div className="rounded-md px-3 py-2 text-xs text-slate-500">
                        Workflows
                      </div>

                      <div className="rounded-md px-3 py-2 text-xs text-slate-500">
                        Executions
                      </div>

                      <div className="rounded-md px-3 py-2 text-xs text-slate-500">
                        Monitoring
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#0a192b] p-6">
                    <div className="mb-8">
                      <div className="text-xs text-slate-500">
                        Workflow Builder
                      </div>

                      <div className="mt-1 text-lg font-semibold">
                        Order Processing
                      </div>
                    </div>

                    <div className="relative flex h-56 items-center justify-center">
                      <div className="absolute left-[12%] right-[12%] top-1/2 h-px bg-blue-500/30" />

                      <div className="relative z-10 flex w-full max-w-3xl items-center justify-between gap-3">
                        {workflowSteps.map((step, index) => (
                          <WorkflowStepCard
                            key={step.number}
                            step={step}
                            showArrow={index < workflowSteps.length - 1}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-5 right-6 rounded-lg border border-emerald-400/10 bg-emerald-400/5 px-3 py-2">
                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Workflow Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-t border-white/10 bg-[#08192b]"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-400">
                EVERYTHING YOU NEED
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                One platform for your entire workflow
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-400">
                From building workflows to monitoring every execution, FlowForge
                keeps your automation process simple and transparent.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="rounded-xl border border-white/10 bg-[#0b1c30] p-6 transition hover:-translate-y-1 hover:border-blue-500/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-[#071525]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-blue-400">
                  SIMPLE WORKFLOW
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Turn complex processes into simple flows
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
                  Connect triggers, actions, conditions, and integrations into
                  workflows your team can understand and manage easily.
                </p>

                <a
                  href="/auth?mode=signup"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
                >
                  Create Your First Workflow
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0b1c30] p-5 sm:p-6">
                <WorkflowList />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-white/10 bg-[#08192b]">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-24">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build smarter workflows?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              Start building, executing, and monitoring your workflows with
              FlowForge.
            </p>

            <a
              href="/auth?mode=signup"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-700"
            >
              Get Started
              <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#071525]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 FlowForge. All rights reserved.</span>
          <span>Workflow automation platform</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
