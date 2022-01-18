import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

const CustomDialog = ({ title, text, navigation,page }) => {
  const [show, setShow] = React.useState(true);
  const hideDialog = () => setShow(!show);
  const done = () => {
    setShow(!show);
    navigation.navigate(page);
  };
  return (
    <Provider>
      <Portal>
        <Dialog visible={show} onDismiss={hideDialog}>
          <Dialog.Title style={{textAlign:"center"}}>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{text}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={done}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default CustomDialog;
