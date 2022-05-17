import { FC } from "react";
import DisplayMap from "../../components/shared/DisplayMap";

const Map: FC = () => {
  console.log("rerender parent")

  return (
    <div>
      <DisplayMap />
    </div>
  );
};

export default Map;
