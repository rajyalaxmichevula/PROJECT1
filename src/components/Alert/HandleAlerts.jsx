import React, { useState } from "react";

import AlertTable from "../components/Alert/AlertTable";
import AlertDetails from "../components/Alert/AlertDetails";

import { useAlerts } from "../../Context/AlertContext";
import EditAlertModal from "./EditAlertModal";

const Alerts = () => {

    const { selectedAlert, updateAlert } = useAlerts();

    const [editing, setEditing] = useState(false);

    const handleEdit = (alert) => {
        setEditing(true);
    };

    const handleSave = (updatedData) => {
        updateAlert(selectedAlert.id, updatedData);
        setEditing(false);
    };

    return (

        <div className="min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-6">

            <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(350px,1fr)]">

                {/* Alerts Table */}
                <AlertTable onEdit={handleEdit} />

                {/* Alert Details */}
                <AlertDetails onEdit={handleEdit} />

            </div>

            {/* Edit Modal */}
            {editing && selectedAlert && (
                <EditAlertModal
                    alert={selectedAlert}
                    onClose={() => setEditing(false)}
                    onSave={handleSave}
                />
            )}

        </div>

    );
};

export default Alerts;