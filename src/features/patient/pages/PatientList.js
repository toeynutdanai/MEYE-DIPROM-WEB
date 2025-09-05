import PatientListComponent from "../components/PatientList";
import usePatientList from "../hooks/usePatientList";

const PatientList = () => {
  const patientListProps = usePatientList();
  return <PatientListComponent {...patientListProps} />;
};

export default PatientList;
