//import AddUser from "../components/admin/AddUser";
import DataGridUs from "../components/admin/DataGridUs";
import TitleBar from "../components/TitleBar";

export default function AdminUsers() {
  return (
    <>
      <TitleBar role="Admin" />
      <DataGridUs />
    </>
  );
}
