import { useState } from 'react';
import type { ReactNode } from 'react';

type Tab = 'guide' | 'components' | 'templates';

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
        active
          ? 'border-pink-600 text-pink-600'
          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-pink-50 border-l-4 border-pink-600 p-4 rounded-r-lg">
      <p className="text-sm text-gray-700">{children}</p>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-l-4 border-pink-600 pl-5 mb-4">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm text-sm">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-5 py-3 text-left font-semibold text-gray-900 border-b">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`${i < rows.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-gray-700 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ color, children }: { color: string; children: ReactNode }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
    gray: 'bg-gray-100 text-gray-700',
  };
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${colors[color] ?? colors.gray}`}>{children}</span>;
}

function ContributorGuide() {
  return (
    <div className="space-y-10">
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 flex gap-3 items-start">
        <span className="text-amber-500 mt-0.5">⚠</span>
        <div className="text-sm text-amber-900">
          <strong>Draft for review</strong> — GEX-1232. This guide frames who contributes what to Mews Automations and which path each contribution takes. It does not repeat step-by-step instructions — it routes you to the right guide.
        </div>
      </div>

      <section className="space-y-4">
        <SectionHeading title="Who this is for" />
        <p className="text-gray-700 leading-relaxed">
          Mews Automations is built on the Automation Gateway (.NET API) and Appmixer (visual workflow engine). Several different people want to extend it, with very different skills. This guide names four contribution tiers so you can find your path quickly and so reviewers know what bar applies.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Reality check before you start" />
        <InfoBox>
          Only <strong>Tier 0</strong> is genuinely self-service today. Everything from Tier 1 upwards requires a commit to <code>MewsSystems/automation</code>, a <code>mews-globalization</code> PR, and an Octopus deploy. A solution architect without repo access and engineering support cannot complete Tier 1 to Tier 3 alone yet.
        </InfoBox>
      </section>

      <section className="space-y-4">
        <SectionHeading title="The four contribution tiers" />
        <Table
          headers={['Tier', 'What you produce', 'Who it is for', 'Where it lands', 'Approval']}
          rows={[
            [
              <div className="space-y-1"><Badge color="gray">T0</Badge><p className="font-medium mt-1">Build a flow for a customer</p></div>,
              'A live automation inside one enterprise',
              'Solution architects, onboarding, operators',
              'That enterprise only',
              'None — customer owned',
            ],
            [
              <div className="space-y-1"><Badge color="blue">T1</Badge><p className="font-medium mt-1">Publish a template</p></div>,
              'A reusable, pre-built flow visible to every enterprise in an environment',
              'SAs or PMs working with an engineer',
              'Repo, all enterprises per environment',
              'Code review + per-environment deploy approval',
            ],
            [
              <div className="space-y-1"><Badge color="orange">T2</Badge><p className="font-medium mt-1">Add a component to an existing connector</p></div>,
              'A new action, read, or trigger',
              'Engineers',
              'Repo, available to all flows',
              'Code review (UX and security gate proposed)',
            ],
            [
              <div className="space-y-1"><Badge color="purple">T3</Badge><p className="font-medium mt-1">Add a new connector</p></div>,
              'A new middle-level grouping in the stencil',
              'Engineers plus IA owner',
              'Repo, new branch of the stencil',
              'Code review + IA sign-off',
            ],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading title="Which path do I need?" subtitle="Work down this list and stop at the first match." />
        <ol className="space-y-4">
          {[
            { q: 'Does the automation only need to exist for one customer?', a: 'Yes → Tier 0, build it in the designer. No → continue.' },
            { q: 'Check the catalogue first. Do existing components do everything the flow needs?', a: 'Yes → Tier 1, publish a template. No, a capability is missing → continue.' },
            { q: 'Does an existing connector cover the domain of the missing capability?', a: 'Yes → Tier 2, add a component to that connector. No → Tier 3, add a new connector.' },
            { q: 'Is it a trigger on an event that is not dispatched yet?', a: 'Tier 2 or Tier 3 plus event wiring. Subscribing to an existing event type is small; introducing a brand-new event source is larger and may depend on the Business Events initiative.' },
          ].map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{item.q}</p>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            </li>
          ))}
        </ol>
        <InfoBox>
          <strong>Bias towards reuse.</strong> Add a new connector only when no existing one fits the domain, and add a new component only when no existing one does the job. Over-creating connectors fragments the stencil and the catalogue.
        </InfoBox>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Guides" />
        <Table
          headers={['You are doing', 'Read']}
          rows={[
            ['Tier 2 or Tier 3 — component or connector', 'Adding a Connector or Component to Mews Automations (see next tab)'],
            ['Tier 1 — template', 'Adding an Automation Template to Mews Automations (see third tab)'],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading title="Governance and quality bar" subtitle="Proposed — not yet agreed." />
        <div className="space-y-3">
          {[
            { label: 'Approvers', body: 'Code review is enforced for all repo changes. There is no named approver, UX sign-off, or security review beyond that. Proposed: the automation-hub team owns connector and template approval after the handoff.' },
            { label: 'Quality bar (definition of done)', body: 'Beyond "tests pass", a contribution should: cover error and empty states, follow the naming and verb rules, pass IDs through on outputs, and ship complete localization keys. This is not enforced anywhere yet.' },
            { label: 'Security and least privilege', body: 'Components that write through the Connector API, and templates that run as the enterprise shared virtual user, should pass a security checkpoint before release. No such step exists today.' },
            { label: 'Lifecycle', body: 'There is no versioning, deprecation, or breaking-change policy for components or templates already embedded in live customer flows, beyond prevent_destroy on template resources.' },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Open decisions" />
        <div className="space-y-2">
          {[
            'Registry ownership after the post-Unfold handoff: who approves connectors, who approves templates, who keeps the catalogue current. Proposed: automation-hub team. Confirm.',
            'A quality gate beyond automated tests (naming, copy, states, localization) and who owns it.',
            'A security and least-privilege review for write components and new scopes, and who owns it.',
            'A versioning, deprecation, and breaking-change policy for published components and templates.',
            'Whether to build a lower-friction template-publishing path so Tier 1 does not require the full IaC and deploy loop.',
            'Success metrics for the platform: contributions by non-core teams, time to publish, share of additions that needed no core-team help.',
          ].map((item, i) => (
            <div key={i} className="flex gap-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <span className="flex-shrink-0 text-gray-400 font-mono">{i + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <code className="bg-gray-100 text-pink-700 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre-wrap">
      {children}
    </pre>
  );
}

function AddingComponentsGuide() {
  return (
    <div className="space-y-10">
      <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">
          This guide describes how to add a new connector or component to Mews Automations end to end, so that a developer unfamiliar with the codebase can do it without help. It covers the required code structure and interfaces, how a component's inputs and outputs map to variables on the canvas, the backend wiring, naming and UX-copy rules, localization, and how to test on the canvas before release.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Overview" />
        <p className="text-gray-700 leading-relaxed">
          A user-facing component usually spans two layers, both in the <Code>MewsSystems/automation</Code> repo:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <Badge color="blue">Layer 1</Badge>
              <span className="font-semibold text-gray-900">Gateway endpoint</span>
            </div>
            <p className="text-sm text-gray-600">The logic. A .NET vertical-slice handler under <Code>src/AutomationGateway.Api/DataComponents/{'{Domain}'}/'</Code>. Reads from the Mews monolith database or performs writes through the Mews Connector API.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <Badge color="purple">Layer 2</Badge>
              <span className="font-semibold text-gray-900">Appmixer component</span>
            </div>
            <p className="text-sm text-gray-600">The canvas wrapper under <Code>appmixer/mews/automation/{'{connectorModule}/{Component}'}/'</Code>. Calls the Gateway endpoint.</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Three kinds of change:</p>
          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside ml-2">
            <li><strong>New action or read component</strong> inside an existing connector — needs both layers (Parts A and B)</li>
            <li><strong>New trigger component</strong> — uses the shared webhook trigger helper plus event wiring; no new Gateway handler needed</li>
            <li><strong>New connector</strong> — a new connector module that holds components</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Part A — The Gateway endpoint" />

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Location and registration</h4>
            <p className="text-sm text-gray-700 mb-3">Create one file per feature at <Code>src/AutomationGateway.Api/DataComponents/{'{Domain}/{Action}'}.cs</Code>. Existing domains: <Code>Guests</Code>, <Code>Departments</Code>, <Code>Loyalty</Code>, <Code>Messaging</Code>, <Code>Occupancy</Code>, <Code>Products</Code>, <Code>Rates</Code>, <Code>Reservations</Code>, <Code>Services</Code> (plus <Code>Common</Code> and <Code>Webhooks</Code>).</p>
            <p className="text-sm text-gray-700">The class implements <Code>IDataComponentEndpoint</Code>. Endpoints are auto-discovered by assembly scan and mapped under the <Code>/data-components/</Code> route prefix. Adding a handler class is all that's needed — there's no per-endpoint route registration.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Read endpoint (query the monolith database)</h4>
            <p className="text-sm text-gray-700 mb-3">Implement <Code>IDataComponentEndpoint</Code> and <Code>IHandler&lt;Query&gt;</Code>, and dispatch the query through <Code>IMediator</Code>. Reference: <Code>DataComponents/Departments/GetAllDepartments.cs</Code>.</p>
            <p className="text-sm font-semibold text-gray-700 mb-2">Rules for read handlers:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside ml-2 space-y-1">
              <li><Code>HandleAsync</Code> is <Code>static</Code>; dependencies come in as method parameters</li>
              <li>The request type is nested in the handler</li>
              <li>Always start from <Code>db.{'{Entity}'}.Active</Code> (excludes soft-deleted rows) and scope by <Code>EnterpriseId</Code></li>
              <li>Project into a response record (<Code>SelectItem(value, label)</Code> for dropdowns)</li>
              <li>For slow-changing reference data, add <Code>.CacheOutput(CachePolicyName.X.ToString())</Code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Write endpoint (action via the Connector API)</h4>
            <p className="text-sm text-gray-700 mb-3">Writes go through the Mews Connector API using a Refit-generated typed client (<Code>AddConnectorApi()</Code> in <Code>DependencyInjection.cs</Code>), never direct SQL. Validate, build the request, call the client, return <Code>Result&lt;T&gt;</Code>, and <Code>.Match</Code> it. Reference: <Code>DataComponents/Reservations/CreateTask.cs</Code>.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Conventions</h4>
            <Table
              headers={['Convention', 'Rule']}
              rows={[
                ['Naming', 'Handler: {Action}Handler. Request: {Action}Request. Tag = domain plural.'],
                ['Error handling', 'Return Result<T> for expected failures — do not throw. No repository layer.'],
                ['Style', 'File header: // Copyright (c) Mews. All rights reserved. File-scoped namespaces. Max line length 140.'],
                ['Packages', 'NuGet versions only in Directory.Packages.props, never in individual .csproj files.'],
                ['Architecture tests', 'Run dotnet test --filter "Type=Architecture" after structural changes.'],
              ]}
            />
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Gateway tests</h4>
            <ul className="text-sm text-gray-700 list-disc list-inside ml-2 space-y-1">
              <li><strong>Integration (required for reads):</strong> <Code>tests/Automation.Tests/Integration/MonolithDb/{'{Domain}'}/'</Code>. Inherit <Code>IntegrationTestWithMonolithDbConnection</Code>, tag with <Code>[Trait("Type","Integration")]</Code>, seed entities with <Code>SaveToDb(...)</Code>, assert with Shouldly.</li>
              <li><strong>Unit:</strong> add one if <Code>HandleAsync</Code> has non-trivial logic.</li>
              <li><strong>Architecture:</strong> <Code>dotnet test --filter "Type=Architecture"</Code> must pass.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Part B — The Appmixer component" />

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Directory layout</h4>
            <CodeBlock>{`appmixer/mews/automation/{connectorModule}/{ComponentName}/
   ├── component.json        # manifest: ports, properties, inspector, localization
   ├── {ComponentName}.js    # behaviour (runtime)
   ├── transformers.js       # optional: shape dropdown/source data
   └── {ComponentName}.test.ts`}</CodeBlock>
            <p className="text-sm text-gray-600 mt-2">
              <Code>{'{connectorModule}'}</Code> is one of: <Code>reservations</Code>, <Code>guestsAndCompanies</Code>, <Code>spacesRatesAndOccupancy</Code>, <Code>billingAndProducts</Code>, <Code>messaging</Code>, <Code>propertyConfiguration</Code>. Fully-qualified name: <Code>mews.automation.{'{connectorModule}.{ComponentName}'}</Code>.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Adding a new connector</h4>
            <p className="text-sm text-gray-700 mb-2">Create a new folder <Code>appmixer/mews/automation/{'{newConnector}'}/'</Code> with a <Code>module.json</Code> (copy an existing one) and set: <Code>name</Code>, <Code>label</Code>, <Code>category: "mews"</Code>, <Code>categoryIndex</Code>, <Code>index</Code>, <Code>description</Code>, <Code>icon</Code> (base64 SVG), and <Code>localization</Code>.</p>
            <InfoBox>Confirm the connector name and placement against the Stencil IA mapping before adding a new connector.</InfoBox>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Inputs (inPorts) and outputs (outPorts)</h4>
            <p className="text-sm text-gray-700 mb-2">Inspector input types: <Code>text</Code>, <Code>textarea</Code>, <Code>number</Code>, <Code>toggle</Code>, <Code>select</Code>, <Code>multiselect</Code>, <Code>date-time</Code>, <Code>key-value</Code>, <Code>expression</Code>. Each input supports <Code>label</Code>, <Code>tooltip</Code>, <Code>index</Code>, <Code>required</Code>, <Code>defaultValue</Code>, <Code>when</Code> (conditional visibility). Do not use <Code>.</Code> or <Code>/</Code> in field names.</p>
            <p className="text-sm text-gray-700">OutPorts define the variables available downstream. A component can have multiple out-ports (e.g., <Code>out</Code> and <Code>cooldown</Code>, or <Code>upgraded</Code> and <Code>failed</Code>). The out-port options must match the JSON the behaviour emits via <Code>sendJson</Code>.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Behaviour JS — calling the Gateway</h4>
            <CodeBlock>{`const client = require('../../gatewayClient');

