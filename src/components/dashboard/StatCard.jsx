import { ArrowDown, ArrowUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  trend = "up",
}) => {
  const isPositive = trend === "up";

  const TrendIcon = isPositive ? ArrowUp : ArrowDown;
  const trendColor = isPositive ? "text-green-600" : "text-red-500";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
          >
            <Icon
              size={24}
              className={iconColor}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>

            <p className="mt-1 text-3xl font-semibold text-slate-900">
              {value}
            </p>

            <p className="mt-3 text-xs text-slate-400">{description}</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}
        >
          <TrendIcon size={16} aria-hidden="true" />

          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
