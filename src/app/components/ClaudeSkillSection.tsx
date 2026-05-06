export function ClaudeSkillSection() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const skillUrl = `${base}/mews-automations.skill`;

  return (
    <>
      {/* What is this skill */}
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          The <strong>Mews Automations Claude Skill</strong> is an AI assistant you can install directly into Claude Code. Once installed, it gives Claude deep knowledge of how Mews Automations work — components, triggers, variables, templates, and best practices — so you can get expert help right in your editor without leaving the flow designer.
        </p>
        <p className="text-gray-700 leading-relaxed">
          It is the fastest way to get answers, troubleshoot automations, and build new flows without having to search through documentation manually.
        </p>
      </section>

      {/* What it does */}
      <section>
        <h2 id="skill-what-it-does" className="text-2xl font-bold text-gray-900 mb-4">What it does</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636-6.364l.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M12 21v-1" />
                </svg>
              ),
              title: 'Component guidance',
              desc: 'Explains every trigger and action — inputs, outputs, required fields, and how to chain them together.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h8" />
                </svg>
              ),
              title: 'Flow design',
              desc: 'Helps you design automation flows step by step, from choosing the right trigger to structuring conditions and loops.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Troubleshooting',
              desc: 'Diagnoses why an automation is not triggering, failing, or producing unexpected results based on the Action Log.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: 'Template walkthroughs',
              desc: 'Walks you through available templates and explains how to customise them for your property.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              ),
              title: 'Variable & modifier help',
              desc: 'Shows you exactly which variables are available at each step and how to apply modifiers to format them.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'Best practices',
              desc: 'Applies Mews Automations best practices automatically so your flows are reliable, efficient, and maintainable.',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-5 border border-gray-200 rounded-lg bg-white">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section>
        <h2 id="skill-download" className="text-2xl font-bold text-gray-900 mb-4">Download the skill</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* File card */}
          <div className="flex items-center gap-4 p-6 bg-gray-50 border-b border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636-6.364l.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M12 21v-1" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">mews-automations.skill</p>
              <p className="text-sm text-gray-500">Claude Code Skill · ~26 KB</p>
            </div>
            <a
              href={skillUrl}
              download="mews-automations.skill"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>

          {/* Install instructions */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">How to install</h3>
            <ol className="space-y-3">
              {[
                'Download the file above.',
                <>Open <strong>Claude Code</strong> in your terminal.</>,
                <>Run <code className="bg-gray-100 text-pink-700 px-1.5 py-0.5 rounded text-sm font-mono">/skills install mews-automations.skill</code> and select the downloaded file when prompted.</>,
                <>Once installed, type <code className="bg-gray-100 text-pink-700 px-1.5 py-0.5 rounded text-sm font-mono">/mews-automations</code> in any Claude Code session to activate it.</>,
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section>
        <h2 id="skill-requirements" className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-2">
          {[
            ['Claude Code', 'Version 1.0 or later'],
            ['Access', 'Mews Automations must be enabled on your property'],
            ['Plan', 'Any Claude plan that includes Claude Code'],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2 text-sm">
              <span className="text-gray-500 w-28 flex-shrink-0">{label}</span>
              <span className="text-gray-900 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