module.exports = {
    async receive(context) {
        const { name, deadline, departmentId } = context.messages.in.content;
        const params = {
            name,
            deadline: this.normalizeDeadline(deadline),
            departmentId: client.normalizeOptionalValue(departmentId),
        };
        await client.post(context, 'reservations/CreateTask', params, { cooldown: true, out: true });
    }
};`}</CodeBlock>
            <p className="text-sm text-gray-600 mt-2"><Code>gatewayClient</Code> builds the URL from env-prefixed config and sets Authorization, X-Client-Id, and X-Client-Secret headers. The bearer key is auto-generated per enterprise, so the flow author never enters it.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Triggers</h4>
            <p className="text-sm text-gray-700 mb-3">A trigger is a webhook component with no <Code>inPorts</Code>. Use the shared helper:</p>
            <CodeBlock>{`const { createWebhookTrigger } = require('../../webhookTrigger');
module.exports = createWebhookTrigger({ eventType: 'trigger.reservation.created' });`}</CodeBlock>
            <p className="text-sm text-gray-700 mt-3">Adding a brand-new trigger event type spans three places:</p>
            <ol className="text-sm text-gray-700 list-decimal list-inside ml-2 space-y-1 mt-2">
              <li>Register the event type in <Code>TriggerEventTypes</Code></li>
              <li>Produce and dispatch the event — a worker resolver under <Code>src/Automation.Worker/IntegrationEvents/Resolvers/</Code></li>
              <li>Add the Appmixer trigger component</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Naming and UX copy" />
        <Table
          headers={['Rule', 'Detail']}
          rows={[
            ['Title pattern', '[Verb] + [hotel concept], two to three words, imperative.'],
            ['Allowed verbs only', 'Add, Block, Cancel, Check, Close, Create, Get, Release, Send, Update, Upgrade. Do NOT use Find, Change, Edit, Modify, or Assign.'],
            ['Hotel language', 'Room not Resource, Guest not Customer.'],
            ['Active title, passive description', 'Title "Get Guest Profiles"; description "Guest profiles … are retrieved."'],
            ['Pass through IDs', 'Outputs should include entity IDs (reservationId, customerId) so downstream components do not re-fetch.'],
            ['IA placement', 'Category Mews → connector → component, exactly three levels.'],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading title="Localization" />
        <ol className="text-sm text-gray-700 list-decimal list-inside ml-2 space-y-2">
          <li>Add <Code>propPath → key</Code> entries under <Code>localization.keys</Code> in <Code>component.json</Code> (and <Code>module.json</Code> for a new connector).</li>
          <li>Land a PR in <Code>mews-globalization</Code> adding the keys with <Code>en_US</Code> strings to <Code>localization/values/en_US/nonB2c.json</Code>.</li>
          <li>Run <Code>bun run sync-localizations</Code> (from <Code>appmixer/</Code>) and commit the manifest diff.</li>
        </ol>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Testing" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">Gateway</p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li><Code>dotnet test --filter "Type!=E2E"</Code> — unit and integration</li>
              <li><Code>dotnet test --filter "Type=Architecture"</Code></li>
              <li><Code>dotnet test tests/Automation.Tests.E2E</Code> — live API</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">Appmixer</p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li><Code>bun run test</Code> (from <Code>appmixer/</Code>)</li>
              <li><Code>bun run typecheck</Code></li>
              <li><Code>bun run deploy-preview</Code> for canvas testing</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Release" />
        <Table
          headers={['Command', 'Effect']}
          rows={[
            ['bun run pack', 'Build mews.automation.zip'],
            ['bun run publish', 'Upload an already-packed zip to the configured instance'],
            ['bun run deploy', 'pack then publish'],
            ['bun run deploy-preview', 'Same, but the preview bundle (safe canvas testing)'],
          ]}
        />
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
          <strong>Caution:</strong> <Code>publish</Code> and <Code>deploy</Code> (non-preview) deploy directly to the live Appmixer library — production, with no staging gate. Ensure tests pass, review the diff, coordinate breaking changes, and confirm the instance. Never publish from an unreviewed branch.
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="End-to-end checklist" />
        <div className="space-y-2">
          {[
            'Gateway endpoint — DataComponents/{Domain}/{Action}.cs, implement IDataComponentEndpoint. Map /{domain}/{Action} with tag, name, summary, Produces<T>.',
            'Entity (reads) — map the table in Monolith/Data/Entities/ if missing; query via .Active.',
            'Logic — reads: static HandleAsync(Query, MonolithDb, ct) via IMediator.InvokeAsync. Writes: Refit Connector client, Result<T>, .Match.',
            'Validator, cooldown, cache as needed.',
            'Gateway tests — integration (required) and architecture; dotnet test.',
            'Appmixer component — folder under appmixer/mews/automation/{connectorModule}/{Component}/ with component.json (inPorts/outPorts/properties/localization) and {Component}.js.',
            'New connector (only if needed) — new {connectorModule}/module.json; confirm IA placement.',
            'Trigger (only if a trigger) — webhook: true, no inPorts, behaviour createWebhookTrigger({ eventType }); register event type and add worker resolver.',
            'Naming and copy — verb rules, hotel language, IDs in outputs, passive descriptions.',
            'Localization — manifest keys plus mews-globalization, then bun run sync-localizations.',
            'Validate — bun run test and typecheck; canvas test via bun run deploy-preview.',
            'Release — merge Gateway PR (CI/Octopus); bun run deploy for the component (production — review first).',
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-white border border-gray-200 rounded-lg px-4 py-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AddingTemplatesGuide() {
  return (
    <div className="space-y-10">
      <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">
          Templates are infrastructure-as-code: each one is a Terraform <Code>appmixer_flow</Code> resource in the <Code>MewsSystems/automation</Code> repo, with the flow graph committed as JSON and the custom fields set declaratively. Deploying the stack to an environment publishes the template there. There is no manual "build it in the Appmixer UI and tag it by hand" step.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="font-semibold">Repos involved:</span>
          <Code>MewsSystems/automation</Code>
          <Code>MewsSystems/automation-hub</Code>
          <Code>MewsSystems/mews-globalization</Code>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="What makes a flow a template" />
        <Table
          headers={['Custom field', 'Value', 'Role']}
          rows={[
            ['mews-template', 'true', 'Required for a flow to be treated as a template.'],
            ['mews-env', 'dev, demo, or prod', 'The single environment the template is visible in. Set from var.stack_env at deploy time.'],
            ['mews-template-name', 'mews-globalization text key', 'Localized name; falls back to the raw flow name.'],
            ['mews-template-description', 'mews-globalization text key', 'Localized description.'],
            ['mews-template-icon', 'icon name', 'Must resolve to a valid @optimus-web/core IconName.'],
          ]}
        />
        <InfoBox>
          Visibility: template listing is gated by two things — the <Code>appmixerHubEnabled</Code> feature flag (enterprise/feature level) and the caller being an admin or holding the <Code>Workflows.View</Code> permission (user/role level).
        </InfoBox>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Where templates live" />
        <CodeBlock>{`infra/Automation.Infrastructure/automation-shared/appmixer/
