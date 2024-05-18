import moment from "moment";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import IPostComment from "../../../../../../interfaces/PostComment";

interface PostCommentsItemHeaderProps {
  comment: IPostComment;
}

const PostCommentsItemHeader = ({ comment }: PostCommentsItemHeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Avatar.Text
        size={32}
        label={comment.owner.username.slice(0, 2).trim()}
      />
      <Text variant="titleSmall" style={{ margin: 10 }}>
        {comment.owner.username}
      </Text>
      <Text>{moment(new Date(comment.createdAt)).locale("pl").fromNow()}</Text>
    </View>
  );
};

export default PostCommentsItemHeader;
