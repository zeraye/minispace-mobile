import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IPostCreator from "../interfaces/PostCreator";

interface CreatePostState {
  postCreator: IPostCreator;
  loading: boolean;
  error: AxiosError | null;
  updatePostCreator: (postCreator: IPostCreator) => void;
  createPost: () => Promise<void>;
  hasErrors: () => boolean;
  clear: () => void;
}

const defaultPostCreator: IPostCreator = {
  eventId: null,
  title: "",
  description: "",
};

export const useCreatePostStore = create<CreatePostState>((set, get) => ({
  postCreator: defaultPostCreator,
  loading: false,
  error: null,
  updatePostCreator: (postCreator: IPostCreator) => {
    set({ postCreator });
  },
  createPost: async () => {
    set({ loading: true });

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        error: new AxiosError("jwt token not in secure store"),
        loading: false,
      });
    }

    const postCreator = get().postCreator;

    await axios({
      url: `/posts`,
      method: "post",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
      data: {
        eventGuid: postCreator.eventId,
        content: postCreator.description,
        title: postCreator.title,
      },
    })
      .then((response) => {
        set({ error: null, postCreator: defaultPostCreator });
      })
      .catch((error: AxiosError) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  hasErrors: () => {
    const postCreator = get().postCreator;
    console.log(postCreator);
    return (
      postCreator.eventId === null ||
      postCreator.title.length === 0 ||
      postCreator.description.length === 0
    );
  },
  clear: () => {
    set({
      postCreator: {
        eventId: get().postCreator.eventId,
        title: "",
        description: "",
      },
    });
  },
}));