├── main.flow.tf            # one appmixer_flow resource per template
├── main.acl.tf             # global Appmixer ACL
├── variables.tf            # stack_env (dev/test/demo/prod)
└── flows/
    ├── room_upgrade_template.json
    └── amenity_gift_template.json`}</CodeBlock>
        <p className="text-sm text-gray-600">The Terraform resource points <Code>flow_json</Code> at the committed <Code>flows/*.json</Code> descriptor, sets <Code>custom_fields</Code> and <Code>shared_with</Code> declaratively, and includes <Code>lifecycle {'{ prevent_destroy = true }'}</Code>.</p>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Step-by-step" />
        <div className="space-y-4">
          {[
            {
              title: '1. Author the flow graph and commit it as JSON',
              body: (
                <div className="space-y-2 text-sm text-gray-700">
                  <p>You do not hand-write the graph — you build it in Appmixer and copy the JSON out:</p>
                  <ol className="list-decimal list-inside ml-2 space-y-1">
                    <li>Build and test the flow in the Appmixer designer (staging) until it works.</li>
                    <li>In the Appmixer web app, open <strong>admin section → Flows</strong>. Find your flow and copy the flow graph JSON from the last column.</li>
                    <li>Save it as <Code>flows/{'<name>'}_template.json</Code> and commit it.</li>
                  </ol>
                </div>
              ),
            },
            {
              title: '2. Add name and description text keys to mews-globalization',
              body: (
                <div className="space-y-2 text-sm text-gray-700">
                  <p><Code>mews-template-name</Code> and <Code>mews-template-description</Code> are text keys resolved by the BFF. Add the keys with <Code>en_US</Code> strings to <Code>localization/values/en_US/nonB2c.json</Code> in <Code>mews-globalization</Code> and merge the PR. Use the exact key strings in the Terraform custom fields in step 3.</p>
                </div>
              ),
            },
            {
              title: '3. Declare the appmixer_flow resource',
              body: (
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Add a resource in <Code>main.flow.tf</Code> that:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Points <Code>flow_json</Code> at your committed <Code>flows/{'<name>'}_template.json</Code></li>
                    <li>Sets <Code>custom_fields</Code>: <Code>mews-template = true</Code>, <Code>mews-env = var.stack_env</Code>, name/description text keys, icon</li>
                    <li>Sets <Code>shared_with = [{'{ permissions = ["read"], scope = "templates" }'}]</Code></li>
                    <li>Keeps <Code>lifecycle {'{ prevent_destroy = true }'}</Code></li>
                  </ul>
                  <InfoBox><Code>mews-env = var.stack_env</Code> means you do not choose dev/demo/prod per resource — the same definition becomes a dev template when deployed to dev and a prod template when deployed to prod.</InfoBox>
                </div>
              ),
            },
            {
              title: '4. Open the PR and review the Terraform plan',
              body: (
                <div className="text-sm text-gray-700">
                  <p>On a PR that touches <Code>automation-shared</Code>, the <Code>Terraform - Plan Shared</Code> workflow runs <Code>terraform plan</Code> for every environment (dev, test, demo, prod) and posts the diff. Review that plan — it shows exactly what will be created or changed before anything is applied. Get the PR reviewed and merge.</p>
                </div>
              ),
            },
            {
              title: '5. Release the automation-shared stack',
              body: (
                <div className="text-sm text-gray-700">
                  <p>On merge to <Code>main</Code>, the <Code>Terraform - Release Shared</Code> workflow releases the stack through Octopus, where each environment's apply is gated (dev → demo → prod). Applying to an environment sets <Code>stack_env</Code> (so <Code>mews-env</Code>) accordingly.</p>
                </div>
              ),
            },
            {
              title: '6. Validate in Commander',
              body: (
                <div className="text-sm text-gray-700">
                  <p>After the stack is applied, the template appears provided two gates pass: the <Code>appmixerHubEnabled</Code> feature flag is on, and the viewing user is an admin or holds the <Code>Workflows.View</Code> permission. The name is clamped to 2 lines and description to 3 lines. Open Commander and confirm it appears correctly.</p>
                </div>
              ),
            },
            {
              title: '7. Review, approval, and production',
              body: (
                <div className="text-sm text-gray-700 space-y-2">
                  <p>The review and approval process is the standard code-and-deploy path — there is no separate Appmixer-side approval step:</p>
                  <ol className="list-decimal list-inside ml-2 space-y-1">
                    <li><strong>Code review.</strong> A reviewer approves the Terraform and flow change before merge (the Terraform plan from step 4 is part of that review).</li>
                    <li><strong>Environment deploy approval.</strong> Releasing to each environment is gated by the normal Octopus deployment approval. <Code>prevent_destroy</Code> protects deployed flows from accidental deletion.</li>
                  </ol>
                </div>
              ),
            },
            {
              title: '8. Editing a live demo template safely',
              body: (
                <div className="text-sm text-gray-700">
                  <p>Because demo is customer-facing, avoid disruptive in-place edits: clone the template, set the clone's <Code>mews-env</Code> to <Code>dev</Code> so it leaves demo, make and test changes, then set <Code>mews-env</Code> back to <Code>demo</Code>.</p>
                </div>
              ),
            },
          ].map((step, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                <p className="font-semibold text-gray-900">{step.title}</p>
              </div>
              <div className="px-5 py-4">{step.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Quick checklist" />
        <div className="space-y-2">
          {[
            'Build the flow in the Appmixer designer; copy its JSON from admin → Flows (last column) and commit flows/<name>_template.json.',
            'Add the name and description text keys to mews-globalization (en_US/nonB2c.json) and merge.',
            'Add an appmixer_flow resource in main.flow.tf: flow_json, custom_fields (mews-template, mews-env = var.stack_env, name/description/icon), shared_with templates scope, prevent_destroy.',
            'Open the PR; review the auto-generated Terraform plan and get the PR reviewed; merge.',
            'On merge, the stack releases via Octopus — approve the deploy per environment (dev → demo → prod).',
            'Validate in Commander (the appmixerHubEnabled feature flag must be on, and the viewing user admin or holding Workflows.View).',
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-white border border-gray-200 rounded-lg px-4 py-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Gaps and open questions" />
        <div className="space-y-2">
          {[
            'Content/UX quality gate — there is no template-specific quality sign-off (copy, flow correctness) beyond standard PR review. Decide whether one is needed and who owns it.',
            'Feature-flag / permission ownership — the appmixerHubEnabled feature flag and Workflows.View are defined and resolved in the central Mews authorization system, not in these repos. Confirm whether the flag is tied to a commercial package.',
            'Icon source of truth — code requires a valid @optimus-web/core IconName; cross-check the Mews Design System Storybook list so authors do not pick an icon Commander will drop.',
            'Appmixer propagation latency — there is no BFF cache, so the BFF side is immediate; Appmixer\'s own indexing latency after a deploy is external.',
          ].map((item, i) => (
            <div key={i} className="flex gap-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <span className="flex-shrink-0 text-gray-400 font-mono">{i + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ExtendingSection() {
  const [activeTab, setActiveTab] = useState<Tab>('guide');

  return (
    <>
      {/* Intro */}
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          This section covers how different roles can extend Mews Automations — from building a one-off flow for a customer, to publishing a reusable template, to contributing new components or connectors to the platform.
        </p>
        <p className="text-gray-600 text-sm">
          Select a guide below based on what you want to build. Each tab covers a different contribution path.
        </p>
      </section>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <TabButton active={activeTab === 'guide'} onClick={() => setActiveTab('guide')}>
            Contributor Guide
          </TabButton>
          <TabButton active={activeTab === 'components'} onClick={() => setActiveTab('components')}>
            Adding Components &amp; Connectors
          </TabButton>
          <TabButton active={activeTab === 'templates'} onClick={() => setActiveTab('templates')}>
            Adding Templates
          </TabButton>
        </div>
      </div>

      {/* Tab content */}
      <div className="space-y-8">
        {activeTab === 'guide' && <ContributorGuide />}
        {activeTab === 'components' && <AddingComponentsGuide />}
        {activeTab === 'templates' && <AddingTemplatesGuide />}
      </div>
    </>
  );
}
