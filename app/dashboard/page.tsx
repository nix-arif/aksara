import { getSession } from "@/lib/session";

const DashboardPage = async () => {
  const session = await getSession();
  console.log(session);
  return <div>From Dashboard - {JSON.stringify(session)}</div>;
};

export default DashboardPage;
