import { useState } from 'react';

type Priority = 'P1' | 'P2' | 'P3' | 'P4';
type ComponentType = 'Action' | 'Trigger' | 'Utility';

interface RoadmapComponent {
  name: string;
  type: ComponentType;
  category: string;
  purpose: string;
  upsellBet?: boolean;
  survey?: string;
}

interface PriorityGroup {
  priority: Priority;
  label: string;
  sublabel: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  components: RoadmapComponent[];
}

const groups: PriorityGroup[] = [
  {
    priority: 'P1',
    label: 'P1 — Next to ship',
    sublabel: 'Revenue-critical',
    color: 'bg-red-50',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    borderColor: 'border-red-300',
    components: [
      { name: 'Get Reservations', type: 'Action', category: 'Reservations (Advanced)', purpose: 'Returns reservations whose stay interacts with a configurable date window — arriving, in-house, or departing — generalising Get Eligible Arrivals beyond a single arrival date.' },
      { name: 'Find Guests', type: 'Action', category: 'Guest Actions', purpose: 'Searches guest profiles by name, email or loyalty number mid-automation.', survey: '13 must-have / net +18 — highest demand in the card sort, and an enabler for most routing flows.' },
      { name: 'Change Reservation', type: 'Action', category: 'Guest Actions', purpose: 'Modifies rate code, room type, board type, or number of guests on an existing reservation.', survey: '12 must-have / net +18.' },
      { name: 'Check Availability', type: 'Action', category: 'Room & Availability', purpose: 'Returns available room inventory for a given date range.', survey: '9 must-have / net +20 — highest net score; primarily plumbing/guardrail for restriction and upgrade flows.' },
      { name: 'Set Restrictions', type: 'Action', category: 'Rates & Restrictions', purpose: 'Creates or updates a booking restriction (minimum stay, closed to arrival, etc.).', survey: '11 must-have / net +19 — strongly validated.' },
      { name: 'Add Restrictions', type: 'Action', category: 'Rates & Restrictions', purpose: 'Adds a new rate or availability restriction.', survey: '10 must-have / net +15.' },
      { name: 'Clear Restrictions', type: 'Action', category: 'Rates & Restrictions', purpose: 'Removes (reopens) an existing booking restriction for a scope and date range — the counterpart to Set Restrictions.' },
      { name: 'Change Guest', type: 'Action', category: 'Guest Management (Advanced)', purpose: 'Updates fields on an existing guest profile.', survey: '10 must-have / net +14.' },
      { name: 'Change Availability', type: 'Action', category: 'Room & Availability', purpose: 'Opens or closes availability for a service.', survey: '7 must-have / net +8.' },
      { name: 'Close Bill', type: 'Action', category: 'Financial Operations', purpose: 'Finalises and closes an open guest bill.', survey: '10 must-have / net +15 — promoted from P2. "Automatically close bills" was a direct open-text ask.' },
      { name: 'Add Payment', type: 'Action', category: 'Financial Operations', purpose: 'Posts an external payment to a guest account.', survey: '11 must-have / net +7 — promoted from P2. Segment-critical for payment-heavy properties.' },
      { name: 'Reservation Product Added', type: 'Trigger', category: 'Upsells', purpose: 'Fires when a product is added to a reservation across any touchpoint — the "accepted and paid" signal for upsell fulfilment flows.', upsellBet: true },
      { name: 'Set Reservation Time', type: 'Action', category: 'Guest Actions', purpose: 'Sets the time of day for check-in or check-out on a reservation. The fulfilment action for late-checkout and early-check-in upsells.', upsellBet: true },
    ],
  },
  {
    priority: 'P2',
    label: 'P2 — Planned',
    sublabel: 'Common workflows',
    color: 'bg-orange-50',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
    borderColor: 'border-orange-300',
    components: [
      { name: 'Find Tasks', type: 'Action', category: 'Guest Management (Advanced)', purpose: 'Searches operational tasks in Mews — entry point for task-routing flows.', survey: '10 must-have / net +13 — promoted from P3.' },
      { name: 'Change Dates', type: 'Action', category: 'Guest Actions', purpose: 'Updates a reservation\'s check-in or check-out date (early arrival, date extension).', survey: '8 must-have / net +5.' },
      { name: 'Book Stay', type: 'Action', category: 'Reservations (Advanced)', purpose: 'Creates a new reservation programmatically.', survey: '10 must-have but net +8 — polarised. Power users want it; many see no automation use.' },
      { name: 'Cancel Reservations', type: 'Action', category: 'Reservations (Advanced)', purpose: 'Cancels one or more reservations.', survey: '7 must-have / net +5.' },
      { name: 'Block Room', type: 'Action', category: 'Room & Availability', purpose: 'Creates a maintenance or out-of-order block on a room.', survey: '5 must-have / net +3.' },
      { name: 'Add Guest', type: 'Action', category: 'Guest Management (Advanced)', purpose: 'Creates a new guest profile programmatically.', survey: '7 must-have / net +6.' },
      { name: 'Find Guest Bills', type: 'Action', category: 'Financial Operations', purpose: 'Returns bills associated with a guest.', survey: '8 must-have / net +9.' },
      { name: 'Authorise / Capture Payment', type: 'Action', category: 'Financial Operations', purpose: 'Authorises and/or captures a payment against a guest\'s saved method — closes the gap so a paid upsell can take payment.', upsellBet: true },
      { name: 'Payment Succeeded / Payment Failed', type: 'Trigger', category: 'Financial Operations', purpose: 'Reacts to the outcome of a payment. Fulfil on success, unwind or notify staff on failure.', upsellBet: true },
      { name: 'Reassign Space', type: 'Action', category: 'Room & Availability', purpose: 'Moves a reservation to a specific named room or space (e.g. a sea-view room sold as an upsell), as opposed to a category-level upgrade.', upsellBet: true },
    ],
  },
  {
    priority: 'P3',
    label: 'P3 — In backlog',
    sublabel: 'Segment-specific',
    color: 'bg-yellow-50',
    badgeBg: 'bg-yellow-100',
    badgeText: 'text-yellow-700',
    borderColor: 'border-yellow-300',
    components: [
      { name: 'Find Reservation Items', type: 'Action', category: 'Reservations (Advanced)', purpose: 'Returns products and services attached to a reservation.', survey: '8 must-have / net +8.' },
      { name: 'Add Guest File', type: 'Action', category: 'Guest Management (Advanced)', purpose: 'Attaches a file (ID scan, preferences doc) to a guest profile. GDPR is the gating constraint.', survey: '6 must-have / net +9 — raised from P4.' },
      { name: 'Find Spaces', type: 'Action', category: 'Room & Availability', purpose: 'Returns all rooms and spaces at the property.', survey: '3 must-have / net −1.' },
      { name: 'Find Blocked Rooms', type: 'Action', category: 'Room & Availability', purpose: 'Returns current out-of-order blocks at the property.', survey: '1 must-have / net −9.' },
      { name: 'Release Room', type: 'Action', category: 'Room & Availability', purpose: 'Removes a maintenance block from a room.', survey: '1 must-have / net −4 — demoted from P2.' },
      { name: 'Add Bill', type: 'Action', category: 'Financial Operations', purpose: 'Creates a new empty bill for a guest.', survey: '5 must-have / net −6.' },
      { name: 'Find Charges', type: 'Action', category: 'Financial Operations', purpose: 'Returns all charge and order item records matching criteria.', survey: '7 must-have / net +3.' },
      { name: 'Find Payments', type: 'Action', category: 'Financial Operations', purpose: 'Returns payment records matching criteria.', survey: '7 must-have / net +8.' },
      { name: 'Find Guest Charges', type: 'Action', category: 'Financial Operations', purpose: 'Returns charge line items by guest.', survey: '2 must-have / net +4 — demoted from P2.' },
      { name: 'Find Rates', type: 'Action', category: 'Rates & Restrictions', purpose: 'Returns all rate plans configured at the property.', survey: '8 must-have / net −1 — polarised; demoted from P2.' },
      { name: 'Reservation Checked Out', type: 'Trigger', category: 'Guest Actions', purpose: 'Completes the reservation lifecycle. Enables post-stay upsells, late-checkout reconciliation, feedback requests and rebooking offers.', upsellBet: true },
      { name: 'Send Offer with Acceptance', type: 'Action', category: 'Upsells', purpose: 'Presents a priced offer to a guest on a guest-facing surface and captures acceptance — the offer → accept → pay loop for upsells pushed outside Mews channels.', upsellBet: true },
    ],
  },
  {
    priority: 'P4',
    label: 'P4 — Under consideration',
    sublabel: 'Niche / low-frequency',
    color: 'bg-blue-50',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    borderColor: 'border-blue-300',
    components: [
      { name: 'Add Companion', type: 'Action', category: 'Reservations (Advanced)', purpose: 'Adds a companion guest to an existing reservation.', survey: '7 must-have / net +12 (high "useful" inflation).' },
      { name: 'Find Services', type: 'Action', category: 'Rates & Restrictions', purpose: 'Returns all bookable services (room types, spa, F&B).', survey: '4 must-have / net −8 — worst signal in the survey; demoted from P2.' },
      { name: 'Add Availability Block', type: 'Action', category: 'Room & Availability', purpose: 'Creates a group availability block.', survey: '1 must-have / net −10 — second-worst signal; demoted from P2.' },
    ],
  },
];

