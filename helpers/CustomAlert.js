import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";

const CustomAlert = ({ title, text, cancelHandler, okHandler,visible }) => {
  const [show, setShow] = React.useState(visible);
  const hideDialog = () => setShow(!show);

  const done = () => {
    setShow(!show);
    okHandler();
  };
  const cancel = () => {
    cancelHandler();
  };
  return (
    <Portal>
      <Dialog visible={show} onDismiss={hideDialog} style={{width:"80%",alignSelf:"center"}} >
        <Dialog.Title style={{textAlign:"center"}}>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{textAlign:"center"}}>{text}</Paragraph>
        </Dialog.Content>
        
        <Dialog.Actions style={{justifyContent:"space-between"}}>
          <Button onPress={cancel}>Cancel</Button>
          <Button onPress={done}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomAlert;
