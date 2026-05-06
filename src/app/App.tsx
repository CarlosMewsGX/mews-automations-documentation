import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { GettingStartedSection } from './components/GettingStartedSection';
import { TemplatesSection } from './components/TemplatesSection';
import { OverviewSection } from './components/OverviewSection';
import { ComponentsSection } from './components/ComponentsSection';
import { ClaudeSkillSection } from './components/ClaudeSkillSection';

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
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (key: string) => {
    setExpanded(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const navigate = (section: string) => {
    setActiveSection(section);
    setActiveItem(null);
    setTimeout(() => {
      if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const navigateToAnchor = (section: string, id: string) => {
    setActiveSection(section);
    setActiveItem(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const sectionCls = (key: string) =>
    `w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors border-2 ${
      activeSection === key && activeItem === null
        ? 'border-pink-600 bg-gray-100 text-gray-900 font-semibold'
        : 'border-transparent text-gray-700 hover:bg-gray-50'
    }`;

  const itemCls = (id: string) =>
    `w-full text-left pl-5 pr-4 py-2 text-sm transition-colors border-l-[3px] ${
      activeItem === id
        ? 'border-pink-600 bg-gray-100 text-gray-900 font-semibold'
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div className="size-full flex flex-col bg-white">

      {/* Header */}
      <header className="flex-shrink-0 bg-neutral-900 text-white">
        <div className="px-4 h-14 flex items-center">
          <div className="cursor-pointer" onClick={() => navigate('overview')}>
            <span className="text-xl text-white font-bold tracking-wide">Automations Documentation</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 flex overflow-hidden">

        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 h-full overflow-y-auto bg-white">
          <nav className="py-1">

            {/* Overview */}
            <button onClick={() => navigate('overview')} className={sectionCls('overview')}>
              Overview
            </button>

            {/* Getting Started */}
            <div>
              <button onClick={() => { navigate('getting-started'); toggleExpand('getting-started'); }} className={sectionCls('getting-started')}>
                <span>Getting Started</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${expanded.includes('getting-started') ? 'rotate-180' : ''}`} />
              </button>
              {expanded.includes('getting-started') && (
                <div>
                  {gettingStartedItems.map(item => (
                    <button key={item.id} onClick={() => navigateToAnchor('getting-started', item.id)} className={itemCls(item.id)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Templates */}
            <div>
              <button onClick={() => { navigate('templates'); toggleExpand('templates'); }} className={sectionCls('templates')}>
                <span>Templates</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${expanded.includes('templates') ? 'rotate-180' : ''}`} />
              </button>
              {expanded.includes('templates') && (
                <div>
                  {templateItems.map(item => (
                    <button key={item.id} onClick={() => navigateToAnchor('templates', item.id)} className={itemCls(item.id)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Components */}
            <div>
              <button onClick={() => { navigate('components'); toggleExpand('components'); }} className={sectionCls('components')}>
                <span>Components</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${expanded.includes('components') ? 'rotate-180' : ''}`} />
              </button>
              {expanded.includes('components') && (
                <div>
                  <div className="pl-5 pr-4 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Triggers</div>
                  {triggerItems.map(item => (
                    <button key={item.id} onClick={() => navigateToAnchor('components', item.id)} className={itemCls(item.id)}>
                      {item.label}
                    </button>
                  ))}
                  <div className="pl-5 pr-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</div>
                  {actionItems.map(item => (
                    <button key={item.id} onClick={() => navigateToAnchor('components', item.id)} className={itemCls(item.id)}>
                      {item.label}
                    </button>
                  ))}
                  <div className="pb-4" />
                </div>
              )}
            </div>

            {/* Claude Skill */}
            <button onClick={() => navigate('claude-skill')} className={sectionCls('claude-skill')}>
              Claude Skill
            </button>

          </nav>
        </aside>

        {/* Main Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                {activeSection === 'overview' && 'Overview'}
                {activeSection === 'getting-started' && 'Getting Started with Mews Automations'}
                {activeSection === 'templates' && 'Templates'}
                {activeSection === 'components' && 'Components'}
                {activeSection === 'claude-skill' && 'Claude Skill for Mews Automations'}
              </h1>
              <p className="text-gray-600 text-lg">
                {activeSection === 'overview' && 'Welcome to Mews Automations Documentation'}
                {activeSection === 'getting-started' && 'Learn how to get started with Mews Automations'}
                {activeSection === 'templates' && 'Explore pre-built automation templates'}
                {activeSection === 'components' && 'Browse available automation components'}
                {activeSection === 'claude-skill' && 'An AI assistant skill that gives Claude expert knowledge of Mews Automations'}
              </p>
            </div>
            <div className="space-y-10">
              {activeSection === 'getting-started' && <GettingStartedSection />}
              {activeSection === 'templates' && <TemplatesSection />}
              {activeSection === 'overview' && <OverviewSection />}
              {activeSection === 'components' && <ComponentsSection />}
              {activeSection === 'claude-skill' && <ClaudeSkillSection />}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
