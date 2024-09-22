import React from "react";
import { Bubble } from "react-chartjs-2";
import { useState,useEffect } from "react";

const BubbleChart = () => {
  const [jobData, setJobData] = useState([]);

  const fetchJobs = async () => {
    try {
      let response = await fetch("http://localhost:5000/viewJobs");
      let jobData = await response.json();
      console.log(jobData);
      return jobData;
    } catch (error) {}
  };

  const jobDataPrepare = async () => {
    const result = await fetchJobs();
    const preparedData = result
      .filter((job) => job.postedOn)
      .map((job) => {
        // Extract month and day from the postedOn date
        const month = parseInt(job.postedOn.slice(5, 7), 10);
        const day = parseInt(job.postedOn.slice(8, 10), 10);

        return {
          x: month,
          y: day,
          r: 10,
          jobID: job.jobID,
          companyName: job.companyName,
        };
      });

    setJobData(preparedData);
  };

  useEffect(() => {
    jobDataPrepare();
  }, []);
  return (
    <div className="card" style={{ borderRadius: "15px" }}>
      <div className="card-body">
        <Bubble
          data={{
            datasets: [
              {
                label: "Jobs",
                data: jobData,
                backgroundColor: "rgba(0, 152, 255, 0.5)",
                borderColor: "rgba(0, 152, 255, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                min: 1,
                max: 12,
                title: {
                  display: true,
                  text: "Month",
                },
                ticks: {
                  callback: function (value, index, ticks) {
                    const months = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ];
                    return months[value - 1];
                  },
                },
              },
              y: {
                beginAtZero: true,
                min: 1,
                max: 31,
                title: {
                  display: true,
                  text: "Day",
                },
                ticks: {
                  stepSize: 1,
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const { x, y, r, jobID, companyName } = context.raw;
                    const months = [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ];
                    return [
                      `JobID: ${jobID}`,
                      `Company: ${companyName}`,
                      `Date: ${months[x - 1]} ${y}`,
                    ];
                  },
                },
              },
            },
          }}
        />
        <h5 className="card-title text-center mt-3">Job Postings by Date</h5>
      </div>
    </div>
  );
};

export default BubbleChart;
