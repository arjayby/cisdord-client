import React from "react";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import ResizeTextarea, { TextareaAutosizeProps } from "react-textarea-autosize";

const ChatInput = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & TextareaAutosizeProps
>((props, ref) => {
  return (
    <Textarea
      variant="filled"
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={1}
      as={ResizeTextarea}
      {...props}
    />
  );
});

export default ChatInput;
