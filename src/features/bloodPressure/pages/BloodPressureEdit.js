import BloodPressureEditComponent from "../components/BloodPressureEdit";
import useBloodPressureEdit from "../hooks/useBloodPressureEdit";

const BloodPressureEdit = () => {
  const bloodPressureEditProps = useBloodPressureEdit();
  return <BloodPressureEditComponent {...bloodPressureEditProps} />;
};

export default BloodPressureEdit;
