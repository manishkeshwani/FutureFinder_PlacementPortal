import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let response = await fetch('http://localhost:5000/viewJobs');
        let data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs();
  }, []);

  // Prepare data for the chart
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const jobPostings = Array(12).fill(0);

  jobData.forEach((job) => {
    if (job.postedOn) {  // Check if postedOn exists
      const month = parseInt(job.postedOn.slice(5, 7), 10);
      if (!isNaN(month) && month >= 1 && month <= 12) {
        jobPostings[month - 1] += 1;
      }
    }
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Job Postings',
        data: jobPostings,
        borderColor: 'rgba(255, 0, 142, 1)',
        backgroundColor: 'rgba(255, 0, 142, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Job Postings',
        },
      },
    },
  };

  return (
    <div className="card" style={{ borderRadius: "15px" }}>
      <div className="card-body">
        <Line data={data} options={options} />
        <h5 className="card-title text-center mt-3">
          Monthly Job Postings
        </h5>
      </div>
    </div>
  );
};

export default LineChart;
