import { Button } from "antd";
import { FC } from "react";

interface IProps {
  id: number;
}

const AddToCard: FC<IProps> = ({ id }) => {
  return <Button onClick={() => console.log(id)}>Добавить в корзину</Button>;
};

export default AddToCard;
