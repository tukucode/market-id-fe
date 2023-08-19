import { Form} from "react-bootstrap"

export default function ASelect({ id, label, name, value, handleBlur, handleChange = () => {}, keyChange, options = [], isError, msgError }) {
  
  return (
    <Form.Group className="mt-lg-0 mt-2 mb-2">
      <Form.Label htmlFor={id} className="mb-2">
        { label }
      </Form.Label>
      <Form.Select
        id={id}
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={(event) => handleChange(event, keyChange)}
        className={ isError && "border-danger" }
      >
        <option value="">Select option</option>
        {
          options.map((item) => (
            <option key={`option-${item.name}`} value={item.id}>{item.name}</option>
          ))
        }
      </Form.Select>

      { isError && (
        <small className="text-danger text__5">
          {msgError}
        </small>
      )}
    </Form.Group>
  )
}