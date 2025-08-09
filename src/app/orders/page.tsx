import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import OrderList from '@/components/OrderList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders - Ecommerce Store',
  description: 'View your order history and track your purchases',
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your order history and delivery status
          </p>
        </div>

        <OrderList userId={session.user?.id} />
      </div>
    </div>
  );
}