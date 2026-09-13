// sanity/components/SlugReadOnlyInput.tsx
// Renaming a live URL throws away its ranking, add the old slug to
// previousSlugs instead. Once a document has a published counterpart, this
// disables the slug input in the Studio UI so an editor can't rename it by
// accident.
import { Box, Text } from "@sanity/ui";
import { useEditState, type SlugInputProps, useFormValue } from "sanity";

export function SlugReadOnlyInput(props: SlugInputProps) {
  const documentId = useFormValue(["_id"]) as string | undefined;
  const documentType = useFormValue(["_type"]) as string | undefined;
  const publishedId = documentId?.replace(/^drafts\./, "");
  const editState = useEditState(publishedId ?? "", documentType ?? "");
  const isPublished = Boolean(editState?.published);

  return (
    <Box>
      {props.renderDefault({ ...props, readOnly: props.readOnly || isPublished })}
      {isPublished && (
        <Box marginTop={2}>
          <Text size={1} muted>
            Locked after first publish. Renaming a live URL throws away its ranking, add the old slug to
            previousSlugs instead.
          </Text>
        </Box>
      )}
    </Box>
  );
}
