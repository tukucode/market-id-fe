import { Breadcrumb } from "react-bootstrap";
export default function ABreadCrumb(props) {
  const { options = [] } = props;
  return (
    <Breadcrumb>
      {options.map((item, index) => (
        <Breadcrumb.Item
          key={`breadcrumb-${index}`}
          href={item.href}
          active={item.active}
        >
          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
