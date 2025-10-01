import { Line } from "react-chartjs-2";

const WastProductCompareChart = ({ dataSource = [] }) => {

  const data = {
    labels:  dataSource?.label,
    datasets: [
        {
        label: dataSource?.perQuantity?.label,
        data: dataSource?.perQuantity?.value,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor:"rgb(75, 192, 192)",
        // tension: 0.1,
        stack: 'combined',
        // type: 'line'
      },
      {
        label: dataSource?.actualWasteQuantity?.label,
        data: dataSource?.actualWasteQuantity?.value,
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
    maintainAspectRatio: false,
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
    <div style={{ width: '100%', height: '25vh' }}>
      <Line data={data} options={options}/>
    </div>
  );
};

export { WastProductCompareChart };

