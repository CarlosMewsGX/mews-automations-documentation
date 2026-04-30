import type { ReactNode } from 'react';
import React from 'react';
function Req() { return <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">Required</span>; }
function Opt() { return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Optional</span>; }
function Cond() { return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Conditional</span>; }

function SectionHeader({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return (
    <section id={id} className="mb-16">
      <div className="border-l-4 border-pink-600 pl-6 mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </section>
  );
}

function IOTable({ headers, rows }: { headers: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
          <tr>{headers.map((h) => <th key={h} className="px-6 py-4 text-left font-semibold text-gray-900 border-b">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`${i < rows.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
              {row.map((cell, j) => (
                <td key={j} className={`px-6 py-4 ${j === 0 ? 'font-medium' : j === 1 ? 'text-sm' : 'text-gray-700'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UseCases({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
      {items.map((item) => (
        <li key={item.title}><span className="font-semibold">{item.title}</span> — {item.body}</li>
      ))}
    </ul>
  );
}

function ErrorTable({ rows }: { rows: { error: string; cause: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Error</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Cause</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`${i < rows.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
              <td className="px-6 py-4 font-mono text-sm">{r.error}</td>
              <td className="px-6 py-4 text-gray-700">{r.cause}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CooldownCallout({ trackBy }: { trackBy: string }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-700 leading-relaxed">
        The cooldown feature prevents the action from running repeatedly for the same entity within a defined time window — useful when a workflow may be triggered multiple times in quick succession. Settings are in the <span className="font-semibold">Cooldown</span> section of the component settings (collapsed by default).
      </p>
      <IOTable headers={['Setting', 'Required', 'Description']} rows={[
        ['Cooldown period', <Opt />, 'The number of time units during which the action will not run again. Set to 0 (default) to disable.'],
        ['Unit', <Opt />, 'The time unit for the cooldown period. Options: Minutes, Hours, Days (default), Weeks.'],
        ['Track by', <Opt />, `Scope of cooldown (only visible when period > 0). None (default) — a single global cooldown window. ${trackBy}.`],
      ]} />
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Cooldown Output Port</p>
        <p className="text-sm text-gray-600 mb-3">When the cooldown is active, the component outputs the following on the <code className="bg-gray-100 px-1 rounded text-pink-700">cooldown</code> port instead of the <code className="bg-gray-100 px-1 rounded text-pink-700">out</code> port:</p>
        <IOTable headers={['Field', 'Type', 'Description']} rows={[
          ['Expires at', 'Date & Time', 'The date and time (UTC) when the cooldown window expires and the action can run again.'],
          ['Remaining (minutes)', 'Number', 'The number of minutes remaining until the cooldown expires.'],
        ]} />
        <div className="bg-pink-50 border-l-4 border-pink-600 p-4 mt-3">
          <p className="text-sm text-gray-700"><span className="font-semibold">Tip:</span> Connect the cooldown port to other components to handle the cooldown scenario — for example, to log that the action was skipped or to notify an operator.</p>
        </div>
      </div>
    </div>
  );
}

function HowItWorks({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-semibold mt-0.5">{i + 1}</span>
          <span className="text-gray-700 leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function ComponentsSection() {
  return (
    <>
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed">
          This section provides detailed documentation for all Mews Automation components. Each component
          includes input/output specifications, configuration instructions, and practical examples to help
          you build effective workflows.
        </p>
      </section>

      {/* TRIGGERS */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-pink-600">Triggers</h2>

        <section id="guest-profile-created" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Guest Profile Created</h3>
            <p className="text-gray-600">Trigger • Category: Guests and Companies</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Guest Profile Created trigger fires automatically whenever a new guest profile is created in your property. It provides key information about the newly created guest such as their name, contact details, nationality, preferred language, and loyalty membership. This trigger has no input fields to configure — simply add it to your workflow and it will start listening for new guest profiles.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Guest ID', 'Text (GUID)', 'The unique identifier of the newly created guest profile.'],
                ['First Name', 'Text', 'The first name of the guest. May be empty if not provided.'],
                ['Last Name', 'Text', 'The last name of the guest. May be empty if not provided.'],
                ['Email', 'Text', 'The email address of the guest. May be empty if not provided.'],
                ['Telephone', 'Text', 'The telephone number of the guest. May be empty if not provided.'],
                ['Nationality Code', 'Text', 'The ISO 3166-1 alpha-2 country code (e.g., US, GB, DE). May be empty.'],
                ['Preferred Language Code', 'Text', 'The language code (e.g., en-US, de-DE). May be empty if not set.'],
                ['Loyalty Code', 'Text', 'The loyalty program membership code. May be empty.'],
                ['External Identifier', 'Text', 'External identifier for integration with third-party systems.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Welcome communication', body: 'Send a personalized welcome message when a new guest profile is created.' },
                { title: 'CRM synchronization', body: 'Automatically push new guest data to external CRM systems.' },
                { title: 'Loyalty program enrollment', body: 'Trigger enrollment invitations for guests without loyalty codes.' },
                { title: 'Guest segmentation', body: 'Route guests into language-specific or region-specific workflows.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="reservation-created" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Reservation Created</h3>
            <p className="text-gray-600">Trigger • Category: Reservations</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Reservation Created trigger fires automatically whenever a new reservation is created in your property. It provides detailed information about the newly created reservation and its associated guest. This trigger has no input fields — it activates automatically when a new reservation is created.
              </p>
              <div className="bg-pink-50 border-l-4 border-pink-600 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> All date and time values are in UTC (ISO 8601 format). Convert to local time in subsequent workflow steps if needed.
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Key Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Reservation ID', 'Text (GUID)', 'The unique identifier of the newly created reservation.'],
                ['Confirmation Number', 'Text', 'The human-readable confirmation number.'],
                ['Guest ID / Name / Email', 'Text', 'Guest details including ID, first/last name, email, telephone, nationality, language, and loyalty code.'],
                ['Origin / Origin Details', 'Text', 'The booking source channel (e.g., Distributor, ChannelManager, Commander).'],
                ['Arrival / Departure (UTC)', 'Date & Time', 'Expected arrival and departure dates in UTC.'],
                ['Rate ID / Service ID', 'Text (GUID)', 'The applied rate and bookable service identifiers.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Welcome email', body: 'Send a personalized confirmation message when a reservation is created.' },
                { title: 'Pre-arrival task creation', body: 'Automatically create tasks for VIP amenities or special requests.' },
                { title: 'Channel tracking', body: 'Log or route reservations differently based on Origin.' },
                { title: 'Loyalty program handling', body: 'Check Guest Loyalty Code to trigger special workflows.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="reservation-checked-in" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Reservation Checked In</h3>
            <p className="text-gray-600">Trigger • Category: Reservations</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Reservation Checked In trigger fires automatically whenever a guest is checked in to a reservation. It provides detailed information about the reservation and associated guest at the moment of check-in. The Started (UTC) field is always populated when this trigger fires.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Key Output Fields</h4>
              <p className="text-gray-600 mb-4 text-sm">Output includes all reservation and guest details similar to Reservation Created, plus:</p>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Started (UTC)', 'Date & Time', 'The date and time when the guest was checked in (always populated).'],
                ['Assigned Space ID', 'Text (GUID)', 'The room assigned at check-in (typically populated).'],
                ['State', 'Text', 'Current reservation state (e.g., Started).'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Welcome message', body: 'Send a personalized SMS or email with check-in details.' },
                { title: 'Room service notification', body: 'Notify staff to deliver welcome amenities.' },
                { title: 'VIP handling', body: 'Identify VIP guests and trigger special workflows.' },
                { title: 'External system sync', body: 'Push check-in data to CRM or loyalty platforms.' },
              ]} />
            </div>
          </div>
        </section>
      </div>

      {/* ACTIONS */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-pink-600">Actions</h2>

        <section id="send-sms" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Send SMS</h3>
            <p className="text-gray-600">Action • Category: Messaging</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Send SMS action sends an SMS message to a guest's phone number. The message can be sent on behalf of the hotel or the guest, and can optionally be linked to a reservation. The recipient can be specified directly via Guest ID or resolved from a Reservation ID.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Guest ID', <Cond />, 'The guest to send SMS to. If not provided, guest is resolved from Reservation ID.'],
                ['Reservation ID', <Cond />, 'Optional reservation to link the message to. Used to resolve guest if Guest ID not provided.'],
                ['Message body', <Req />, 'The text content of the SMS message. Cannot be empty.'],
                ['Sender', <Req />, 'Hotel (send on behalf of hotel) or Guest (send on behalf of guest).'],
              ]} />
              <div className="bg-pink-50 border-l-4 border-pink-600 p-4 mt-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Important:</span> At least one of Guest ID or Reservation ID must be provided.
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Welcome message', body: 'Send a welcome SMS with check-in instructions.' },
                { title: 'Room upgrade notification', body: 'Inform guests of room upgrades.' },
                { title: 'Check-out reminder', body: 'Send departure reminders with check-out times.' },
                { title: 'Custom communication', body: 'Send personalized messages based on guest preferences.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'At least one of GuestId or ReservationId must be provided', cause: 'Neither Guest ID nor Reservation ID was supplied.' },
                { error: 'Body is required', cause: 'Message body field was left empty or contains only whitespace.' },
                { error: 'Reservation not found', cause: 'The provided Reservation ID does not match any existing reservation.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="upgrade-room-category" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Upgrade Assigned Room Category</h3>
            <p className="text-gray-600">Action • Category: Reservations</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Upgrade Assigned Room Category action automatically upgrades guests to higher-category rooms based on configurable upgrade paths and real-time availability. You define which room categories can be upgraded to which targets, and the component checks availability, respects buffer limits, and processes upgrades in order. Produces two outputs: upgraded reservations and failed reservations with reasons.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Key Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Reservation IDs', <Req />, 'List of reservation IDs to attempt upgrades for (JSON array).'],
                ['Upgrade Paths', <Req />, 'Maps From Room Category to To Room Category. Supports cascading upgrades.'],
                ['Availability Buffer', <Req />, 'Minimum rooms to keep available in each target category. Set to 0 to upgrade whenever any room is available.'],
                ['Max Rooms to Upgrade', <Opt />, 'Cap on number of upgrades per run. Leave empty for no cap.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Ports</h4>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Upgraded Port</h5>
                  <p className="text-sm text-gray-700">Fires when at least one reservation was successfully upgraded. Outputs: Upgraded Reservations array, Upgraded Count, and Upgraded Reservation IDs list.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Failed Port</h5>
                  <p className="text-sm text-gray-700 mb-2">Fires when reservations could not be upgraded. Includes failure reasons:</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside ml-4 space-y-1">
                    <li><span className="font-mono">NO_AVAILABILITY</span> — Target category fully occupied</li>
                    <li><span className="font-mono">CAP_REACHED</span> — Maximum upgrade limit reached</li>
                    <li><span className="font-mono">NO_CATEGORY_FOUND</span> — No matching upgrade path</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Daily automated upgrades', body: 'Run each morning to upgrade arriving guests while keeping rooms in reserve.' },
                { title: 'VIP guest upgrades', body: 'Automatically upgrade VIP reservations with cascading paths.' },
                { title: 'Occupancy optimization', body: 'Maximize room utilization while maintaining buffers.' },
                { title: 'Controlled batch upgrades', body: 'Limit upgrades per run for gradual rollout.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-services" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Services</h3>
            <p className="text-gray-600">Action • Category: Billing &amp; Products</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Services action retrieves the list of services configured at your property. Services represent the different types of offerings your property provides (accommodation, spa, restaurant, etc.). Returns all active services by default, or only bookable services when filtered. Outputs a list with value (service ID) and label (service name).
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Get only bookable services', <Opt />, 'When enabled, only bookable services (e.g., accommodation) are returned. When disabled (default), all active services are included.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Items', 'Array', 'List of services. Each contains Value (GUID) and Label (localized name).'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Dynamic service selection', body: 'Populate dropdowns in workflow configuration.' },
                { title: 'Service-specific workflows', body: 'Route reservations to different branches by service.' },
                { title: 'Reporting and auditing', body: 'Include service names in automated reports.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-space-categories" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Space Categories</h3>
            <p className="text-gray-600">Action • Category: Spaces, Rates &amp; Occupancy</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Space Categories action retrieves all space categories (e.g., Standard, Deluxe, Suite) configured for your property. Optionally filter by bookable service. Returns a list with value (category ID) and label (category name, with service name appended if multiple services exist).
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Bookable Services', <Opt />, 'Select one or more services to filter categories. If empty, returns categories from all bookable services.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Items', 'Array', 'List of categories. Each contains Value (GUID) and Label (localized name with service name if applicable, e.g., "Deluxe (Accommodation)").'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Filter reservations by category', body: 'Use as reference to identify category IDs for filtering.' },
                { title: 'Dynamic category selection', body: 'Apply different logic based on category type.' },
                { title: 'Service-specific reporting', body: 'Filter categories by service for scoped reports.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-rates" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Rates</h3>
            <p className="text-gray-600">Action • Category: Spaces, Rates &amp; Occupancy</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Rates action retrieves all enabled rates configured in your property (both public and private) across all bookable services. Returns a list of rate names and unique identifiers for use in subsequent workflow steps. Only enabled rates are returned; disabled and voucher rates are excluded.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <p className="text-gray-700">This component has no input fields. It automatically retrieves all enabled rates.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Value', 'Text (GUID)', 'The unique identifier of the rate.'],
                ['Label', 'Text', 'Display name of the rate (service name appended if multiple bookable services, e.g., "Best Available Rate (Accommodation)").'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Rate-based routing', body: 'Apply different logic depending on reservation rate.' },
                { title: 'Populating a dropdown', body: 'Use as dynamic data source for rate selection.' },
                { title: 'Rate auditing', body: 'Verify that expected rates are active and correctly configured.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="add-note-to-guest-profile" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Add Note To Guest Profile</h3>
            <p className="text-gray-600">Action • Category: Guests &amp; Companies</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Add Note To Guest Profile action adds a text note to a guest's profile in Mews. Each note includes a classification that categorizes it (e.g., Housekeeping, Front Office, Complaints), making it easy for your team to find and filter relevant information later. This is useful for automating guest communication records — for example, automatically logging a special request when a reservation is created, or recording a complaint from an external system. When the note is successfully added, the component outputs the note details on the <code className="bg-gray-100 px-1 rounded text-pink-700">out</code> port.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Guest ID', <Req />, 'Text (GUID). The unique identifier of the guest whose profile the note will be added to. Typically populated dynamically from a previous workflow step (e.g., a trigger that provides a Guest ID).'],
                ['Note', <Req />, 'Text (multiline). The content of the note. Cannot be empty or whitespace-only. Maximum 1,000 characters.'],
                ['Classification', <Req />, 'Dropdown. The category of the note. Defaults to General. Options: General, Food & Beverage, Front Office, Reservations, Housekeeping, Maintenance, Previous Stay, Family Relations, Gifts, Accounting, Complaints, Other.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Note ID', 'Text (GUID)', 'The unique identifier of the newly created note.'],
                ['Guest ID', 'Text (GUID)', 'The unique identifier of the guest the note was added to.'],
                ['Content', 'Text', 'The content of the note as stored in Mews.'],
                ['Classification', 'Text', 'The classification category assigned to the note.'],
                ['Is Active', 'Boolean', "Whether the note is currently active on the guest's profile."],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Cooldown Settings</h4>
              <CooldownCallout trackBy="Guest — each guest gets their own independent cooldown window based on the provided Guest ID" />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Log special requests', body: 'When a reservation is created, automatically add a "Reservations" note to the guest\'s profile with any special requests from the booking.' },
                { title: 'Record guest complaints', body: 'When a complaint is received through an external system (e.g., a survey tool), add a "Complaints" note with the details.' },
                { title: 'Track dietary preferences', body: 'When a guest submits a pre-arrival form, add a "Food & Beverage" note with dietary requirements so the restaurant team is informed.' },
                { title: 'Housekeeping instructions', body: 'When a guest requests extra amenities, add a "Housekeeping" note so the team knows what to prepare for future stays.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'Content must not be empty.', cause: 'The Note field was left empty or contains only whitespace.' },
                { error: 'Content must not exceed 1000 characters.', cause: 'The note content is longer than the 1,000-character limit.' },
                { error: "Unknown classification '{value}'.", cause: 'The provided classification is not one of the supported values.' },
                { error: 'An error occurred while processing your request.', cause: 'The request to add the note in Mews failed. May indicate an invalid Guest ID or a temporary service issue.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="add-note-to-reservation" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Add Note To Reservation</h3>
            <p className="text-gray-600">Action • Category: Reservations</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Add Note To Reservation action adds a text note to one or more reservations in Mews. The same note text is applied to every reservation specified, making it easy to annotate multiple reservations at once — for example, adding a special request note to all reservations in a group booking, or recording an operational remark when a guest issue is reported. When the notes are successfully created, the component outputs the generated note IDs, reservation IDs, and note text on the <code className="bg-gray-100 px-1 rounded text-pink-700">out</code> port.
              </p>
              <div className="bg-pink-50 border-l-4 border-pink-600 p-4">
                <p className="text-sm text-gray-700"><span className="font-semibold">Tip:</span> The Reservation IDs field is typically populated dynamically from the output of a previous step (e.g., a reservation trigger that provides the Reservation ID).</p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Reservation IDs', <Req />, 'Text (JSON array). One or more reservation IDs to add the note to. A single reservation ID can also be provided as a plain string — it will be automatically wrapped into an array. At least one ID must be provided.'],
                ['Note Text', <Req />, 'Textarea. The text content of the note to add to all selected reservations. Cannot be empty or whitespace-only, and must not exceed 1,000 characters.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Note IDs', 'Array of Text (GUIDs)', 'The unique identifiers of the newly created notes, one per reservation that was annotated.'],
                ['Reservation IDs', 'Array of Text (GUIDs)', 'The unique identifiers of the reservations that received the note.'],
                ['Text', 'Text', 'The note text that was added to the reservations.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Cooldown Settings</h4>
              <CooldownCallout trackBy="Reservation — each reservation gets its own independent cooldown window. When multiple IDs are provided, only reservations still within their cooldown window are skipped; others proceed normally" />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Special request logging', body: 'When a guest submits a special request through an external channel, automatically add the request text as a note to their reservation so the front desk team can see it in Mews.' },
                { title: 'Group booking annotation', body: 'After a group reservation is created, add a shared note (e.g., "Corporate event — special billing arrangements") to all reservations in the group at once.' },
                { title: 'Automated issue tracking', body: "When a maintenance issue is reported, add a note to the affected reservation describing the issue and its status, providing context for staff during the guest's stay." },
                { title: 'Workflow audit trail', body: 'Use in combination with other actions (e.g., after upgrading a room or adding a product) to leave a note documenting what automation was applied and when.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'At least one reservation ID must be provided.', cause: 'The Reservation IDs field was left empty or resolved to an empty array.' },
                { error: 'Text must not be empty.', cause: 'The Note Text field was left empty or contains only whitespace.' },
                { error: 'Text must not exceed 1000 characters.', cause: 'The Note Text exceeds the maximum allowed length of 1,000 characters. Shorten the text and try again.' },
                { error: 'The downstream API call was not successful.', cause: 'The request to create the note in Mews failed. May indicate an invalid reservation ID or a temporary service issue.' },
                { error: 'An error occurred while processing your request.', cause: 'An unexpected error occurred while communicating with the Mews API. Try again later or contact support if the issue persists.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="add-product-to-reservation" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Add Product To Reservation</h3>
            <p className="text-gray-600">Action • Category: Reservations</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Add Product To Reservation action adds a selected product to an existing reservation in Mews. This is useful for automating product charges — for example, automatically adding a breakfast package to all reservations that meet certain criteria, or adding a late checkout fee when a guest requests a late departure. You can specify how many units to add and optionally define a custom date range. If no dates are provided, the product is applied for the full duration of the reservation. When successfully added, the component outputs the IDs of the created order items on the <code className="bg-gray-100 px-1 rounded text-pink-700">out</code> port.
              </p>
              <div className="bg-pink-50 border-l-4 border-pink-600 p-4">
                <p className="text-sm text-gray-700"><span className="font-semibold">Tip:</span> Use the <span className="font-semibold">Get Compatible Products</span> action before this component to find products that are available for a specific reservation.</p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Product ID', <Req />, 'Text (GUID). The unique identifier of the product to add. Use Get Compatible Products to find products available for this reservation.'],
                ['Reservation ID', <Req />, 'Text (GUID). The unique identifier of the reservation to add the product to. Typically populated dynamically from a previous workflow step.'],
                ['Count', <Opt />, 'Number. How many units of the product to add. Defaults to 1. For per-night products, each unit is added once per night of the stay.'],
                ['Start (UTC)', <Opt />, 'Date & Time (YYYY-MM-DD HH:mm). When the product consumption starts. Defaults to the check-in date. For once-off or per-person products, set to the same value as End (UTC).'],
                ['End (UTC)', <Opt />, 'Date & Time (YYYY-MM-DD HH:mm). When the product consumption ends. Defaults to the checkout date. For once-off or per-person products, set to the same value as Start (UTC).'],
              ]} />
              <div className="bg-pink-50 border-l-4 border-pink-600 p-4 mt-4">
                <p className="text-sm text-gray-700"><span className="font-semibold">Note:</span> When both Start (UTC) and End (UTC) are left empty, the product is applied for the entire duration of the reservation. This is the most common configuration for per-night products such as breakfast or parking.</p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Item IDs', 'Array of Text (GUIDs)', 'The unique identifiers of the order items created by adding the product. For per-night products, one item is created per night, so this array may contain multiple IDs.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Cooldown Settings</h4>
              <CooldownCallout trackBy="Reservation — each reservation gets its own independent cooldown window based on the Reservation ID. Guest — each guest gets their own independent cooldown window, automatically resolved from the Reservation ID" />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Automatic breakfast package', body: 'When a reservation is confirmed for a specific rate, automatically add a breakfast product for the full duration of the stay (leave Start and End empty).' },
                { title: 'Late checkout fee', body: 'When a guest requests a late checkout, add a late checkout product with Start and End set to the same checkout date (once-off charge).' },
                { title: 'Welcome amenity', body: 'When a VIP guest is arriving, automatically add a welcome amenity product for the first night only by setting Start and End to the arrival date.' },
                { title: 'Parking charge', body: 'When a guest confirms they need parking, add a per-night parking product for the entire reservation duration by leaving Start and End empty.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: "Reservation '{id}' was not found", cause: 'The provided Reservation ID does not match any active reservation in the current property. Verify the reservation exists and has not been cancelled.' },
                { error: 'An error occurred while processing your request.', cause: 'The request to add the product to the reservation failed. May indicate an invalid Product ID, an incompatible product, or a temporary service issue.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="add-task" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Add Task</h3>
            <p className="text-gray-600">Action • Category: Tasks</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Add Task action creates a new task in Mews and assigns it to a specific department. Use it to automatically generate operational tasks — such as preparing a welcome amenity or flagging a VIP arrival — based on reservation events or occupancy data. Tasks are immediately visible in the Mews task management interface for the assigned department.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Department', <Req />, 'The department to assign the task to. Select from available departments or map a Department ID from an upstream Get Departments step.'],
                ['Name', <Req />, 'The title of the task as it will appear in the Mews task list. Supports variable interpolation (e.g., guest name, room number).'],
                ['Description', <Opt />, 'A detailed description of what the task requires. Can include variable data such as guest preferences, room details, or special instructions.'],
                ['Deadline', <Opt />, 'A due date/time for the task. If omitted, the task has no deadline.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Task ID', 'Text (GUID)', 'The unique identifier of the newly created task. Can be used in downstream steps for referencing or updating the task.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Welcome amenity preparation', body: 'Automatically create a housekeeping task when a VIP guest reservation is detected.' },
                { title: 'Maintenance flagging', body: 'Generate a maintenance task when a specific room issue is logged.' },
                { title: 'Arrival readiness', body: 'Create front-desk tasks for guests arriving on the same day.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'Department is required', cause: 'No department was selected or mapped. Ensure a valid Department ID is provided.' },
                { error: 'Name is required', cause: 'The task name field was left empty. Provide a non-empty task name.' },
                { error: 'Department not found', cause: 'The specified Department ID does not match any active department in the property.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="check-occupancy" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Check Occupancy</h3>
            <p className="text-gray-600">Action • Category: Spaces, Rates &amp; Occupancy</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Check Occupancy action retrieves the occupancy percentage for a specific date and additionally evaluates it against a configurable threshold. Use it to make conditional decisions in your automation — for example, only offer upgrades when occupancy is below 80%. Unlike Get Occupancy, this component includes a boolean output indicating whether the threshold was met.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Date', <Req />, 'The specific date to check occupancy for. Typically mapped from a trigger date output or set to today\'s date.'],
                ['Threshold (%)', <Req />, 'A percentage value (0–100). The component will compare actual occupancy against this value and output a boolean result.'],
                ['Space Category', <Opt />, 'Filter occupancy calculation to a specific room category. If omitted, overall property occupancy is used.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Occupancy %', 'Number', 'The actual occupancy percentage for the given date (e.g., 72.5).'],
                ['Is Below Threshold', 'Boolean', 'True if occupancy is below the configured threshold; false otherwise. Use this output to branch your workflow with a Condition component.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Conditional upgrade logic', body: 'Only attempt room upgrades when occupancy is below a set threshold.' },
                { title: 'Pricing decisions', body: 'Trigger promotional actions when occupancy falls below target levels.' },
                { title: 'Staffing alerts', body: 'Notify managers when occupancy exceeds operational capacity.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'Date is required', cause: 'No date was supplied. Map a date from a trigger or upstream component.' },
                { error: 'Threshold must be between 0 and 100', cause: 'The threshold value is outside the valid range. Provide a number between 0 and 100.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-compatible-products" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Compatible Products</h3>
            <p className="text-gray-600">Action • Category: Products</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Compatible Products action returns a list of products that are compatible with a specific reservation, based on the reservation's service, space category, and date. Use this component before adding a product to a reservation to ensure only eligible products are offered or processed — preventing errors from incompatible product assignments.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Reservation ID', <Req />, 'The ID of the reservation to check product compatibility against. Typically sourced from a trigger or Get Eligible Arrivals output.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Items', 'Array', 'List of compatible products. Each item contains a Value (product GUID) and Label (product name).'],
                ['Count', 'Number', 'The total number of compatible products returned.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Safe product addition', body: 'Verify a product is compatible before attempting to add it to a reservation.' },
                { title: 'Upsell filtering', body: "Display only relevant upsell products based on the guest's booking." },
                { title: 'Welcome gift automation', body: 'Select from compatible products to assign a welcome amenity.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'Reservation ID is required', cause: 'No Reservation ID was provided. Map it from an upstream component.' },
                { error: 'Reservation not found', cause: 'The provided Reservation ID does not correspond to an active reservation.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-departments" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Departments</h3>
            <p className="text-gray-600">Action • Category: Property Configuration</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Departments action retrieves all active departments configured in your property. The output list is typically used as input for the Add Task component, allowing you to dynamically select or filter departments rather than hardcoding department IDs. Returns department names and unique identifiers.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <p className="text-gray-700">This component has no input fields. It automatically retrieves all active departments for your property.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Items', 'Array', 'List of departments. Each item contains a Value (department GUID) and Label (department name, e.g., "Housekeeping", "Front Desk").'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Dynamic task assignment', body: 'Retrieve department IDs at runtime and pass them to Add Task.' },
                { title: 'Department filtering', body: 'Filter tasks or notifications to specific departments based on workflow logic.' },
                { title: 'Configuration validation', body: 'Verify that expected departments exist before executing downstream steps.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-eligible-arrivals" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Eligible Arrivals</h3>
            <p className="text-gray-600">Action • Category: Reservations</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Eligible Arrivals action retrieves a list of reservations arriving on a specified date that match a set of configurable filters. It is typically the first action step in daily scheduled automations, producing the list of reservations to process. You can filter by space category, loyalty membership, rate, and other attributes to target only the relevant guests.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Arrival Date', <Req />, 'The date to retrieve arrivals for. Typically set to today using a date expression.'],
                ['Space Categories', <Opt />, 'Filter arrivals to specific room categories. Leave empty to include all categories.'],
                ['Loyalty Program', <Opt />, "Filter arrivals to guests enrolled in a specific loyalty program."],
                ['Rates', <Opt />, 'Filter arrivals to reservations on specific rates.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Reservation IDs', 'Array', 'List of Reservation IDs matching the specified filters. Feed this into an Each component to process them one by one.'],
                ['Count', 'Number', 'Total number of matching arrivals found.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Daily upgrade runs', body: 'Retrieve all arriving guests each morning and attempt room upgrades.' },
                { title: 'VIP welcome tasks', body: 'Filter loyalty members arriving today and create special welcome tasks.' },
                { title: 'Welcome message campaigns', body: 'Send personalised SMS to all guests arriving on a specific rate.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'Arrival Date is required', cause: 'No arrival date was provided. Ensure the date field is mapped or set to a valid value.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-loyalty-programs" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Loyalty Programs</h3>
            <p className="text-gray-600">Action • Category: Guests and Companies</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Loyalty Programs action retrieves all loyalty programs configured for your property. Returns a list of program names and IDs that can be used to filter eligible arrivals, validate guest membership, or reference programs in downstream automation steps. Pairs naturally with Get Loyalty Tiers to build tier-aware workflows.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <p className="text-gray-700">This component has no input fields. It automatically retrieves all active loyalty programs for your property.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Items', 'Array', 'List of loyalty programs. Each item contains a Value (program GUID) and Label (program name, e.g., "Gold Members Club").'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Loyalty-based filtering', body: 'Use program IDs to filter eligible arrivals to loyalty members only.' },
                { title: 'Multi-program workflows', body: 'Dynamically retrieve programs and route based on which program a guest belongs to.' },
                { title: 'Configuration validation', body: 'Confirm loyalty programs are correctly set up before running tier-based logic.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-loyalty-tiers" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Loyalty Tiers</h3>
            <p className="text-gray-600">Action • Category: Guests and Companies</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Loyalty Tiers action retrieves all tiers belonging to a specified loyalty program. Use it to build tier-aware automation — for example, apply premium upgrades only to guests in Platinum tier, or send different welcome messages based on membership level. Requires a Loyalty Program ID as input, typically obtained from Get Loyalty Programs.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Loyalty Program ID', <Req />, 'The ID of the loyalty program whose tiers should be retrieved. Map from Get Loyalty Programs output or configure statically.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Items', 'Array', 'List of loyalty tiers. Each item contains a Value (tier GUID) and Label (tier name, e.g., "Silver", "Gold", "Platinum").'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Tier-based routing', body: 'Apply different upgrade paths for Silver vs Platinum members.' },
                { title: 'Personalised messages', body: "Customise SMS content based on the guest's loyalty tier." },
                { title: 'Tier validation', body: "Verify that a guest's tier meets a minimum level before executing premium actions." },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'Loyalty Program ID is required', cause: 'No program ID was provided. Map from Get Loyalty Programs or set a static ID.' },
                { error: 'Loyalty Program not found', cause: 'The provided Loyalty Program ID does not match any active program.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-occupancy" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Occupancy</h3>
            <p className="text-gray-600">Action • Category: Spaces, Rates &amp; Occupancy</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Occupancy action retrieves the occupancy percentage for your property on a given date. Unlike Check Occupancy, it does not perform a threshold comparison — it simply returns the raw occupancy figure. Use this component when you need the occupancy value for calculations, logging, or conditional branching with a separate Condition component.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Date', <Req />, 'The date for which occupancy should be calculated. Use a date expression or map from an upstream output.'],
                ['Space Category', <Opt />, 'Restrict the occupancy calculation to a specific category. If omitted, property-wide occupancy is returned.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Occupancy %', 'Number', 'The occupancy percentage for the property or category on the given date (e.g., 68.4).'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Occupancy reporting', body: 'Log or surface occupancy figures as part of an automated daily report.' },
                { title: 'Custom threshold logic', body: 'Use the raw value in a downstream Condition to implement bespoke rules.' },
                { title: 'Category-level monitoring', body: 'Track occupancy per room type to inform targeted upsell strategies.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: 'Date is required', cause: 'The date field was not provided. Map a date value from a trigger or upstream step.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-products" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Products</h3>
            <p className="text-gray-600">Action • Category: Products</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed">
                The Get Products action retrieves all active products configured in your property, optionally filtered by bookable service. Use it to dynamically populate product selections in downstream steps such as Add Product to Reservation, or to validate product availability before assignment. Returns a list of product names and identifiers.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Bookable Services', <Opt />, 'Filter products to those belonging to specific services. If omitted, all active products across all services are returned.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Items', 'Array', 'List of products. Each item contains a Value (product GUID) and Label (product name with service appended if applicable, e.g., "Breakfast (Accommodation)").'],
                ['Count', 'Number', 'Total number of products returned.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Dynamic product selection', body: "Populate a product dropdown at runtime based on the property's live catalogue." },
                { title: 'Product auditing', body: 'Confirm that expected products exist and are active before assigning them.' },
                { title: 'Cross-service filtering', body: 'Scope product retrieval to a specific service for service-targeted workflows.' },
              ]} />
            </div>
          </div>
        </section>

        <section id="get-products-for-reservations" className="mb-16">
          <div className="border-l-4 border-pink-600 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-2">Get Products For Reservations</h3>
            <p className="text-gray-600">Action • Category: Reservations</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Get Products for Reservations action retrieves the list of products that <span className="font-semibold">can be ordered</span> for a specific reservation. Given a reservation, the component looks up the service (e.g., accommodation) that the reservation belongs to and returns all available products configured for that service.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Only products marked as <span className="font-semibold">orderable by employees</span> are returned. Default (automatically posted) products are excluded, since they are not meant to be manually ordered.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Each product is returned as a <span className="font-semibold">value/label pair</span>, where the value is the product's unique identifier and the label is the product's name in the property's language — making the output ideal as a dropdown source in subsequent workflow steps.
              </p>
              <div className="bg-pink-50 border-l-4 border-pink-600 p-4">
                <p className="text-sm text-gray-700"><span className="font-semibold">Note:</span> If no orderable products are configured for the reservation's service, the <code className="bg-pink-100 px-1 rounded text-pink-700">Items</code> array will be empty.</p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Input Fields</h4>
              <IOTable headers={['Field', 'Required', 'Description']} rows={[
                ['Reservation ID', <Req />, 'Text (GUID). The unique identifier of the reservation for which to retrieve available products. Typically populated dynamically from a previous step in the workflow (e.g., a reservation trigger or a Get Eligible Arrivals action).'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Output Fields</h4>
              <IOTable headers={['Field', 'Type', 'Description']} rows={[
                ['Items', 'Array of objects', 'A list of available products for the reservation. Each item contains: Value — the unique identifier (GUID) of the product, for use with Add Product to Reservation; Label — the localized display name of the product in the property\'s configured language.'],
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">How It Works</h4>
              <HowItWorks steps={[
                <>The component receives the <span className="font-semibold">Reservation ID</span> from the previous workflow step (or from a manually configured value).</>,
                <>The system looks up the reservation and identifies which <span className="font-semibold">service</span> (e.g., accommodation) it belongs to, and verifies the reservation belongs to the current property.</>,
                'If the reservation is not found or belongs to a different property, the component returns an error.',
                <>The system queries all <span className="font-semibold">active products</span> for that service, filtering to include only products <span className="font-semibold">orderable by employees</span> (available for manual staff ordering) and products that are <span className="font-semibold">not default</span> (default products are automatically posted and not for manual selection).</>,
                'Each matching product is returned with its unique identifier and localized name.',
                <>The list of products is sent to the <code className="bg-gray-100 px-1 rounded text-pink-700">out</code> output port.</>,
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Example Use Cases</h4>
              <UseCases items={[
                { title: 'Product selection dropdown', body: 'Use this component to populate a dynamic dropdown in a subsequent step, allowing users to select which product to add to a reservation.' },
                { title: 'Automated product ordering', body: 'Combine with the Add Product to Reservation action to automatically add a specific product when certain conditions are met (e.g., a VIP guest arrives).' },
                { title: 'Product availability check', body: 'Use the output to verify whether specific products are available for a reservation before proceeding with a workflow.' },
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Error Handling</h4>
              <ErrorTable rows={[
                { error: "Reservation '{id}' was not found", cause: 'The provided Reservation ID does not match any active reservation in the current property. This can occur if the ID is incorrect, the reservation has been deleted, or it belongs to a different property.' },
              ]} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}