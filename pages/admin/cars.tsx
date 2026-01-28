import dynamic from 'next/dynamic';
import Head from 'next/head';
import AdminLayout from '../../components/layout/AdminLayout';
import RequireAuth from '../../components/layout/RequireAuth';

const ManageCars = dynamic(() => import('../../components/admin/ManageCars'), { ssr: false });

export default function AdminCarsPage() {
  return (
    <RequireAuth>
      <AdminLayout>
        <Head>
          <title>إدارة السيارات | ClutchZone Admin</title>
        </Head>
        <ManageCars />
      </AdminLayout>
    </RequireAuth>
  );
}
