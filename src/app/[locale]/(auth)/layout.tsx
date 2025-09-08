import '@/styles/globals.css';

export default async function AuthLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <>
      {props.children}
    </>
  );
}
