import { Bell, CreditCard, Database, ListChecks, Package, RotateCcw, ShoppingCart, TriangleAlert, UserRoundPlus } from 'lucide-react'
import React, {
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react'

const AppContext = createContext()

// All templates data
const templatesData = [
    {
        id: 1,
        title: 'Order Processing',
        description: 'Complete order processing workflow with inventory, payment and notification.',
        icon: ShoppingCart,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
        tags: ['E-commerce', 'Saga', 'Multi-tenant'],
        downloads: '1.2K',
        views: 342,
        category: 'E-commerce',
        tenant: 'Multi-tenant',
        featured: true,
    },
    {
        id: 2,
        title: 'User Onboarding',
        description: 'Onboard new users with verification, profile setup and welcome emails.',
        icon: UserRoundPlus,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-100',
        tags: ['User Management', 'Event Driven'],
        downloads: '856',
        views: 210,
        category: 'User Management',
        tenant: 'All Tenants',
        featured: false,
    },
    {
        id: 3,
        title: 'Inventory Sync',
        description: 'Synchronize inventory across multiple warehouses and channels.',
        icon: Package,
        iconColor: 'text-orange-600',
        iconBg: 'bg-orange-100',
        tags: ['Inventory', 'Distributed', 'Real-time'],
        downloads: '743',
        views: 189,
        category: 'Inventory',
        tenant: 'All Tenants',
        featured: false,
    },
    {
        id: 4,
        title: 'Payment Processing',
        description: 'Handle payments with retry mechanism and fraud detection.',
        icon: CreditCard,
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-100',
        tags: ['Payment', 'Saga', 'Error Handling'],
        downloads: '1.1K',
        views: 298,
        category: 'Payment',
        tenant: 'All Tenants',
        featured: false,
    },
    {
        id: 5,
        title: 'Data ETL Pipeline',
        description: 'Extract, transform and load data from multiple sources.',
        icon: Database,
        iconColor: 'text-pink-600',
        iconBg: 'bg-pink-100',
        tags: ['Data Pipeline', 'Batch', 'Transform'],
        downloads: '512',
        views: 134,
        category: 'Data Pipeline',
        tenant: 'All Tenants',
        featured: false,
    },
    {
        id: 6,
        title: 'Notification Workflow',
        description: 'Multi-channel notification system with fallback and retry.',
        icon: Bell,
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-100',
        tags: ['Notifications', 'Event Driven', 'Retry'],
        downloads: '689',
        views: 176,
        category: 'Notifications',
        tenant: 'All Tenants',
        featured: false,
    },
    {
        id: 7,
        title: 'Approval Process',
        description: 'Document approval workflow with multiple levels.',
        icon: ListChecks,
        iconColor: 'text-violet-600',
        iconBg: 'bg-violet-100',
        tags: ['Approval', 'Human Task', 'Multi-tenant'],
        downloads: '421',
        views: 98,
        category: 'Approval',
        tenant: 'Multi-tenant',
        featured: false,
    },
    {
        id: 8,
        title: 'Incident Management',
        description: 'Handle system incidents with automatic escalation.',
        icon: TriangleAlert,
        iconColor: 'text-red-600',
        iconBg: 'bg-red-100',
        tags: ['Monitoring', 'Alerts', 'Escalation'],
        downloads: '367',
        views: 91,
        category: 'Monitoring',
        tenant: 'All Tenants',
        featured: false,
    },
    {
        id: 9,
        title: 'Refund Processing',
        description: 'Process customer refunds with inventory rollback.',
        icon: RotateCcw,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-100',
        tags: ['E-commerce', 'Saga', 'Compensation'],
        downloads: '298',
        views: 76,
        category: 'E-commerce',
        tenant: 'All Tenants',
        featured: false,
    },
]

// Convert downloads into numbers for sorting
const getDownloadCount = (downloads) => {
    const value = String(downloads).toUpperCase()

    if (value.endsWith('K')) {
        return parseFloat(value) * 1000
    }

    return parseFloat(value) || 0
}

export const AppProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('allTemplates')
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [tenant, setTenant] = useState('all')
    const [sortBy, setSortBy] = useState('popularity')

    const filteredTemplates = useMemo(() => {
        let result = templatesData.filter((template) => {
            const searchText = search.toLowerCase().trim()

            const matchesSearch =
                template.title.toLowerCase().includes(searchText) ||
                template.description.toLowerCase().includes(searchText) ||
                template.tags.some((tag) =>
                    tag.toLowerCase().includes(searchText)
                )

            const matchesCategory =
                category === 'all' ||
                template.category === category

            const matchesTenant =
                tenant === 'all' ||
                template.tenant === tenant

            const matchesTab =
                activeTab === 'allTemplates' ||
                (activeTab === 'featured' && template.featured)

            return (
                matchesSearch &&
                matchesCategory &&
                matchesTenant &&
                matchesTab
            )
        })

        if (sortBy === 'popularity') {
            result.sort(
                (a, b) =>
                    getDownloadCount(b.downloads) -
                    getDownloadCount(a.downloads)
            )
        } else if (sortBy === 'newest') {
            result.sort((a, b) => b.id - a.id)
        } else if (sortBy === 'name') {
            result.sort((a, b) =>
                a.title.localeCompare(b.title)
            )
        }

        return result
    }, [activeTab, search, category, tenant, sortBy])

    return (
        <AppContext.Provider
            value={{
                templatesData,
                filteredTemplates,

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
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)

export default AppContext