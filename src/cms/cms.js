import CMS from 'netlify-cms-app'
// import uploadcare from 'netlify-cms-media-library-uploadcare'
// import cloudinary from 'netlify-cms-media-library-cloudinary'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import WorkshopPagePreview from './preview-templates/WorkshopPagePreview'
import ExplorerPagePreview from './preview-templates/ExplorerPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'

// CMS.registerMediaLibrary(uploadcare)
// CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('workshop', WorkshopPagePreview)
CMS.registerPreviewTemplate('explorer', ExplorerPagePreview)
CMS.registerPreviewTemplate('collectible', BlogPostPreview)
