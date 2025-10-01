import { Line } from "react-chartjs-2";

const ActualVsPlannedChart = ({ dataSource = {} }) => {
//   const formatDate = (date) => {
//     return moment.utc(date).utcOffset('+0700')
//       .add(543, 'years')
//       .format("DD/MM/YYYY");
//   };

//   const reversedDataList = [...dataList].reverse();
  // if(Object.keys(dataSource).length === 0) return;
  const data = {
    labels: dataSource?.label,
    datasets: [
      {
        label: dataSource?.perQuantity?.label,
        data: dataSource?.perQuantity?.value,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor:"rgb(54, 162, 235)",
        // tension: 0.1,
        // stack: 'combined',
        
      },
      {
        label: dataSource?.planQuantity?.label,
        data: dataSource?.planQuantity?.value,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor:"rgb(75, 192, 192)",
        // tension: 0.1,
        // stack: 'combined',
        type: 'bar'
      },
      {
        label: dataSource?.actualTotalQuantity?.label,
        data: dataSource?.actualTotalQuantity?.value,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor:"rgb(255, 99, 132)",
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

export { ActualVsPlannedChart };

