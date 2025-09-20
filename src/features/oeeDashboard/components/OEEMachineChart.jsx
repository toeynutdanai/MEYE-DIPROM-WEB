import { Line } from "react-chartjs-2";

const OEEMachineChart = ({ dataSource = [] }) => {

  const data = {
    labels:  dataSource?.label,
    datasets: [
      {
        label: dataSource?.oee?.label,
        data: dataSource?.oee?.value,
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

export { OEEMachineChart };
