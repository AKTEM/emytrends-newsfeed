import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { ArrowLeftIcon, CheckCircle2Icon, CircleIcon } from "lucide-react";

const trackingSteps = [
  {
    status: "ORDER PLACED",
    date: "On 14-08",
    completed: true,
  },
  {
    status: "PENDING CONFIRMATION",
    date: "On 14-08",
    completed: true,
  },
  {
    status: "OUT FOR DELIVERY",
    date: "On 14-08",
    completed: true,
  },
  {
    status: "DELIVERED",
    date: "On 14-08",
    message: "Your item/order has been delivered.",
    completed: true,
    isLast: true,
  },
];

export const PackageHistory = () => {
  const { orderId } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link
          to={`/dashboard/orders/${orderId}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Package History</span>
        </Link>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="relative">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  {step.completed ? (
                    step.isLast ? (
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2Icon className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                        <CheckCircle2Icon className="w-6 h-6 text-white" />
                      </div>
                    )
                  ) : (
                    <CircleIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />
                  )}
                  {!step.isLast && (
                    <div className="w-0.5 flex-1 bg-gray-300 my-2 min-h-[40px]"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold mb-2">
                    {step.status}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{step.date}</p>
                  {step.message && <p className="text-sm text-gray-600">{step.message}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
