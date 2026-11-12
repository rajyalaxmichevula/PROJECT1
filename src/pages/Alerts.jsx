import AlertAnalytics from "../components/Alert/AlertAnalytics";
import AlertDetails from "../components/Alert/AlertDetails";
import AlertPageHeader from "../components/Alert/AlertPageHeader";
import AlertsStats from "../components/Alert/AlertsStats";
import AlertTable from "../components/Alert/AlertTable";
import AlertTimeline from "../components/Alert/AlertTimeline";
import FilterAlert from "../components/Alert/FilterAlert";

const Alerts = () => {
  return (
    <div className="space-y-6 p-6">

      <AlertPageHeader />

      <AlertsStats />

      <div className=" shadow-lg p-2 rounded-lg">

        <div>
          <FilterAlert />
        </div>

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.2fr_0.8fr] mt-2">
          <AlertTable />

          <AlertDetails />
        </div>

      </div>

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-4">

        <div className="min-w-0">
          <AlertAnalytics />
        </div>

        <div className="min-w-0">
          <AlertTimeline />
        </div>

      </div>


    </div>
  );
};

export default Alerts;
