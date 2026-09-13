// sanity/schemas/index.ts
// Every schema type, registered once. New types get added here, never
// registered a second place.
import type { SchemaTypeDefinition } from "sanity";

import customizationMethod from "./objects/customizationMethod";
import fabricRow from "./objects/fabricRow";
import faqItem from "./objects/faqItem";
import keyFact from "./objects/keyFact";
import labelValue from "./objects/labelValue";
import pageImage from "./objects/pageImage";
import seo from "./objects/seo";
import specRow from "./objects/specRow";
import trustBlock from "./objects/trustBlock";
import videoClip from "./objects/videoClip";

import category from "./documents/category";
import siteSettings from "./documents/siteSettings";
import style from "./documents/style";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  seo,
  pageImage,
  faqItem,
  keyFact,
  specRow,
  fabricRow,
  trustBlock,
  customizationMethod,
  labelValue,
  videoClip,
  // Documents
  category,
  style,
  siteSettings,
];
