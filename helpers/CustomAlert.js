import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";

const CustomAlert = ({ title, text, cancelHandler, okHandler }) => {
  const [show, setShow] = React.useState(true);
  const hideDialog = () => setShow(!show);

  const done = () => {
    setShow(!show);
    okHandler();
  };
  const cancel = () => {
    setShow(!show);
    cancelHandler();
  };
  return (
    <Portal>
      <Dialog visible={show} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cancel}>Cancel</Button>
          <Button onPress={done}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomAlert;
