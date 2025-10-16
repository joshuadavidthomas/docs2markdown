globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, h as renderSlot } from './astro/server_BfFDGVc7.mjs';
import { H as HeadConfigSchema, b as urlToSlug, c as slugToLocaleData, d as getSidebarFromConfig, e as getSidebar, f as getSiteTitle, h as getToC, i as getSiteTitleHref, j as getPrevNextLinks, k as getHead, a as attachRouteDataAndRunMiddleware, $ as $$Page, l as gBase64 } from './middleware_B3WJOYyj.mjs';
import { c as config } from './config_C9OJ3Thw.mjs';
import { a as unionType, b as booleanType, c as stringType, o as objectType, n as numberType, e as enumType, d as recordType, f as undefinedType, h as stripLeadingAndTrailingSlashes, l as lazyType, i as dateType, j as getCollectionPathFromRoot, p as project, s as starlightConfig, k as custom } from './translations_DJ110TSw.mjs';
import { I as Icons, c as I18nBadgeConfigSchema, B as BadgeConfigSchema, p as parseAsyncWithFriendlyErrors, d as parseWithFriendlyErrors } from './Code_Bjh26zHX.mjs';
/* empty css                        */
import '../renderers.mjs';

const PrevNextLinkConfigSchema = () => unionType([
  booleanType(),
  stringType(),
  objectType({
    /** The navigation link URL. */
    link: stringType().optional(),
    /** The navigation link text. */
    label: stringType().optional()
  }).strict()
]).optional();

const defaults = { minHeadingLevel: 2, maxHeadingLevel: 3 };
const TableOfContentsSchema = () => unionType([
  objectType({
    /** The level to start including headings at in the table of contents. Default: 2. */
    minHeadingLevel: numberType().int().min(1).max(6).optional().default(2),
    /** The level to stop including headings at in the table of contents. Default: 3. */
    maxHeadingLevel: numberType().int().min(1).max(6).optional().default(3)
  }),
  booleanType().transform((enabled) => enabled ? defaults : false)
]).default(defaults).refine((toc) => toc ? toc.minHeadingLevel <= toc.maxHeadingLevel : true, {
  message: "minHeadingLevel must be less than or equal to maxHeadingLevel"
});

const iconNames = Object.keys(Icons);
const IconSchema = () => enumType(iconNames);

const HeroSchema = ({ image }) => objectType({
  /**
   * The large title text to show. If not provided, will default to the top-level `title`.
   * Can include HTML.
   */
  title: stringType().optional(),
  /**
   * A short bit of text about your project.
   * Will be displayed in a smaller size below the title.
   */
  tagline: stringType().optional(),
  /** The image to use in the hero. You can provide either a relative `file` path or raw `html`. */
  image: unionType([
    objectType({
      /** Alt text for screenreaders and other assistive technologies describing your hero image. */
      alt: stringType().default(""),
      /** Relative path to an image file in your repo, e.g. `../../assets/hero.png`. */
      file: image()
    }),
    objectType({
      /** Alt text for screenreaders and other assistive technologies describing your hero image. */
      alt: stringType().default(""),
      /** Relative path to an image file in your repo to use in dark mode, e.g. `../../assets/hero-dark.png`. */
      dark: image(),
      /** Relative path to an image file in your repo to use in light mode, e.g. `../../assets/hero-light.png`. */
      light: image()
    }),
    objectType({
      /** Raw HTML string instead of an image file. Useful for inline SVGs or more complex hero content. */
      html: stringType()
    }).transform(({ html }) => ({ html, alt: "" }))
  ]).optional(),
  /** An array of call-to-action links displayed at the bottom of the hero. */
  actions: objectType({
    /** Text label displayed in the link. */
    text: stringType(),
    /** Value for the link’s `href` attribute, e.g. `/page` or `https://mysite.com`. */
    link: stringType(),
    /** Button style to use. One of `primary` (the default), `secondary`, or `minimal`. */
    variant: enumType(["primary", "secondary", "minimal"]).default("primary"),
    /**
     * An optional icon to display alongside the link text.
     * Can be an inline `<svg>` or the name of one of Starlight’s built-in icons.
     */
    icon: unionType([IconSchema(), stringType().startsWith("<svg")]).transform((icon) => {
      const parsedIcon = IconSchema().safeParse(icon);
      return parsedIcon.success ? { type: "icon", name: parsedIcon.data } : { type: "raw", html: icon };
    }).optional(),
    /** HTML attributes to add to the link */
    attrs: recordType(unionType([stringType(), numberType(), booleanType()])).optional()
  }).array().default([])
});

