export interface NavItem {
  id?: string;
  label: string;
  href: string;
  order?: number;
  visible?: boolean;
}

export interface SocialLink {
  id?: string;
  name: string;
  href: string;
  icon: string;
  order?: number;
  visible?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image?: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  date?: string;
  description?: string;
}

export interface PressItem {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  link: string;
  image?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  order: number;
  visible: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutEducation {
  type: string;
  school: string;
  field: string;
}

export interface AboutBusinessArea {
  title: string;
  desc: string;
}

export interface AboutPoliticalStance {
  text: string;
}

export interface AboutCharacteristic {
  text: string;
}

export interface AboutPage {
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  stats: AboutStat[];

  profileImage: string;
  profileLocation: string;
  profileBirth: string;

  whoHeading: string;
  whoParagraphs: string[];

  educationHeading: string;
  education: AboutEducation[];

  quote1Text: string;
  quote1Footer: string;

  breakImage: string;

  businessLabel: string;
  businessTitle: string;
  businessDescription: string;
  businessAreas: AboutBusinessArea[];

  characterLabel: string;
  characterTitle: string;
  characterImage: string;
  characteristics: AboutCharacteristic[];

  struggleLabel: string;
  struggleText: string;
  struggleHighlight: string;
  struggleFooter: string;

  politicalLabel: string;
  politicalTitle: string;
  politicalDescription: string;
  politicalStances: AboutPoliticalStance[];
  politicalFooter: string;
  politicalImage: string;

  todayLabel: string;
  todayDescription: string;
  summaryLabel: string;
  summaryQuote: string;
}

export interface PoliticsStat {
  value: string;
  label: string;
}

export interface PoliticsRole {
  title: string;
  desc: string;
}

export interface PoliticsPillar {
  title: string;
  desc: string;
}

export interface PoliticsPage {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  stats: PoliticsStat[];

  quote1Text: string;
  quote1Highlight: string;

  journeyLabel: string;
  journeyTitle: string;
  journeyParagraphs: string[];
  journeyImage: string;
  journeyImageCaption: string;

  anahtarDate: string;
  anahtarTitleLine1: string;
  anahtarTitleLine2: string;
  anahtarParagraphs: string[];
  partySpiritLabel: string;
  partySpirit: string[];
  partySpiritFooter: string;

  breakImage: string;
  breakImageCaption: string;
  breakQuote: string;

  advisorLabel: string;
  advisorTitle: string;
  advisorDescription: string;
  advisorQuote: string;
  advisorRolesLabel: string;
  advisorRoles: PoliticsRole[];

  visionLabel: string;
  visionTitle: string;
  pillars: PoliticsPillar[];

  futureLabel: string;
  futureTitle: string;
  futureVision: string[];
  futureFooter: string;
  futureImage: string;
  futureImageCaption: string;

  closingLabel: string;
  closingQuote: string;
}

export interface BusinessStat {
  value: string;
  label: string;
}

export interface BusinessExpertise {
  title: string;
  desc: string;
}

export interface BusinessSource {
  title: string;
  desc: string;
}

export interface BusinessTrait {
  title: string;
  desc: string;
}

export interface BusinessPage {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  stats: BusinessStat[];

  quote1Text: string;
  quote1Highlight: string;
  quote1Footer: string;

  aboutLabel: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  visionBoxLabel: string;
  businessVision: string[];

  globalLabel: string;
  globalTitle: string;
  globalDescription: string;
  globalImage: string;
  globalImageCaption: string;

  expertiseLabel: string;
  expertiseTitle: string;
  expertiseAreas: BusinessExpertise[];
  expertiseQuote: string;
  expertiseQuoteFooter: string;

  sourcesLabel: string;
  sourcesTitle: string;
  sources: BusinessSource[];

  futureLabel: string;
  futureTitle: string;
  futureGoals: string[];
  futureQuote: string;
  futureImage: string;
  futureImageCaption: string;

  traitsLabel: string;
  traitsTitle: string;
  traits: BusinessTrait[];

  closingQuote: string;
}

export interface SocietyStat {
  value: string;
  label: string;
}

export interface SocietyVolunteerOrg {
  name: string;
  desc: string;
  quote: string;
}

export interface SocietyMembership {
  org: string;
  parent: string;
  desc: string;
}

export interface SocietyApproach {
  action: string;
}

export interface SocietyPage {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  stats: SocietyStat[];

  quote1Text: string;
  quote1Highlight: string;

  storyLabel: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyHighlight: string;
  storyImage: string;
  storyImageCaption: string;

  familyLabel: string;
  familyRole: string;
  familyTitle: string;
  familyDescription: string;
  familyQuote: string;
  familyWorkLabel: string;
  familyWork: string[];

  breakImage: string;
  breakImageCaption: string;
  breakQuote: string;

  youthLabel: string;
  youthRole: string;
  youthDescription: string;
  youthWork: string[];
  youthImage: string;
  youthImageCaption: string;

  volunteerLabel: string;
  volunteerTitle: string;
  volunteerDescription: string;
  volunteerOrgs: SocietyVolunteerOrg[];

  membershipsLabel: string;
  membershipsTitle: string;
  membershipsDescription: string;
  memberships: SocietyMembership[];
  pastOrgsLabel: string;
  pastOrganizations: string[];

  humanLabel: string;
  humanTitle: string;
  humanSubtitle: string;
  humanApproach: SocietyApproach[];

  closingIntro: string;
  closingQuote: string;
  closingFooter: string;
  closingEmphasis: string;
}

export interface ArticlesStat {
  value: string;
  label: string;
}

export interface ArticlesTopic {
  title: string;
  desc: string;
}

export interface ArticlesHighlight {
  title: string;
  source: string;
  date: string;
  excerpt: string;
  link: string;
}

export interface ArticlesPage {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  stats: ArticlesStat[];

  quote1Text: string;
  quote1Highlight: string;
  quote1Footer: string;

  aboutLabel: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  aboutImage: string;
  aboutImageCaption: string;

  topicsLabel: string;
  topicsTitle: string;
  topicsDescription: string;
  topics: ArticlesTopic[];

  highlightsLabel: string;
  highlightsTitle: string;
  highlightsDescription: string;
  highlights: ArticlesHighlight[];
  highlightsCtaText: string;
  highlightsCtaLink: string;

  closingIntro: string;
  closingQuote: string;
}

export interface ContactSubject {
  value: string;
  label: string;
}

export interface ContactPage {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;

  formLabel: string;
  formTitle: string;
  successMessage: string;
  submitText: string;
  subjects: ContactSubject[];

  infoLabel: string;
  infoTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  locationLabel: string;
  location: string;
  socialLabel: string;

  quoteText: string;
  quoteHighlight: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
}
