import { useState } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import ReportDialog from "../../../../../../components/ReportDialog/ReportDialog";
import IPostComment from "../../../../../../interfaces/PostComment";

interface PostCommentsItemActionsProps {
  comment: IPostComment;
}

const PostCommentsItemActions = ({ comment }: PostCommentsItemActionsProps) => {
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <IconButton
        icon="flag"
        size={24}
        onPress={() => setReportDialogVisible(true)}
      />
      <IconButton icon="reply" size={24} onPress={() => {}} />
      <IconButton icon="thumb-up-outline" size={24} onPress={() => {}} />
      <Text variant="titleMedium">{comment.likes}</Text>
      <ReportDialog
        dialogVisible={reportDialogVisible}
        hideDialog={() => setReportDialogVisible(false)}
        label="Napisz w jaki sposób komentarz, który zgłaszasz jest sprzeczny z regulaminem aplikacji:"
        // TODO: send report request
        postReport={() => {}}
      />
    </View>
  );
};

export default PostCommentsItemActions;
