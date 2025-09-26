import CompanyComponents from "../components/Company";
import useCompany from "../hooks/useCompany";

function Company() {
  const companyProps = useCompany();
  return <CompanyComponents {...companyProps} />;
}

export default Company;