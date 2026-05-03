import type { Lang, Translation } from '@/constants/i18n'

import { en } from './en'
import { ro } from './ro'
import { ru } from './ru'

export const I18N: Record<Lang, Translation> = { ru, ro, en }
