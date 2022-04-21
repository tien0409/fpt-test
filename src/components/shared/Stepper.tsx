import { FC } from "react";
import clsx from "clsx";

import styles from "./Stepper.module.scss";

export interface Step {
  title: string;
  subTitle?: string;
  timeAt: string;
}

interface Props {
  steps: Step[];
}

const Stepper: FC<Props> = ({ steps = [] }) => {
  return (
    <div className={clsx(styles.container)}>
      {/*icon circle*/}
      <div className={clsx(styles.circleWrapper)}>
        {steps.map((_, index) => (
          <div key={index} className={clsx(styles.circleParent)}>
            <div className={clsx(styles.circleChild)}></div>
          </div>
        ))}
      </div>

      {/*detail*/}
      <div className={clsx(styles.detailWrapper)}>
        {steps.map((step, index) => (
          <div key={index} className={clsx(styles.detailItem)}>
            <div>
              <h3 className={clsx(styles.title)}>{step.title}</h3>
              <h4 className={clsx(styles.subTitle)}>{step.subTitle}</h4>
            </div>
            <div className={clsx(styles.timeAt)}>{step.timeAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
