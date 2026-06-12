import { useState } from 'react';

type Priority = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';

interface Component {
  name: string;
  category: string;
  connector: string;
  description: string;
  enables?: string;
  priority?: Priority;
}

interface Group {
  title: string;
  emoji: string;
  components: Component[];
}

interface Phase {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  badgeColor: string;
  status: string;
  groups: Group[];
}

const phases: Phase[] = [
  {
    id: 'phase1',
    label: 'Phase 1',
    sublabel: 'Already Live',
    color: 'border-green-500',
    badgeColor: 'bg-green-100 text-green-800',
    status: '✅ Live in pilot',
    groups: [
      {
        title: 'Core Logic & Scheduling',
        emoji: '🔁',
        components: [
          { name: 'Cron Scheduler', category: 'Automation triggers', connector: 'Schedule & timing', description: 'Fires an automation at a set time or on a recurring cadence (e.g. every day at 10:00)', enables: 'Daily upgrade checks, morning briefing automations' },
          { name: 'For Each (Loop)', category: 'Automation tools', connector: 'Controls', description: 'Iterates through a list of guests or reservations one by one', enables: 'Processing multiple arriving guests in a single automation run' },
        ],
      },
      {
        title: 'Reservations & Rooms',
        emoji: '🏨',
        components: [
          { name: 'Find Eligible Arrivals', category: 'Operations', connector: 'Reservations', description: 'Queries today\'s (or tomorrow\'s) arriving reservations that meet configurable criteria (loyalty tier, stay length, room type, etc.)', enables: 'The starting point for any arrival-based automation' },
          { name: 'Get Room Categories', category: 'Operations', connector: 'Rooms & availability', description: 'Returns all room categories configured at the property', enables: 'Selecting upgrade targets and filtering inventory' },
          { name: 'Upgrade Room', category: 'Operations', connector: 'Rooms & availability', description: 'Moves a reservation to a higher room category', enables: 'Room upgrade automation end-to-end' },
          { name: 'Check Occupancy', category: 'Operations', connector: 'Rooms & availability', description: 'Checks whether a given room category is at, above, or below a set occupancy threshold', enables: 'Guardrail logic: "only upgrade if occupancy < 80%"' },
          { name: 'Get Occupancy', category: 'Operations', connector: 'Rooms & availability', description: 'Returns occupancy data (% and absolute numbers) across categories', enables: 'Data-driven upgrade and inventory decisions' },
        ],
      },
      {
        title: 'Products & Amenities',
        emoji: '🛍️',
        components: [
          { name: 'Get All Products', category: 'Operations', connector: 'Products & services', description: 'Returns all products configured at the property (amenities, services, packages)', enables: 'Building product selection menus in templates' },
          { name: 'Get Products for Reservation', category: 'Operations', connector: 'Rates & restrictions', description: 'Gets which products are already attached to a specific reservation', enables: 'Avoiding duplicate product additions' },
          { name: 'Filter Compatible Products', category: 'Operations', connector: 'Check-in & room assignment', description: 'Filters the full product catalog to only items compatible with a given reservation (date range, space type, etc.)', enables: 'Preventing invalid upsell offers' },
          { name: 'Add Product to Reservation', category: 'Operations', connector: 'Check-in & room assignment', description: 'Adds a product or amenity to an existing reservation', enables: 'Automated amenity gifting and upsell delivery' },
        ],
      },
      {
        title: 'Loyalty',
        emoji: '🤝',
        components: [
          { name: 'Check Loyalty Programs', category: 'Operations', connector: 'Loyalty programs', description: 'Returns the loyalty programs a guest is enrolled in', enables: 'Routing logic: "if guest has loyalty program, then…"' },
          { name: 'Check Loyalty Tiers', category: 'Operations', connector: 'Loyalty memberships & tiers', description: 'Returns a guest\'s current tier within a given loyalty program', enables: 'Tier-based upgrade and gifting rules' },
        ],
      },
      {
        title: 'Notes & Tasks',
        emoji: '📝',
        components: [
          { name: 'Create a Guest Note', category: 'Operations', connector: 'Guest notes, addresses & files', description: 'Appends a note to the guest profile', enables: 'Logging upgrade actions, gifting instructions, or any custom flag on the guest' },
          { name: 'Create Reservation Note', category: 'Operations', connector: 'Reservations', description: 'Appends a note to a specific reservation', enables: 'Reservation-level audit trail of automated actions' },
          { name: 'Create Task', category: 'Operations', connector: 'Tasks & departments', description: 'Creates an operational task in Mews (housekeeping, F&B, concierge)', enables: 'Triggering physical delivery of amenity gifts, room prep instructions' },
          { name: 'Get Departments', category: 'Operations', connector: 'Tasks & departments', description: 'Returns the department list at a property', enables: 'Assigning tasks to the right team' },
        ],
      },
    ],
  },
  {
    id: 'phase2',
    label: 'Phase 2',
    sublabel: 'In Refinement',
    color: 'border-yellow-500',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    status: '⚠️ In refinement',
    groups: [
      {
        title: 'Messaging',
        emoji: '📨',
        components: [
          { name: 'Send SMS', category: 'Operations', connector: 'Messaging', description: 'Sends an SMS message to a guest\'s registered mobile number', enables: 'Upgrade notifications, welcome messages, pre-arrival comms' },
          { name: 'Send WhatsApp', category: 'Operations', connector: 'Messaging', description: 'Sends a WhatsApp message to a guest', enables: 'Same as SMS but via WhatsApp' },
          { name: 'Send Email', category: 'Operations', connector: 'Messaging', description: 'Sends a transactional email to a guest', enables: 'Upgrade confirmations, amenity delivery notices, post-stay follow-ups' },
        ],
      },
      {
        title: 'Event Triggers',
        emoji: '⚡',
        components: [
          { name: 'Reservation Created', category: 'Property event triggers', connector: 'Booking changes', description: 'Fires as soon as a new reservation is made in Mews', enables: 'Instant welcome messages, early upsell sequences' },
          { name: 'Guest Checked In', category: 'Property event triggers', connector: 'Arrivals & departures', description: 'Fires when a guest\'s reservation moves to the "started" state', enables: 'Real-time in-stay automations, room-ready notifications' },
          { name: 'Guest Created', category: 'Property event triggers', connector: 'Guest activity', description: 'Fires when a new guest profile is created', enables: 'Auto-enrollment flows, CRM sync' },
          { name: 'Guest Updated', category: 'Property event triggers', connector: 'Guest activity', description: 'Fires when any field on a guest profile changes', enables: 'Keeping external CRMs or loyalty systems in sync' },
        ],
      },
      {
        title: 'Guest Actions',
        emoji: '🔍',
        components: [
          { name: 'Find Guests', category: 'Operations', connector: 'Guest profiles', description: 'Searches for and retrieves guest profiles by name, email, loyalty number, or other criteria', enables: 'Lookup steps mid-automation, cross-reservation guest matching' },
          { name: 'Change Reservation', category: 'Operations', connector: 'Reservations', description: 'Modifies reservation attributes — rate code, room type, board type, or number of guests', enables: 'Dynamic re-pricing, room swaps, package changes' },
          { name: 'Change Dates', category: 'Operations', connector: 'Reservations', description: 'Updates a reservation\'s arrival or departure date', enables: 'Automated date extensions or early arrival handling' },
        ],
      },
    ],
  },
  {
    id: 'phase3',
    label: 'Phase 3',
    sublabel: 'Planned (Q3 2026+)',
    color: 'border-blue-400',
    badgeColor: 'bg-blue-100 text-blue-800',
    status: '🔜 Planned',
    groups: [
      {
        title: 'Reservations (Advanced)',
        emoji: '🏨',
        components: [
          { name: 'Book Stay', priority: 'P2', category: 'Operations', connector: 'Reservations', description: 'Creates a new reservation programmatically' },
          { name: 'Cancel Reservations', priority: 'P2', category: 'Operations', connector: 'Reservations', description: 'Cancels one or more reservations' },
          { name: 'Find Reservation Items', priority: 'P3', category: 'Operations', connector: 'Reservations', description: 'Returns the products and services attached to a reservation' },
          { name: 'Add Companion', priority: 'P4', category: 'Operations', connector: 'Check-in & room assignment', description: 'Adds a companion guest to an existing reservation' },
        ],
      },
      {
        title: 'Room & Availability Management',
        emoji: '🛏️',
        components: [
          { name: 'Check Availability', priority: 'P1', category: 'Operations', connector: 'Rooms & availability', description: 'Returns available room inventory for a given date range' },
          { name: 'Change Availability', priority: 'P1', category: 'Operations', connector: 'Rooms & availability', description: 'Opens or closes availability for a service' },
          { name: 'Block Room', priority: 'P2', category: 'Operations', connector: 'Room blocks & allocation', description: 'Creates a maintenance/out-of-order block on a room' },
          { name: 'Release Room', priority: 'P2', category: 'Operations', connector: 'Room blocks & allocation', description: 'Removes a maintenance/out-of-order block on a room' },
          { name: 'Add Availability Block', priority: 'P2', category: 'Operations', connector: 'Room blocks & allocation', description: 'Creates a group availability block' },
          { name: 'Find Spaces', priority: 'P3', category: 'Operations', connector: 'Rooms & availability', description: 'Returns all rooms/spaces at a property' },
          { name: 'Find Blocked Rooms', priority: 'P3', category: 'Operations', connector: 'Room blocks & allocation', description: 'Returns current room blocks at the property' },
          { name: 'Find Room Blocks', priority: 'P3', category: 'Operations', connector: 'Room blocks & allocation', description: 'Returns availability blocks at the property' },
          { name: 'Change Space', priority: 'P4', category: 'Operations', connector: 'Rooms & availability', description: 'Updates configuration details for a specific room/space' },
        ],
      },
      {
        title: 'Guest Management (Advanced)',
        emoji: '👤',
        components: [
          { name: 'Change Guest', priority: 'P1', category: 'Operations', connector: 'Guest profiles', description: 'Updates fields on an existing guest profile' },
          { name: 'Add Guest', priority: 'P2', category: 'Operations', connector: 'Guest profiles', description: 'Creates a new guest profile' },
          { name: 'Find Tasks', priority: 'P3', category: 'Operations', connector: 'Tasks & departments', description: 'Searches operational tasks in Mews' },
          { name: 'Add Guest File', priority: 'P4', category: 'Operations', connector: 'Guest notes, addresses & files', description: 'Attaches a file (ID scan, preferences document) to a guest profile' },
        ],
      },
      {
        title: 'Financial Operations',
        emoji: '💳',
        components: [
          { name: 'Find Guest Bills', priority: 'P2', category: 'Operations', connector: 'Bills', description: 'Returns bills associated with a guest' },
          { name: 'Bill Closed', priority: 'P2', category: 'Property event triggers', connector: 'Finance events', description: 'Fires when a bill is finalized and closed' },
          { name: 'Close Bill', priority: 'P2', category: 'Operations', connector: 'Bills', description: 'Closes an open guest bill' },
          { name: 'Add Payment', priority: 'P2', category: 'Operations', connector: 'Payments', description: 'Posts an external payment to a guest account' },
          { name: 'Find Guest Charges', priority: 'P2', category: 'Operations', connector: 'Charges & accounting', description: 'Returns charge line items by guest' },
          { name: 'Add Bill', priority: 'P3', category: 'Operations', connector: 'Bills', description: 'Creates a new bill for a guest' },
          { name: 'Find Charges', priority: 'P3', category: 'Operations', connector: 'Charges & accounting', description: 'Returns all charge/order item records' },
          { name: 'Find Payments', priority: 'P3', category: 'Operations', connector: 'Payments', description: 'Returns payment records' },
          { name: 'Cancel Charges', priority: 'P3', category: 'Operations', connector: 'Charges & accounting', description: 'Voids charge line items' },
          { name: 'Find Exchange Rates', priority: 'P5', category: 'Operations', connector: 'Charges & accounting', description: 'Returns currency exchange rate data' },
          { name: 'Find Accounting Categories', priority: 'P5', category: 'Operations', connector: 'Charges & accounting', description: 'Returns accounting category configuration' },
        ],
      },
      {
        title: 'Products, Services & Rates',
        emoji: '🏷️',
        components: [
          { name: 'Set Restrictions', priority: 'P1', category: 'Operations', connector: 'Rates & restrictions', description: 'Manages rate and availability restrictions' },
          { name: 'Add Restrictions', priority: 'P1', category: 'Operations', connector: 'Rates & restrictions', description: 'Adds rate and availability restrictions' },
          { name: 'Find Rates', priority: 'P2', category: 'Operations', connector: 'Rates & restrictions', description: 'Returns rate plans configured at the property' },
          { name: 'Find Services', priority: 'P2', category: 'Operations', connector: 'Products & services', description: 'Returns all services (room types, spa, F&B)' },
          { name: 'Find Rate Groups', priority: 'P3', category: 'Operations', connector: 'Rates & restrictions', description: 'Returns rate groups configured at the property' },
          { name: 'Add Service Order Note', priority: 'P4', category: 'Operations', connector: 'Products & services', description: 'Adds a note to a service order' },
          { name: 'Find Outlets', priority: 'P4', category: 'Operations', connector: 'Tasks & departments', description: 'Returns POS outlet configuration' },
          { name: 'Find Service Notes', priority: 'P5', category: 'Operations', connector: 'Products & services', description: 'Returns notes on service orders' },
        ],
      },
      {
        title: 'Companies & Configuration',
        emoji: '🏢',
        components: [
          { name: 'Find Companies', priority: 'P3', category: 'Operations', connector: 'Companies', description: 'Returns company profiles linked to corporate accounts' },
          { name: 'Add Company', priority: 'P3', category: 'Operations', connector: 'Companies', description: 'Creates a new company profile' },
          { name: 'Company Created', priority: 'P3', category: 'Property event triggers', connector: 'Company & operations', description: 'Fires when a new company profile is created' },
          { name: 'Find Countries', priority: 'P5', category: 'Operations', connector: 'Configuration', description: 'Returns reference data for country validation logic' },
          { name: 'Find Currencies', priority: 'P5', category: 'Operations', connector: 'Configuration', description: 'Returns reference data for currency validation logic' },
        ],
      },
    ],
  },
];

