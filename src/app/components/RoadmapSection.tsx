import { useState } from 'react';

type Priority = 'P1' | 'P2' | 'P3' | 'P4';
type ComponentType = 'Action' | 'Trigger' | 'Utility';

interface InputField {
  name: string;
  required: 'Required' | 'Optional';
  type: string;
  notes?: string;
}

interface RoadmapComponent {
  name: string;
  type: ComponentType;
  category: string;
  purpose: string;
  upsellBet?: boolean;
  survey?: string;
  inputs?: InputField[];
  outputs?: string;
  useCase?: { title: string; flow: string };
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
      {
        name: 'Get Reservations',
        type: 'Action',
        category: 'Reservations (Advanced)',
        purpose: 'Returns reservations whose stay interacts with a configurable date window — arriving, in-house, or departing — generalising Get Eligible Arrivals beyond a single arrival date.',
        inputs: [
          { name: 'Reference Date', required: 'Optional', type: 'Date', notes: 'Anchor for offsets. Defaults to today.' },
          { name: 'Window Start Offset (days)', required: 'Optional', type: 'Number', notes: 'Relative to Reference Date. Negative = past (e.g. −3). Default 0.' },
          { name: 'Window End Offset (days)', required: 'Optional', type: 'Number', notes: 'Relative to Reference Date. Positive = future (e.g. +3). Default 0.' },
          { name: 'Absolute Start / End Date', required: 'Optional', type: 'Date', notes: 'Explicit range alternative to offsets; overrides offsets if set.' },
          { name: 'Include reservations that are', required: 'Required', type: 'Multi-select', notes: 'Arriving / In-house / Departing. At least one required.' },
          { name: 'Reservation Status', required: 'Optional', type: 'Multi-select', notes: 'Filter by state. Default: confirmed.' },
          { name: 'Bookable Services', required: 'Optional', type: 'Multi-select (dynamic)', notes: 'Scope to services. If empty, all.' },
        ],
        outputs: 'Array of reservation items — Reservation ID, Confirmation Number, Guest ID, Arrival Date, Departure Date, Assigned Space, Rate, Status. Optional second port with just an array of Reservation IDs for direct wiring into For Each.',
        useCase: { title: 'In-house upsell run', flow: 'Cron Scheduler (daily 10am) → Get Reservations (In-house, window −0/+2) → For Each → Check Compatibility → Send SMS upsell offer to mid-stay guests.' },
      },
      {
        name: 'Find Guests',
        type: 'Action',
        category: 'Guest Actions',
        purpose: 'Searches guest profiles by name, email or loyalty number mid-automation.',
        survey: '13 must-have / net +18 — highest demand in the card sort, and an enabler for most routing flows.',
        inputs: [
          { name: 'Search criteria', required: 'Required', type: 'Text', notes: 'Name, email, or loyalty number.' },
          { name: 'Limit', required: 'Optional', type: 'Number', notes: 'Cap on results returned.' },
        ],
        outputs: 'Array of matching guest profiles. Feed into For Each to process each match.',
        useCase: { title: 'Loyalty lookup on check-in', flow: 'Reservation Checked In → Find Guests (by email from trigger) → Condition (loyalty code not empty) → Add Task for front-desk VIP welcome.' },
      },
      {
        name: 'Change Reservation',
        type: 'Action',
        category: 'Guest Actions',
        purpose: 'Modifies rate code, room type, board type, or number of guests on an existing reservation.',
        survey: '12 must-have / net +18.',
        inputs: [
          { name: 'Reservation ID', required: 'Required', type: 'Text (GUID)', notes: 'From upstream trigger or retrieval step.' },
          { name: 'Rate', required: 'Optional', type: 'GUID (dynamic)', notes: 'New rate to apply.' },
          { name: 'Room type', required: 'Optional', type: 'GUID (dynamic)', notes: 'New space category.' },
          { name: 'Board type', required: 'Optional', type: 'Enum', notes: 'e.g. RoomOnly, BedAndBreakfast.' },
          { name: 'Guest count', required: 'Optional', type: 'Number', notes: 'New occupancy count.' },
        ],
        outputs: 'Updated reservation detail — Reservation ID, new Rate, new Room Type, updated Guest Count.',
        useCase: { title: 'Auto-apply promotional rate', flow: 'Reservation Created → Condition (origin = ChannelManager AND rate = standard) → Change Reservation (apply promo rate) → Send SMS confirming rate upgrade.' },
      },
      {
        name: 'Check Availability',
        type: 'Action',
        category: 'Room & Availability',
        purpose: 'Returns available room inventory for a given date range.',
        survey: '9 must-have / net +20 — highest net score; primarily plumbing/guardrail for restriction and upgrade flows.',
        inputs: [
          { name: 'Bookable Service', required: 'Required', type: 'Dropdown (dynamic)', notes: 'Availability is service-scoped.' },
          { name: 'Space Category', required: 'Optional', type: 'Multi-select (dynamic)', notes: 'If empty, all categories in the service.' },
          { name: 'Start Date', required: 'Required', type: 'Date', notes: 'Range start.' },
          { name: 'End Date', required: 'Required', type: 'Date', notes: 'Range end.' },
          { name: 'Minimum Available Count', required: 'Optional', type: 'Number', notes: 'Acts as a threshold guard — use to trigger actions only when below this count.' },
        ],
        outputs: 'Items array per category: Category ID, Category Name, Available Count, Is Available (boolean vs minimum). Do NOT cache — availability is volatile.',
        useCase: { title: 'Pre-sell guardrail', flow: 'Cron Scheduler → Check Availability (Suites, arrival tomorrow) → Condition (AvailableCount < 2) → Set Restrictions (close to arrival for that category).' },
      },
      {
        name: 'Set Restrictions',
        type: 'Action',
        category: 'Rates & Restrictions',
        purpose: 'Creates or updates a booking restriction (minimum stay, closed to arrival, etc.).',
        survey: '11 must-have / net +19 — strongly validated; restrictions were a recurring open-text theme.',
        inputs: [
          { name: 'Rate / service scope', required: 'Required', type: 'GUID (dynamic)', notes: 'Rate or service to restrict.' },
          { name: 'Date range', required: 'Required', type: 'Date range', notes: 'Inclusive from/to.' },
          { name: 'Restriction type', required: 'Required', type: 'Enum', notes: 'MinStay, ClosedToArrival, ClosedToDeparture, ClosedToStay, etc.' },
          { name: 'Value', required: 'Optional', type: 'Number', notes: 'e.g. minimum nights for MinStay restriction.' },
        ],
        outputs: 'Confirmation of restriction applied — restriction ID, scope, date range, type.',
        useCase: { title: 'Weekend MinLOS enforcement', flow: 'Cron Scheduler (Friday 6pm) → Check Availability (weekends, next 4 weeks) → Condition (occupancy > 70%) → Set Restrictions (MinStay = 2 nights for Fri–Sun).' },
      },
      {
        name: 'Add Restrictions',
        type: 'Action',
        category: 'Rates & Restrictions',
        purpose: 'Adds a new rate or availability restriction.',
        survey: '10 must-have / net +15.',
        inputs: [
          { name: 'Rate / service scope', required: 'Required', type: 'GUID (dynamic)', notes: 'Rate or service to restrict.' },
          { name: 'Date range', required: 'Required', type: 'Date range', notes: 'Inclusive from/to.' },
          { name: 'Restriction definition', required: 'Required', type: 'Mixed', notes: 'Type + value of the new restriction.' },
        ],
        outputs: 'New restriction reference — restriction ID and applied scope.',
        useCase: { title: 'Automated stop-sell on last room', flow: 'Check Availability → Condition (AvailableCount = 1) → Add Restrictions (ClosedToArrival for tomorrow) → Notify revenue manager via Slack.' },
      },
      {
        name: 'Clear Restrictions',
        type: 'Action',
        category: 'Rates & Restrictions',
        purpose: 'Removes (reopens) an existing booking restriction for a scope and date range — the counterpart to Set Restrictions.',
        inputs: [
          { name: 'Rate / service scope', required: 'Required', type: 'GUID (dynamic)', notes: 'Must mirror the scope used in Set Restrictions.' },
          { name: 'Date range', required: 'Required', type: 'Date range', notes: 'Inclusive from/to; same date model as Set.' },
          { name: 'Restriction type to clear', required: 'Optional', type: 'Enum', notes: 'Clear a specific type or all if empty.' },
        ],
        outputs: 'Confirmation of cleared restrictions — scope, date range, types removed.',
        useCase: { title: 'Reception open/close loop', flow: 'Cron Scheduler (reception close 10pm) → Set Restrictions (ClosedToStay, tonight) → Cron Scheduler (reception open 7am) → Clear Restrictions (reopen today).' },
      },
      {
        name: 'Change Guest',
        type: 'Action',
        category: 'Guest Management (Advanced)',
        purpose: 'Updates fields on an existing guest profile.',
        survey: '10 must-have / net +14.',
        inputs: [
          { name: 'Guest ID', required: 'Required', type: 'Text (GUID)', notes: 'From upstream trigger or retrieval.' },
          { name: 'Fields to change', required: 'Required', type: 'Mixed', notes: 'Any writable profile field: name, email, phone, nationality, language, loyalty code.' },
        ],
        outputs: 'Updated guest profile — Guest ID plus all changed field values.',
        useCase: { title: 'Sync CRM data to Mews profile', flow: 'HTTP Webhook (CRM update event) → Find Guests (by email) → Change Guest (update nationality and language code from CRM payload).' },
      },
      {
        name: 'Change Availability',
        type: 'Action',
        category: 'Room & Availability',
        purpose: 'Opens or closes availability for a service.',
        survey: '7 must-have / net +8.',
        inputs: [
          { name: 'Service', required: 'Required', type: 'GUID (dynamic)', notes: 'Service to open or close.' },
          { name: 'Date range', required: 'Required', type: 'Date range', notes: 'Dates to affect.' },
          { name: 'Open / Close', required: 'Required', type: 'Boolean / Enum', notes: 'Open = sell; Close = stop-sell.' },
        ],
        outputs: 'Confirmation of availability change — service, date range, new state.',
        useCase: { title: 'Event blackout', flow: 'HTTP Webhook (event booked in venue system) → Change Availability (Close, event dates) → Notify channel manager via Slack.' },
      },
      {
        name: 'Close Bill',
        type: 'Action',
        category: 'Financial Operations',
        purpose: 'Finalises and closes an open guest bill.',
        survey: '10 must-have / net +15 — promoted from P2; "automatically close bills" was a direct open-text ask.',
        inputs: [
          { name: 'Bill ID', required: 'Required', type: 'Text (GUID)', notes: 'From Find Guest Bills or upstream step.' },
        ],
        outputs: 'Closed bill confirmation — Bill ID, closed timestamp, final balance.',
        useCase: { title: 'Auto-close zero-balance bills at checkout', flow: 'Reservation Checked Out → Find Guest Bills (for that reservation) → For Each → Condition (balance = 0) → Close Bill.' },
      },
      {
        name: 'Add Payment',
        type: 'Action',
        category: 'Financial Operations',
        purpose: 'Posts an external payment to a guest account.',
        survey: '11 must-have / net +7 — promoted from P2. Segment-critical for payment-heavy properties (eVoucher, bank-transfer OTAs, PayPal).',
        inputs: [
          { name: 'Bill / account', required: 'Required', type: 'Text (GUID)', notes: 'The bill to post payment against.' },
          { name: 'Amount', required: 'Required', type: 'Number', notes: 'Payment amount.' },
          { name: 'Currency', required: 'Required', type: 'Enum', notes: 'ISO 4217 currency code.' },
          { name: 'Payment type', required: 'Required', type: 'Enum', notes: 'e.g. Cash, BankTransfer, eVoucher.' },
        ],
        outputs: 'Payment record — payment ID, amount, currency, timestamp, type.',
        useCase: { title: 'Bank-transfer OTA reconciliation', flow: 'HTTP Webhook (bank transfer confirmed) → Find Guests (by booking ref) → Find Guest Bills → Add Payment (BankTransfer, amount from webhook).' },
      },
      {
        name: 'Reservation Product Added',
        type: 'Trigger',
        category: 'Upsells',
        purpose: 'Fires when a product is added to a reservation across any touchpoint — the "accepted and paid" signal for upsell fulfilment flows.',
        upsellBet: true,
        inputs: [
          { name: 'Product filter', required: 'Optional', type: 'Multi-select (dynamic)', notes: 'Restrict to specific upsell products. If empty, fires for any product.' },
          { name: 'Service scope', required: 'Optional', type: 'Multi-select (dynamic)', notes: 'Limit to products in given services.' },
          { name: 'Touchpoint filter', required: 'Optional', type: 'Multi-select', notes: 'BE / OCI / Kiosk / Operations. If empty, all touchpoints.' },
        ],
        outputs: 'Reservation ID, Guest ID, Product ID + name, Quantity, Date range, Touchpoint / origin.',
        useCase: { title: 'Late checkout fulfilment', flow: 'Reservation Product Added (filter: Late Checkout product) → Set Reservation Time (check-out = 14:00) → Send SMS confirming new checkout time.' },
      },
      {
        name: 'Set Reservation Time',
        type: 'Action',
        category: 'Guest Actions',
        purpose: 'Sets the time of day for check-in or check-out on a reservation. The fulfilment action for late-checkout and early-check-in upsells.',
        upsellBet: true,
        inputs: [
          { name: 'Reservation ID', required: 'Required', type: 'Text (GUID)', notes: 'From upstream trigger.' },
          { name: 'New time', required: 'Required', type: 'Time', notes: 'Time of day for the selected direction (HH:mm).' },
          { name: 'Direction', required: 'Required', type: 'Enum', notes: 'CheckIn or CheckOut.' },
        ],
        outputs: 'Updated reservation detail — Reservation ID, Direction, new time applied.',
        useCase: { title: 'Early check-in upsell fulfilment', flow: 'Reservation Product Added (filter: Early Check-in product) → Set Reservation Time (CheckIn = 10:00) → Add Note to Reservation ("Early check-in at 10:00 purchased") → Send SMS confirmation.' },
      },
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
      {
        name: 'Find Tasks',
        type: 'Action',
        category: 'Guest Management (Advanced)',
        purpose: 'Searches operational tasks in Mews — entry point for task-routing flows.',
        survey: '10 must-have / net +13 — promoted from P3.',
        inputs: [
          { name: 'Status filter', required: 'Optional', type: 'Enum', notes: 'Open, Closed, All.' },
          { name: 'Department filter', required: 'Optional', type: 'GUID (dynamic)', notes: 'Scope to a specific department.' },
          { name: 'Date filter', required: 'Optional', type: 'Date range', notes: 'Tasks due within this range.' },
        ],
        outputs: 'Array of matching tasks — Task ID, Name, Description, Department, Status, Deadline, Reservation ID (if linked).',
        useCase: { title: 'Overdue task escalation', flow: 'Cron Scheduler (hourly) → Find Tasks (Open, deadline < now) → For Each → Condition (age > 2h) → Send SMS to department manager.' },
      },
      {
        name: 'Change Dates',
        type: 'Action',
        category: 'Guest Actions',
        purpose: "Updates a reservation's check-in or check-out date (early arrival, date extension).",
        survey: '8 must-have / net +5.',
        inputs: [
          { name: 'Reservation ID', required: 'Required', type: 'Text (GUID)', notes: 'From upstream trigger or retrieval.' },
          { name: 'New Start Date', required: 'Optional', type: 'Date', notes: 'New check-in date.' },
          { name: 'New End Date', required: 'Optional', type: 'Date', notes: 'New check-out date.' },
        ],
        outputs: 'Updated reservation detail — Reservation ID, new Arrival, new Departure.',
        useCase: { title: 'Guest-requested extension', flow: 'HTTP Webhook (guest submits extension request via form) → Get Reservations (find by confirmation number) → Check Availability → Change Dates (new checkout) → Send SMS confirmation.' },
      },
      {
        name: 'Book Stay',
        type: 'Action',
        category: 'Reservations (Advanced)',
        purpose: 'Creates a new reservation programmatically.',
        survey: '10 must-have but net +8 — polarised (6 not-relevant). Power users want it; many see no automation use.',
        inputs: [
          { name: 'Service', required: 'Required', type: 'GUID (dynamic)', notes: 'Bookable service to create the reservation under.' },
          { name: 'Rate', required: 'Required', type: 'GUID (dynamic)', notes: 'Rate plan to apply.' },
          { name: 'Dates', required: 'Required', type: 'Date range', notes: 'Arrival and departure.' },
          { name: 'Guest', required: 'Required', type: 'GUID', notes: 'Guest profile to attach.' },
          { name: 'Category', required: 'Optional', type: 'GUID (dynamic)', notes: 'Room category preference.' },
          { name: 'Occupancy', required: 'Optional', type: 'Number', notes: 'Number of guests.' },
        ],
        outputs: 'New Reservation ID, Confirmation Number.',
        useCase: { title: 'Loyalty rebooking offer', flow: "Cron Scheduler → Find Guests (loyalty tier = Platinum, no future reservations) → Book Stay (complimentary rate, next available weekend) → Send SMS \"We've saved a room for you.\"" },
      },
      {
        name: 'Cancel Reservations',
        type: 'Action',
        category: 'Reservations (Advanced)',
        purpose: 'Cancels one or more reservations.',
        survey: '7 must-have / net +5.',
        inputs: [
          { name: 'Reservation IDs', required: 'Required', type: 'Text (JSON array)', notes: 'One or more reservation IDs to cancel.' },
          { name: 'Reason', required: 'Optional', type: 'Text', notes: 'Cancellation reason recorded on the reservation.' },
        ],
        outputs: 'Cancelled IDs array, Failed IDs array (with reasons).',
        useCase: { title: 'No-show auto-cancel at midnight', flow: 'Cron Scheduler (midnight) → Get Reservations (Arriving, today) → For Each → Condition (not checked in AND guarantee = none) → Cancel Reservations (no-show policy) → Send notification to revenue.' },
      },
      {
        name: 'Block Room',
        type: 'Action',
        category: 'Room & Availability',
        purpose: 'Creates a maintenance or out-of-order block on a room.',
        survey: '5 must-have / net +3.',
        inputs: [
          { name: 'Room / space', required: 'Required', type: 'GUID (dynamic)', notes: 'The specific room to block.' },
          { name: 'Date range', required: 'Required', type: 'Date range', notes: 'Duration of the block.' },
          { name: 'Reason', required: 'Optional', type: 'Text', notes: 'Maintenance reason shown to staff.' },
        ],
        outputs: 'Block ID, Room ID, blocked date range.',
        useCase: { title: 'Maintenance block from work order', flow: 'HTTP Webhook (maintenance system creates work order) → Block Room (room from webhook, dates from work order) → Add Task (Maintenance dept: "Room blocked for repair, see work order #X").' },
      },
      {
        name: 'Add Guest',
        type: 'Action',
        category: 'Guest Management (Advanced)',
        purpose: 'Creates a new guest profile programmatically.',
        survey: '7 must-have / net +6.',
        inputs: [
          { name: 'Name (First + Last)', required: 'Required', type: 'Text', notes: 'Guest name.' },
          { name: 'Email', required: 'Optional', type: 'Text', notes: 'Guest email address.' },
          { name: 'Phone', required: 'Optional', type: 'Text', notes: 'Guest phone number.' },
          { name: 'Nationality code', required: 'Optional', type: 'Text', notes: 'ISO 3166-1 alpha-2.' },
          { name: 'Language code', required: 'Optional', type: 'Text', notes: 'e.g. en-US, de-DE.' },
        ],
        outputs: 'New Guest ID.',
        useCase: { title: 'Kiosk walk-in profile creation', flow: 'HTTP Webhook (kiosk walk-in form submitted) → Add Guest (name + email from form) → Book Stay (one-night, standard rate) → Send SMS with confirmation number.' },
      },
      {
        name: 'Find Guest Bills',
        type: 'Action',
        category: 'Financial Operations',
        purpose: 'Returns bills associated with a guest.',
        survey: '8 must-have / net +9.',
        inputs: [
          { name: 'Guest ID', required: 'Optional', type: 'Text (GUID)', notes: 'Find bills by guest.' },
          { name: 'Reservation ID', required: 'Optional', type: 'Text (GUID)', notes: 'Find bills by reservation.' },
          { name: 'Status filter', required: 'Optional', type: 'Enum', notes: 'Open, Closed, All.' },
        ],
        outputs: 'Array of bills — Bill ID, Status, Balance, Currency, Reservation ID.',
        useCase: { title: 'Pre-departure balance alert', flow: 'Cron Scheduler (8am) → Get Reservations (Departing, today) → For Each → Find Guest Bills (open bills) → Condition (balance > 0) → Send SMS "You have an outstanding balance of X."' },
      },
      {
        name: 'Authorise / Capture Payment',
        type: 'Action',
        category: 'Financial Operations',
        purpose: "Authorises and/or captures a payment against a guest's saved method — closes the gap so a paid upsell can take payment.",
        upsellBet: true,
        inputs: [
          { name: 'Bill / account', required: 'Required', type: 'Text (GUID)', notes: 'Bill to charge against.' },
          { name: 'Amount', required: 'Required', type: 'Number', notes: 'Amount to authorise or capture.' },
          { name: 'Currency', required: 'Required', type: 'Enum', notes: 'ISO 4217.' },
          { name: 'Mode', required: 'Required', type: 'Enum', notes: 'AuthoriseOnly vs AuthoriseAndCapture.' },
        ],
        outputs: 'Payment / authorisation record — Auth ID, Amount, Status, Timestamp.',
        useCase: { title: 'Upsell payment on acceptance', flow: 'Reservation Product Added (upsell product) → Find Guest Bills → Authorise / Capture Payment (amount = product price, AuthoriseAndCapture) → Set Reservation Time (fulfilment).' },
      },
      {
        name: 'Payment Succeeded / Payment Failed',
        type: 'Trigger',
        category: 'Financial Operations',
        purpose: 'Reacts to the outcome of a payment. Fulfil on success, unwind or notify staff on failure.',
        upsellBet: true,
        outputs: 'Reservation ID, Guest ID, Amount, Currency, Payment type, Result (Success / Failed), Failure reason.',
        useCase: { title: 'Failed payment staff alert', flow: 'Payment Failed → Condition (payment type = upsell) → Add Task (Front Desk: "Payment failed for upsell on reservation #X — contact guest") → Send SMS to guest with alternative payment link.' },
      },
      {
        name: 'Reassign Space',
        type: 'Action',
        category: 'Room & Availability',
        purpose: 'Moves a reservation to a specific named room or space (e.g. a sea-view room sold as an upsell), as opposed to a category-level upgrade.',
        upsellBet: true,
        inputs: [
          { name: 'Reservation ID', required: 'Required', type: 'Text (GUID)', notes: 'Reservation to move.' },
          { name: 'Target space', required: 'Required', type: 'GUID (dynamic)', notes: 'Specific room or space to assign.' },
        ],
        outputs: 'Updated reservation assignment — Reservation ID, new Space ID, Space name.',
        useCase: { title: 'Sea-view room upsell fulfilment', flow: 'Reservation Product Added (filter: Sea View product) → Find Spaces (category = Deluxe Sea View, available) → Reassign Space (first available sea-view room) → Send SMS "Your sea-view room is ready."' },
      },
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
      {
        name: 'Find Reservation Items',
        type: 'Action',
        category: 'Reservations (Advanced)',
        purpose: 'Returns products and services attached to a reservation.',
        survey: '8 must-have / net +8.',
        inputs: [
          { name: 'Reservation ID', required: 'Required', type: 'Text (GUID)', notes: 'Reservation to inspect.' },
        ],
        outputs: 'Array of reservation items — Item ID, Product name, Quantity, Start/End dates, Amount.',
        useCase: { title: 'Detect breakfast inclusion', flow: 'Reservation Created → Find Reservation Items → Condition (items includes "Breakfast") → Skip upsell flow → else → Add Product (breakfast) at check-in.' },
      },
      {
        name: 'Add Guest File',
        type: 'Action',
        category: 'Guest Management (Advanced)',
        purpose: 'Attaches a file (ID scan, preferences doc) to a guest profile. GDPR is the gating constraint.',
        survey: '6 must-have / net +9 — raised from P4.',
        inputs: [
          { name: 'Guest ID', required: 'Required', type: 'Text (GUID)', notes: 'Profile to attach the file to.' },
          { name: 'File', required: 'Required', type: 'File / URL', notes: 'File content or URL to attach.' },
        ],
        outputs: 'Confirmation / file reference — File ID, Guest ID.',
        useCase: { title: 'Pre-arrival ID document upload', flow: 'HTTP Webhook (guest submits ID scan via pre-arrival form) → Find Guests (by reservation email) → Add Guest File (ID scan from form) → Add Note to Guest Profile ("ID document received via pre-arrival form").' },
      },
      {
        name: 'Find Spaces',
        type: 'Action',
        category: 'Room & Availability',
        purpose: 'Returns all rooms and spaces at the property.',
        survey: '3 must-have / net −1.',
        outputs: 'Array of spaces — Space ID, Name, Category ID, Category name, Floor.',
        useCase: { title: 'Bottom-bunk assignment', flow: 'Reservation Product Added (filter: Bottom Bunk product) → Find Spaces (category = Dormitory) → Condition (space attribute = bottom bunk) → Reassign Space.' },
      },
      {
        name: 'Find Blocked Rooms',
        type: 'Action',
        category: 'Room & Availability',
        purpose: 'Returns current out-of-order blocks at the property.',
        survey: '1 must-have / net −9.',
        outputs: 'Array of active blocks — Block ID, Room ID, Room name, Start/End dates, Reason.',
        useCase: { title: 'Daily maintenance report', flow: 'Cron Scheduler (7am) → Find Blocked Rooms (active today) → Condition (count > 0) → Send Slack message to housekeeping lead with list of blocked rooms.' },
      },
      {
        name: 'Release Room',
        type: 'Action',
        category: 'Room & Availability',
        purpose: 'Removes a maintenance block from a room.',
        survey: '1 must-have / net −4 — demoted from P2.',
        inputs: [
          { name: 'Block / room reference', required: 'Required', type: 'Text (GUID)', notes: 'Block ID from Find Blocked Rooms or Block Room.' },
        ],
        outputs: 'Confirmation — Block ID, Room ID, released timestamp.',
        useCase: { title: 'Work order completion', flow: 'HTTP Webhook (maintenance system closes work order) → Find Blocked Rooms (by room from webhook) → Release Room → Add Note to Reservation (if any affected) → Notify front desk.' },
      },
      {
        name: 'Add Bill',
        type: 'Action',
        category: 'Financial Operations',
        purpose: 'Creates a new empty bill for a guest.',
        survey: '5 must-have / net −6.',
        inputs: [
          { name: 'Guest / account', required: 'Required', type: 'Text (GUID)', notes: 'Guest profile to create the bill under.' },
        ],
        outputs: 'New Bill ID.',
        useCase: { title: 'Separate billing for group', flow: 'Reservation Created (group booking) → For Each (reservation in group) → Add Bill (one bill per guest) → Add Product to Reservation (route charges to individual bill).' },
      },
      {
        name: 'Find Charges',
        type: 'Action',
        category: 'Financial Operations',
        purpose: 'Returns all charge and order item records matching criteria.',
        survey: '7 must-have / net +3.',
        outputs: 'Array of charge/order records — Charge ID, Description, Amount, Currency, Date, Reservation ID.',
        useCase: { title: 'F&B spend report', flow: 'Cron Scheduler (weekly) → Get Reservations (checked out, last 7 days) → For Each → Find Charges (category = F&B) → Aggregate → Send summary report via email.' },
      },
      {
        name: 'Find Payments',
        type: 'Action',
        category: 'Financial Operations',
        purpose: 'Returns payment records matching criteria.',
        survey: '7 must-have / net +8.',
        outputs: 'Array of payment records — Payment ID, Amount, Currency, Type, Date, Bill ID.',
        useCase: { title: 'Unreconciled payment audit', flow: 'Cron Scheduler (nightly) → Find Payments (BankTransfer, last 24h) → Condition (linked bill status = Open) → Send Slack alert to accounting.' },
      },
      {
        name: 'Find Guest Charges',
        type: 'Action',
        category: 'Financial Operations',
        purpose: 'Returns charge line items by guest.',
        survey: '2 must-have / net +4 — demoted from P2.',
        outputs: 'Array of charges by guest — Charge ID, Description, Amount, Date.',
        useCase: { title: 'Loyalty spend tracking', flow: 'Reservation Checked Out → Find Guest Charges (guest from trigger) → Calculate total spend → Condition (spend > threshold) → Add Note to Guest Profile ("High-value guest — total stay spend X").' },
      },
      {
        name: 'Find Rates',
        type: 'Action',
        category: 'Rates & Restrictions',
        purpose: 'Returns all rate plans configured at the property.',
        survey: '8 must-have / net −1 — polarised; demoted from P2.',
        outputs: 'List of enabled rates — Rate ID, Name, Service, Type (public/private).',
        useCase: { title: 'Dynamic rate-based routing', flow: 'Reservation Created → Find Rates (all enabled) → Condition (reservation rate matches promotional rate IDs) → Send SMS with included amenities info.' },
      },
      {
        name: 'Reservation Checked Out',
        type: 'Trigger',
        category: 'Guest Actions',
        purpose: 'Completes the reservation lifecycle. Enables post-stay upsells, late-checkout reconciliation, feedback requests and rebooking offers.',
        upsellBet: true,
        outputs: 'Reservation ID, Guest ID, Room, Arrival, Departure, Rate ID.',
        useCase: { title: 'Post-stay feedback request', flow: 'Reservation Checked Out → Condition (stay length ≥ 2 nights) → Send SMS "Thank you for your stay — please share your feedback: [survey link]".' },
      },
      {
        name: 'Send Offer with Acceptance',
        type: 'Action',
        category: 'Upsells',
        purpose: 'Presents a priced offer to a guest on a guest-facing surface and captures acceptance — the offer → accept → pay loop for upsells pushed outside Mews channels.',
        upsellBet: true,
        outputs: 'Offer ID, Guest ID, Offer status (Sent / Accepted / Declined / Expired), Accepted product + price.',
        useCase: { title: 'Pre-arrival upgrade offer', flow: 'Cron Scheduler (3 days before arrival) → Get Reservations (Arriving in 3 days, standard category) → Check Availability (suite) → Send Offer with Acceptance (upgrade offer, dynamic price) → On acceptance → Reassign Space + Authorise / Capture Payment.' },
      },
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
      {
        name: 'Add Companion',
        type: 'Action',
        category: 'Reservations (Advanced)',
        purpose: 'Adds a companion guest to an existing reservation.',
        survey: '7 must-have / net +12 (high "useful" inflation). Open text: "hostel guests book 2 beds, place them in the same room."',
        inputs: [
          { name: 'Reservation ID', required: 'Required', type: 'Text (GUID)', notes: 'Reservation to add companion to.' },
          { name: 'Companion guest', required: 'Required', type: 'GUID', notes: 'Guest profile to link as companion.' },
        ],
        outputs: 'Updated reservation occupancy — Reservation ID, all companion Guest IDs.',
        useCase: { title: 'Hostel shared room pairing', flow: 'HTTP Webhook (guests request to share a room) → Find Guests (both) → Reassign Space (same room) → Add Companion (link profiles) → Send SMS to both confirming shared room.' },
      },
      {
        name: 'Find Services',
        type: 'Action',
        category: 'Rates & Restrictions',
        purpose: 'Returns all bookable services (room types, spa, F&B).',
        survey: '4 must-have / net −8 — worst signal in the survey; demoted from P2. Note: a "Get Services" action already exists — verify if this is still needed.',
        outputs: 'List of active / bookable services — Service ID, Name, Type.',
        useCase: { title: 'Multi-service routing', flow: 'Reservation Created → Find Services → Condition (service = Spa) → Send SMS "Your spa stay includes complimentary amenities."' },
      },
      {
        name: 'Add Availability Block',
        type: 'Action',
        category: 'Room & Availability',
        purpose: 'Creates a group availability block.',
        survey: '1 must-have / net −10 — second-worst signal; demoted from P2.',
        inputs: [
          { name: 'Service / category', required: 'Required', type: 'GUID (dynamic)', notes: 'Service and category to block.' },
          { name: 'Date range', required: 'Required', type: 'Date range', notes: 'Block duration.' },
          { name: 'Quantity', required: 'Required', type: 'Number', notes: 'Number of rooms/spaces to block.' },
        ],
        outputs: 'Block ID, confirmation.',
        useCase: { title: 'Group booking hold', flow: 'HTTP Webhook (group enquiry received) → Add Availability Block (requested rooms, dates from enquiry) → Send email to sales team with block reference.' },
      },
      {
        name: 'Get Customer Profile',
        type: 'Action',
        category: 'Guest & Reservation Operations',
        purpose: 'Fetches the full profile of a specific guest by Customer ID mid-flow, exposing fields — including BirthDate — that no current trigger or retrieval component surfaces.',
        inputs: [
          { name: 'Customer ID', required: 'Required', type: 'Text (GUID)', notes: 'Typically wired from a trigger or from a prior retrieval step (Get Eligible Arrivals).' },
        ],
        outputs: 'Customer ID, First/Last Name, Email, Has OTA Email (boolean), Phone, Birth Date (YYYY-MM-DD, empty if not set), Nationality Code, Language Code, Loyalty Code, Classifications array, Dietary Requirements, Notes, Is Active. Second port: not found — fires when no active profile exists.',
        useCase: { title: 'Birthday recognition on arrival', flow: 'Cron Scheduler (daily) → Get Eligible Arrivals → For Each → Get Customer Profile → Condition (BirthDate MM-DD = today) → Add Task (Housekeeping: "Place birthday amenity in room") → Send SMS birthday greeting.' },
      },
    ],
  },
];

