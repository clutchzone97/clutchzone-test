import dynamic from 'next/dynamic';
import Head from 'next/head';
import AdminLayout from '../../components/layout/AdminLayout';
import RequireAuth from '../../components/layout/RequireAuth';

const AdminDashboard = dynamic(() => import('../../components/admin/AdminDashboard'), { ssr: false });

export default function AdminDashboardPage() {
  return (
    <RequireAuth>
      <AdminLayout>
        <Head>
          <title>لوحة التحكم | ClutchZone Admin</title>
        </Head>
        <AdminDashboard />
      </AdminLayout>
    </RequireAuth>
  );
}
