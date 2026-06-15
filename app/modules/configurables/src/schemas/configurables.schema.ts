/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Hero Tagline",
      maxLength: 120,
    },
    {
      fieldName: "heroSubheadline",
      type: "string",
      required: false,
      label: "Hero Subheadline",
      maxLength: 300,
    },
    {
      fieldName: "heroPrimaryCtaLabel",
      type: "string",
      required: false,
      label: "Hero Primary CTA Label",
      maxLength: 60,
    },
    {
      fieldName: "heroSecondaryCtaLabel",
      type: "string",
      required: false,
      label: "Hero Secondary CTA Label",
      maxLength: 60,
    },
    {
      fieldName: "chatWelcomeMessage",
      type: "string",
      required: false,
      label: "Chat Welcome Message",
      maxLength: 400,
    },
    {
      fieldName: "chatDisclaimerText",
      type: "string",
      required: false,
      label: "Chat Disclaimer Banner Text",
      maxLength: 300,
    },
    {
      fieldName: "footerDisclaimerText",
      type: "string",
      required: false,
      label: "Footer Disclaimer Text",
      maxLength: 400,
    },
    {
      fieldName: "trustBadges",
      type: "array",
      label: "Trust Badges",
      item: {
        type: "string",
        required: true,
      },
    },
    {
      fieldName: "equityFeatures",
      type: "array",
      label: "Equity Feature Cards",
      item: {
        type: "object",
        fields: [
          { fieldName: "icon", type: "string", required: true, label: "Icon Name (lucide)" },
          { fieldName: "title", type: "string", required: true, label: "Title" },
          { fieldName: "description", type: "string", required: true, label: "Description" },
        ],
      },
    },
    {
      fieldName: "finderSectionTitle",
      type: "string",
      required: false,
      label: "Healthcare Finder Section Title",
      maxLength: 100,
    },
    {
      fieldName: "finderSectionSubtitle",
      type: "string",
      required: false,
      label: "Healthcare Finder Section Subtitle",
      maxLength: 250,
    },
    {
      fieldName: "showFinderSection",
      type: "boolean",
      required: false,
      label: "Show Healthcare Finder Section",
    },
    {
      fieldName: "showChatSection",
      type: "boolean",
      required: false,
      label: "Show AI Chat Section",
    },
    {
      fieldName: "contactEmail",
      type: "string",
      required: false,
      label: "Contact Email",
      maxLength: 120,
    },
    {
      fieldName: "navLinks",
      type: "array",
      label: "Navigation Links",
      item: {
        type: "object",
        fields: [
          { fieldName: "label", type: "string", required: true, label: "Label" },
          { fieldName: "href", type: "string", required: true, label: "Path" },
        ],
      },
    },
  ],
};
