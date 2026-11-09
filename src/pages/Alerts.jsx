import AlertPageHeader from "../components/Alert/AlertPageHeader";
import AlertsStats from "../components/Alert/AlertsStats";
import FilterAlert from "../components/Alert/FilterAlert";

const Alerts = () => {
  return (
    <div className="space-y-6 p-6">

      <AlertPageHeader />

      <AlertsStats />

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[0.9fr_0.8fr] shadow-lg p-2 rounded-lg">

        <div>
          <FilterAlert />
        </div>

      </div>


    </div>
  );
};

export default Alerts;
