export interface FormProps {
  text: string;
  email: string;
  phoneNumber: string;
  url: string;
  [key: string]: string;
}

export interface FieldType {
  id: string;
  type: string;
  placeholder: string;
}
