import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const DepositBarChart = ({ declinedDepositCount, pendingDespositCount, successDespositCount, depositCount }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null); 

  useEffect(() => {
    // Clear any existing chart instances to avoid duplication
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    // Define the data for the chart
    const data = {
      labels: ['Pending', 'Declined', 'Successful', 'Total'],
      datasets: [
        {
          label: 'Deposit Counts',
          data: [pendingDespositCount, declinedDepositCount,  successDespositCount, depositCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Define the chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Create the chart instance
    myChartRef.current = new Chart(chartRef.current, {
      type: 'bar',
      data: data,
      options: options,
    });

    // Cleanup to avoid memory leaks
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [pendingDespositCount, declinedDepositCount, successDespositCount, depositCount]);

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};


export const WithdrawtBarChart = ({ declinedWithdrawCount, pendingWithdrawCount, successWithdrawCount, withdrawCount }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null); 

  useEffect(() => {
    // Clear any existing chart instances to avoid duplication
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    // Define the data for the chart
    const data = {
      labels: ['Pending', 'Declined', 'Successful', 'Total'],
      datasets: [
        {
          label: 'Withdrawal Counts',
          data: [pendingWithdrawCount, declinedWithdrawCount,  successWithdrawCount, withdrawCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Define the chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Create the chart instance
    myChartRef.current = new Chart(chartRef.current, {
      type: 'bar',
      data: data,
      options: options,
    });

    // Cleanup to avoid memory leaks
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [pendingWithdrawCount, declinedWithdrawCount, successWithdrawCount, withdrawCount]);

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};





export const UserChart = ({ verifiedUserCount, unverifiedUserCount, canceledUserVerificationCount, userVerificationCount }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["Verified", "Unverified", "Canceled", "Verification"],
      datasets: [
        {
          label: "User Verification Status",
          data: [verifiedUserCount, unverifiedUserCount, canceledUserVerificationCount, userVerificationCount],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
          borderColor: ["#388e3c", "#fb8c00", "#d32f2f", "#1976d2"],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      indexAxis: "y", // This makes the chart horizontal
      scales: {
        x: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false, // Allows custom sizing
    };

    const userChart = new Chart(ctx, {
      type: "bar",
      data,
      options,
    });

    return () => {
      userChart.destroy(); // Clean up the chart instance on component unmount
    };
  }, [verifiedUserCount, unverifiedUserCount, canceledUserVerificationCount, userVerificationCount]);

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};
;


export const KYCDoughnutChart = ({ KYCsCount, notUploadKYCsCount, verifiedKYCsCount, canceledKYCsCount }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["KYCs", "Not Uploaded", "Verified", "Canceled"],
      datasets: [
        {
          label: "KYC Status",
          data: [KYCsCount, notUploadKYCsCount, verifiedKYCsCount, canceledKYCsCount],
          backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336"],
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              return `${label}: ${value}`;
            },
          },
        },
      },
    };

    const kycDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data,
      options,
    });

    return () => {
      kycDoughnutChart.destroy(); // Clean up the chart instance on component unmount
    };
  }, [KYCsCount, notUploadKYCsCount, verifiedKYCsCount, canceledKYCsCount]);

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};


