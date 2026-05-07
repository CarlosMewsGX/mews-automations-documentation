import { useState } from 'react';

interface Connector {
  label: string;
  description: string;
}

const categories: { name: string; connectors: Connector[] }[] = [
  {
    name: 'AI & Machine Learning',
    connectors: [
      { label: 'Anthropic Claude', description: 'Advanced AI capabilities for natural language processing and understanding, enabling seamless integration into applications for enhanced user interactions.' },
      { label: 'OpenAI', description: 'OpenAI components for building AI agents.' },
      { label: 'Google Gemini', description: 'Google Gemini components for building AI agents.' },
      { label: 'Groq', description: 'Integration with Groq\'s API for multimodal content analysis, chat completions, audio transcription, translation, and more.' },
      { label: 'DeepAI', description: 'Set of machine learning functions.' },
      { label: 'Perplexity', description: 'AI-powered search engine that provides precise and concise answers to user queries.' },
      { label: 'AI Utilities', description: 'Various AI utilities for responding to text prompts, generating and describing images, moderating content, generating and transcribing audio and more.' },
      { label: 'Language', description: 'Various components for text analysis using AI (sentiment analysis, language detection) and automatic text translation.' },
    ],
  },
  {
    name: 'CRM & Sales',
    connectors: [
      { label: 'Salesforce', description: 'Brings together all your customer information in a single, integrated platform for marketing, sales, customer service and business analysis.' },
      { label: 'HubSpot', description: 'Developer and marketer of software products for inbound marketing and sales.' },
      { label: 'Pipedrive', description: 'CRM tool for small and medium-sized businesses.' },
      { label: 'Zoho CRM', description: 'An intuitive CRM to better track and manage leads, and close deals faster.' },
      { label: 'Microsoft Dynamics 365 CRM', description: 'Portfolio of intelligent business applications that delivers superior operational efficiency and breakthrough customer experiences.' },
      { label: 'Highrise', description: 'Manage your contacts, keep track of who said what when, schedule follow-ups, set reminders, and convert leads into done deals.' },
      { label: 'Raynet', description: 'Easy-to-use CRM system that lets you simplify your daily agenda and keep track of everything going on in your business.' },
      { label: 'Clearbit', description: 'Data API that lets you enrich your person and company records with social, demographic, and firmographic data.' },
    ],
  },
  {
    name: 'Communication & Messaging',
    connectors: [
      { label: 'Slack', description: 'Platform for team communication: everything in one place, instantly searchable, available wherever you go.' },
      { label: 'Microsoft Teams', description: 'Business communication platform offering workspace chat and videoconferencing, file storage, and application integration.' },
      { label: 'Mailchimp', description: 'World\'s leading email marketing platform used by 15 million customers from small e-commerce shops to big online retailers.' },
      { label: 'ActiveCampaign', description: 'Marketing automation platform.' },
      { label: 'Klaviyo', description: 'Integration for managing customer profiles, lists, campaigns, and event tracking.' },
      { label: 'Email', description: 'Send email from your automations.' },
      { label: 'Chat', description: 'Chat utilities provide you with chat UI, triggers and actions useful for building conversational workflows and AI agents.' },
    ],
  },
  {
    name: 'Project Management',
    connectors: [
      { label: 'Asana', description: 'Collaborative information manager for workspace. Helps you organize people and tasks effectively.' },
      { label: 'Jira', description: 'Issue tracking product developed by Atlassian which allows bug tracking and agile project management.' },
      { label: 'Monday', description: 'Monday.com project management software.' },
      { label: 'Trello', description: 'Team collaboration tool that lets you organize anything and everything to keep your projects on task.' },
      { label: 'ClickUp', description: 'All-in-one productivity platform for teams to brainstorm, plan, and collaborate on everything from process docs to product designs.' },
      { label: 'Notion', description: 'All-in-one workspace combining note-taking, document management, task management, and collaboration features.' },
      { label: 'Smartsheet', description: 'Software for collaboration and work management, used to assign tasks, track project progress, manage calendars, and share documents.' },
    ],
  },
  {
    name: 'Google Workspace',
    connectors: [
      { label: 'Google Sheets', description: 'Create, edit, and collaborate in real time. Available on all devices with all the features you expect from spreadsheet software.' },
      { label: 'Google Drive', description: 'Cloud-based storage service that enables users to store and access files online, syncing across all devices.' },
      { label: 'Google Calendar', description: 'Organize your schedule and share events with coworkers and friends. Easy to keep track of your daily schedule.' },
      { label: 'Google BigQuery', description: 'Google BigQuery is a data warehouse service.' },
      { label: 'Google Analytics', description: 'Freemium web analytics service that tracks and reports website traffic.' },
      { label: 'Google Contacts', description: 'Google People API to manage contacts and contact groups.' },
      { label: 'Google Tasks', description: 'Integration with Google Tasks API allowing operations on tasks and task lists.' },
      { label: 'Google Slides', description: 'Integrate with the Google Slides API to manage presentations, slides, charts, and images.' },
    ],
  },
  {
    name: 'Microsoft 365',
    connectors: [
      { label: 'Microsoft Excel', description: 'Spreadsheet software.' },
      { label: 'Microsoft Calendar', description: 'Supports calendaring operations for Microsoft Outlook and Office 365.' },
      { label: 'Microsoft OneDrive', description: 'File hosting and synchronization service operated by Microsoft as part of its web version of Office.' },
      { label: 'Microsoft SharePoint', description: 'Monitor, retrieve, create, and update files within your Microsoft SharePoint Online environment.' },
    ],
  },
  {
    name: 'Storage & Files',
    connectors: [
      { label: 'Dropbox', description: 'Home for all your photos, documents, videos, and other files. Access your stuff from anywhere and share with others.' },
      { label: 'Box', description: 'Cloud content management and file sharing platform for businesses.' },
      { label: 'AWS', description: 'Amazon Web Services — cloud computing platforms and APIs on a metered pay-as-you-go basis.' },
      { label: 'Evernote', description: 'Powerful note taking application for capturing ideas, images, contacts, and anything else you need to remember.' },
      { label: 'Files', description: 'Save files to DB from your automations.' },
      { label: 'FTP', description: 'FTP utilities for file transfer operations.' },
      { label: 'Storage', description: 'Permanent storage options that allow you to adjust your business logic to your needs.' },
    ],
  },
  {
    name: 'Databases',
    connectors: [
      { label: 'PostgreSQL', description: 'Open source object-relational database management system.' },
      { label: 'MySQL', description: 'MySQL database.' },
      { label: 'Microsoft SQL Server', description: 'Relational database management system developed by Microsoft.' },
      { label: 'MongoDB', description: 'Integrate with your MongoDB database.' },
      { label: 'Snowflake', description: 'Fully managed SaaS platform for data warehousing, data lakes, data engineering, and data science.' },
    ],
  },
  {
    name: 'Finance & Accounting',
    connectors: [
      { label: 'QuickBooks', description: 'Smart, simple online accounting software for small business.' },
      { label: 'Xero', description: 'Cloud-based accounting software for small and medium-sized businesses.' },
      { label: 'Zoho Books', description: 'Online accounting software that manages your finances, automates business workflows, and helps you work collectively.' },
      { label: 'Fakturoid', description: 'Online invoicing and accounting system for small and medium sized businesses out of Czech Republic.' },
      { label: 'Sageone', description: 'Simple online accounting and payroll software for small businesses.' },
      { label: 'VAT Comply', description: 'Verify the validity of a VAT number issued by any EU Member State / Northern Ireland.' },
    ],
  },
  {
    name: 'Customer Support',
    connectors: [
      { label: 'Zendesk', description: 'Software for better customer relationships — tracking, prioritizing, and solving customer support tickets.' },
      { label: 'Freshdesk', description: 'Online customer engagement solution that helps you efficiently manage your customers as you scale.' },
      { label: 'Help Scout', description: 'Help Scout Mailbox connector.' },
      { label: 'ServiceNow', description: 'Allows employees to work the way they want to, and customers to get what they need, when they need it.' },
    ],
  },
  {
    name: 'Social & Marketing',
    connectors: [
      { label: 'LinkedIn', description: 'World\'s largest social network for professionals. Manage your professional identity and engage with your network.' },
      { label: 'X (Twitter)', description: 'Social platform where users share real-time messages with a global audience.' },
      { label: 'Facebook Business', description: 'Manage Facebook business tools such as Ads and Campaigns.' },
      { label: 'Leadspicker', description: 'Seamlessly capture leads from LinkedIn, optimize your email strategy with tailored outreach, and harness the power of email rotation.' },
      { label: 'Webflow', description: 'Professional drag and drop tool built for designing websites using responsive web design best practices.' },
      { label: 'WordPress', description: 'Create a free website or build a blog. Hundreds of customizable, mobile-ready designs and themes.' },
    ],
  },
  {
    name: 'Forms & Surveys',
    connectors: [
      { label: 'Typeform', description: 'Helps you ask awesomely online — surveys, questionnaires, forms, and contests across all devices.' },
      { label: 'Jotform', description: 'Quickly create custom online forms with an intuitive drag-and-drop interface without writing a single line of code.' },
      { label: 'Forms', description: 'Configurable web forms that you can send and collect entries.' },
    ],
  },
  {
    name: 'Scheduling',
    connectors: [
      { label: 'Calendly', description: 'Schedule meetings without the back-and-forth emails. Works with Premium or Pro accounts.' },
      { label: 'Docusign', description: 'Fast, reliable way to electronically sign documents and agreements on practically any device from almost anywhere.' },
      { label: 'Airtable', description: 'Low-code platform to build next-gen apps. Move beyond rigid tools and reimagine workflows with AI.' },
    ],
  },
  {
    name: 'MCP Servers',
    connectors: [
      { label: 'Perplexity Ask (MCP)', description: 'Perplexity Ask MCP Server for AI-powered search and answers.' },
      { label: 'Slack (MCP)', description: 'MCP Server for Slack workspace communication.' },
      { label: 'Lara Translate (MCP)', description: 'Powerful translation capabilities with support for language detection, context-aware translations and translation memories.' },
      { label: 'Sequential Thinking (MCP)', description: 'Dynamic and reflective problem-solving through a structured thinking process.' },
      { label: 'Google Maps (MCP)', description: 'MCP Server for the Google Maps API.' },
      { label: 'Brave Search (MCP)', description: 'MCP Server for Brave Search.' },
      { label: 'EverArt (MCP)', description: 'AI image generation using various models.' },
    ],
  },
  {
    name: 'Utilities',
    connectors: [
      { label: 'HTTP', description: 'HTTP utilities provide you with webhooks and HTTP requests.' },
      { label: 'Filters', description: 'Fine grained control over data flowing through your flows — branch flows based on data conditions.' },
      { label: 'Timers', description: 'Control over how your flows behave over time.' },
      { label: 'Controls', description: 'Interesting flow controls that allow you to adjust your business logic to your needs.' },
      { label: 'Subflows', description: 'Tools to call other flows and collect their outputs.' },
      { label: 'App Events', description: 'Events sent by your application via the Appmixer REST API or SDK — an easy way to send data to your automations.' },
      { label: 'CSV', description: 'Read and manipulate CSV files.' },
      { label: 'XML', description: 'XML utilities.' },
      { label: 'Converters', description: 'Various file conversion utilities.' },
      { label: 'RSS', description: 'RSS utilities.' },
      { label: 'Weather', description: 'Get current weather condition or weather forecast for the next 5 days for a location.' },
      { label: 'Tasks', description: 'People tasks management.' },
      { label: 'System', description: 'Appmixer system utilities.' },
    ],
  },
];

