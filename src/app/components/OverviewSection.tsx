export function OverviewSection() {
  return (
    <>
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed">
          The Mews Automation platform enables properties to build no-code workflows that react to
          events in Mews and perform actions automatically. It is powered by the{' '}
          <span className="font-semibold">Automation Gateway</span> (.NET API) and{' '}
          <span className="font-semibold">Appmixer</span> (visual workflow engine). This page serves
          as the index for all component and flow documentation.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Triggers</h2>
        <p className="text-gray-600 mb-6">Triggers start a workflow when something happens in Mews.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Component</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Guest Profile Created</td>
                <td className="px-6 py-4 text-gray-700">Fires when a new guest profile is created, outputting guest details such as name, contact info, nationality, language, and loyalty code.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Reservation Created</td>
                <td className="px-6 py-4 text-gray-700">Fires when a new reservation is created, outputting reservation and guest details including confirmation number, origin, assigned space, and rate.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Reservation Checked In</td>
                <td className="px-6 py-4 text-gray-700">Fires when a guest checks in, outputting comprehensive reservation and guest details including room assignment and dates.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Actions</h2>
        <p className="text-gray-600 mb-8">Actions perform an operation inside a workflow — retrieving data, modifying reservations, or communicating with guests.</p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-pink-600">Guest &amp; Reservation Operations</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Component</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Add Note to Guest Profile', desc: 'Adds a categorised text note (e.g. Housekeeping, Complaints) to a guest profile.' },
                  { name: 'Add Note to Reservation', desc: 'Adds a note to one or more reservations at once, useful for group bookings or operational remarks.' },
                  { name: 'Add Product to Reservation', desc: 'Adds a product (charge) to a reservation with configurable quantity and date range — e.g. breakfast, parking, late checkout.' },
                  { name: 'Upgrade Assigned Room Category', desc: 'Upgrades a guest to a higher room category based on configurable upgrade paths, availability, and buffer settings.' },
                  { name: 'Send SMS', desc: 'Sends an SMS to a guest, optionally linked to a reservation.' },
                  { name: 'Add Task', desc: 'Creates a task in Mews Operations with a deadline, optional description, department, and reservation link.' },
                ].map((row, i, arr) => (
                  <tr key={row.name} className={`${i < arr.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                    <td className="px-6 py-4 font-medium">{row.name}</td>
                    <td className="px-6 py-4 text-gray-700">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-pink-600">Data Retrieval &amp; Filtering</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Component</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Get Eligible Arrivals', desc: 'Retrieves confirmed reservations arriving on a given date, with optional loyalty, behavioural, and rate filters.' },
                  { name: 'Get Occupancy / Check Occupancy', desc: 'Returns the occupancy percentage for a date. Check Occupancy additionally compares it against a threshold for conditional branching.' },
                  { name: 'Get Products / Get Products for Reservations / Get Compatible Products', desc: 'Retrieve orderable products — property-wide, per reservation, or filtered for compatibility.' },
                  { name: 'Get Services', desc: 'Lists active (optionally bookable-only) services at the property.' },
                  { name: 'Get Space Categories', desc: 'Lists room/space categories, optionally filtered by service.' },
                  { name: 'Get Rates', desc: 'Lists enabled rates across bookable services.' },
                  { name: 'Get Departments', desc: 'Lists active departments for task routing.' },
                  { name: 'Get Loyalty Programs / Get Loyalty Tiers', desc: 'Lists loyalty programs and their tiers for segmentation and filtering.' },
                ].map((row, i, arr) => (
                  <tr key={row.name} className={`${i < arr.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                    <td className="px-6 py-4 font-medium">{row.name}</td>
                    <td className="px-6 py-4 text-gray-700">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Example Flows</h2>
        <p className="text-gray-600 mb-6">End-to-end automation recipes that combine the components above.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Flow</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Upgrade Room for Loyalty Members</td>
                <td className="px-6 py-4 text-gray-700">Runs daily: identifies arriving guests (with optional loyalty/behavioural filters), checks occupancy, attempts room upgrades with availability buffers, sends SMS to upgraded guests, and notes failed upgrades.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Welcome Gift for VIP Guests</td>
                <td className="px-6 py-4 text-gray-700">Runs daily: identifies arriving guests, checks product compatibility, creates staff tasks for welcome gifts, and sends SMS to notify guests.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
