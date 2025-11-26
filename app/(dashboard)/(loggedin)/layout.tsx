import Header from "@/app/components/Heading";
export default function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   return <><Header />{children}</>;
}