const SidebarBaseSchema = objectType({
  /** The visible label for this item in the sidebar. */
  label: stringType(),
  /** Translations of the `label` for each supported language. */
  translations: recordType(stringType()).default({}),
  /** Adds a badge to the item */
  badge: I18nBadgeConfigSchema()
});
const SidebarGroupSchema = SidebarBaseSchema.extend({
  /** Whether this item should be collapsed by default. */
  collapsed: booleanType().default(false)
});
const linkHTMLAttributesSchema = recordType(
  unionType([stringType(), numberType(), booleanType(), undefinedType()])
);
const SidebarLinkItemHTMLAttributesSchema = () => linkHTMLAttributesSchema.default({});
const SidebarLinkItemSchema = SidebarBaseSchema.extend({
  /** The link to this item’s content. Can be a relative link to local files or the full URL of an external page. */
  link: stringType(),
  /** HTML attributes to add to the link item. */
  attrs: SidebarLinkItemHTMLAttributesSchema()
}).strict();
const AutoSidebarGroupSchema = SidebarGroupSchema.extend({
  /** Enable autogenerating a sidebar category from a specific docs directory. */
  autogenerate: objectType({
    /** The directory to generate sidebar items for. */
    directory: stringType().transform(stripLeadingAndTrailingSlashes),
    /**
     * Whether the autogenerated subgroups should be collapsed by default.
     * Defaults to the `AutoSidebarGroup` `collapsed` value.
     */
    collapsed: booleanType().optional()
    // TODO: not supported by Docusaurus but would be good to have
    /** How many directories deep to include from this directory in the sidebar. Default: `Infinity`. */
    // depth: z.number().optional(),
  })
}).strict();
const ManualSidebarGroupSchema = SidebarGroupSchema.extend({
  /** Array of links and subcategories to display in this category. */
  items: lazyType(
    () => unionType([
      SidebarLinkItemSchema,
      ManualSidebarGroupSchema,
      AutoSidebarGroupSchema,
      InternalSidebarLinkItemSchema,
      InternalSidebarLinkItemShorthandSchema
    ]).array()
  )
}).strict();
const InternalSidebarLinkItemSchema = SidebarBaseSchema.partial({ label: true }).extend({
  /** The link to this item’s content. Must be a slug of a Content Collection entry. */
  slug: stringType(),
  /** HTML attributes to add to the link item. */
  attrs: SidebarLinkItemHTMLAttributesSchema()
});
const InternalSidebarLinkItemShorthandSchema = stringType().transform((slug) => InternalSidebarLinkItemSchema.parse({ slug }));
const SidebarItemSchema = unionType([
  SidebarLinkItemSchema,
  ManualSidebarGroupSchema,
  AutoSidebarGroupSchema,
  InternalSidebarLinkItemSchema,
  InternalSidebarLinkItemShorthandSchema
]);

