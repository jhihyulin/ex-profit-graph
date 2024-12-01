interface FormProps<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

interface GenerateProps<T> {
  data: T;
}

export type { FormProps, GenerateProps };
