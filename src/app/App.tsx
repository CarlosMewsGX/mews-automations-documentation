import { useState } from 'react';
import { Search } from 'lucide-react';
import mewsLogo from '../imports/mews-systems-logo-vector.png';
import { GettingStartedSection } from './components/GettingStartedSection';
import { TemplatesSection } from './components/TemplatesSection';
import { OverviewSection } from './components/OverviewSection';
import { ComponentsSection } from './components/ComponentsSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src={mewsLogo} alt="Mews" className="h-20 w-auto cursor-pointer" onClick={() => setActiveSection('overview')} />
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'getting-started', label: 'Getting Started with Mews Automations' },
                { key: 'templates', label: 'Templates' },
                { key: 'components', label: 'Components' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveSection(tab.key)}
                  className={`hover:text-pink-600 transition-colors ${activeSection === tab.key ? 'text-pink-600 font-bold' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Getting Started sidebar */}
          {activeSection === 'getting-started' && (
            <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-gradient-to-b from-pink-50 to-white h-screen sticky top-0 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Guide Navigation</h3>
                <nav className="space-y-1">
                  {[
                    { id: 'what-are-automations', label: 'What are Automations?', num: '1' },
                    { id: 'key-concepts', label: 'Key concepts', num: '2' },
                    { id: 'accessing-automations', label: 'Accessing', num: '3' },
                    { id: 'automations-dashboard', label: 'Dashboard', num: '4' },
                    { id: 'creating-first-automation', label: 'First automation', num: '5' },
                    { id: 'flow-designer', label: 'Flow designer', num: '6' },
                    { id: 'adding-components', label: 'Adding components', num: '7' },
                    { id: 'connecting-components', label: 'Connecting', num: '8' },
                    { id: 'configuring-components', label: 'Configuring', num: '9' },
                    { id: 'using-variables', label: 'Variables', num: '10' },
                    { id: 'modifiers', label: 'Modifiers', num: '11' },
                    { id: 'mews-components', label: 'Mews components', num: '12' },
                    { id: 'utility-components', label: 'Utilities', num: '13' },
                    { id: 'starting-stopping-testing', label: 'Start/Stop/Test', num: '14' },
                    { id: 'action-log', label: 'Action Log', num: '15' },
                    { id: 'using-templates', label: 'Templates', num: '16' },
                    { id: 'best-practices', label: 'Best practices', num: '17' },
                    { id: 'troubleshooting', label: 'Troubleshooting', num: '18' },
                  ].map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="flex items-start gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-700 rounded-md transition-colors group">
                      <span className="text-pink-600 font-semibold text-xs mt-0.5 flex-shrink-0">{item.num}.</span>
                      <span className="leading-tight">{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Templates sidebar */}
          {activeSection === 'templates' && (
            <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-gradient-to-b from-pink-50 to-white h-screen sticky top-0 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Available Templates</h3>
                <nav className="space-y-1">
                  {[
                    { id: 'upgrade-room-loyalty', label: 'Upgrade Room for Loyalty Members', num: '1' },
                    { id: 'welcome-gift-vip', label: 'Welcome Gift for VIP Guests', num: '2' },
                  ].map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="flex items-start gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-700 rounded-md transition-colors group">
                      <span className="text-pink-600 font-semibold text-xs mt-0.5 flex-shrink-0">{item.num}.</span>
                      <span className="leading-tight">{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Components sidebar */}
          {activeSection === 'components' && (
            <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-gradient-to-b from-pink-50 to-white h-screen sticky top-0 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Component Library</h3>
                <nav className="space-y-4 pb-16">
                  <div>
                    <h4 className="text-xs font-semibold text-pink-600 uppercase tracking-wider mb-2">Triggers</h4>
                    <div className="space-y-1">
                      {[
                        { id: 'guest-profile-created', label: 'Guest Profile Created' },
                        { id: 'reservation-created', label: 'Reservation Created' },
                        { id: 'reservation-checked-in', label: 'Reservation Checked In' },
                      ].map((item) => (
                        <a key={item.id} href={`#${item.id}`} className="block px-3 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-700 rounded-md transition-colors">
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-pink-600 uppercase tracking-wider mb-2">Actions</h4>
                    <div className="space-y-1">
                      {[
                        { id: 'send-sms', label: 'Send SMS' },
                        { id: 'upgrade-room-category', label: 'Upgrade Assigned Room Category' },
                        { id: 'get-services', label: 'Get Services' },
                        { id: 'get-space-categories', label: 'Get Space Categories' },
                        { id: 'get-rates', label: 'Get Rates' },
                        { id: 'add-note-to-guest-profile', label: 'Add Note To Guest Profile' },
                        { id: 'add-note-to-reservation', label: 'Add Note To Reservation' },
                        { id: 'add-product-to-reservation', label: 'Add Product To Reservation' },
                        { id: 'add-task', label: 'Add Task' },
                        { id: 'check-occupancy', label: 'Check Occupancy' },
                        { id: 'get-compatible-products', label: 'Get Compatible Products' },
                        { id: 'get-departments', label: 'Get Departments' },
                        { id: 'get-eligible-arrivals', label: 'Get Eligible Arrivals' },
                        { id: 'get-loyalty-programs', label: 'Get Loyalty Programs' },
                        { id: 'get-loyalty-tiers', label: 'Get Loyalty Tiers' },
                        { id: 'get-occupancy', label: 'Get Occupancy' },
                        { id: 'get-products', label: 'Get Products' },
                        { id: 'get-products-for-reservations', label: 'Get Products For Reservations' },
                      ].map((item) => (
                        <a key={item.id} href={`#${item.id}`} className="block px-3 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-700 rounded-md transition-colors">
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </aside>
          )}

          <div className="flex-1 max-w-4xl mx-auto px-8 py-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                {activeSection === 'overview' && 'Overview'}
                {activeSection === 'getting-started' && 'Getting Started with Mews Automations'}
                {activeSection === 'templates' && 'Templates'}
                {activeSection === 'components' && 'Components'}
              </h1>
              <p className="text-gray-600 text-lg">
                {activeSection === 'overview' && 'Welcome to Mews Automations Documentation'}
                {activeSection === 'getting-started' && 'Learn how to get started with Mews Automations'}
                {activeSection === 'templates' && 'Explore pre-built automation templates'}
                {activeSection === 'components' && 'Browse available automation components'}
              </p>
            </div>

            <div className="space-y-10">
              {activeSection === 'getting-started' && <GettingStartedSection />}
              {activeSection === 'templates' && <TemplatesSection />}
              {activeSection === 'overview' && <OverviewSection />}
              {activeSection === 'components' && <ComponentsSection />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}