const StarlightFrontmatterSchema = (context) => objectType({
  /** The title of the current page. Required. */
  title: stringType(),
  /**
   * A short description of the current page’s content. Optional, but recommended.
   * A good description is 150–160 characters long and outlines the key content
   * of the page in a clear and engaging way.
   */
  description: stringType().optional(),
  /**
   * Custom URL where a reader can edit this page.
   * Overrides the `editLink.baseUrl` global config if set.
   *
   * Can also be set to `false` to disable showing an edit link on this page.
   */
  editUrl: unionType([stringType().url(), booleanType()]).optional().default(true),
  /** Set custom `<head>` tags just for this page. */
  head: HeadConfigSchema(),
  /** Override global table of contents configuration for this page. */
  tableOfContents: TableOfContentsSchema().optional(),
  /**
   * Set the layout style for this page.
   * Can be `'doc'` (the default) or `'splash'` for a wider layout without any sidebars.
   */
  template: enumType(["doc", "splash"]).default("doc"),
  /** Display a hero section on this page. */
  hero: HeroSchema(context).optional(),
  /**
   * The last update date of the current page.
   * Overrides the `lastUpdated` global config or the date generated from the Git history.
   */
  lastUpdated: unionType([dateType(), booleanType()]).optional(),
  /**
   * The previous navigation link configuration.
   * Overrides the `pagination` global config or the link text and/or URL.
   */
  prev: PrevNextLinkConfigSchema(),
  /**
   * The next navigation link configuration.
   * Overrides the `pagination` global config or the link text and/or URL.
   */
  next: PrevNextLinkConfigSchema(),
  sidebar: objectType({
    /**
     * The order of this page in the navigation.
     * Pages are sorted by this value in ascending order. Then by slug.
     * If not provided, pages will be sorted alphabetically by slug.
     * If two pages have the same order value, they will be sorted alphabetically by slug.
     */
    order: numberType().optional(),
    /**
     * The label for this page in the navigation.
     * Defaults to the page `title` if not set.
     */
    label: stringType().optional(),
    /**
     * Prevents this page from being included in autogenerated sidebar groups.
     */
    hidden: booleanType().default(false),
    /**
     * Adds a badge to the sidebar link.
     * Can be a string or an object with a variant and text.
     * Variants include 'note', 'tip', 'caution', 'danger', 'success', and 'default'.
     * Passing only a string defaults to the 'default' variant which uses the site accent color.
     */
    badge: BadgeConfigSchema(),
    /** HTML attributes to add to the sidebar link. */
    attrs: SidebarLinkItemHTMLAttributesSchema()
  }).default({}),
  /** Display an announcement banner at the top of this page. */
  banner: objectType({
    /** The content of the banner. Supports HTML syntax. */
    content: stringType()
  }).optional(),
  /** Pagefind indexing for this page - set to false to disable. */
  pagefind: booleanType().default(true),
  /**
   * Indicates that this page is a draft and will not be included in production builds.
   * Note that the page will still be available when running Astro in development mode.
   */
  draft: booleanType().default(false)
});
function docsSchema(...args) {
  const [options = {}] = args;
  const { extend } = options;
  return (context) => {
    const UserSchema = typeof extend === "function" ? extend(context) : extend;
    return UserSchema ? StarlightFrontmatterSchema(context).and(UserSchema) : StarlightFrontmatterSchema(context);
  };
}

const StarlightPageFrontmatterSchema = async (context) => {
  const userDocsSchema = await getUserDocsSchema();
  const schema = typeof userDocsSchema === "function" ? userDocsSchema(context) : userDocsSchema;
  return schema.transform((frontmatter) => {
    const { editUrl, sidebar, ...others } = frontmatter;
    const pageEditUrl = editUrl === void 0 || editUrl === true ? false : editUrl;
    return { ...others, editUrl: pageEditUrl };
  });
};
const validateSidebarProp = (sidebarProp) => {
  return parseWithFriendlyErrors(
    SidebarItemSchema.array().optional(),
    sidebarProp,
    "Invalid sidebar prop passed to the `<StarlightPage/>` component."
  );
};
async function generateStarlightPageRouteData({
  props,
  context
}) {
  const { frontmatter, ...routeProps } = props;
  const { url } = context;
  const slug = urlToSlug(url);
  const pageFrontmatter = await getStarlightPageFrontmatter(frontmatter);
  const id = slug;
  const localeData = slugToLocaleData(slug);
  const sidebar = props.sidebar ? getSidebarFromConfig(validateSidebarProp(props.sidebar), url.pathname, localeData.locale) : getSidebar(url.pathname, localeData.locale);
  const headings = props.headings ?? [];
  const pageDocsEntry = {
    id,
    slug,
    body: "",
    collection: "docs",
    filePath: `${getCollectionPathFromRoot("docs", project)}/${stripLeadingAndTrailingSlashes(slug)}.md`,
    data: {
      ...pageFrontmatter,
      sidebar: {
        attrs: {},
        hidden: false
      }
    }
  };
  const entry = pageDocsEntry;
  const entryMeta = {
    dir: props.dir ?? localeData.dir,
    lang: props.lang ?? localeData.lang,
    locale: localeData.locale
  };
  const editUrl = pageFrontmatter.editUrl ? new URL(pageFrontmatter.editUrl) : void 0;
  const lastUpdated = pageFrontmatter.lastUpdated instanceof Date ? pageFrontmatter.lastUpdated : void 0;
  const pageProps = {
    ...routeProps,
    ...localeData,
    entry,
    headings,
    locale: localeData.locale};
  const siteTitle = getSiteTitle(localeData.lang);
  const routeData = {
    ...routeProps,
    ...localeData,
    id,
    editUrl,
    entry,
    entryMeta,
    hasSidebar: props.hasSidebar ?? entry.data.template !== "splash",
    head: getHead(pageProps, context, siteTitle),
    headings,
    lastUpdated,
    pagination: getPrevNextLinks(sidebar, starlightConfig.pagination, entry.data),
    sidebar,
    siteTitle,
    siteTitleHref: getSiteTitleHref(localeData.locale),
    slug,
    toc: getToC(pageProps)
  };
  return routeData;
}
async function getStarlightPageFrontmatter(frontmatter) {
  const schema = await StarlightPageFrontmatterSchema({
    image: (() => (
      // Mock validator for ImageMetadata.
      // https://github.com/withastro/astro/blob/cf993bc263b58502096f00d383266cd179f331af/packages/astro/src/assets/types.ts#L32
      // It uses a custom validation approach because imported SVGs have a type of `function` as
      // well as containing the metadata properties and this ensures we handle those correctly.
      custom(
        (value) => value && (typeof value === "function" || typeof value === "object") && "src" in value && "width" in value && "height" in value && "format" in value,
        "Invalid image passed to `<StarlightPage>` component. Expected imported `ImageMetadata` object."
      )
    ))
  });
  return parseAsyncWithFriendlyErrors(
    schema,
    frontmatter,
    "Invalid frontmatter props passed to the `<StarlightPage/>` component."
  );
}
async function getUserDocsSchema() {
  const userCollections = (await import('./collection-config_Cn-Raohw.mjs')).collections;
  return userCollections?.docs.schema ?? docsSchema();
}