const typeColors: Record<ComponentType, string> = {
  Action: 'bg-gray-100 text-gray-700',
  Trigger: 'bg-purple-100 text-purple-700',
  Utility: 'bg-teal-100 text-teal-700',
};

function ComponentCard({ c }: { c: RoadmapComponent }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-semibold text-gray-900 text-sm leading-snug">{c.name}</p>
        <div className="flex gap-1.5 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${typeColors[c.type]}`}>{c.type}</span>
          {c.upsellBet && (
            <span className="text-xs px-2 py-0.5 rounded font-medium bg-pink-100 text-pink-700" title="Upsell bet — strategy-driven">Upsell</span>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2">{c.category}</p>
      <p className="text-sm text-gray-700 leading-relaxed">{c.purpose}</p>
      {c.survey && (
        <p className="text-xs text-gray-400 mt-2 italic">{c.survey}</p>
      )}
    </div>
  );
}

function PrioritySection({ group }: { group: PriorityGroup }) {
  const [open, setOpen] = useState(group.priority === 'P1');

  return (
    <div className={`border-2 ${group.borderColor} rounded-lg overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${group.badgeBg} ${group.badgeText}`}>
            {group.priority}
          </span>
          <div className="text-left">
            <p className="font-bold text-gray-900">{group.label}</p>
            <p className="text-sm text-gray-500">{group.components.length} components · {group.sublabel}</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className={`border-t ${group.borderColor} ${group.color} p-5`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {group.components.map((c) => (
              <ComponentCard key={c.name} c={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function RoadmapSection() {
  const total = groups.reduce((s, g) => s + g.components.length, 0);
  const upsellCount = groups.reduce((s, g) => s + g.components.filter(c => c.upsellBet).length, 0);

  return (
    <>
      {/* Intro */}
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          This roadmap covers every connector and component <strong>not yet built</strong>, ordered by priority. Use it to set accurate expectations with customers and prospects about what's coming and when.
        </p>
        <p className="text-gray-600 text-sm">
          Components already live are documented in <strong>Mews Components</strong>. All inputs and outputs below are proposals to be confirmed against the Connector API.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {groups.map((g) => (
          <div key={g.priority} className={`border-2 ${g.borderColor} rounded-lg p-4 bg-white`}>
            <p className="text-2xl font-bold text-gray-900 mb-1">{g.components.length}</p>
            <p className={`text-xs font-bold ${g.badgeText} mb-1`}>{g.priority}</p>
            <p className="text-xs text-gray-500">{g.sublabel}</p>
          </div>
        ))}
      </section>

      {/* Legend */}
      <section className="flex flex-wrap items-center gap-3 px-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Legend:</span>
        {(Object.entries(typeColors) as [ComponentType, string][]).map(([type, cls]) => (
          <span key={type} className={`text-xs px-2 py-0.5 rounded font-medium ${cls}`}>{type}</span>
        ))}
        <span className="text-xs px-2 py-0.5 rounded font-medium bg-pink-100 text-pink-700">Upsell</span>
        <span className="text-xs text-gray-400">— strategy-driven, not demand-ranked</span>
        <span className="ml-auto text-xs text-gray-400">{total} total · {upsellCount} upsell-bet components</span>
      </section>

      {/* Priority groups */}
      {groups.map((group) => (
        <PrioritySection key={group.priority} group={group} />
      ))}
    </>
  );
}
