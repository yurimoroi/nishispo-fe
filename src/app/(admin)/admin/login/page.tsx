import { LoginSection } from "@/components/feature/layout";
import { FormLogin } from "@/components/login/form-login";

export default async function AdminLoginPage() {
  return (
    <LoginSection>
      <div className="block border-[.1875rem] px-5 py-5 lg:border-[.25rem]">
        <h2 className="mb-6 text-center text-xl font-bold leading-normal lg:mb-5 lg:text-[1.375rem]">
          ログイン
        </h2>
        <FormLogin isAdmin={true} />
      </div>
    </LoginSection>
  );
}
