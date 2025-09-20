import { Line } from "react-chartjs-2";

const OEEChart = ({ dataSource = [] }) => {

  const data = {
    labels:  dataSource?.label,
    datasets: [
      {
        label: dataSource?.oee?.label,
        data: dataSource?.oee?.value,
        borderColor: "#ffb1c1",
        backgroundColor:"#ffb1c1",
        fill: true
        // tension: 0.1,
        // stack: 'combined',
      },
      
    ],
  };

  const options = {
    responsive: true,
    scales: {
    //   x: {
    //     title: {
    //       display: true,
    //       text: "Date",
    //     },
    //   },
      y: {
        title: {
          display: false,
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

export { OEEChart };
