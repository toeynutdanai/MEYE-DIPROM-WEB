import moment from "moment";
import { Line } from "react-chartjs-2";

const ActualVsPlannedChart = ({ dataList = [] }) => {
//   const formatDate = (date) => {
//     return moment.utc(date).utcOffset('+0700')
//       .add(543, 'years')
//       .format("DD/MM/YYYY");
//   };

//   const reversedDataList = [...dataList].reverse();

  const data = {
    labels: ["Sun","Mon","Thu"],
    datasets: [
        {
        label: "Max",
        data: [5,1,2,3],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor:"rgb(75, 192, 192)",
        // tension: 0.1,
        stack: 'combined',
        // type: 'line'
      },
      {
        label: "Actual",
        data: [1,2,3],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor:"rgb(255, 99, 132)",
        // tension: 0.1,
        // stack: 'combined',
        type: 'bar'
      },
      {
        label: "Plan",
        data: [4,1,2,3],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor:"rgb(54, 162, 235)",
        // tension: 0.1,
        // stack: 'combined',
        type: 'bar'
      },
      
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    scales: {
    //   x: {
    //     title: {
    //       display: true,
    //       text: "Date",
    //     },
    //   },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div style={{ width: '100%' }}>
      <Line data={data} options={options}/>
    </div>
  );
};

export { ActualVsPlannedChart };
