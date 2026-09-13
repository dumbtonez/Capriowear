// sanity/components/CharCounterInput.tsx
// A thin wrapper around Sanity's default string/text input that shows a
// live character count against a soft limit. Used by seo.metaTitle and
// seo.metaDescription so an editor sees the count as they type, not just a
// validation warning after the fact.
import { Box, Text } from "@sanity/ui";
import type { StringInputProps, TextInputProps } from "sanity";

export function makeCharCounterInput(limit: number) {
  return function CharCounterInput(props: StringInputProps | TextInputProps) {
    const length = typeof props.value === "string" ? props.value.length : 0;
    const overLimit = length > limit;

    return (
      <Box>
        {props.renderDefault(props)}
        <Box marginTop={2}>
          <Text size={1} muted={!overLimit} style={overLimit ? { color: "var(--card-critical-fg-color)" } : undefined}>
            {length} / {limit} characters
          </Text>
        </Box>
      </Box>
    );
  };
}