const priorityConfig: Record<Priority, { label: string; color: string }> = {
  P1: { label: 'P1', color: 'bg-red-100 text-red-700' },
  P2: { label: 'P2', color: 'bg-orange-100 text-orange-700' },
  P3: { label: 'P3', color: 'bg-yellow-100 text-yellow-700' },
  P4: { label: 'P4', color: 'bg-blue-100 text-blue-700' },
  P5: { label: 'P5', color: 'bg-gray-100 text-gray-500' },
};

function PriorityBadge({ p }: { p: Priority }) {
  const cfg = priorityConfig[p];
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>;
}

function PhaseCard({ phase }: { phase: Phase }) {
  const [open, setOpen] = useState(phase.id === 'phase1');
  const total = phase.groups.reduce((s, g) => s + g.components.length, 0);

  return (
    <div className={`border-2 ${phase.color} rounded-lg overflow-hidden`}>
      {/* Phase header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-bold text-gray-900">{phase.label}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${phase.badgeColor}`}>{phase.sublabel}</span>
            </div>
            <p className="text-sm text-gray-500">{total} components · {phase.status}</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-200 divide-y divide-gray-100">
          {phase.groups.map((group) => (
            <div key={group.title} className="px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                {group.emoji} {group.title}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {phase.id === 'phase3' && <th className="text-left pb-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-12">Pri</th>}
                      <th className="text-left pb-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Component</th>
                      <th className="text-left pb-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Connector</th>
                      <th className="text-left pb-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">What it does</th>
                      {phase.id !== 'phase3' && <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Enables</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {group.components.map((c) => (
                      <tr key={c.name} className="hover:bg-gray-50">
                        {phase.id === 'phase3' && (
                          <td className="py-3 pr-4 align-top">
                            {c.priority && <PriorityBadge p={c.priority} />}
                          </td>
                        )}
                        <td className="py-3 pr-4 align-top font-semibold text-gray-900 whitespace-nowrap">{c.name}</td>
                        <td className="py-3 pr-4 align-top text-gray-500 hidden md:table-cell whitespace-nowrap">{c.connector}</td>
                        <td className="py-3 pr-4 align-top text-gray-700 leading-relaxed">{c.description}</td>
                        {phase.id !== 'phase3' && (
                          <td className="py-3 align-top text-gray-500 leading-relaxed hidden lg:table-cell">{c.enables}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RoadmapSection() {
  const totalLive = phases[0].groups.reduce((s, g) => s + g.components.length, 0);
  const totalPhase2 = phases[1].groups.reduce((s, g) => s + g.components.length, 0);
  const totalPhase3 = phases[2].groups.reduce((s, g) => s + g.components.length, 0);

  return (
    <>
      {/* Intro */}
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          This page gives a clear view of every connector and component in Mews Automations — what it does, which use cases it unlocks, and when it will be available. Use it to set accurate expectations with customers and prospects.
        </p>
        <p className="text-gray-600 leading-relaxed text-sm">
          Components are grouped into delivery phases. Status key: <strong>✅ Live in pilot</strong> · <strong>⚠️ In refinement</strong> · <strong>🔜 Planned</strong>
        </p>
      </section>

      {/* Summary stats */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { label: 'Phase 1 — Live', count: totalLive, color: 'border-green-500', badge: 'bg-green-100 text-green-800', status: '✅ Live in pilot' },
          { label: 'Phase 2 — In Refinement', count: totalPhase2, color: 'border-yellow-500', badge: 'bg-yellow-100 text-yellow-800', status: '⚠️ In refinement' },
          { label: 'Phase 3 — Planned', count: totalPhase3, color: 'border-blue-400', badge: 'bg-blue-100 text-blue-800', status: '🔜 Q3 2026+' },
        ].map((s) => (
          <div key={s.label} className={`border-2 ${s.color} rounded-lg p-5 bg-white`}>
            <p className="text-3xl font-bold text-gray-900 mb-1">{s.count}</p>
            <p className="text-sm font-semibold text-gray-700 mb-2">{s.label}</p>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${s.badge}`}>{s.status}</span>
          </div>
        ))}
      </section>

      {/* Priority legend (Phase 3 only) */}
      <section className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phase 3 priority key (customer value)</p>
        <div className="flex flex-wrap gap-3 text-xs">
          {(Object.entries(priorityConfig) as [Priority, { label: string; color: string }][]).map(([key, cfg]) => (
            <span key={key} className={`px-2.5 py-1 rounded font-semibold ${cfg.color}`}>
              {key} — {key === 'P1' ? 'Revenue-critical' : key === 'P2' ? 'Common workflows' : key === 'P3' ? 'Segment-specific' : key === 'P4' ? 'Niche / low-frequency' : 'Reference data'}
            </span>
          ))}
        </div>
      </section>

      {/* Phase cards */}
      {phases.map((phase) => (
        <PhaseCard key={phase.id} phase={phase} />
      ))}
    </>
  );
}
