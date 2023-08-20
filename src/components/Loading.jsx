import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <>
      <div className="loading__overlay show">
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" className="mx-1" />
        <Spinner animation="grow" size="sm" />
      </div>
    </>
  );
}
