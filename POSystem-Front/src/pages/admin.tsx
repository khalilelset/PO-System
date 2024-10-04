
import OrdersDataGrid from "../components/admin/DataGridOr";
import TitleBar from "../components/TitleBar";


export default function admin() {
  const role = localStorage.getItem('role');
  console.log(role);
  return (
    <>
        <TitleBar role="Admin" />
        <OrdersDataGrid />
    </>
  );
}
