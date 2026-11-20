export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomepagePartsFragmentDoc = gql`
    fragment HomepageParts on Homepage {
  __typename
  hero {
    __typename
    headlineLine1
    headlineLine2
    description
    primaryCta {
      __typename
      label
      href
    }
    secondaryCta {
      __typename
      label
      href
    }
  }
  about {
    __typename
    headingLine1
    headingLine2
    headingLine3
    copy
  }
  servicesSection {
    __typename
    heading
    intro
    items {
      __typename
      number
      title
      description
      price
      tags
      images {
        __typename
        src
        alt
      }
    }
  }
  journey {
    __typename
    heading
    intro
    quote
    steps {
      __typename
      year
      title
      description
      image
    }
  }
  features {
    __typename
    intro
    heading
    privacyHeading
    privacyCopy
    benefits
    usersMetric
    usersLabel
    serversMetric
    serversLabel
    encryptionMetric
    encryptionLabel
    cards {
      __typename
      title
      copy
      image
      alt
    }
  }
  testimonials {
    __typename
    headingLine1
    headingLine2
    items {
      __typename
      quote
      accent
    }
  }
  pricing {
    __typename
    heading
    plans {
      __typename
      name
      audience
      monthly
      annual
      interval
      features
    }
  }
  faq {
    __typename
    headingLine1
    headingLine2
    intro
    items {
      __typename
      question
      answer
    }
  }
  footer {
    __typename
    eyebrow
    headlineLine1
    headlineLine2
    primaryCta {
      __typename
      label
      href
    }
    secondaryCta {
      __typename
      label
      href
    }
  }
}
    `;
export const FeaturesPagePartsFragmentDoc = gql`
    fragment FeaturesPageParts on FeaturesPage {
  __typename
  highlights {
    __typename
    number
    title
    text
  }
  features {
    __typename
    number
    tag
    title
    image
    alt
    imageLabel
    copy
    points
  }
  safeguards {
    __typename
    title
    text
    points
  }
}
    `;
export const PlansPagePartsFragmentDoc = gql`
    fragment PlansPageParts on PlansPage {
  __typename
  coreFeatures {
    __typename
    index
    title
    description
    detail
    visual
  }
  plans {
    __typename
    name
    price
    interval
    summary
    savings
    features
    cta
    popular
  }
  addOns {
    __typename
    title
    description
  }
  testimonials {
    __typename
    quote
    author
  }
  faqItems {
    __typename
    question
    answer
  }
}
    `;
export const EnterprisePagePartsFragmentDoc = gql`
    fragment EnterprisePageParts on EnterprisePage {
  __typename
  audiences {
    __typename
    title
    text
  }
  expectations {
    __typename
    title
    text
  }
  support {
    __typename
    title
    text
  }
  questions {
    __typename
    question
    answer
  }
}
    `;
export const FaqsPagePartsFragmentDoc = gql`
    fragment FaqsPageParts on FaqsPage {
  __typename
  categories
  questions {
    __typename
    category
    question
    answer
  }
}
    `;
export const BlogPagePartsFragmentDoc = gql`
    fragment BlogPageParts on BlogPage {
  __typename
  categories
  stories {
    __typename
    title
    excerpt
    category
    date
    read
    author
    image
    alt
    number
  }
}
    `;
export const DownloadPagePartsFragmentDoc = gql`
    fragment DownloadPageParts on DownloadPage {
  __typename
  platforms {
    __typename
    name
    key
    family
    href
    note
  }
  steps {
    __typename
    title
    text
  }
}
    `;
export const PlatformPagePartsFragmentDoc = gql`
    fragment PlatformPageParts on PlatformPage {
  __typename
  key
  name
  family
  title
  lead
  description
  image
  imageAlt
  highlights {
    __typename
    title
    text
  }
  steps {
    __typename
    title
    text
  }
  detailsTitle
  details {
    __typename
    title
    text
  }
  compatibility
  note
}
    `;
export const HomepageDocument = gql`
    query homepage($relativePath: String!) {
  homepage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomepageParts
  }
}
    ${HomepagePartsFragmentDoc}`;
export const HomepageConnectionDocument = gql`
    query homepageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomepageFilter) {
  homepageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomepageParts
      }
    }
  }
}
    ${HomepagePartsFragmentDoc}`;
export const FeaturesPageDocument = gql`
    query featuresPage($relativePath: String!) {
  featuresPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FeaturesPageParts
  }
}
    ${FeaturesPagePartsFragmentDoc}`;