export function OtherComponentsSection() {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? categories
        .map((cat) => ({
          ...cat,
          connectors: cat.connectors.filter(
            (c) =>
              c.label.toLowerCase().includes(query.toLowerCase()) ||
              c.description.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((cat) => cat.connectors.length > 0)
    : categories;

  const totalCount = categories.reduce((sum, c) => sum + c.connectors.length, 0);

  return (
    <>
      {/* Intro */}
      <section className="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          In addition to native Mews components, automations can connect to a wide range of third-party services through the Appmixer connector library. These connectors let you integrate your automations with CRM platforms, communication tools, databases, AI services, and more.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Browse <strong>{totalCount} connectors</strong> across {categories.length} categories below.
        </p>
      </section>

      {/* Search */}
      <section>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search connectors…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        {query && (
          <p className="mt-2 text-sm text-gray-500">
            {filtered.reduce((s, c) => s + c.connectors.length, 0)} result{filtered.reduce((s, c) => s + c.connectors.length, 0) !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
        )}
      </section>

      {/* Categories */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35" />
          </svg>
          <p className="text-lg font-medium text-gray-500">No connectors found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : (
        filtered.map((cat) => (
          <section key={cat.name}>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              {cat.name}
              <span className="text-sm font-normal text-gray-400 ml-1">{cat.connectors.length}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.connectors.map((connector) => (
                <div
                  key={connector.label}
                  className="flex gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-500">
                      {connector.label.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm mb-0.5">{connector.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{connector.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
