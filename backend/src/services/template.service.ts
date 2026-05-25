import Tenant from '../models/Tenant.model';
// import Page from '../models/Page.model';
import Folder from '../models/Folder.model';
import { ApiError } from '../utils/ApiError';

const DEFAULT_NAVIGATION = [
  { label: 'Home', path: '/' },
  { label: 'News', path: '/news' },
  { label: 'Announcements', path: '/announcements' },
  { label: 'Our Team', path: '/people' },
  { label: 'Documents & Resources', path: '/documents' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const DEFAULT_QUICK_LINKS = [
  { label: 'News', icon: 'newspaper', path: '/news' },
  { label: 'People', icon: 'users', path: '/people' },
  { label: 'Documents', icon: 'folder', path: '/documents' },
  { label: 'Events', icon: 'calendar', path: '/events' },
  { label: 'About Us', icon: 'info', path: '/about' },
  { label: 'Announcements', icon: 'megaphone', path: '/announcements' },
];

const DEFAULT_PAGES = ['home', 'about', 'contact', 'announcements'];

const DEFAULT_FOLDERS = [
  'Policies',
  'HR Documents',
  'Templates',
  'General',
];

interface CreateCompanyOptions {
  name: string;
  slug: string;
  type?: 'parent' | 'subsidiary';
  parentId?: string;
  branding?: Partial<{
    logo: string;
    primaryColor: string;
    heroImage: string;
    heroTagline: string;
  }>;
  adminUserId: string;
}

export const createCompanyFromTemplate = async (
  options: CreateCompanyOptions
) => {
  const existing = await Tenant.findOne({
    slug: options.slug,
  });

  if (existing) {
    throw new ApiError(
      409,
      'A company with this slug already exists'
    );
  }

  const createdTenant = await Tenant.create({
    name: options.name,
    slug: options.slug,
    type: options.type || 'subsidiary',
    parentId: options.parentId
        ? options.parentId
        : undefined,

    branding: {
      primaryColor: '#0066CC',
      secondaryColor: '#004499',
      font: 'Inter',
      ...options.branding,
    },

    template: {
      navigation: DEFAULT_NAVIGATION,
      quickLinks: DEFAULT_QUICK_LINKS,
      defaultPages: DEFAULT_PAGES,
    },

    isActive: true,
  });

  // Create default folders
  await Promise.all(
    DEFAULT_FOLDERS.map((name) =>
      Folder.create({
        tenantId: (createdTenant as any)._id,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        createdBy: options.adminUserId,
      })
    )
  );

  // Create default pages later
  /*
  await Promise.all(
    DEFAULT_PAGES.map((slug) =>
      Page.create({
        tenantId: createdTenant._id,
        slug,
        title:
          slug.charAt(0).toUpperCase() + slug.slice(1),
        body: `<h1>${options.name} — ${slug}</h1><p>Edit this page.</p>`,
        createdBy: options.adminUserId,
        isPublished: true,
      })
    )
  );
  */

  return createdTenant;
};