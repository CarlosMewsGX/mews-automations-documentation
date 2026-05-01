import { useState } from 'react';
import { Search, ChevronDown, ExternalLink } from 'lucide-react';
import mewsLogo from '../imports/mews-systems-logo-vector.png';
import { GettingStartedSection } from './components/GettingStartedSection';
import { TemplatesSection } from './components/TemplatesSection';
import { OverviewSection } from './components/OverviewSection';
import { ComponentsSection } from './components/ComponentsSection';

const gettingStartedItems = [
  { id: 'what-are-automations', label: 'What are Automations?' },
  { id: 'key-concepts', label: 'Key concepts' },
  { id: 'accessing-automations', label: 'Accessing' },
  { id: 'automations-dashboard', label: 'Dashboard' },
  { id: 'creating-first-automation', label: 'First automation' },
  { id: 'flow-designer', label: 'Flow designer' },
  { id: 'adding-components', label: 'Adding components' },
  { id: 'connecting-components', label: 'Connecting' },
  { id: 'configuring-components', label: 'Configuring' },
  { id: 'using-variables', label: 'Variables' },
  { id: 'modifiers', label: 'Modifiers' },
  { id: 'mews-components', label: 'Mews components' },
  { id: 'utility-components', label: 'Utilities' },
  { id: 'starting-stopping-testing', label: 'Start / Stop / Test' },
  { id: 'action-log', label: 'Action Log' },
  { id: 'using-templates', label: 'Templates' },
  { id: 'best-practices', label: 'Best practices' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

const templateItems = [
  { id: 'upgrade-room-loyalty', label: 'Upgrade Room for Loyalty Members' },
  { id: 'welcome-gift-vip', label: 'Welcome Gift for VIP Guests' },
];

const triggerItems = [
  { id: 'guest-profile-created', label: 'Guest Profile Created' },
  { id: 'reservation-created', label: 'Reservation Created' },
  { id: 'reservation-checked-in', label: 'Reservation Checked In' },
];

const actionItems = [
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
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (key: string) => {
    setExpanded(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const navigate = (section: string) => {
    setActiveSection(section);
    if (!expanded.includes(section)) {
      setExpanded(prev => [...prev, section]);
    }
  };

  const navigateToAnchor = (section: string, id: string) => {
    setActiveSection(section);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="size-full flex flex-col bg-white">

      {/* Header */}
      <header className="flex-shrink-0 bg-neutral-900 text-white">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('overview')}>
            <img
              src={mewsLogo}
              alt="Mews"
              className="h-5 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-sm text-neutral-300 font-light tracking-wide">Automations Documentation</span>
          </div>
          <button className="p-2 hover:bg-white/10 rounded transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 flex overflow-hidden">

        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 h-full overflow-y-auto bg-white">
          <nav className="py-1">

            {/* Overview */}
            <button
              onClick={() => navigate('overview')}
              className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between
                ${activeSection === 'overview'
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Overview
            </button>

            {/* Getting Started */}
            <div>
              <button
                onClick={() => { navigate('getting-started'); toggleExpand('getting-started'); }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors
                  ${activeSection === 'getting-started'
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <span>Getting Started</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${expanded.includes('getting-started') ? 'rotate-180' : ''}`} />
              </button>
              {expanded.includes('getting-started') && (
                <div className="border-l border-gray-200 ml-4">
                  {gettingStartedItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => navigateToAnchor('getting-started', item.id)}
                      className="w-full text-left pl-4 pr-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Templates */}
            <div>
              <button
                onClick={() => { navigate('templates'); toggleExpand('templates'); }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors
                  ${activeSection === 'templates'
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <span>Templates</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${expanded.includes('templates') ? 'rotate-180' : ''}`} />
              </button>
              {expanded.includes('templates') && (
                <div className="border-l border-gray-200 ml-4">
                  {templateItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => navigateToAnchor('templates', item.id)}
                      className="w-full text-left pl-4 pr-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Components */}
            <div>
              <button
                onClick={() => { navigate('components'); toggleExpand('components'); }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors
                  ${activeSection === 'components'
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <span>Components</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${expanded.includes('components') ? 'rotate-180' : ''}`} />
              </button>
              {expanded.includes('components') && (
                <div className="border-l border-gray-200 ml-4">
                  <div className="pl-4 pr-4 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Triggers
                  </div>
                  {triggerItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => navigateToAnchor('components', item.id)}
                      className="w-full text-left pl-4 pr-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="pl-4 pr-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </div>
                  {actionItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => navigateToAnchor('components', item.id)}
                      className="w-full text-left pl-4 pr-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="pb-4" />
                </div>
              )}
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/CarlosMewsGX/mews-automations-documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </a>

          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
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
