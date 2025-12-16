import ModalDialog from "@/components/modal-dialog/modal-dialog";
import { getSession } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await getSession();

  return (
    <div>
      <div>From Dashboard - {JSON.stringify(session)}</div>
      <div>
        <ModalDialog />
      </div>
    </div>
  );
};

export default DashboardPage;
