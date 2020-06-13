import TagsCreate from './js/views/TagsCreate'
import TagsIndex from './js/views/TagsIndex'
import TagsTranslate from './js/views/TagsTranslate'

import TagsEditHelper from './js/mixins/TagsEditHelper'

import TagDestroyed from './js/events/TagDestroyed'
import TagsDestroyedBulk from './js/events/TagsDestroyedBulk'
import TagStored from './js/events/TagStored'
import TagTranslated from './js/events/TagTranslated'
import TagTranslationDestroyed from './js/events/TagTranslationDestroyed'
import TagUpdated from './js/events/TagUpdated'

export {
	TagsCreate, TagsIndex, TagsTranslate,
	TagsEditHelper,
	TagDestroyed, TagsDestroyedBulk, TagStored, TagTranslated, TagTranslationDestroyed, TagUpdated
}