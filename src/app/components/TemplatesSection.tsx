function Screenshot({ file, alt }: { file: string; alt: string }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <img
        src={`${base}/screenshots/${file}`}
        alt={alt}
        className="w-full block"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = 'none';
          const placeholder = img.parentElement!.querySelector('.screenshot-placeholder') as HTMLElement;
          if (placeholder) placeholder.style.display = 'flex';
        }}
      />
      <div
        className="screenshot-placeholder w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center py-12 gap-2"
        style={{ display: 'none' }}
      >
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
          <path d="M21 15l-5-5L5 21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm text-gray-500 font-medium">{alt}</span>
        <span className="text-xs text-gray-400">{file}</span>
      </div>
    </div>
  );
}

function ConfigTable({ rows }: { rows: { field: string; default: string; status: 'required' | 'recommended' | 'optional'; desc: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold border-b">Field</th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-b">Default Value</th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-b">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i < rows.length - 1 ? 'border-b' : ''}>
              <td className="px-4 py-3 text-sm font-medium">{r.field}</td>
              <td className="px-4 py-3 text-sm font-mono">{r.default}</td>
              <td className="px-4 py-3 text-sm">
                {r.status === 'required' && <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">Required</span>}
                {r.status === 'recommended' && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Recommended</span>}
                {r.status === 'optional' && <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Optional</span>}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TemplatesSection() {
  return (
    <>
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          Templates are ready-to-use automation flows designed for common hospitality workflows. Each
          template comes fully configured with all components placed, connected, and pre-filled — you can
          use them as-is or customize them to fit your property's specific needs.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          Below you will find detailed documentation for each available template, including setup
          instructions, component breakdowns, and troubleshooting tips.
        </p>
      </section>

      {/* Template 1 */}
      <section id="upgrade-room-loyalty">
        <div className="border-l-4 border-pink-600 pl-6 mb-6">
          <h2 className="text-3xl font-bold mb-2">Upgrade Room for Loyalty Members</h2>
          <p className="text-gray-600">Automatically upgrade rooms for loyal guests on arrival day</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              This automation runs daily to identify arriving guests who are members of your loyalty program
              (or meet other behavioral criteria), checks your property's occupancy, and automatically
              upgrades their room category when availability allows. Upgraded guests receive an SMS
              notification, and any reservations where the upgrade failed are marked with a note for manual
              review by your team.
            </p>
            <Screenshot file="upgrade-room-flow.png" alt="Upgrade Room for Loyalty Members flow" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Before You Start</h3>
            <p className="text-gray-700 mb-4">Make sure you have the following set up in Mews:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li><span className="font-semibold">Room category upgrade paths</span> configured in Mews (Settings → Services → Spaces → Categories → Upgrade Paths).</li>
              <li><span className="font-semibold">Loyalty program</span> (optional) — configure tiers if you want to filter by loyalty membership.</li>
              <li><span className="font-semibold">SMS enabled</span> for your property if you want to notify guests.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">How the Flow Works</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Step</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Component</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { step: '1', comp: 'Cron Scheduler', desc: 'Triggers the automation once per day at a configured time (e.g. 9:00 AM).' },
                    { step: '2', comp: 'Get Eligible Arrivals', desc: 'Retrieves all confirmed reservations arriving today. Optionally filters by loyalty tier or behavioral criteria.' },
                    { step: '3', comp: 'Get Occupancy', desc: "Checks today's property-wide occupancy percentage to determine if you have enough availability to upgrade." },
                    { step: '4', comp: 'Each (Loop)', desc: 'Iterates over each eligible reservation one by one.' },
                    { step: '5', comp: 'Upgrade Assigned Room Category', desc: 'Attempts to upgrade the reservation. Uses configured upgrade paths and respects availability buffer settings. Outputs success/failure status.' },
                    { step: '6a', comp: 'Send SMS (if success)', desc: 'Sends a personalized SMS to the guest notifying them of the room upgrade.' },
                    { step: '6b', comp: 'Add Note to Reservation (if failure)', desc: 'Adds a note to the reservation explaining why the upgrade failed, for staff review.' },
                  ].map((r, i, arr) => (
                    <tr key={r.step} className={`${i < arr.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                      <td className="px-6 py-4 font-medium">{r.step}</td>
                      <td className="px-6 py-4 font-medium">{r.comp}</td>
                      <td className="px-6 py-4 text-gray-700">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Component Configuration Details</h3>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">1. Cron Scheduler</h4>
                <ConfigTable rows={[
                  { field: 'Cron', default: '0 9 * * *', status: 'required', desc: 'Runs daily at 9:00 AM. Adjust as needed.' },
                  { field: 'Timezone', default: '(empty)', status: 'recommended', desc: "Set to your property's timezone (e.g. Europe/Prague)." },
                  { field: 'Trigger immediately', default: 'False', status: 'optional', desc: 'Set to True for immediate test run when starting the automation.' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">2. Get Eligible Arrivals</h4>
                <ConfigTable rows={[
                  { field: 'Arrival Date', default: 'Today', status: 'required', desc: 'Defaults to today. Can be adjusted for future arrivals.' },
                  { field: 'Loyalty Programs', default: '(empty)', status: 'optional', desc: 'Filter by specific loyalty programs.' },
                  { field: 'Loyalty Tiers', default: '(empty)', status: 'optional', desc: 'Filter by specific tiers (e.g. Gold, Platinum).' },
                  { field: 'Behavioral Criteria', default: '(empty)', status: 'optional', desc: 'Additional filters (e.g. number of prior stays, total revenue).' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">3. Get Occupancy</h4>
                <ConfigTable rows={[
                  { field: 'Date', default: 'Today', status: 'required', desc: 'The date for which to check occupancy.' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">5. Upgrade Assigned Room Category</h4>
                <ConfigTable rows={[
                  { field: 'Reservation IDs', default: '(variable)', status: 'required', desc: 'Mapped from the Each loop output.' },
                  { field: 'Upgrade Path', default: '(configured in Mews)', status: 'required', desc: 'Uses upgrade paths configured in Mews Settings.' },
                  { field: 'Buffer Threshold', default: '2 spaces', status: 'optional', desc: 'Minimum available spaces in the target category before upgrading.' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">6a. Send SMS (Success Path)</h4>
                <ConfigTable rows={[
                  { field: 'Recipient', default: '(guest phone)', status: 'required', desc: 'Mapped from reservation guest profile.' },
                  { field: 'Message', default: "\"Good news! We've upgraded your room. See you soon!\"", status: 'required', desc: 'Customize as needed.' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">6b. Add Note to Reservation (Failure Path)</h4>
                <ConfigTable rows={[
                  { field: 'Reservation IDs', default: '(variable)', status: 'required', desc: 'Mapped from Each loop.' },
                  { field: 'Note', default: '"Upgrade attempted but failed - no availability"', status: 'required', desc: 'Logged for staff follow-up.' },
                  { field: 'Classification', default: 'General', status: 'optional', desc: 'Category for filtering notes in Mews.' },
                ]} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Setup Checklist</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Task</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { task: 'Configure room upgrade paths', detail: 'In Mews: Settings → Services → Spaces → Categories → define which categories can upgrade to which.' },
                    { task: 'Set loyalty filters (optional)', detail: 'Select which loyalty program and tier should qualify for upgrades.' },
                    { task: 'Set timezone', detail: "Match the Cron Scheduler timezone to your property's local timezone." },
                    { task: 'Customize SMS message', detail: 'Edit the Send SMS component to match your brand voice.' },
                    { task: 'Test the automation', detail: 'Use "Trigger immediately" to run a test and review the Action log.' },
                  ].map((r, i, arr) => (
                    <tr key={r.task} className={`${i < arr.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                      <td className="px-6 py-4 font-medium">{r.task}</td>
                      <td className="px-6 py-4 text-gray-700">{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Troubleshooting</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Issue</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Solution</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { issue: 'No guests are being selected', sol: 'Check that reservations exist for today and that the loyalty/behavioral filters match at least one arriving guest.' },
                    { issue: 'SMS messages are not sending', sol: 'Ensure SMS is enabled for your property and that guests have valid phone numbers in their profiles.' },
                    { issue: '"Upgrade failed" notes appearing for all reservations', sol: 'Check that you have availability in the target room categories and that the upgrade paths are correctly mapped in Mews.' },
                  ].map((r, i, arr) => (
                    <tr key={i} className={`${i < arr.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                      <td className="px-6 py-4 font-medium">{r.issue}</td>
                      <td className="px-6 py-4 text-gray-700">{r.sol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Template 2 */}
      <section id="welcome-gift-vip" className="mt-16">
        <div className="border-l-4 border-pink-600 pl-6 mb-6">
          <h2 className="text-3xl font-bold mb-2">Welcome Gift for VIP Guests</h2>
          <p className="text-gray-600">Automatically prepare and notify guests about welcome amenities</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              This automation runs daily to identify arriving VIP guests, determines which welcome gift
              products are compatible with their reservation's service, creates an operational task for your
              team to prepare the gift, and sends an SMS to the guest informing them about the amenity. It
              ensures VIP guests receive a personalized touch without manual intervention.
            </p>
            <Screenshot file="welcome-gift-flow.png" alt="Welcome Gift for VIP Guests flow" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Before You Start</h3>
            <p className="text-gray-700 mb-4">Make sure you have the following configured in Mews:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li><span className="font-semibold">Products</span> created for your welcome gifts (e.g. "Champagne bottle", "Fruit basket", "Welcome amenity").</li>
              <li><span className="font-semibold">Departments</span> set up in Mews Operations so tasks can be routed to the correct team (e.g. Housekeeping, Front Desk).</li>
              <li><span className="font-semibold">VIP guest criteria</span> defined — this could be a loyalty tier, a rate code, or a guest classification.</li>
              <li><span className="font-semibold">SMS enabled</span> for your property if you want to send notifications.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">How the Flow Works</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Step</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Component</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { step: '1', comp: 'Cron Scheduler', desc: 'Triggers the automation once per day at a configured time (e.g. 8:00 AM).' },
                    { step: '2', comp: 'Get Eligible Arrivals', desc: 'Retrieves all confirmed VIP reservations arriving today, filtered by loyalty tier, rate, or custom criteria.' },
                    { step: '3', comp: 'Each (Loop)', desc: 'Iterates over each eligible VIP reservation one by one.' },
                    { step: '4', comp: 'Get Compatible Products', desc: "Checks which gift products are compatible with the reservation's service." },
                    { step: '5', comp: 'Add Task', desc: 'Creates a task in Mews Operations for your team to prepare and deliver the welcome gift.' },
                    { step: '6', comp: 'Send SMS', desc: 'Sends a personalized SMS to the guest notifying them about the welcome gift.' },
                  ].map((r, i, arr) => (
                    <tr key={r.step} className={`${i < arr.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                      <td className="px-6 py-4 font-medium">{r.step}</td>
                      <td className="px-6 py-4 font-medium">{r.comp}</td>
                      <td className="px-6 py-4 text-gray-700">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Component Configuration Details</h3>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">1. Cron Scheduler</h4>
                <ConfigTable rows={[
                  { field: 'Cron', default: '0 8 * * *', status: 'required', desc: 'Runs daily at 8:00 AM. Adjust as needed.' },
                  { field: 'Timezone', default: '(empty)', status: 'recommended', desc: "Set to your property's timezone (e.g. America/New_York)." },
                  { field: 'Trigger immediately', default: 'False', status: 'optional', desc: 'Set to True for immediate test run.' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">2. Get Eligible Arrivals</h4>
                <ConfigTable rows={[
                  { field: 'Arrival Date', default: 'Today', status: 'required', desc: "Defaults to today's arrivals." },
                  { field: 'Filter Criteria', default: 'VIP guests only', status: 'recommended', desc: 'Filter by loyalty tier, rate, or custom classification.' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">4. Get Compatible Products</h4>
                <ConfigTable rows={[
                  { field: 'Reservation ID', default: '(variable)', status: 'required', desc: 'Mapped from the Each loop output.' },
                  { field: 'Product Category', default: 'Welcome gifts', status: 'optional', desc: 'Filter products by category for more targeted selection.' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">5. Add Task</h4>
                <ConfigTable rows={[
                  { field: 'Title', default: '"Prepare VIP welcome gift"', status: 'required', desc: 'Task title shown in Mews Operations.' },
                  { field: 'Description', default: '"Prepare and deliver welcome gift for [Guest Name], Room [Room Number]"', status: 'optional', desc: 'Include dynamic guest/room details.' },
                  { field: 'Department', default: 'Housekeeping', status: 'recommended', desc: 'Select the team responsible for this task.' },
                  { field: 'Deadline', default: 'Check-in time today', status: 'recommended', desc: 'Set to arrival time or a few hours before.' },
                  { field: 'Linked Reservation', default: '(variable)', status: 'optional', desc: 'Link the task to the reservation for context.' },
                ]} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">6. Send SMS</h4>
                <ConfigTable rows={[
                  { field: 'Recipient', default: '(guest phone)', status: 'required', desc: 'Mapped from guest profile.' },
                  { field: 'Message', default: '"Welcome! A special gift awaits you in your room. Enjoy your stay!"', status: 'required', desc: 'Customize to your brand voice.' },
                ]} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Setup Checklist</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Task</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { task: 'Create welcome gift products', detail: 'In Mews: Settings → Services → Products → create products for each type of welcome gift you offer.' },
                    { task: 'Configure departments', detail: 'Ensure the correct department (e.g. Housekeeping) is selected for task routing.' },
                    { task: 'Define VIP criteria', detail: 'Decide which loyalty tier, rate, or guest classification qualifies as VIP.' },
                    { task: 'Set timezone', detail: "Match the Cron Scheduler timezone to your property's local timezone." },
                    { task: 'Test the automation', detail: 'Use "Trigger immediately" to run a test and review the Action log.' },
                  ].map((r, i, arr) => (
                    <tr key={r.task} className={`${i < arr.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                      <td className="px-6 py-4 font-medium">{r.task}</td>
                      <td className="px-6 py-4 text-gray-700">{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Example Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li><span className="font-semibold">Personalized VIP experience:</span> Automatically send a bottle of champagne to all Platinum loyalty members on arrival.</li>
              <li><span className="font-semibold">Corporate guest welcome:</span> Deliver a branded welcome pack to all guests booked under corporate rates.</li>
              <li><span className="font-semibold">Celebrate special occasions:</span> Add a birthday cake task when the guest's profile indicates their birthday during their stay.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Troubleshooting</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Issue</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Solution</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { issue: 'Tasks are not being created', sol: 'Check that the department is correctly configured and that the "Add Task" component has all required fields filled in.' },
                    { issue: 'SMS not sending', sol: 'Verify that SMS is enabled and that the guest has a valid phone number in their profile.' },
                    { issue: 'No compatible products found', sol: "Ensure welcome gift products are correctly linked to the reservation's service in Mews product settings." },
                    { issue: 'Automation runs but no guests qualify', sol: 'Review the VIP filter criteria in the "Get Eligible Arrivals" component. Ensure at least one arriving guest matches the filter.' },
                  ].map((r, i, arr) => (
                    <tr key={i} className={`${i < arr.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                      <td className="px-6 py-4 font-medium">{r.issue}</td>
                      <td className="px-6 py-4 text-gray-700">{r.sol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
