import { useSelector } from "react-redux";
export default function Home() {
  const { user, token } = useSelector((state) => state.auth);
  return (
    <>
      {JSON.stringify(user)}
      {JSON.stringify(token)}
    </>
  );
}
