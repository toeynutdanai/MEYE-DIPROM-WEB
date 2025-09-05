import PatientComponent from "../components/Patient";
import usePatient from "../hooks/usePatient";

const Patient = () => {
  const patientProps = usePatient();
  return <PatientComponent {...patientProps} />;
};

export default Patient;
