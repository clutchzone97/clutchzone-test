import dynamic from 'next/dynamic';
import Head from 'next/head';
import AdminLayout from '../../components/layout/AdminLayout';
import RequireAuth from '../../components/layout/RequireAuth';

const ManageProperties = dynamic(() => import('../../components/admin/ManageProperties'), { ssr: false });

export default function AdminPropertiesPage() {
  return (
    <RequireAuth>
      <AdminLayout>
        <Head>
          <title>إدارة العقارات | ClutchZone Admin</title>
        </Head>
        <ManageProperties />
      </AdminLayout>
    </RequireAuth>
  );
}
