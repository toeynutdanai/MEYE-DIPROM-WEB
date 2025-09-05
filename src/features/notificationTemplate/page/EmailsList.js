import EmailsComponent from "../components/Emails";
import useEmailsList from "../hooks/useEmailsList";

function Emails(props) {
  const useEmailsListProps = useEmailsList(props);
  return <EmailsComponent {...useEmailsListProps} />;
}

export default Emails;
