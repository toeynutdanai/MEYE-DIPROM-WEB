import moment from "moment";
import { Bar } from "react-chartjs-2";

const OEEFactorsChart = ({ dataSource = [] }) => {

  const data = {
    labels:  dataSource?.label,
    datasets: [
      {
        label: dataSource?.factor?.label,
        data: dataSource?.factor?.value,
        borderColor: "#ffb1c1",
        backgroundColor:"#ffb1c1",
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
      <Bar data={data} options={options}/>
    </div>
  );
};

export { OEEFactorsChart };