const $$Astro$1 = createAstro("https://dev.opencode.ai");
const $$StarlightPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StarlightPage;
  await attachRouteDataAndRunMiddleware(
    Astro2,
    await generateStarlightPageRouteData({ props: Astro2.props, context: Astro2 })
  );
  return renderTemplate`${renderComponent($$result, "Page", $$Page, {}, { "default": async ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/StarlightPage.astro", void 0);

const $$Astro = createAstro("https://dev.opencode.ai");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const apiUrl = undefined                            ;
  const { id } = Astro2.params;
  const res = await fetch(`${apiUrl}/share_data?id=${id}`);
  const data = await res.json();
  if (!data.info) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
  const models = /* @__PURE__ */ new Set();
  const version = data.info.version ? `v${data.info.version}` : "v0.0.1";
  Object.values(data.messages).forEach((d) => {
    if (d.role === "assistant" && d.modelID) {
      models.add(d.modelID);
    }
  });
  const encodedTitle = encodeURIComponent(
    gBase64.encode(
      // Convert to ASCII
      encodeURIComponent(
        // Truncate to fit S3's max key size
        data.info.title.substring(0, 700)
      )
    )
  );
  const modelsArray = Array.from(models);
  let modelParam;
  if (modelsArray.length === 1) {
    modelParam = modelsArray[0];
  } else if (modelsArray.length === 2) {
    modelParam = encodeURIComponent(`${modelsArray[0]} & ${modelsArray[1]}`);
  } else {
    modelParam = encodeURIComponent(`${modelsArray[0]} & ${modelsArray.length - 1} others`);
  }
  const ogImage = `${config.socialCard}/opencode-share/${encodedTitle}.png?model=${modelParam}&version=${version}&id=${id}`;
  return renderTemplate`${renderComponent($$result, "StarlightPage", $$StarlightPage, { "hasSidebar": false, "frontmatter": {
    title: data.info.title,
    pagefind: false,
    template: "splash",
    tableOfContents: false,
    head: [
      {
        tag: "meta",
        attrs: {
          name: "description",
          content: "opencode - The AI coding agent built for the terminal."
        }
      },
      {
        tag: "meta",
        attrs: {
          name: "robots",
          content: "noindex, nofollow, noarchive, nosnippet"
        }
      },
      {
        tag: "meta",
        attrs: {
          property: "og:image",
          content: ogImage
        }
      },
      {
        tag: "meta",
        attrs: {
          name: "twitter:image",
          content: ogImage
        }
      }
    ]
  } }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Share", null, { "id": id, "api": apiUrl, "info": data.info, "messages": data.messages, "client:only": "solid", "client:component-hydration": "only", "client:component-path": "/home/josh/projects/sst/opencode/packages/web/src/components/Share.tsx", "client:component-export": "default" })} ` })} `;
}, "/home/josh/projects/sst/opencode/packages/web/src/pages/s/[id].astro", void 0);
const $$file = "/home/josh/projects/sst/opencode/packages/web/src/pages/s/[id].astro";
const $$url = "/docs/s/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { docsSchema as d, page as p };