const typeColors: Record<ComponentType, string> = {
  Action: 'bg-gray-100 text-gray-700',
  Trigger: 'bg-purple-100 text-purple-700',
  Utility: 'bg-teal-100 text-teal-700',
};

function Req() { return <span className="text-xs px-1.5 py-0.5 rounded bg-pink-100 text-pink-800 font-medium">Required</span>; }
function Opt() { return <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">Optional</span>; }

function ComponentCard({ c }: { c: RoadmapComponent }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      {/* Header — always visible */}
      <div className="p-4">
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

      {/* Expand toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {open ? 'Hide details' : 'Inputs · Outputs · Use case'}
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-gray-100 p-4 space-y-5 bg-gray-50">

          {/* Inputs */}
          {c.inputs && c.inputs.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Inputs</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse bg-white rounded border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">Field</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">Required</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">Type</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.inputs.map((inp, i) => (
                      <tr key={i} className={i < c.inputs!.length - 1 ? 'border-b border-gray-100' : ''}>
                        <td className="px-3 py-2 font-medium text-gray-900">{inp.name}</td>
                        <td className="px-3 py-2">{inp.required === 'Required' ? <Req /> : <Opt />}</td>
                        <td className="px-3 py-2 text-gray-600 font-mono">{inp.type}</td>
                        <td className="px-3 py-2 text-gray-500">{inp.notes ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Outputs */}
          {c.outputs && (
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Outputs</p>
              <p className="text-xs text-gray-700 bg-white border border-gray-200 rounded px-3 py-2 leading-relaxed">{c.outputs}</p>
            </div>
          )}

          {/* Use case */}
          {c.useCase && (
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Example Use Case</p>
              <div className="bg-white border border-pink-100 rounded px-3 py-2">
                <p className="text-xs font-semibold text-pink-700 mb-1">{c.useCase.title}</p>
                <p className="text-xs text-gray-600 font-mono leading-relaxed">{c.useCase.flow}</p>
              </div>
            </div>
          )}
        </div>
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
          Components already live are documented in <strong>Mews Components</strong>. All inputs and outputs below are proposals to be confirmed against the Connector API. Click any component card to expand inputs, outputs, and a use case example.
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
