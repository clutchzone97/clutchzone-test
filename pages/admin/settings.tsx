import dynamic from 'next/dynamic';
import Head from 'next/head';
import AdminLayout from '../../components/layout/AdminLayout';
import RequireAuth from '../../components/layout/RequireAuth';

const SiteSettings = dynamic(() => import('../../components/admin/SiteSettings'), { ssr: false });

export default function AdminSettingsPage() {
  return (
    <RequireAuth>
      <AdminLayout>
        <Head>
          <title>إعدادات الموقع | ClutchZone Admin</title>
        </Head>
        <SiteSettings />
      </AdminLayout>
    </RequireAuth>
  );
}
