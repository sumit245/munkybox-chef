import React, { Component } from "react";
import { View, Alert, Button } from "react-native";
import Mailer from "react-native-mail";

export default class SendMail extends Component {
  handleEmail = () => {
    Mailer.mail(
      {
        subject: "need help",
        recipients: ["support@example.com"],
        ccRecipients: ["supportCC@example.com"],
        bccRecipients: ["supportBCC@example.com"],
        body: "<b>A Bold Body</b>",
        customChooserTitle: "This is my new title", // Android only (defaults to "Send Mail")
        isHTML: true,
        attachments: [
          {
            // Specify either `path` or `uri` to indicate where to find the file data.
            // The API used to create or locate the file will usually indicate which it returns.
            // An absolute path will look like: /cacheDir/photos/some image.jpg
            // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
            path: "", // The absolute path of the file from which to read data.
            uri: "", // The uri of the file from which to read the data.
            // Specify either `type` or `mimeType` to indicate the type of data.
            type: "", // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            mimeType: "", // - use only if you want to use custom type
            name: "", // Optional: Custom filename for attachment
          },
        ],
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "Ok",
              onPress: () => console.log("OK: Email Error Response"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("CANCEL: Email Error Response"),
            },
          ],
          { cancelable: true }
        );
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleEmail}
          title="Email Me"
          color="#841584"
          accessabilityLabel="Purple Email Me Button"
        />
      </View>
    );
  }
}
