import dynamic from 'next/dynamic';
import Head from 'next/head';
import AdminLayout from '../../components/layout/AdminLayout';
import RequireAuth from '../../components/layout/RequireAuth';

const ManageOrders = dynamic(() => import('../../components/admin/ManageOrders'), { ssr: false });

export default function AdminOrdersPage() {
  return (
    <RequireAuth>
      <AdminLayout>
        <Head>
          <title>إدارة الطلبات | ClutchZone Admin</title>
        </Head>
        <ManageOrders />
      </AdminLayout>
    </RequireAuth>
  );
}
