import { ChevronDown, Search } from 'lucide-react'
import React from 'react'
import { useAppContext } from '../../Context/AppContext'

const FilterAlert = () => {

    const {
        search,
        category,
        setCategory,
        tenant,
        setTenant,
        sortBy,
        setSortBy,
    } = useAppContext()

    return (
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
                <div className="relative w-35">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-8 text-[13px] text-slate-800 outline-none focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Resolved">Resolved</option>
                    </select>

                    <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                </div>

                {/* Tenant */}
                <div className="relative w-35">
                    <select
                        value={tenant}
                        onChange={(e) => setTenant(e.target.value)}
                        className="w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-8 text-[13px] text-slate-800 outline-none focus:border-blue-500"
                    >
                        <option value="all">All Severity</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                </div>

                {/* Sorting */}
                <div className="relative w-50">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-8 text-[13px] text-slate-800 outline-none focus:border-blue-500"
                    >
                        <option value="popularity">All Category</option>
                        <option value="Application">Application</option>
                        <option value="Business">Business</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Performance">Performance</option>
                    </select>

                    <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                </div>

            </div>
        </div>

    )
}

export default FilterAlert