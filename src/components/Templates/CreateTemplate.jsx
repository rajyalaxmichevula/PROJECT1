
import React, { useState } from 'react'
import {
    ArrowLeft,
    FileText,
    Workflow,
    Tag,
    Globe,
    LockKeyhole,
    Plus,
    X,
    Save,
    Upload,
} from 'lucide-react'

const CreateTemplate = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Automation',
        version: '1.0.0',
        visibility: 'private',
        tenant: 'All Tenants',
    })

    const [tagInput, setTagInput] = useState('')
    const [tags, setTags] = useState([])
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const addTag = (e) => {
        e.preventDefault()

        const newTag = tagInput.trim()

        if (newTag && !tags.includes(newTag)) {
            setTags((prev) => [...prev, newTag])
        }

        setTagInput('')
    }

    const removeTag = (tagToRemove) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Template name is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) return

        const template = {
            ...formData,
            tags,
            createdAt: new Date().toISOString(),
        }

        console.log('New Template:', template)
        alert('Template details are ready! Connect your API to save them.')
    }

    const inputClass =
        'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

    const labelClass = 'text-sm font-medium text-slate-700'

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="mb-4 flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-600"
                    >
                        <ArrowLeft size={17} />
                        Back to Templates
                    </button>

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="rounded-xl bg-blue-100 p-3 text-blue-600">
                                    <FileText size={24} />
                                </span>

                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">
                                        Create Template
                                    </h1>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Create and configure a reusable workflow template.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500">
                            New Template
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Basic Information */}
                    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                            <FileText size={19} className="text-blue-600" />
                            <div>
                                <h2 className="font-semibold text-slate-800">
                                    Basic Information
                                </h2>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Add the essential details of your template.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                            <div className="sm:col-span-2">
                                <label className={labelClass}>
                                    Template Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Order Processing Workflow"
                                    className={inputClass}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label className={labelClass}>
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    maxLength={500}
                                    placeholder="Describe what this workflow does and when it should be used..."
                                    className={`${inputClass} resize-y`}
                                />
                                <div className="mt-1 flex justify-between gap-2">
                                    {errors.description ? (
                                        <p className="text-xs text-red-500">
                                            {errors.description}
                                        </p>
                                    ) : (
                                        <span className="text-xs text-slate-400">
                                            Keep it clear and concise.
                                        </span>
                                    )}
                                    <span className="text-xs text-slate-400">
                                        {formData.description.length}/500
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option>Automation</option>
                                    <option>Integration</option>
                                    <option>Data Processing</option>
                                    <option>Notifications</option>
                                    <option>E-commerce</option>
                                    <option>User Management</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Version
                                </label>
                                <input
                                    name="version"
                                    value={formData.version}
                                    onChange={handleChange}
                                    placeholder="1.0.0"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Tags */}
                    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                            <Tag size={19} className="text-blue-600" />
                            <div>
                                <h2 className="font-semibold text-slate-800">
                                    Tags
                                </h2>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Add keywords to help users discover your template.
                                </p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <label className={labelClass}>
                                Template Tags
                            </label>

                            <div className="mt-1.5 flex gap-2">
                                <input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') addTag(e)
                                    }}
                                    placeholder="e.g. E-commerce, Payment"
                                    className={inputClass.replace('mt-1.5 ', '')}
                                />

                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    <Plus size={17} />
                                    Add
                                </button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            aria-label={`Remove ${tag}`}
                                            className="rounded hover:text-red-600"
                                        >
                                            <X size={13} />
                                        </button>
                                    </span>
                                ))}
                                {tags.length === 0 && (
                                    <p className="text-xs text-slate-400">
                                        No tags added yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Workflow Configuration */}
                    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                            <Workflow size={19} className="text-blue-600" />
                            <div>
                                <h2 className="font-semibold text-slate-800">
                                    Workflow Configuration
                                </h2>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Choose the workflow and tenant settings.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5 p-5 sm:p-6">
                            <div>
                                <label className={labelClass}>
                                    Workflow Definition
                                </label>

                                <button
                                    type="button"
                                    onClick={() => alert('Connect your workflow selector here.')}
                                    className="mt-1.5 flex w-full items-center justify-between rounded-lg border border-dashed border-slate-300 p-4 text-left transition hover:border-blue-400 hover:bg-blue-50/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="rounded-lg bg-slate-100 p-2 text-slate-500">
                                            <Upload size={19} />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">
                                                Select a workflow
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                Choose an existing workflow definition.
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-blue-600">
                                        Browse
                                    </span>
                                </button>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Tenant
                                </label>
                                <select
                                    name="tenant"
                                    value={formData.tenant}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option>All Tenants</option>
                                    <option>Acme Corp</option>
                                    <option>Internal</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Visibility */}
                    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                            <h2 className="font-semibold text-slate-800">
                                Visibility & Access
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Decide who can discover and use this template.
                            </p>
                        </div>

                        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({
                                    ...prev,
                                    visibility: 'private',
                                }))}
                                className={`rounded-xl border p-4 text-left transition ${formData.visibility === 'private'
                                        ? 'border-blue-500 bg-blue-50/70 ring-1 ring-blue-500'
                                        : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <LockKeyhole size={21} className="mb-3 text-slate-600" />
                                <h3 className="text-sm font-semibold text-slate-800">
                                    Private
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Only you and authorized users can access this template.
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({
                                    ...prev,
                                    visibility: 'shared',
                                }))}
                                className={`rounded-xl border p-4 text-left transition ${formData.visibility === 'shared'
                                        ? 'border-blue-500 bg-blue-50/70 ring-1 ring-blue-500'
                                        : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <Globe size={21} className="mb-3 text-slate-600" />
                                <h3 className="text-sm font-semibold text-slate-800">
                                    Shared
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Make this template available to permitted team members.
                                </p>
                            </button>
                        </div>
                    </section>

                    {/* Footer Actions */}
                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            <Save size={17} />
                            Create Template
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTemplate
