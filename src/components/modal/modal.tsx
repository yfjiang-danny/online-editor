import React from "react";
import { FunctionComponent, ReactNode } from "react";

interface CustomModalProps {
  title: ReactNode;
  content: ReactNode;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
}

const CustomModal: FunctionComponent<CustomModalProps> = (props) => {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.content}</div>
      <div>
        <button onClick={props.onOk}></button>
        <button onClick={props.onCancel}></button>
      </div>
    </div>
  );
};

export default CustomModal;
