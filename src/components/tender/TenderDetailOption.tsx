import { FC, FormEvent, useRef, useState } from "react";
import clsx from "clsx";

import styles from "./TenderDetailOption.module.scss";
import AvatarImage from "../../assets/images/avatar.svg";
import SelectField from "../shared/SelectField";
import Stepper, { Step } from "../shared/Stepper";
import InputField from "../shared/InputField";
import Button from "../shared/Button";

interface Message {
  userAvatar: string;
  content: string;
  sendAt: string;
}

const TenderDetailOption: FC = () => {
  const bottomMessagesRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    { userAvatar: AvatarImage, content: "abc", sendAt: "04 Sep 2019" },
  ]);
  const [message, setMessage] = useState<Message>({
    userAvatar: AvatarImage,
    content: "",
    sendAt: "04 Sep 2019",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await setMessages((prevState) => [...prevState, message]);
    await setMessage((prevState) => ({ ...prevState, content: "" }));

    if (bottomMessagesRef.current) {
      bottomMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className={clsx(styles.suggestionSection)}>
        <SelectField
          className={clsx(styles.select)}
          optionList={["ĐỀ NGHỊ MUA SẮM"]}
        />
        <div className={clsx(styles.infoSuggested)}>
          <div>
            <label className={clsx(styles.label)}>Mã đề nghị mua sắm</label>
            <div className={clsx(styles.value)}>ĐN-000001</div>
          </div>
          <div>
            <label className={clsx(styles.label)}>Mã HSMT</label>
            <div className={clsx(styles.value)}>HSMT_001</div>
          </div>
          <div>
            <label className={clsx(styles.label)}>Người đề nghị</label>
            <div className={clsx(styles.value)}>
              <img
                className={clsx(styles.avatar)}
                src={AvatarImage}
                alt="avatar"
              />
              <div className={clsx(styles.fullName)}>Đặng Tuấn Vũ (MBY)</div>
            </div>
          </div>
          <div>
            <label className={clsx(styles.label)}>Địa chỉ nhận hàng</label>
            <div className={clsx(styles.value)}>17 Duy Tân, Hà Nội</div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.stepSection)}>
        <SelectField className={clsx(styles.select)} optionList={["LỊCH SỬ"]} />
        <div className={clsx(styles.infoStep)}>
          <Stepper steps={steps} />
        </div>
      </div>

      <div className={clsx(styles.chatSection)}>
        <SelectField
          className={clsx(styles.select)}
          optionList={["BÌNH LUẬN"]}
        />
        <div
          className={clsx(
            styles.infoMessages,
            "custom__scroll custom__scroll--tiny"
          )}
        >
          <div className={clsx(styles.messageItem)}>
            <img
              className={clsx(styles.userAvatar)}
              src={AvatarImage}
              alt="avatar"
            />
            <div className={clsx(styles.messageText)}>
              <div className={clsx(styles.content)}>
                Created invoice #AA-04-19-1890
              </div>
              <div className={clsx(styles.sendAt)}>04 May 2019</div>
            </div>
          </div>
          {messages.map((messageItem, index) => (
            <div key={index} className={clsx(styles.messageItem, styles.isMe)}>
              <img
                className={clsx(styles.userAvatar)}
                src={messageItem.userAvatar}
                alt="avatar"
              />
              <div className={clsx(styles.messageText)}>
                <div className={clsx(styles.content)}>
                  {messageItem.content}
                </div>
                <div className={clsx(styles.sendAt)}>{messageItem.sendAt}</div>
              </div>
            </div>
          ))}
          <div ref={bottomMessagesRef}></div>
        </div>

        <form onSubmit={handleSubmit} className={clsx(styles.formSendMessage)}>
          <InputField
            value={message.content}
            onChange={(e) =>
              setMessage({ ...message, content: e.target.value })
            }
            placeholder="Nhập bình luận..."
            className={styles.inputSendMessage}
          />
          <Button
            type="submit"
            className={clsx(styles.btnSendMessage)}
            variant="primary"
          >
            Gửi
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TenderDetailOption;

var steps: Step[] = [
  {
    title: "Gửi duyệt",
    subTitle: "FPT",
    timeAt: "2 giờ trước",
  },
  {
    title: "Tạo mới",
    subTitle: "VuDT19",
    timeAt: "Hôm qua",
  },
];