export const FeaturesPageConnectionDocument = gql`
    query featuresPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FeaturesPageFilter) {
  featuresPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FeaturesPageParts
      }
    }
  }
}
    ${FeaturesPagePartsFragmentDoc}`;
export const PlansPageDocument = gql`
    query plansPage($relativePath: String!) {
  plansPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PlansPageParts
  }
}
    ${PlansPagePartsFragmentDoc}`;
export const PlansPageConnectionDocument = gql`
    query plansPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PlansPageFilter) {
  plansPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PlansPageParts
      }
    }
  }
}
    ${PlansPagePartsFragmentDoc}`;
export const EnterprisePageDocument = gql`
    query enterprisePage($relativePath: String!) {
  enterprisePage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EnterprisePageParts
  }
}
    ${EnterprisePagePartsFragmentDoc}`;
export const EnterprisePageConnectionDocument = gql`
    query enterprisePageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EnterprisePageFilter) {
  enterprisePageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EnterprisePageParts
      }
    }
  }
}
    ${EnterprisePagePartsFragmentDoc}`;
export const FaqsPageDocument = gql`
    query faqsPage($relativePath: String!) {
  faqsPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FaqsPageParts
  }
}
    ${FaqsPagePartsFragmentDoc}`;
export const FaqsPageConnectionDocument = gql`
    query faqsPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FaqsPageFilter) {
  faqsPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FaqsPageParts
      }
    }
  }
}
    ${FaqsPagePartsFragmentDoc}`;
export const BlogPageDocument = gql`
    query blogPage($relativePath: String!) {
  blogPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BlogPageParts
  }
}
    ${BlogPagePartsFragmentDoc}`;
export const BlogPageConnectionDocument = gql`
    query blogPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BlogPageFilter) {
  blogPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BlogPageParts
      }
    }
  }
}
    ${BlogPagePartsFragmentDoc}`;
export const DownloadPageDocument = gql`
    query downloadPage($relativePath: String!) {
  downloadPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...DownloadPageParts
  }
}
    ${DownloadPagePartsFragmentDoc}`;
export const DownloadPageConnectionDocument = gql`
    query downloadPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: DownloadPageFilter) {
  downloadPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...DownloadPageParts
      }
    }
  }
}
    ${DownloadPagePartsFragmentDoc}`;
export const PlatformPageDocument = gql`
    query platformPage($relativePath: String!) {
  platformPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PlatformPageParts
  }
}
    ${PlatformPagePartsFragmentDoc}`;
export const PlatformPageConnectionDocument = gql`
    query platformPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PlatformPageFilter) {
  platformPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PlatformPageParts
      }
    }
  }
}
    ${PlatformPagePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    homepage(variables, options) {
      return requester(HomepageDocument, variables, options);
    },
    homepageConnection(variables, options) {
      return requester(HomepageConnectionDocument, variables, options);
    },
    featuresPage(variables, options) {
      return requester(FeaturesPageDocument, variables, options);
    },
    featuresPageConnection(variables, options) {
      return requester(FeaturesPageConnectionDocument, variables, options);
    },
    plansPage(variables, options) {
      return requester(PlansPageDocument, variables, options);
    },
    plansPageConnection(variables, options) {
      return requester(PlansPageConnectionDocument, variables, options);
    },
    enterprisePage(variables, options) {
      return requester(EnterprisePageDocument, variables, options);
    },
    enterprisePageConnection(variables, options) {
      return requester(EnterprisePageConnectionDocument, variables, options);
    },
    faqsPage(variables, options) {
      return requester(FaqsPageDocument, variables, options);
    },
    faqsPageConnection(variables, options) {
      return requester(FaqsPageConnectionDocument, variables, options);
    },
    blogPage(variables, options) {
      return requester(BlogPageDocument, variables, options);
    },
    blogPageConnection(variables, options) {
      return requester(BlogPageConnectionDocument, variables, options);
    },
    downloadPage(variables, options) {
      return requester(DownloadPageDocument, variables, options);
    },
    downloadPageConnection(variables, options) {
      return requester(DownloadPageConnectionDocument, variables, options);
    },
    platformPage(variables, options) {
      return requester(PlatformPageDocument, variables, options);
    },
    platformPageConnection(variables, options) {
      return requester(PlatformPageConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4011/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
