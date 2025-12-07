import {
  HeaderAdminActual,
} from "@/components/feature/header-admin";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HeaderAdminActual />
      <div className="pt-[6.25rem]">{children}</div>
    </section>
  );
}
