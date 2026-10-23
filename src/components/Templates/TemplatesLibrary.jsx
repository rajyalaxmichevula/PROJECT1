import {
    Search,
    ChevronDown,
} from 'lucide-react'

import React from 'react'
import TemplatesBox from './TemplatesBox'
import { useAppContext } from '../../Context/AppContext'

const TemplatesLibrary = () => {
    const {
        activeTab,
        setActiveTab,
        search,
        setSearch,
        category,
        setCategory,
        tenant,
        setTenant,
        sortBy,
        setSortBy,
        filteredTemplates,
    } = useAppContext()

    const tabs = [
        { label: 'All Templates', value: 'allTemplates' },
        { label: 'My Templates', value: 'myTemplates' },
        { label: 'Shared with Me', value: 'sharedWithMe' },
        { label: 'System Templates', value: 'system' },
    ]

    return (
        <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">

            {/* Template Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => setActiveTab(tab.value)}
                        className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
    activeTab === tab.value
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-slate-500 hover:text-slate-700'
} `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center">

                {/* Search */}
                <div className="flex min-w-0 items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 xl:w-56 xl:shrink-0">
                    <Search
                        size={16}
                        className="shrink-0 text-slate-500"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search templates..."
                        className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                </div>

                {/* Dropdown Filters */}
                <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 xl:flex xl:flex-1">

                    {/* Category */}
                    <div className="relative min-w-0">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-8 text-[13px] text-slate-800 outline-none focus:border-blue-500"
                        >
                            <option value="all">All Categories</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="User Management">User Management</option>
                            <option value="Inventory">Inventory</option>
                            <option value="Payment">Payment</option>
                            <option value="Data Pipeline">Data Pipeline</option>
                            <option value="Notifications">Notifications</option>
                            <option value="Approval">Approval</option>
                            <option value="Monitoring">Monitoring</option>
                        </select>

                        <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                    </div>

                    {/* Tenant */}
                    <div className="relative min-w-0">
                        <select
                            value={tenant}
                            onChange={(e) => setTenant(e.target.value)}
                            className="w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-8 text-[13px] text-slate-800 outline-none focus:border-blue-500"
                        >
                            <option value="all">All Tenants</option>
                            <option value="Multi-tenant">Multi-tenant</option>
                            <option value="All Tenants">All Tenants Access</option>
                        </select>

                        <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                    </div>

                    {/* Sorting */}
                    <div className="relative min-w-0">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-8 text-[13px] text-slate-800 outline-none focus:border-blue-500"
                        >
                            <option value="popularity">Sort by: Popularity</option>
                            <option value="newest">Sort by: Newest</option>
                            <option value="name">Sort by: Name</option>
                        </select>

                        <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                    </div>

                </div>
            </div>

            {/* Filtered Templates */}
            <TemplatesBox templatesData={filteredTemplates} />

        </div>
    )
}

export default TemplatesLibrary