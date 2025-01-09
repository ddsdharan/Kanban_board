import MainContainer from "../components/ui-components/MainContainer";

export default function Analytics() {

  return (
    <MainContainer title={`Analytics`} subtitle={`Here are some hardcoded stats`}>
      <div className="flex flex-col gap-6 rounded-lg">
        <div className="analytics-metrics rounded-lg border bg-white p-4 shadow-sm lg:w-[60%] dark:border-drkbrd dark:bg-drkbg2">
          <h2 className="font-medium text-gray-800 dark:text-drkcol">
            User Engagement Metrics
          </h2>
          <p className="text-gray-600 dark:text-drkcol">
            Total Users:{" "}
            <span className="font-medium text-[#365dff]"></span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Active Users (Last 30 Days):{" "}
            <span className="font-medium text-[#365dff]">300</span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Daily Active Users:{" "}
            <span className="font-medium text-[#365dff]">50</span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Monthly Active Users:{" "}
            <span className="font-medium text-[#365dff]">800</span>
          </p>
        </div>

        <div className="user-feedback rounded-lg border bg-white p-4 shadow-sm lg:w-[60%] dark:border-drkbrd dark:bg-drkbg2">
          <h2 className="font-medium text-gray-800 dark:text-white">
            User Feedback Summary
          </h2>
          <p className="text-gray-600 dark:text-drkcol">
            Feedback Submissions:{" "}
            <span className="font-medium text-[#365dff]">150</span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Common Themes:{" "}
            <span className="font-medium text-[#365dff]">
              Performance, Usability, Features
            </span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Overall Satisfaction Rating:{" "}
            <span className="font-medium text-[#365dff]">4.8/5</span>
          </p>
        </div>

        <div className="recent-activity rounded-lg border bg-white p-4 shadow-sm lg:w-[60%] dark:border-drkbrd dark:bg-drkbg2">
          <h2 className="font-medium text-gray-800 dark:text-white">
            Recent Activity
          </h2>
          <p className="text-gray-600 dark:text-drkcol">
            User <span className="font-medium">James created</span> a new project:{" "}
            <span className="font-medium text-[#365dff]">Dev Dreamer</span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            User <span className="font-medium">Sarah commented</span> on:{" "}
            <span className="font-medium text-[#365dff]">Social Campaign</span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            User <span className="font-medium">Joe completed</span> a task in:{" "}
            <span className="font-medium text-[#365dff]">Web Platform</span>
          </p>
        </div>

        <div className="performance-indicators rounded-lg border bg-white p-4 shadow-sm lg:w-[60%] dark:border-drkbrd dark:bg-drkbg2">
          <h2 className="font-medium text-gray-800 dark:text-white">
            Performance Indicators
          </h2>
          <p className="text-gray-600 dark:text-drkcol">
            Average Response Time:{" "}
            <span className="font-medium text-[#365dff]">200ms</span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Uptime: <span className="font-medium text-[#365dff]">99.9%</span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Reported Bugs:{" "}
            <span className="font-medium text-[#365dff]">4</span>
          </p>
        </div>

        <div className="goals-objectives rounded-lg border bg-white p-4 shadow-sm lg:w-[60%] dark:border-drkbrd dark:bg-drkbg2">
          <h2 className="font-medium text-gray-800 dark:text-white">
            Goals and Objectives
          </h2>
          <p className="text-gray-600 dark:text-drkcol">
            Short-Term Goal:{" "}
            <span className="font-medium text-[#365dff]">
              Increase user retention by 15% in Q3
            </span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Long-Term Goal:{" "}
            <span className="font-medium text-[#365dff]">
              Reach 5,000 total users by the end of the year
            </span>
          </p>
          <p className="text-gray-600 dark:text-drkcol">
            Progress:{" "}
            <span className="font-medium text-[#365dff]">
              Retention currently at 10% increase
            </span>
          </p>
        </div>
      </div>
    </MainContainer>
  );
}
