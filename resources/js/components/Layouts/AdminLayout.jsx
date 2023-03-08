import { AdminProvider } from "../../Context/AdminContext";
import Admin from './Admin';

const AdminLayout = () => {
  return (
    <AdminProvider>
      <Admin />
    </AdminProvider>
  )
}

export default AdminLayout;