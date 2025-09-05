import { Line } from "react-chartjs-2";

const BloodPressureChart = ({ dates = [], sysData, diaData, pulData }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Systolic",
        data: sysData,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Dia",
        data: diaData,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Pul",
        data: pulData,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export { BloodPressureChart };
