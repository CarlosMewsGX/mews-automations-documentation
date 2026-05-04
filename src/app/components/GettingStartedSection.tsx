function Screenshot({ file, alt }: { file: string; alt: string }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <img
        src={`${base}/screenshots/${file}`}
        alt={alt}
        className="w-full"
        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
      />
    </div>
  );
}

export function GettingStartedSection() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          Mews Automations allow you to build no-code workflows that react to events in your property
          and perform actions automatically — saving your team time and ensuring nothing falls through
          the cracks. Think of it as your personal assistant that watches for things happening in Mews
          and takes action on your behalf, 24/7.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          Whether you want to automatically upgrade rooms for loyal guests, send a welcome SMS, assign
          tasks to your team, or add products to reservations — Automations make it possible without
          writing a single line of code.
        </p>
      </section>

      <section id="what-are-automations">
        <h2 className="text-3xl font-bold mb-6">1. What Are Automations?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Automations are visual workflows that connect <span className="font-semibold">triggers</span> (events
          that start the workflow) with <span className="font-semibold">actions</span> (tasks that are performed
          automatically). They follow a simple logic:
        </p>
        <div className="bg-gray-50 border-l-4 border-pink-600 p-6 mb-4">
          <p className="text-lg font-semibold">
            <span className="text-pink-600">When</span> something happens (a trigger) →{' '}
            <span className="text-pink-600">Then</span> do something (one or more actions)
          </p>
        </div>
        <div className="space-y-2 text-gray-700">
          <p>For example:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>When a guest checks in → Then send them a welcome SMS</li>
            <li>When it's 9 AM every day → Then check today's arrivals, find loyalty members, and upgrade their room</li>
            <li>When a reservation is created → Then add a note to the guest profile</li>
          </ul>
        </div>
        <p className="text-gray-700 mt-6 leading-relaxed">
          Each automation is built on a visual canvas where you drag, drop, and connect components to define
          your workflow. No coding or technical skills are required.
        </p>
      </section>

      <section id="key-concepts">
        <h2 className="text-3xl font-bold mb-6">2. Key Concepts</h2>
        <p className="text-gray-600 mb-6">Before you start building, here are the core concepts you need to know:</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b w-1/4">Concept</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { concept: 'Automation (Flow)', description: 'A complete workflow that defines a sequence of steps. Each automation has a name, a status (Active or Inactive), and is made up of connected components.' },
                { concept: 'Trigger', description: 'The starting point of every automation. A trigger defines when the automation runs. It can be an event (e.g. "Reservation Created") or a schedule (e.g. "Every day at 9 AM"). Every automation must have exactly one trigger.' },
                { concept: 'Action', description: 'A step that does something: retrieves data, sends a message, adds a product, creates a task, etc. Actions run in the order they are connected.' },
                { concept: 'Component', description: 'A building block on the canvas. Both triggers and actions are components. You configure each component in the Inspector panel.' },
                { concept: 'Connection (Wire)', description: 'A line drawn between two components on the canvas. It defines the order in which components execute and the flow of data between them.' },
                { concept: 'Variable', description: "A piece of data output by a component (e.g. a guest's name, a reservation ID). You can use variables from earlier components as inputs in later ones." },
                { concept: 'Modifier', description: 'A built-in transformation you can apply to a variable — for example, converting text to uppercase, adding days to a date, or extracting the first item from a list.' },
                { concept: 'Inspector', description: 'The configuration panel that appears on the right side of the canvas when you click on a component. This is where you set input values, map variables, and customize behavior.' },
                { concept: 'Canvas', description: 'The visual workspace where you build your automation by placing and connecting components.' },
              ].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-semibold text-gray-900 border-b">{row.concept}</td>
                  <td className="px-6 py-4 text-gray-700 border-b">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="accessing-automations">
        <h2 className="text-3xl font-bold mb-6">3. Accessing Automations</h2>
        <p className="text-gray-700 mb-4">To open Automations in Mews:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700">
          <li>Log in to your Mews property.</li>
          <li>Open the left-hand navigation menu.</li>
          <li>Click <span className="font-semibold">Settings</span> to expand the section.</li>
          <li>Click <span className="font-semibold">Automations</span>.</li>
        </ol>
      </section>

      <section id="automations-dashboard">
        <h2 className="text-3xl font-bold mb-6">4. The Automations Dashboard</h2>
        <p className="text-gray-700 mb-6">
          The Automations page is your central hub for managing all workflows. Here you can see every
          automation at a glance.
        </p>
        <Screenshot file="automations-dashboard.png" alt="Automations Dashboard" />
        <h3 className="text-xl font-semibold mb-4">What you see on the dashboard</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Column</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Name</td>
                <td className="px-6 py-4 text-gray-700">The name of the automation. Click the pencil icon on the right to open and edit it.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Status</td>
                <td className="px-6 py-4 text-gray-700">Shows whether the automation is Active (running) or Inactive (paused/stopped).</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Created</td>
                <td className="px-6 py-4 text-gray-700">The date the automation was first created.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Last modified</td>
                <td className="px-6 py-4 text-gray-700">The date the automation was last edited.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Actions</td>
                <td className="px-6 py-4 text-gray-700">The pencil icon (Edit) opens the flow designer. The three-dot menu (More) provides additional options such as deactivating or renaming the automation.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mb-4">Dashboard features</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
          <li><span className="font-semibold">+ Create button</span> (top right) — Opens the dialog to create a new automation from scratch or from a template.</li>
          <li><span className="font-semibold">Search</span> — Filter automations by name.</li>
          <li><span className="font-semibold">Action log tab</span> — Switch to view a chronological log of all actions executed across your automations.</li>
        </ul>
      </section>

      <section id="creating-first-automation">
        <h2 className="text-3xl font-bold mb-6">5. Creating Your First Automation</h2>
        <p className="text-gray-700 mb-6">
          Click the <span className="font-semibold">+ Create</span> button in the top-right corner of the
          Automations dashboard. A dialog will appear with several options:
        </p>
        <Screenshot file="create-automation.png" alt="Create an automation dialog" />
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Option A: Start from a template</h3>
            <p className="text-gray-700 mb-4">
              Templates are pre-built automations that are nearly ready to use. Select one and you will get a
              fully configured flow with all components already placed and connected. You only need to review
              the settings and adjust any fields specific to your property.
            </p>
            <p className="text-gray-700 mb-3">Currently available templates:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li><span className="font-semibold">Upgrade room for loyalty members</span> — Automatically upgrades room categories for your loyal guests when they arrive, based on availability and occupancy.</li>
              <li><span className="font-semibold">Welcome gift for VIP guests</span> — Prepares a welcome amenity for VIP guests by creating a task for your team and sending the guest an SMS notification.</li>
            </ul>
            <div className="mt-4 bg-pink-50 border-l-4 border-pink-600 p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Tip:</span> Templates are the fastest way to get started. Even if the template doesn't match your exact use case, you can use it as a starting point and customize it to your needs.
              </p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Option B: Custom automation</h3>
            <p className="text-gray-700">
              Select <span className="font-semibold">Custom automation</span> to start with a blank canvas. You will be taken to the flow designer where you can build your workflow from scratch.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Option C: Describe what you want (AI prompt)</h3>
            <p className="text-gray-700">
              At the top of the dialog you will see a text field where you can describe what you want to automate in natural language (e.g. "I want to automate how we welcome our VIP guests..."). The system will suggest relevant templates or help you get started based on your description.
            </p>
          </div>
        </div>
      </section>

      <section id="flow-designer">
        <h2 className="text-3xl font-bold mb-6">6. The Flow Designer (Canvas)</h2>
        <p className="text-gray-700 mb-6">The flow designer is where you visually build your automation. It consists of three main areas:</p>
        <Screenshot file="flow-designer.png" alt="Flow Designer Canvas" />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Area</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Left panel — Component palette</td>
                <td className="px-6 py-4 text-gray-700">A searchable list of all available components organized by category. You'll find Mews components (triggers and actions) as well as built-in utility components (schedulers, loops, conditions).</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Center — Canvas</td>
                <td className="px-6 py-4 text-gray-700">The main workspace where you place components and draw connections between them. You can pan by clicking and dragging the background, and zoom in/out using the scroll wheel or pinch gesture.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Right panel — Inspector</td>
                <td className="px-6 py-4 text-gray-700">Appears when you click on a component. Shows all the configuration fields for that component, including input fields, variable mappings, and advanced settings.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mb-4 mt-8">Canvas navigation</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
          <li><span className="font-semibold">Pan:</span> Click and drag on an empty area of the canvas to move around.</li>
          <li><span className="font-semibold">Zoom:</span> Use the mouse scroll wheel or pinch gesture on a trackpad to zoom in and out.</li>
          <li><span className="font-semibold">Select a component:</span> Click on it. The Inspector panel will open on the right.</li>
          <li><span className="font-semibold">Move a component:</span> Click and drag the component to reposition it on the canvas.</li>
          <li><span className="font-semibold">Delete a component:</span> Select it and press the Delete key, or use the delete option from the component's context menu.</li>
        </ul>
      </section>

      <section id="adding-components">
        <h2 className="text-3xl font-bold mb-6">7. Adding Components to the Canvas</h2>
        <p className="text-gray-700 mb-4">To add a component to your automation:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700 mb-6">
          <li>Open the <span className="font-semibold">component palette</span> on the left side of the canvas.</li>
          <li>Browse the categories or use the <span className="font-semibold">search bar</span> to find a specific component.</li>
          <li><span className="font-semibold">Drag</span> the component from the palette and <span className="font-semibold">drop</span> it onto the canvas.</li>
        </ol>
        <Screenshot file="component-palette.png" alt="Component palette" />
        <p className="text-gray-700 mb-3">Components are organized into categories:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
          <li><span className="font-semibold">Mews &gt; Triggers</span> — Event-based starting points (Guest Profile Created, Reservation Created, Reservation Checked In).</li>
          <li><span className="font-semibold">Mews &gt; Actions</span> — Operations you perform in Mews (Add Note, Send SMS, Upgrade Room, etc.).</li>
          <li><span className="font-semibold">Utilities</span> — Built-in components for scheduling, looping, branching, and data manipulation.</li>
          <li><span className="font-semibold">Third-party integrations</span> — Connect to external services and tools (where available).</li>
        </ul>
        <div className="mt-4 bg-pink-50 border-l-4 border-pink-600 p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tip:</span> If you're not sure which component you need, use the search bar at the top of the palette. Typing "SMS" will show the Send SMS component; typing "arrivals" will show Get Eligible Arrivals, etc.
          </p>
        </div>
      </section>

      <section id="connecting-components">
        <h2 className="text-3xl font-bold mb-6">8. Connecting Components</h2>
        <p className="text-gray-700 mb-4">
          Components on the canvas have <span className="font-semibold">ports</span> — small circles on their edges. To create a connection:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700 mb-6">
          <li>Hover over the <span className="font-semibold">output port</span> (right side) of the source component. The port circle will highlight.</li>
          <li><span className="font-semibold">Click and drag</span> from the output port to the <span className="font-semibold">input port</span> (left side) of the target component.</li>
          <li>Release the mouse button. A <span className="font-semibold">wire</span> (line) will appear connecting the two components.</li>
        </ol>
        <Screenshot file="connecting-components.png" alt="Connecting components" />
        <h3 className="text-xl font-semibold mb-4">How connections work:</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
          <li>Data flows from <span className="font-semibold">left to right</span> along the wires. The output of one component becomes available as input to the next.</li>
          <li>A component can connect to multiple downstream components (branching).</li>
          <li>A component can receive connections from multiple upstream components.</li>
          <li>To remove a connection, click on the wire and press Delete, or right-click and select remove.</li>
        </ul>
        <p className="text-gray-700 mt-6">
          The order of connections determines the execution order. When a trigger fires, the automation runs through the connected components following the wires, from left to right.
        </p>
      </section>

      <section id="configuring-components">
        <h2 className="text-3xl font-bold mb-6">9. Configuring Components (the Inspector)</h2>
        <p className="text-gray-700 mb-6">
          Click on any component on the canvas to open the <span className="font-semibold">Inspector panel</span> on the right side. The Inspector shows all the configuration fields for that component.
        </p>
        <Screenshot file="inspector.png" alt="Inspector panel" />
        <h3 className="text-xl font-semibold mb-4">Field types you will encounter</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Field type</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Text input</td>
                <td className="px-6 py-4 text-gray-700">Type a value directly (e.g. a phone number, a note message, a cron expression).</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Dropdown</td>
                <td className="px-6 py-4 text-gray-700">Select from a predefined list (e.g. a department, a loyalty program, a note classification).</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Toggle</td>
                <td className="px-6 py-4 text-gray-700">Switch a setting on or off (e.g. "Trigger immediately: True/False").</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Number input</td>
                <td className="px-6 py-4 text-gray-700">Enter a numeric value (e.g. quantity, buffer threshold, delay in milliseconds).</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Variable picker (+)</td>
                <td className="px-6 py-4 text-gray-700">Click the + button next to a field to dynamically reference output from a previous component.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mt-6">Each field includes a help text description below it explaining what the field does and what values are accepted.</p>
        <div className="mt-4 bg-pink-50 border-l-4 border-pink-600 p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Important:</span> Fields marked as Required must be filled in before the automation can run. Fields marked as Optional have sensible defaults and can be left as-is.
          </p>
        </div>
      </section>

      <section id="using-variables">
        <h2 className="text-3xl font-bold mb-6">10. Using Variables from Previous Components</h2>
        <p className="text-gray-700 mb-6">
          One of the most powerful features of Automations is the ability to use the{' '}
          <span className="font-semibold">output of one component as the input for another</span>. This is how data flows through your automation.
        </p>
        <h3 className="text-xl font-semibold mb-4">How to reference a variable</h3>
        <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700 mb-6">
          <li>Click on the component you want to configure.</li>
          <li>In the Inspector, find the input field where you want to use data from a previous component.</li>
          <li>Click the <span className="font-semibold">+ button</span> next to that field. The variable picker will open.</li>
          <li>You will see a list of all upstream (previous) components and their available output fields.</li>
          <li>Click on the output field you want to use. It will be inserted into the input field as a variable tag (a colored pill showing the source component and field name).</li>
        </ol>
        <Screenshot file="variables.png" alt="Variable picker" />
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold mb-2">Example</h4>
          <p className="text-gray-700">
            Say your automation starts with <span className="font-semibold">Get Eligible Arrivals</span> (which outputs a list of Reservation IDs) and the next component is{' '}
            <span className="font-semibold">Each</span> (which loops over a list). In the Each component's Field input, you click + and select Get Eligible Arrivals → out → Reservation IDs. The Each component now knows which list to iterate over.
          </p>
        </div>
        <p className="text-gray-700 mt-6">
          <span className="font-semibold">How it looks:</span> Once a variable is mapped, the field displays a colored tag like{' '}
          <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">Reservation IDs []</span>{' '}
          with a small pencil icon to edit or modify it.
        </p>
        <p className="text-gray-700 mt-4">
          You can combine <span className="font-semibold">static text with variables</span> in the same field. For example, in an SMS message you might type: "Welcome to our hotel, " and then click + to insert the guest's first name variable.
        </p>
      </section>

      <section id="modifiers">
        <h2 className="text-3xl font-bold mb-6">11. Modifiers — Transforming Data</h2>
        <p className="text-gray-700 mb-6">
          Sometimes the data output by one component isn't in the exact format you need for the next component.{' '}
          <span className="font-semibold">Modifiers</span> let you transform variables before passing them along — for example, converting text to uppercase, adding days to a date, or extracting the first item from a list.
        </p>
        <h3 className="text-xl font-semibold mb-4">Modifier categories</h3>
        <p className="text-gray-700 mb-4">Modifiers are organized into six categories:</p>
        <div className="space-y-6">
          {[
            { title: 'Object modifiers', desc: 'For working with JSON objects and structured data.', examples: 'Examples: Each, JSON Path, JSONata, Keys, Map, Parse, Set, Stringify' },
            { title: 'List modifiers', desc: 'For working with arrays and collections of items.', examples: 'Examples: Count, First Item, Flat, Index Of, Join, Last Item, Nth Item, Reverse, Slice, Sort, Unique' },
            { title: 'Text modifiers', desc: 'For transforming strings and text values.', examples: 'Examples: Capitalize, Concatenate, Contains, Encode URI, Length, Lowercase, Match, Replace, Split, Substring, Template, Trim, Uppercase' },
            { title: 'Control modifiers', desc: 'For conditional logic and flow control within a variable transformation.', examples: 'Examples: If, Is Empty, Is Not Empty, Default' },
            { title: 'Number modifiers', desc: 'For mathematical operations and number formatting.', examples: 'Examples: Add, Subtract, Multiply, Divide, Round, Ceiling, Floor, Absolute, Format Number' },
            { title: 'Date modifiers', desc: 'For working with dates and times.', examples: 'Examples: Add Time, Subtract Time, Format Date, Now, Parse Date, Difference, Start Of, End Of' },
          ].map((m) => (
            <div key={m.title} className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">{m.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{m.desc}</p>
              <p className="text-sm text-gray-700">{m.examples}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-pink-50 border-l-4 border-pink-600 p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tip:</span> You can chain multiple modifiers. For example, to get tomorrow's date formatted nicely: start with a date variable → apply Add Time (+1 day) → apply Format Date (DD/MM/YYYY).
          </p>
        </div>
        <Screenshot file="modifiers.png" alt="Modify variable panel" />
      </section>

      <section id="mews-components">
        <h2 className="text-3xl font-bold mb-6">12. Mews Components Overview</h2>
        <p className="text-gray-700 mb-6">
          Mews provides its own set of components designed specifically for hospitality workflows. These are grouped into Triggers and Actions.
        </p>
        <h3 className="text-xl font-semibold mb-4">Triggers (event-based)</h3>
        <p className="text-gray-600 mb-4">Triggers start your automation when something happens in Mews.</p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Trigger</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">When it fires</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Key output data</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Guest Profile Created</td>
                <td className="px-6 py-4 text-gray-700">A new guest profile is added to Mews.</td>
                <td className="px-6 py-4 text-gray-700">Guest name, email, phone, nationality, language, loyalty code.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Reservation Created</td>
                <td className="px-6 py-4 text-gray-700">A new reservation is created.</td>
                <td className="px-6 py-4 text-gray-700">Reservation ID, confirmation number, guest details, origin, assigned space, rate, dates.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Reservation Checked In</td>
                <td className="px-6 py-4 text-gray-700">A guest checks in at the property.</td>
                <td className="px-6 py-4 text-gray-700">Reservation ID, guest details, room assignment, check-in/out dates.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          <span className="font-semibold">Note:</span> For detailed documentation of each component — including every input field, output field, and step-by-step behavior — see the individual component documentation pages.
        </p>
      </section>

      <section id="utility-components">
        <h2 className="text-3xl font-bold mb-6">13. Built-in Utility Components</h2>
        <p className="text-gray-700 mb-6">
          In addition to Mews-specific components, the automation platform provides a set of{' '}
          <span className="font-semibold">built-in utility components</span> that help you control how your workflow behaves.
        </p>
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Cron Scheduler — trigger</h3>
            <p className="text-gray-700 mb-4">
              The Cron Scheduler triggers your automation on a recurring schedule using cron syntax. Use it when you want your automation to run at specific times (e.g. every morning at 9 AM, every Monday, on the first of each month).
            </p>
            <div className="bg-pink-50 border-l-4 border-pink-600 p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Important:</span> Always set the Timezone field to match your property's timezone (e.g. Europe/Prague). If left empty, the schedule will use GMT.
              </p>
            </div>
            <Screenshot file="cron-scheduler.png" alt="Cron Scheduler inspector" />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Each (Loop) — utility</h3>
            <p className="text-gray-700">
              The Each component loops over a list and processes each item individually. It takes a list as input and outputs one item at a time to the connected downstream component(s). This is essential when a previous component returns multiple items.
            </p>
            <Screenshot file="each-loop.png" alt="Each (Loop) component inspector" />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Condition (If/Else) — utility</h3>
            <p className="text-gray-700">
              The Condition component lets you add branching logic to your automation. It evaluates a condition and routes the flow down one of two paths: True or False.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Delay — utility</h3>
            <p className="text-gray-700">
              The Delay component pauses the automation for a specified amount of time before continuing to the next step. Useful when you need to wait between actions.
            </p>
          </div>
        </div>
      </section>

      <section id="starting-stopping-testing">
        <h2 className="text-3xl font-bold mb-6">14. Starting, Stopping, and Testing Your Automation</h2>
        <p className="text-gray-700 mb-6">
          Once your automation is built and configured, you need to <span className="font-semibold">start</span> it for it to begin running.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Starting an automation</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700">
              <li>In the flow designer, click the <span className="font-semibold">Start</span> button (typically a play icon in the top toolbar).</li>
              <li>The automation status will change to Active.</li>
              <li>If the trigger is event-based (e.g. Reservation Created), the automation will wait for that event to occur.</li>
              <li>If the trigger is a Cron Scheduler, the automation will run at the next scheduled time.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Stopping an automation</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700">
              <li>Click the Stop button in the flow designer toolbar.</li>
              <li>The automation status will change to Inactive.</li>
              <li>No further triggers will fire until the automation is started again.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Testing your automation</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li><span className="font-semibold">Use "Trigger immediately":</span> For Cron Scheduler-based automations, set the "Trigger immediately" toggle to True.</li>
              <li><span className="font-semibold">Check the Action Log:</span> After a test run, switch to the Action log tab to see what happened.</li>
              <li><span className="font-semibold">Start with a small scope:</span> Use restrictive filters so your test only affects a small number of reservations.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="action-log">
        <h2 className="text-3xl font-bold mb-6">15. The Action Log</h2>
        <p className="text-gray-700 mb-4">
          The <span className="font-semibold">Action log</span> tab on the Automations dashboard provides a chronological record of every action executed by your automations. It is your primary tool for monitoring and debugging.
        </p>
        <Screenshot file="action-log.png" alt="Action Log" />
        <h3 className="text-xl font-semibold mb-3">Use the Action log to:</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
          <li><span className="font-semibold">Verify execution:</span> Confirm that your automation ran when expected.</li>
          <li><span className="font-semibold">Debug issues:</span> Identify which component in the flow caused an error.</li>
          <li><span className="font-semibold">Review data:</span> See what data was passed between components during execution.</li>
          <li><span className="font-semibold">Track activity:</span> Monitor how often your automations are running and what actions they're performing.</li>
        </ul>
      </section>

      <section id="using-templates">
        <h2 className="text-3xl font-bold mb-6">16. Using Templates</h2>
        <p className="text-gray-700 mb-6">
          Templates are pre-built automations designed for common hospitality workflows. They save you time by providing a fully configured flow that you can use as-is or customize.
        </p>
        <h3 className="text-xl font-semibold mb-4">Available templates</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Template</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Trigger</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Upgrade room for loyalty members</td>
                <td className="px-6 py-4 text-gray-700">Runs daily: identifies arriving guests, checks occupancy, attempts room upgrades, sends SMS to upgraded guests, and adds a note to reservations where the upgrade failed.</td>
                <td className="px-6 py-4 text-gray-700">Cron Scheduler (daily)</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Welcome gift for VIP guests</td>
                <td className="px-6 py-4 text-gray-700">Runs daily: identifies arriving guests, checks which gift products are compatible, creates a task for your team to prepare the gift, and sends an SMS notification to the guest.</td>
                <td className="px-6 py-4 text-gray-700">Cron Scheduler (daily)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mb-3">How to use a template</h3>
        <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700">
          <li>Click + Create on the Automations dashboard.</li>
          <li>Select a template from the list.</li>
          <li>The flow designer opens with all components pre-placed and connected.</li>
          <li>Review each component's settings in the Inspector panel.</li>
          <li>Adjust any required fields specific to your property.</li>
          <li>Click Start when you're ready.</li>
        </ol>
      </section>

      <section id="best-practices">
        <h2 className="text-3xl font-bold mb-6">17. Best Practices</h2>
        <ul className="space-y-4 text-gray-700">
          {[
            { n: '1', title: 'Start with a template.', body: 'Even if your use case is different, templates provide a great example of how to structure a flow.' },
            { n: '2', title: 'Name your automations clearly.', body: 'Use descriptive names like "Morning room upgrade for gold members" rather than "Untitled".' },
            { n: '3', title: 'Set the timezone on Cron Schedulers.', body: "Always configure the timezone field to match your property's timezone." },
            { n: '4', title: 'Test with small scope first.', body: 'Use filters to limit your automation during testing.' },
            { n: '5', title: 'Use the Action log regularly.', body: "Check it after starting a new automation to confirm it's running correctly." },
            { n: '6', title: 'Add delays in loops.', body: 'When using Each to iterate over large lists, add a small delay (500–1000 ms).' },
            { n: '7', title: 'Use modifiers instead of extra components.', body: 'Keep your flow cleaner by transforming single values with modifiers.' },
            { n: '8', title: 'Keep automations focused.', body: 'Two simple automations are better than one overly complex one.' },
            { n: '9', title: "Review before going live.", body: "Walk through each component's configuration before starting." },
            { n: '10', title: 'Document your automations.', body: 'Use the automation name and notes to record what it does.' },
          ].map((bp) => (
            <li key={bp.n} className="flex gap-3">
              <span className="text-pink-600 font-semibold">{bp.n}.</span>
              <span><span className="font-semibold">{bp.title}</span> {bp.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="troubleshooting">
        <h2 className="text-3xl font-bold mb-6">18. Troubleshooting</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Problem</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Solution</th>
              </tr>
            </thead>
            <tbody>
              {[
                { p: 'My automation is not running', s: 'Check that the automation status is Active. If it uses a Cron Scheduler, verify the cron settings and timezone are correct.' },
                { p: 'The automation runs but nothing happens', s: 'Check the Action log for errors. Verify that the trigger is producing output. Ensure all Required fields are filled in each component.' },
                { p: 'I see errors in the Action log', s: 'Click on the error entry to see the details. Common causes: a Required field is missing a value, a variable reference points to a component that has no output data.' },
                { p: 'Variables show as empty at runtime', s: 'Make sure the upstream component is producing data. Check that the variable mapping in the + picker points to the correct output field.' },
                { p: 'The Cron Scheduler fires at the wrong time', s: "Check the Timezone field. If it's empty, the scheduler defaults to GMT. Set it to your property's timezone." },
                { p: 'The Each loop processes zero items', s: "Verify that the list variable connected to the Each component is not empty. Check the previous component's output in the Action log." },
                { p: 'SMS messages are not being sent', s: 'Verify that the guest has a valid phone number in their profile. Check that the SMS component is correctly connected.' },
                { p: "I can't find a component in the palette", s: 'Use the search bar at the top of the component palette. Try different keywords.' },
              ].map((row, i) => (
                <tr key={i} className={`${i < 7 ? 'border-b' : ''} hover:bg-gray-50`}>
                  <td className="px-6 py-4 font-medium">{row.p}</td>
                  <td className="px-6 py-4 text-gray-700">{row.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-pink-50 border-l-4 border-pink-600 p-6">
          <h3 className="font-semibold text-lg mb-3">What's Next?</h3>
          <p className="text-gray-700 mb-3">Now that you understand the basics, here are some next steps:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li>Create your first automation using a template</li>
            <li>Read the component documentation for each Mews component</li>
            <li>Experiment on the canvas with a Cron Scheduler trigger</li>
            <li>Explore modifiers and try chaining them together</li>
          </ul>
          <p className="text-gray-700 mt-4 font-semibold">
            You're ready! With Mews Automations, you can streamline your property's operations, deliver personalized guest experiences, and free your team to focus on what matters most — your guests. Happy automating!
          </p>
        </div>
      </section>
    </>
  );
}
