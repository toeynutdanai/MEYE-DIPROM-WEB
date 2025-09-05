import BloodPressureListComponent from "../components/BloodPressureList";
import useBloodPressureList from "../hooks/useBloodPressureList";

const BloodPressureList = () => {
  const bloodPressureListProps = useBloodPressureList();
  return <BloodPressureListComponent {...bloodPressureListProps} />;
};

export default BloodPressureList;
