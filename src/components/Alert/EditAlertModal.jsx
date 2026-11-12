
import React, { useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";

const EditAlertModal = ({ alert, onClose, onSave }) => {

    const [formData, setFormData] = useState({
        name: "",
        severity: "Medium",
        category: "Infrastructure",
        status: "Active",
        description: "",
    });

    const [errors, setErrors] = useState({});

    // Set selected alert data when modal opens
    useEffect(() => {

        if (alert) {
            setFormData({
                name: alert.name || "",
                severity: alert.severity || "Medium",
                category: alert.category || "Infrastructure",
                status: alert.status || "Active",
                description: alert.description || "",
            });
        }

    }, [alert]);

    // Handle input changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear field error
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Form validation
    const validateForm = () => {

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Alert name is required.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Save changes
    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validateForm()) return;

        onSave({
            ...formData,
            name: formData.name.trim(),
            description: formData.description.trim(),
        });
    };

    // Reusable input styling
    const inputStyle = `
        w-full rounded-lg border border-slate-200
        bg-white px-3 py-2.5 text-sm text-slate-700
        outline-none transition
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100
    `;

    const labelStyle = `
        mb-1.5 block text-xs font-medium text-slate-600
    `;

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >

            <div
                className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
                onMouseDown={(e) => e.stopPropagation()}
            >

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                    <div>
                        <h2 className="text-base font-semibold text-slate-800">
                            Edit Alert
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Update alert information and configuration.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={19} />
                    </button>

                </div>

                {/* Alert Information */}
                <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <AlertCircle size={19} />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-slate-700">
                            Alert ID: #{alert?.id}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                            Modify the selected alert details.
                        </p>
                    </div>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <div className="max-h-[65vh] space-y-4 overflow-y-auto p-5">

                        {/* Alert Name */}
                        <div>

                            <label className={labelStyle}>
                                Alert Name <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter alert name"
                                className={`${inputStyle} ${
                                    errors.name
                                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                        : ""
                                }`}
                            />

                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}

                        </div>

                        {/* Severity and Category */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* Severity */}
                            <div>

                                <label className={labelStyle}>
                                    Severity
                                </label>

                                <select
                                    name="severity"
                                    value={formData.severity}
                                    onChange={handleChange}
                                    className={inputStyle}
                                >
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>

                            </div>

                            {/* Category */}
                            <div>

                                <label className={labelStyle}>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={inputStyle}
                                >
                                    <option value="Infrastructure">
                                        Infrastructure
                                    </option>

                                    <option value="Application">
                                        Application
                                    </option>

                                    <option value="Business">
                                        Business
                                    </option>

                                    <option value="Notification">
                                        Notification
                                    </option>

                                    <option value="Performance">
                                        Performance
                                    </option>
                                </select>

                            </div>

                        </div>

                        {/* Status */}
                        <div>

                            <label className={labelStyle}>
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={inputStyle}
                            >
                                <option value="Active">Active</option>
                                <option value="Resolved">Resolved</option>
                            </select>

                        </div>

                        {/* Description */}
                        <div>

                            <label className={labelStyle}>
                                Description <span className="text-red-500">*</span>
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter alert description..."
                                rows={4}
                                className={`${inputStyle} resize-none ${
                                    errors.description
                                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                        : ""
                                }`}
                            />

                            {errors.description && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.description}
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Modal Footer */}
                    <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-blue-700"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};

export default EditAlertModal;
