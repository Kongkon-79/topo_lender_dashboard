import { Layout } from "@/components/layout";

export default function EscalateDisputeLoading() {
  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-8">ESCALATE DISPUTE</h2>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-6"></div>
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    </Layout>
  );
}
