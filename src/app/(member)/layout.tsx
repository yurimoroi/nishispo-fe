import { Header } from "@/components/feature/header/header-main";
import { Footer } from "@/components/feature/footer";
import { ModalProvisionalLogin } from "@/components/feature/modal";
import { ModalArticleTemplate } from "@/components/feature/modal/modal-article-template";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col [&>*]:w-full">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <ModalProvisionalLogin />
      <ModalArticleTemplate />
    </section>
  );
}
