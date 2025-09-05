import PatientEditComponent from "../components/PatientEdit";
import usePatientEdit from "../hooks/usePatientEdit";

const PatientEdit = () => {
  const patientEditProps = usePatientEdit();
  return <PatientEditComponent {...patientEditProps} />;
};

export default PatientEdit;
