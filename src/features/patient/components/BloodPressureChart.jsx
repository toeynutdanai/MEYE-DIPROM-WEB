import moment from "moment";
import { Line } from "react-chartjs-2";

const BloodPressureChart = ({ dataList = [] }) => {
  const formatDate = (date) => {
    return moment.utc(date).utcOffset('+0700')
      .add(543, 'years')
      .format("DD/MM/YYYY");
  };

  const reversedDataList = [...dataList].reverse();

  const data = {
    labels: reversedDataList.map(item => formatDate(item.createDate)),
    datasets: [
      {
        label: "Systolic",
        data: reversedDataList.map(item => item.systolicPressure),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Diastolic",
        data: reversedDataList.map(item => item.diastolicPressure),
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Pulsation",
        data: reversedDataList.map(item => item.pulseRate),
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
          text: "Sent date.",
        },
      },
      y: {
        title: {
          display: true,
          text: "Blood pressure.",
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
